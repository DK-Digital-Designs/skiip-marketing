import { z } from "zod";
import { getResend } from "@/lib/resend";

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

function genericResponse(status = 200) {
  return Response.json({ ok: status < 400 }, { status });
}

function fallbackResponse() {
  return Response.json({ ok: false, fallback: "mailto" }, { status: 200 });
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

function fieldValue(data: Record<string, unknown>, key: string) {
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}

function formatSubject(kind: LeadKind, data: Record<string, unknown>) {
  if (kind === "vendor") {
    return `SKIIP vendor application - ${fieldValue(data, "businessName") || fieldValue(data, "contactName") || "new lead"}`;
  }

  if (kind === "organiser") {
    return `SKIIP organiser enquiry - ${fieldValue(data, "organisationName") || fieldValue(data, "contactName") || "new lead"}`;
  }

  return `SKIIP ${fieldValue(data, "category") || "contact"} enquiry - ${fieldValue(data, "name") || "new lead"}`;
}

function formatLeadEmail(kind: LeadKind, data: Record<string, unknown>) {
  const fieldsByKind: Record<LeadKind, [string, string][]> = {
    contact: [
      ["Category", "category"],
      ["Name", "name"],
      ["Email", "email"],
      ["Message", "message"]
    ],
    vendor: [
      ["Business Name", "businessName"],
      ["Vendor Type", "vendorType"],
      ["What you sell", "whatYouSell"],
      ["Contact Name", "contactName"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Instagram or website", "instagram"],
      ["Events", "events"]
    ],
    organiser: [
      ["Organisation Name", "organisationName"],
      ["Contact Name", "contactName"],
      ["Email", "email"],
      ["Event Name", "eventName"],
      ["Message", "message"]
    ]
  };

  const fieldLines = fieldsByKind[kind]
    .map(([label, key]) => [label, fieldValue(data, key)] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  return [
    `Lead type: ${kind}`,
    "",
    ...fieldLines,
    "",
    `Source path: ${fieldValue(data, "sourcePath") || "/"}`,
    `Referrer: ${fieldValue(data, "referrer") || "none"}`,
    "",
    "Sent from the SKIIP website."
  ].join("\n");
}

async function sendLeadEmail(kind: LeadKind, data: Record<string, unknown>) {
  if (process.env.LEAD_DELIVERY !== "resend") return false;

  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  const apiKey = process.env.RESEND_API_KEY;
  if (!to || !from || !apiKey) return false;

  const email = fieldValue(data, "email").toLowerCase();
  const resend = getResend();
  const result = await resend.emails.send({
    from,
    to,
    replyTo: email || undefined,
    subject: formatSubject(kind, data),
    text: formatLeadEmail(kind, data)
  });

  if (result.error) {
    console.error(JSON.stringify({ level: "error", msg: "lead_email_failed", kind, error: result.error.message }));
    return false;
  }

  return true;
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

  try {
    const sent = await sendLeadEmail(kind, parsed.data);
    return sent ? genericResponse(200) : fallbackResponse();
  } catch (error) {
    console.error(
      JSON.stringify({ level: "error", msg: "lead_delivery_failed", kind, error: error instanceof Error ? error.message : String(error) })
    );
    return fallbackResponse();
  }
}
