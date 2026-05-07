import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  lead
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="title-lg">{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}

export function CTA({
  title = "Less waiting. More living.",
  lead = "Free for attendees. No app to download. Just open, order, and get back to the good stuff.",
  primaryHref = "/get-started",
  primaryLabel = "Get Started",
  secondaryHref,
  secondaryLabel
}: {
  title?: string;
  lead?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <h2 className="title-lg">{title}</h2>
        <p className="lead" style={{ maxWidth: 620, margin: "0 auto" }}>
          {lead}
        </p>
        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link className="button primary" href={primaryHref}>
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link className="button outline" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
