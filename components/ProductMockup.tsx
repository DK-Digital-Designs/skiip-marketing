export function ProductMockup() {
  return (
    <div className="phone-stage" aria-label="SKIIP mobile ordering preview">
      <div className="phone-glow" />
      <div className="phone">
        <div className="phone-screen">
          <img className="phone-screenshot" src="/uploads/skiip-app-preview.png" alt="" />
        </div>
      </div>
      <div className="floating-card" style={{ top: 48, left: 6 }}>
        Order Ready - Stand B-12
      </div>
      <div className="floating-card" style={{ right: 0, bottom: 78 }}>
        2 min wait - Neon Sips
      </div>
    </div>
  );
}
