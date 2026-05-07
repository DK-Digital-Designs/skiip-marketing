"use client";

import { FormEvent, useState } from "react";

type LeadType = "contact" | "vendor" | "organiser";

type Status = { type: "idle" | "success" | "error"; message?: string };

const deliveryMode = process.env.NEXT_PUBLIC_LEAD_DELIVERY || "mailto";
const fallbackEmail = process.env.NEXT_PUBLIC_LEAD_EMAIL || "hello@skiip.co";

function formatSubject(type: LeadType, data: Record<string, FormDataEntryValue>) {
  if (type === "vendor") return `SKIIP vendor application - ${data.businessName || data.contactName || "new lead"}`;
  if (type === "organiser") return `SKIIP organiser enquiry - ${data.organisationName || data.contactName || "new lead"}`;
  return `SKIIP ${data.category || "contact"} enquiry - ${data.name || "new lead"}`;
}

function formatBody(type: LeadType, data: Record<string, FormDataEntryValue>) {
  const lines = [
    `Lead type: ${type}`,
    "",
    ...Object.entries(data)
      .filter(([key]) => !["website", "consent"].includes(key))
      .map(([key, value]) => `${key}: ${value}`),
    "",
    "Sent from the SKIIP website."
  ];

  return lines.join("\n");
}

async function submitLead(type: LeadType, form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form).entries());

  if (deliveryMode !== "api") {
    const subject = encodeURIComponent(formatSubject(type, data));
    const body = encodeURIComponent(formatBody(type, data));
    window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
    return;
  }

  const res = await fetch(`/api/leads/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, sourcePath: window.location.pathname, referrer: document.referrer })
  });

  if (!res.ok) throw new Error("Submission failed");
}

function useLeadForm(type: LeadType) {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle" });
    try {
      await submitLead(type, event.currentTarget);
      event.currentTarget.reset();
      setStatus({
        type: "success",
        message:
          deliveryMode === "api"
            ? "Thanks. Your message has been sent."
            : "Your email app should open with the message ready to send."
      });
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return { status, loading, onSubmit };
}

function StatusMessage({ status }: { status: Status }) {
  if (status.type === "idle") return null;
  return <div className={`form-status ${status.type}`}>{status.message}</div>;
}

export function ContactForm() {
  const { status, loading, onSubmit } = useLeadForm("contact");
  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" required defaultValue="general">
          <option value="general">General enquiry</option>
          <option value="refund">Refund request</option>
          <option value="tech">Technical issue</option>
          <option value="vendor">Vendor support</option>
        </select>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required maxLength={3000} />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required /> I consent to SKIIP storing this enquiry and
        contacting me about it.
      </label>
      <StatusMessage status={status} />
      <button className="button primary" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export function VendorForm() {
  const { status, loading, onSubmit } = useLeadForm("vendor");
  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
      <div className="field">
        <label htmlFor="businessName">Business name</label>
        <input id="businessName" name="businessName" required />
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="vendorType">Vendor type</label>
          <select id="vendorType" name="vendorType" required defaultValue="">
            <option value="" disabled>
              Select a category
            </option>
            <option>Food</option>
            <option>Drinks</option>
            <option>Merchandise</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="whatYouSell">What do you sell?</label>
          <input id="whatYouSell" name="whatYouSell" required />
        </div>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="contactName">Your name</label>
          <input id="contactName" name="contactName" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="vendorEmail">Email address</label>
          <input id="vendorEmail" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="instagram">Instagram or website</label>
          <input id="instagram" name="instagram" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="events">Which events have you worked?</label>
        <textarea id="events" name="events" maxLength={1200} />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required /> I consent to SKIIP storing this application and
        contacting me about vendor opportunities.
      </label>
      <StatusMessage status={status} />
      <button className="button primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

export function OrganiserForm() {
  const { status, loading, onSubmit } = useLeadForm("organiser");
  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
      <div className="form-grid">
        <div className="field">
          <label htmlFor="organisationName">Organisation name</label>
          <input id="organisationName" name="organisationName" required />
        </div>
        <div className="field">
          <label htmlFor="organiserName">Your name</label>
          <input id="organiserName" name="contactName" required autoComplete="name" />
        </div>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="organiserEmail">Email address</label>
          <input id="organiserEmail" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="eventName">Event name</label>
          <input id="eventName" name="eventName" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="organiserMessage">Message</label>
        <textarea id="organiserMessage" name="message" required maxLength={3000} />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required /> I consent to SKIIP storing this enquiry and
        contacting me about event partnerships.
      </label>
      <StatusMessage status={status} />
      <button className="button primary" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
