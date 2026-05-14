import Link from "next/link";
import { ProductMockup } from "@/components/ProductMockup";
import { CTA } from "@/components/PageParts";

const steps = [
  ["01", "Browse Vendors", "See every vendor at your event with live wait times and menus."],
  ["02", "Order & Pay", "Add items, checkout quickly, and get instant confirmation."],
  ["03", "Track Status", "Get a clear on-screen pickup cue when your order is ready."],
  ["04", "Collect & Enjoy", "Skip the queue, collect from the vendor, and get back to the moment."]
];

const audiences = [
  {
    label: "Attendees",
    title: "Stay in the moment",
    href: "/get-started",
    items: ["Zero queue time", "Order from your spot", "Fast & secure checkout", "On-screen pickup status"]
  },
  {
    label: "Vendors",
    title: "Serve more, stress less",
    href: "/vendors",
    items: ["More orders", "Less front-of-queue congestion", "Handle peak demand", "Simple fulfilment flow"]
  },
  {
    label: "Organisers",
    title: "Better flow for everyone",
    href: "/organisers",
    items: ["Reduce crowd congestion", "Improve attendee satisfaction", "Understand demand", "Support vendors"]
  }
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="chip">The queue is not the main event.</span>
            <h1 className="title-xl">
              Skip the queues.
              <br />
              <span className="accent">Order instantly</span>
              <br />
              at events.
            </h1>
            <p className="lead">
              Browse vendors, order food and drinks from your spot, pay in seconds, and collect when it is ready.
              No queuing. No missing the moment.
            </p>
            <div className="button-row">
              <Link className="button primary" href="/get-started">
                Skip the Queue
              </Link>
              <Link className="button outline" href="/vendors">
                Sell at Events
              </Link>
            </div>
          </div>
          <ProductMockup />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 42 }}>
            <span className="eyebrow">How It Works</span>
            <h2 className="title-lg">From craving to checkout in just a few taps.</h2>
            <p className="lead" style={{ maxWidth: 620, margin: "0 auto" }}>
              Order food quickly and spend your time where it matters.
            </p>
          </div>
          <div className="grid-4">
            {steps.map(([num, title, body]) => (
              <div className="step" key={num}>
                <div className="step-icon">{num}</div>
                <h3 className="title-md">{title}</h3>
                <p className="muted">{body}</p>
              </div>
            ))}
          </div>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button outline" href="/how-it-works">
              See full walkthrough
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 42 }}>
            <span className="eyebrow">Built for everyone</span>
            <h2 className="title-lg">SKIIP works for the whole crew.</h2>
          </div>
          <div className="grid-3">
            {audiences.map((audience) => (
              <article className="card" key={audience.label}>
                <span className="chip">{audience.label}</span>
                <h3 className="title-md" style={{ marginTop: 14 }}>
                  {audience.title}
                </h3>
                <ul className="feature-list">
                  {audience.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="button-row">
                  <Link className="button dark" href={audience.href}>
                    Learn More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">The product</span>
            <h2 className="title-lg">
              Designed for
              <br />
              <span className="accent">real conditions.</span>
            </h2>
            <p className="lead" style={{ color: "#8ba3c7" }}>
              Built for noisy, crowded, low-light environments. Big tap targets, high contrast, minimal steps, and no
              app download.
            </p>
            <ul className="feature-list">
              <li>Mobile-first, no app download required</li>
              <li>Designed for low-signal event environments</li>
              <li>Built around fast, secure checkout flows</li>
            </ul>
          </div>
          <ProductMockup />
        </div>
      </section>

      <CTA secondaryHref="/experience" secondaryLabel="Our Story" />
    </>
  );
}
