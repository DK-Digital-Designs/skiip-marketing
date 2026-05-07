"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow">Something went wrong</span>
        <h1 className="title-lg">We hit a temporary issue.</h1>
        <p className="lead" style={{ maxWidth: 560, margin: "0 auto" }}>
          Please try again. If the issue continues, contact the SKIIP team through the help page.
        </p>
        <div className="button-row" style={{ justifyContent: "center" }}>
          <button className="button primary" type="button" onClick={reset}>
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}
