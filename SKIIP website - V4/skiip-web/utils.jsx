
// ── Shared design tokens ──────────────────────────────────────────────────────
const C = {
  navy:      '#0B0F2F',
  purple:    '#2A0A4A',
  accent:    '#8B5CF6',
  cyan:      '#22D3EE',
  green:     '#22C55E',
  bg:        '#FAFAF8',
  bgAlt:     '#F3F3F0',
  bgDark:    '#0B0F2F',
  text:      '#0B0F2F',
  textMuted: '#5A6480',
  border:    '#E5E5E2',
  white:     '#FFFFFF',
};

// ── Type scale (single source of truth) ──────────────────────────────────────
const T = {
  h1:   { fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em' },
  h2:   { fontSize: 'clamp(28px, 4vw, 48px)',   fontWeight: 800, lineHeight: 1.1,  letterSpacing: '-0.025em' },
  h3:   { fontSize: 20,  fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.01em' },
  body: { fontSize: 17,  fontWeight: 400, lineHeight: 1.75, color: C.textMuted },
  sm:   { fontSize: 14,  fontWeight: 400, lineHeight: 1.65, color: C.textMuted },
  label:{ fontSize: 12,  fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' },
};

// ── useInView hook ────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = React.useRef();
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── FadeIn wrapper ────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const [ref, inView] = useInView();
  const offsets = { up: '0, 28px', down: '0, -28px', left: '-28px, 0', right: '28px, 0', none: '0, 0' };
  const [dx, dy] = offsets[dir].split(', ');
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : `translate(${dx}, ${dy})`,
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ── Btn ───────────────────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', onClick, style = {} }) {
  const [hov, setHov] = React.useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, border: 'none', borderRadius: 99, cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: 700, letterSpacing: '0.01em',
    transition: 'all 0.18s ease', textDecoration: 'none',
  };
  const sizes = {
    sm: { padding: '9px 20px', fontSize: 13 },
    md: { padding: '13px 28px', fontSize: 15 },
    lg: { padding: '16px 36px', fontSize: 16 },
  };
  const variants = {
    primary: {
      background: hov ? '#1DAF52' : C.green,
      color: C.white,
      boxShadow: hov ? `0 8px 30px ${C.green}55` : `0 4px 16px ${C.green}33`,
      transform: hov ? 'translateY(-1px)' : 'none',
    },
    outline: {
      background: 'transparent',
      color: hov ? C.accent : C.navy,
      border: `1.5px solid ${hov ? C.accent : C.border}`,
      transform: hov ? 'translateY(-1px)' : 'none',
    },
    ghost: {
      background: hov ? C.bgAlt : 'transparent',
      color: hov ? C.navy : C.textMuted,
    },
    dark: {
      background: hov ? '#1a2055' : C.navy,
      color: C.white,
      boxShadow: hov ? '0 8px 30px rgba(11,15,47,0.4)' : '0 4px 16px rgba(11,15,47,0.2)',
      transform: hov ? 'translateY(-1px)' : 'none',
    },
    accentOutline: {
      background: hov ? `${C.accent}12` : 'transparent',
      color: C.accent,
      border: `1.5px solid ${C.accent}55`,
    },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
    >{children}</button>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ children, style = {}, dark = false, alt = false }) {
  return (
    <section style={{
      width: '100%', padding: '96px 0',
      background: dark ? C.bgDark : alt ? C.bgAlt : C.bg,
      ...style,
    }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px' }}>
        {children}
      </div>
    </section>
  );
}

// ── Eyebrow label ─────────────────────────────────────────────────────────────
function Eyebrow({ children, color = C.accent }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color, marginBottom: 14,
    }}>
      <div style={{ width: 20, height: 2, background: color, borderRadius: 99 }} />
      {children}
    </div>
  );
}

// ── Heading ───────────────────────────────────────────────────────────────────
function H2({ children, style = {} }) {
  return (
    <h2 style={{ ...T.h2, color: C.text, marginBottom: 20, ...style }}>{children}</h2>
  );
}
function H3({ children, style = {} }) {
  return (
    <h3 style={{ ...T.h3, color: C.text, marginBottom: 10, ...style }}>{children}</h3>
  );
}
function Lead({ children, style = {} }) {
  return (
    <p style={{ ...T.body, maxWidth: 560, ...style }}>{children}</p>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ children, style = {}, hover = true }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: C.white, borderRadius: 20, padding: 32,
        border: `1px solid ${hov ? C.border : C.border}`,
        boxShadow: hov ? '0 20px 60px rgba(11,15,47,0.10)' : '0 2px 16px rgba(11,15,47,0.05)',
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >{children}</div>
  );
}

