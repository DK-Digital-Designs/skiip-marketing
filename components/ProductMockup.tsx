export function ProductMockup() {
  return (
    <div className="phone-stage" aria-label="SKIIP mobile ordering preview">
      <div className="phone-glow" />
      <div className="phone">
        <div className="phone-screen">
          <div className="mini-app-header">
            <div style={{ color: "var(--cyan)", fontSize: 10, fontWeight: 900, letterSpacing: "0.08em" }}>
              LIVE EVENT
            </div>
            <div style={{ marginTop: 5, fontSize: 20, fontWeight: 900 }}>Hey, Alex</div>
            <div style={{ color: "#8ba3c7", fontSize: 12, marginTop: 4 }}>Grant Park - Stage B</div>
            <div className="search-pill">Search food, drinks, vendors...</div>
          </div>
          {[
            ["The Pit Grill", "4 min", "Popular"],
            ["Neon Sips", "2 min", "Fast"],
            ["Stadium Slice", "6 min", "Trending"]
          ].map(([name, wait, label]) => (
            <div className="vendor-mini" key={name}>
              <div className="vendor-art" />
              <div className="vendor-row">
                <span>{name}</span>
                <span className="green">{wait}</span>
              </div>
              <div style={{ padding: "0 11px 10px", color: "var(--muted)", fontSize: 10 }}>{label}</div>
            </div>
          ))}
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
