export const metadata = {
  title: "Terms",
  description: "SKIIP website terms."
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container story-panel">
        <span className="eyebrow">Terms</span>
        <h1 className="title-lg">Website Terms</h1>
        <p>
          This website introduces SKIIP and allows visitors to contact the team. It does not provide live ordering,
          payment processing, attendee accounts, vendor accounts, or dashboard access in this v1 marketing release.
        </p>
        <p>Final legal terms should be reviewed and approved before full public launch.</p>
      </div>
    </section>
  );
}