// ── Tag chip ──────────────────────────────────────────────────────────────────
function Chip({ children, color = C.accent }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 99,
      background: color + '18', color, fontSize: 12, fontWeight: 700,
      letterSpacing: '0.05em', textTransform: 'uppercase',
    }}>{children}</span>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ width: '100%', height: 1, background: C.border }} />;
}

// ── Mini phone mockup ─────────────────────────────────────────────────────────
function PhoneMockup({ screen = 0, scale = 1 }) {
  const screens = [
    // Browse vendors
    <div style={{ height: '100%', background: '#FAFAF8', padding: '12px 10px', fontFamily: 'Space Grotesk, sans-serif' }}>
      <div style={{ background: C.navy, borderRadius: 12, padding: '12px 12px 14px', marginBottom: 10, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -10, right: -10, width: 60, height: 60, borderRadius: '50%', background: C.accent, opacity: 0.2, filter: 'blur(16px)' }} />
        <div style={{ fontSize: 8, color: C.cyan, fontWeight: 700, marginBottom: 3 }}>● Lollapalooza 2026</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>Hey, Alex 👋</div>
        <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 8px', fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>🔍 Search vendors…</div>
      </div>
      {[['The Pit Grill', '4 min', C.green], ['Neon Sips', '2 min', C.cyan], ['Stadium Slice', '6 min', C.accent]].map(([name, wait, col], i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 10, marginBottom: 8, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ height: 40, background: `linear-gradient(135deg, ${C.navy}dd, ${C.purple})` }} />
          <div style={{ padding: '7px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.navy }}>{name}</div>
            <div style={{ fontSize: 8, color: col, fontWeight: 600 }}>● {wait}</div>
          </div>
        </div>
      ))}
    </div>,
    // Order placed
    <div style={{ height: '100%', background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: 'Space Grotesk, sans-serif' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', background: `${C.green}22`, border: `2px solid ${C.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 12, boxShadow: `0 0 24px ${C.green}44` }}>🔥</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 6 }}>Preparing Your Order</div>
      <div style={{ fontSize: 8, color: '#8BA3C7', textAlign: 'center', marginBottom: 20 }}>Sit back and enjoy the music</div>
      <div style={{ width: '100%' }}>
        {['Order Received', 'Preparing', 'Ready for Pickup'].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: i < 2 ? (i === 0 ? C.green : C.accent) : 'rgba(255,255,255,0.1)', border: `2px solid ${i < 2 ? (i === 0 ? C.green : C.accent) : 'rgba(255,255,255,0.15)'}`, marginRight: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff' }}>{i === 0 ? '✓' : ''}</div>
            <div style={{ fontSize: 9, color: i < 2 ? '#fff' : '#4B5A7A', fontWeight: i === 1 ? 700 : 400 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>,
    // Ready
    <div style={{ height: '100%', background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: 'Space Grotesk, sans-serif' }}>
      <div style={{ fontSize: 10, color: C.green, fontWeight: 700, marginBottom: 16, letterSpacing: '0.1em' }}>● READY FOR PICKUP</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 4 }}>Skip the line.</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: C.green, textAlign: 'center', marginBottom: 16 }}>It's ready.</div>
      <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <div style={{ width: 80, height: 80, background: '#F0F0F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#999', fontFamily: 'monospace' }}>QR CODE</div>
      </div>
      <div style={{ fontSize: 18, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em' }}>SK-2847</div>
      <div style={{ fontSize: 8, color: '#6B82A8', marginTop: 4 }}>Stand B-12 · Gate 3</div>
    </div>,
  ];
  return (
    <div style={{
      width: 180 * scale, height: 360 * scale,
      background: '#0A0A12', borderRadius: 32 * scale,
      boxShadow: `0 0 0 ${1.5 * scale}px #1E2040, 0 ${24 * scale}px ${60 * scale}px rgba(0,0,0,0.4), 0 0 ${40 * scale}px rgba(139,92,246,0.1)`,
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 60 * scale, height: 16 * scale, background: '#0A0A12', borderRadius: `0 0 ${10 * scale}px ${10 * scale}px`, zIndex: 10 }} />
      <div style={{ position: 'absolute', top: 16 * scale, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {screens[screen % screens.length]}
      </div>
    </div>
  );
}

// Export everything
Object.assign(window, { C, T, useInView, FadeIn, Btn, Section, Eyebrow, H2, H3, Lead, Card, Chip, Divider, PhoneMockup });
