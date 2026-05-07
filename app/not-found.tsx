import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow">404</span>
        <h1 className="title-lg">This page is not in the queue.</h1>
        <p className="lead" style={{ maxWidth: 560, margin: "0 auto" }}>
          The page you are looking for does not exist or has moved.
        </p>
        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link className="button primary" href="/">
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}
