
// ── Navigation ────────────────────────────────────────────────────────────────

function Nav({ currentPage, setPage }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home',        label: 'Home' },
    { id: 'how',         label: 'How It Works' },
    { id: 'experience',  label: 'Experience' },
    { id: 'vendors',     label: 'Vendors' },
    { id: 'organisers',  label: 'Organisers' },
    { id: 'help',        label: 'Help' },
  ];

  const navigate = (id) => {
    setPage(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(250,250,248,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <button onClick={() => navigate('home')} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            <img src="uploads/LOGO without the white background.png" alt="SKIIP" style={{ height: 36, width: 'auto' }} />
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(l => (
              <NavLink key={l.id} active={currentPage === l.id} onClick={() => navigate(l.id)}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Btn variant="primary" size="sm" onClick={() => navigate('getstarted')}>Get Started</Btn>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(v => !v)} style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', fontSize: 20, color: C.navy,
            }} className="hamburger">☰</button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
          background: C.bg, borderBottom: `1px solid ${C.border}`,
          padding: '12px 24px 20px',
        }}>
          {links.map(l => (
            <button key={l.id} onClick={() => navigate(l.id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '12px 0', background: 'none', border: 'none',
              borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
              fontSize: 16, fontWeight: 600, color: currentPage === l.id ? C.accent : C.text,
              fontFamily: 'Space Grotesk, sans-serif',
            }}>{l.label}</button>
          ))}
          <div style={{ marginTop: 16 }}>
            <Btn variant="primary" onClick={() => navigate('getstarted')} style={{ width: '100%', justifyContent: 'center' }}>Get Started</Btn>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ children, active, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '6px 12px', borderRadius: 8,
        fontSize: 14, fontWeight: active ? 700 : 500,
        color: active ? C.accent : hov ? C.navy : C.textMuted,
        fontFamily: 'Space Grotesk, sans-serif',
        transition: 'all 0.15s',
        background: hov && !active ? C.bgAlt : 'transparent',
      }}
    >{children}</button>
  );
}

Object.assign(window, { Nav });
