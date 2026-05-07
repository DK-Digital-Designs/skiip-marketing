import { submitLead } from "@/lib/lead";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return submitLead(req, "organiser");
}
