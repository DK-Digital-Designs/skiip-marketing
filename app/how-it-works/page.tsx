import Link from "next/link";
import { CTA, PageHero } from "@/components/PageParts";

const steps = [
  {
    title: "Browse vendors at your event",
    body: "Open SKIIP on any device. See vendors, menus, and clear pickup expectations without downloading an app.",
    details: ["Food, drinks, and merch", "Live wait-time indicators", "Search by vendor or category"]
  },
  {
    title: "Order and pay through the web app",
    body: "Choose your items, confirm the order, and pay quickly when SKIIP is live at your event.",
    details: ["Apple Pay and Google Pay ready", "No account required", "Secure confirmation flow"]
  },
  {
    title: "Get notified when ready",
    body: "Follow order progress on screen and collect only when your order is ready.",
    details: ["Live preparation tracker", "Pickup status", "Order code for handoff"]
  },
  {
    title: "Collect and get back to the event",
    body: "Head to the collection point, show your order code, and get back to the moment.",
    details: ["Dedicated collection points", "Fast handoff", "Less time away"]
  }
];

export const metadata = {
  title: "How It Works",
  description: "See how SKIIP helps event attendees order, pay, and collect without queueing."
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title={<>From hungry to collected in under two minutes</>}
        lead="No apps. No accounts. No drama. Here is exactly how SKIIP is designed to work."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="card"
              style={{ marginBottom: 18, display: "grid", gap: 16 }}
            >
              <span className="chip">0{index + 1}</span>
              <div>
                <h2 className="title-md">{step.title}</h2>
                <p className="lead">{step.body}</p>
                <ul className="feature-list">
                  {step.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button primary" href="/get-started">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
