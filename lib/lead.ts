import { createHash } from "crypto";
import { z } from "zod";
import { getResend } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabase";

type LeadKind = "contact" | "vendor" | "organiser";

const base = z.object({
  website: z.string().optional(),
  sourcePath: z.string().optional(),
  referrer: z.string().optional(),
  consent: z.literal("yes")
});

const contactSchema = base.extend({
  category: z.string().min(1).max(80),
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  message: z.string().min(8).max(3000)
});

const vendorSchema = base.extend({
  businessName: z.string().min(2).max(160),
  vendorType: z.string().min(2).max(80),
  whatYouSell: z.string().min(2).max(240),
  contactName: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(5).max(80),
  instagram: z.string().max(180).optional(),
  events: z.string().max(1200).optional()
});

const organiserSchema = base.extend({
  organisationName: z.string().min(2).max(180),
  contactName: z.string().min(2).max(120),
  email: z.string().email().max(180),
  eventName: z.string().max(180).optional(),
  message: z.string().min(8).max(3000)
});

const schemas = {
  contact: contactSchema,
  vendor: vendorSchema,
  organiser: organiserSchema
};

function hashValue(value: string) {
  const secret = process.env.IP_HASH_SECRET || "local-dev";
  return createHash("sha256").update(`${secret}:${value}`).digest("hex");
}

function getClientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function genericResponse(status = 200) {
  return Response.json({ ok: status < 400 }, { status });
}

function isAllowedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const requestHost = req.headers.get("host");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const siteHost = siteUrl ? new URL(siteUrl).host : null;
    return originHost === requestHost || originHost === siteHost;
  } catch {
    return false;
  }
}

export async function submitLead(req: Request, kind: LeadKind) {
  if (!req.headers.get("content-type")?.includes("application/json")) return genericResponse(415);
  if (!isAllowedOrigin(req)) return genericResponse(403);

  const text = await req.text();
  if (text.length > 25_000) return genericResponse(413);

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return genericResponse(400);
  }

  if (typeof payload.website === "string" && payload.website.trim()) return genericResponse(200);

  const parsed = schemas[kind].safeParse(payload);
  if (!parsed.success) return genericResponse(400);

  const data = parsed.data;
  const email = "email" in data ? data.email.toLowerCase() : "";
  const name = "name" in data ? data.name : "contactName" in data ? data.contactName : "";

  const row = {
    type: kind,
    name,
    email,
    category: "category" in data ? data.category : null,
    business_name: "businessName" in data ? data.businessName : null,
    organisation_name: "organisationName" in data ? data.organisationName : null,
    phone: "phone" in data ? data.phone : null,
    message: "message" in data ? data.message : "whatYouSell" in data ? data.whatYouSell : null,
    source_path: data.sourcePath || null,
    referrer: data.referrer || null,
    payload: data,
    ip_hash: hashValue(getClientIp(req)),
    user_agent_hash: hashValue(req.headers.get("user-agent") || "unknown"),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "development"
  };

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").insert(row);
    if (error) {
      console.error(JSON.stringify({ level: "error", msg: "lead_insert_failed", kind, error: error.message }));
      return genericResponse(500);
    }
  } catch (error) {
    console.error(
      JSON.stringify({ level: "error", msg: "lead_storage_failed", kind, error: error instanceof Error ? error.message : String(error) })
    );
    return genericResponse(500);
  }

  try {
    const notifyTo = process.env.LEAD_NOTIFY_EMAIL;
    if (notifyTo && process.env.RESEND_API_KEY) {
      const resend = getResend();
      await resend.emails.send({
        from: process.env.LEAD_FROM_EMAIL || "SKIIP <onboarding@resend.dev>",
        to: notifyTo,
        replyTo: email,
        subject: `[SKIIP] New ${kind} lead: ${name || email}`,
        text: Object.entries(row)
          .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value ?? ""}`)
          .join("\n")
      });
    }
  } catch (error) {
    console.error(
      JSON.stringify({ level: "error", msg: "lead_email_failed", kind, error: error instanceof Error ? error.message : String(error) })
    );
  }

  return genericResponse(200);
}
