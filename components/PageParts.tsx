import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  lead,
  primaryHref,
  primaryLabel
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="title-lg">{title}</h1>
        <p className="lead">{lead}</p>
        {primaryHref && primaryLabel ? (
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button primary" href={primaryHref}>
              {primaryLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function CTA({
  title = "The queue is optional now.",
  lead = "No apps. No standing around. Just order, track, and collect.",
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
