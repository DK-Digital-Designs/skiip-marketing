export const metadata = {
  title: "Cookies",
  description: "SKIIP cookie information."
};

export default function CookiesPage() {
  return (
    <section className="section">
      <div className="container story-panel">
        <span className="eyebrow">Cookies</span>
        <h1 className="title-lg">Cookie Notice</h1>
        <p>
          SKIIP uses essential browser storage to remember cookie preferences. Optional analytics are used only when a
          visitor accepts analytics in the cookie banner.
        </p>
        <p>Vercel Analytics and Speed Insights help the team understand site performance. GA4 is loaded only after consent.</p>
      </div>
    </section>
  );
}
