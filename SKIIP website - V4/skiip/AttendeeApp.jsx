
// SKIIP Attendee App — all 5 screens

const COLORS = {
  navy: '#0B0F2F',
  purple: '#2A0A4A',
  neonPurple: '#8B5CF6',
  cyan: '#22D3EE',
  green: '#22C55E',
  white: '#FFFFFF',
  offWhite: '#F8F8FC',
  gray: '#94A3B8',
  lightGray: '#E2E8F0',
  text: '#0F172A',
  textMuted: '#64748B',
};

// ─── Shared primitives ───────────────────────────────────────────────────────

function Tag({ color, children }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
      textTransform: 'uppercase', padding: '2px 7px', borderRadius: 99,
      background: color + '18', color: color,
    }}>{children}</span>
  );
}

function GlowDot({ color = COLORS.green }) {
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
      background: color, boxShadow: `0 0 6px ${color}`, marginRight: 5,
    }} />
  );
}

// ─── Screen 1: Home ──────────────────────────────────────────────────────────

function HomeScreen({ navigate }) {
  const categories = [
    { icon: '🍺', label: 'Drinks' },
    { icon: '🍔', label: 'Food' },
    { icon: '🎟️', label: 'Merch' },
    { icon: '🍕', label: 'Pizza' },
    { icon: '🍦', label: 'Dessert' },
  ];
  const [activeCat, setActiveCat] = React.useState(0);
  const vendors = [
    { name: 'The Pit Grill', wait: '4 min', tag: 'Popular', tagColor: COLORS.neonPurple, items: 'Burgers · Hot Dogs · Sides' },
    { name: 'Neon Sips', wait: '2 min', tag: 'Fast', tagColor: COLORS.cyan, items: 'Cocktails · Beer · Seltzers' },
    { name: 'Stadium Slice', wait: '6 min', tag: 'Trending', tagColor: COLORS.green, items: 'Pizza · Calzones' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: COLORS.offWhite, fontFamily: 'inherit' }}>
      {/* Header */}
      <div style={{
        background: COLORS.navy, padding: '20px 20px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 120, height: 120,
          borderRadius: '50%', background: COLORS.neonPurple, opacity: 0.15,
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 10, color: COLORS.cyan, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>
              <GlowDot color={COLORS.cyan} />Lollapalooza 2026
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.white, lineHeight: 1.1 }}>
              Hey, Alex 👋
            </div>
            <div style={{ fontSize: 12, color: '#8BA3C7', marginTop: 3 }}>Grant Park · Stage B section</div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #8B5CF6, #22D3EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: COLORS.white,
          }}>A</div>
        </div>
        {/* Search */}
        <div style={{
          marginTop: 16, background: 'rgba(255,255,255,0.08)', borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <span style={{ fontSize: 14, color: '#6B82A8' }}>🔍</span>
          <span style={{ fontSize: 13, color: '#6B82A8' }}>Search food, drinks, vendors…</span>
        </div>
      </div>

      <div style={{ padding: '0 0 80px' }}>
        {/* Categories */}
        <div style={{ padding: '16px 0 4px', overflowX: 'auto', whiteSpace: 'nowrap', paddingLeft: 16 }}>
          {categories.map((c, i) => (
            <button key={i} onClick={() => setActiveCat(i)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 99, marginRight: 8,
              border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
              background: activeCat === i ? COLORS.navy : COLORS.white,
              color: activeCat === i ? COLORS.white : COLORS.text,
              boxShadow: activeCat === i ? `0 0 0 1px ${COLORS.navy}` : '0 1px 3px rgba(0,0,0,0.08)',
              transition: 'all 0.15s',
            }}>
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>

        {/* Featured */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
            Featured Near You
          </div>
          {vendors.map((v, i) => (
            <div key={i} onClick={() => navigate('menu')} style={{
              background: COLORS.white, borderRadius: 16, marginBottom: 12,
              overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              cursor: 'pointer', transition: 'transform 0.12s',
            }}>
              {/* Vendor image placeholder */}
              <div style={{
                height: 90, background: `linear-gradient(135deg, ${COLORS.navy}dd, ${COLORS.purple})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                  [ vendor photo ]
                </span>
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                }}>
                  <Tag color={v.tagColor}>{v.tag}</Tag>
                </div>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{v.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.green, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <GlowDot color={COLORS.green} />{v.wait} wait
                  </div>
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 3 }}>{v.items}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="home" navigate={navigate} />
    </div>
  );
}

// ─── Screen 2: Vendor Menu ───────────────────────────────────────────────────

function MenuScreen({ navigate, cart, setCart }) {
  const items = [
    { id: 1, name: 'Double Smash Burger', price: 14.50, tag: 'Fastest', tagColor: COLORS.cyan },
    { id: 2, name: 'Crispy Fries', price: 6.00, tag: null },
    { id: 3, name: 'BBQ Pulled Pork', price: 16.00, tag: 'Popular', tagColor: COLORS.neonPurple },
    { id: 4, name: 'Veggie Wrap', price: 11.00, tag: null },
    { id: 5, name: 'Loaded Nachos', price: 9.50, tag: 'Popular', tagColor: COLORS.neonPurple },
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: COLORS.offWhite, fontFamily: 'inherit' }}>
      {/* Header */}
      <div style={{ background: COLORS.navy, padding: '16px 20px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: -20, left: -20, width: 100, height: 100,
          borderRadius: '50%', background: COLORS.cyan, opacity: 0.1, filter: 'blur(30px)',
        }} />
        <button onClick={() => navigate('home')} style={{
          background: 'rgba(255,255,255,0.1)', border: 'none', color: COLORS.white,
          borderRadius: 8, padding: '5px 10px', fontSize: 12, cursor: 'pointer', marginBottom: 10,
        }}>← Back</button>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.white }}>The Pit Grill</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 6, alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: COLORS.cyan, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <GlowDot color={COLORS.cyan} />4 min wait
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>|</span>
          <span style={{ fontSize: 12, color: '#8BA3C7' }}>Pickup: Stand B-12</span>
        </div>
      </div>

      <div style={{ padding: '12px 16px 100px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
          Menu
        </div>
        {items.map(item => (
          <div key={item.id} style={{
            background: COLORS.white, borderRadius: 14, marginBottom: 10,
            display: 'flex', alignItems: 'center', overflow: 'hidden',
            boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              width: 72, height: 72, background: `linear-gradient(135deg, ${COLORS.navy}bb, ${COLORS.purple}88)`,
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>img</span>
            </div>
            <div style={{ flex: 1, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{item.name}</span>
                {item.tag && <Tag color={item.tagColor}>{item.tag}</Tag>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy }}>£{item.price.toFixed(2)}</div>
            </div>
            <button onClick={() => addToCart(item)} style={{
              width: 36, height: 36, borderRadius: 10, border: 'none',
              background: COLORS.navy, color: COLORS.white, fontSize: 20, fontWeight: 300,
              cursor: 'pointer', marginRight: 12, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}>+</button>
          </div>
        ))}
      </div>

      {/* Sticky cart */}
      {cartCount > 0 && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '12px 16px 20px',
          background: 'linear-gradient(to top, rgba(248,248,252,1) 70%, transparent)',
        }}>
          <button onClick={() => navigate('cart')} style={{
            width: '100%', background: COLORS.green, border: 'none', borderRadius: 14,
            padding: '15px 20px', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', cursor: 'pointer', boxShadow: `0 4px 20px ${COLORS.green}55`,
          }}>
            <span style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 99, padding: '2px 9px', fontSize: 13, fontWeight: 700, color: COLORS.white }}>
              {cartCount}
            </span>
            <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.white }}>View Cart</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.white }}>£{cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Screen 3: Cart & Checkout ───────────────────────────────────────────────

function CartScreen({ navigate, cart, setCart }) {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const fee = 0.99;

  const removeItem = (id) => setCart(prev => prev.filter(c => c.id !== id));

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: COLORS.offWhite, fontFamily: 'inherit' }}>
      <div style={{ background: COLORS.navy, padding: '16px 20px 22px' }}>
        <button onClick={() => navigate('menu')} style={{
          background: 'rgba(255,255,255,0.1)', border: 'none', color: COLORS.white,
          borderRadius: 8, padding: '5px 10px', fontSize: 12, cursor: 'pointer', marginBottom: 10,
        }}>← Back</button>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.white }}>Your Order</div>
        <div style={{ fontSize: 12, color: '#8BA3C7', marginTop: 3 }}>The Pit Grill · Stand B-12</div>
      </div>

      <div style={{ padding: '16px 16px 140px' }}>
        {/* Items */}
        <div style={{ background: COLORS.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', marginBottom: 12 }}>
          {cart.map((item, i) => (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', padding: '14px 16px',
              borderBottom: i < cart.length - 1 ? `1px solid ${COLORS.lightGray}` : 'none',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{item.qty}× {item.name}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginRight: 12 }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>
              <button onClick={() => removeItem(item.id)} style={{
                background: COLORS.lightGray, border: 'none', borderRadius: 6,
                width: 24, height: 24, cursor: 'pointer', fontSize: 14, color: COLORS.textMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>×</button>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>Subtotal</span>
            <span style={{ fontSize: 13, color: COLORS.text }}>£{total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${COLORS.lightGray}` }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>Service fee</span>
            <span style={{ fontSize: 13, color: COLORS.text }}>£{fee.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.text }}>Total</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.text }}>${(total + fee).toFixed(2)}</span>
          </div>
        </div>

        {/* Pickup location */}
        <div style={{
          background: COLORS.navy, borderRadius: 16, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `${COLORS.cyan}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 18 }}>📍</span>
          </div>
          <div>
            <div style={{ fontSize: 11, color: COLORS.gray, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pickup Location</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>Stand B-12, Gate 3 entrance</div>
          </div>
        </div>

        {/* Payment */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Payment</div>
          {['Apple Pay', 'Google Pay', 'Card on file •••• 4821'].map((method, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
              borderBottom: i < 2 ? `1px solid ${COLORS.lightGray}` : 'none',
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                border: `2px solid ${i === 0 ? COLORS.navy : COLORS.lightGray}`,
                background: i === 0 ? COLORS.navy : 'transparent',
              }} />
              <span style={{ fontSize: 14, color: COLORS.text, fontWeight: i === 0 ? 600 : 400 }}>{method}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 24px',
        background: 'linear-gradient(to top, rgba(248,248,252,1) 70%, transparent)',
      }}>
        <button onClick={() => navigate('status')} style={{
          width: '100%', background: COLORS.green, border: 'none', borderRadius: 14,
          padding: '17px', fontSize: 17, fontWeight: 800, color: COLORS.white,
          cursor: 'pointer', boxShadow: `0 6px 24px ${COLORS.green}55`,
          letterSpacing: '0.02em',
        }}>
          Place Order · ${(total + fee).toFixed(2)}
        </button>
      </div>
    </div>
  );
}

// ─── Screen 4: Order Status ──────────────────────────────────────────────────

function StatusScreen({ navigate }) {
  const [step, setStep] = React.useState(1);
  const steps = ['Order Received', 'Preparing', 'Ready for Pickup'];

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: COLORS.navy, fontFamily: 'inherit', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 11, color: COLORS.cyan, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
          <GlowDot color={COLORS.cyan} />Live Tracking
        </div>
      </div>

      {/* Big status */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', gap: 0 }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%', marginBottom: 28,
          background: step === 3 ? `${COLORS.green}22` : `${COLORS.neonPurple}22`,
          border: `2px solid ${step === 3 ? COLORS.green : COLORS.neonPurple}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 40px ${step === 3 ? COLORS.green : COLORS.neonPurple}44`,
          transition: 'all 0.5s',
        }}>
          <span style={{ fontSize: 42 }}>
            {step === 1 ? '🎫' : step === 2 ? '🔥' : '✅'}
          </span>
        </div>

        <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.white, textAlign: 'center', marginBottom: 8 }}>
          {step === 1 ? 'Order Confirmed' : step === 2 ? 'Preparing Your Order' : 'Ready for Pickup!'}
        </div>
        <div style={{ fontSize: 14, color: '#8BA3C7', textAlign: 'center', lineHeight: 1.5, maxWidth: 240 }}>
          {step === 3 ? 'Skip the line. Head to Stand B-12 now.' : 'Sit back and enjoy the music.'}
        </div>

        {/* Steps */}
        <div style={{ width: '100%', marginTop: 36 }}>
          {steps.map((s, i) => {
            const done = i + 1 < step;
            const active = i + 1 === step;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: i < 2 ? 0 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: done ? COLORS.green : active ? COLORS.neonPurple : 'rgba(255,255,255,0.1)',
                    border: `2px solid ${done ? COLORS.green : active ? COLORS.neonPurple : 'rgba(255,255,255,0.15)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: active ? `0 0 12px ${COLORS.neonPurple}88` : 'none',
                    transition: 'all 0.5s',
                  }}>
                    {done ? <span style={{ fontSize: 12, color: COLORS.white }}>✓</span> : (
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: active ? COLORS.white : 'transparent', display: 'block' }} />
                    )}
                  </div>
                  {i < 2 && <div style={{ width: 2, height: 28, background: done ? COLORS.green : 'rgba(255,255,255,0.1)', margin: '3px 0', transition: 'background 0.5s' }} />}
                </div>
                <div style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? COLORS.white : done ? '#6EE7B7' : '#4B5A7A', paddingBottom: i < 2 ? 24 : 0 }}>
                  {s}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated */}
      <div style={{ padding: '20px 20px 32px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 16,
          padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div>
            <div style={{ fontSize: 11, color: '#6B82A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Estimated</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.white }}>{step === 3 ? 'Now' : step === 2 ? '2 min' : '4 min'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#6B82A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Order #</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.cyan }}>SK-2847</div>
          </div>
        </div>
        {step === 3 && (
          <button onClick={() => navigate('pickup')} style={{
            width: '100%', marginTop: 12, background: COLORS.green, border: 'none',
            borderRadius: 14, padding: '16px', fontSize: 16, fontWeight: 800, color: COLORS.white,
            cursor: 'pointer', boxShadow: `0 6px 24px ${COLORS.green}55`,
          }}>
            Show Pickup Code →
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Screen 5: Pickup ────────────────────────────────────────────────────────

function PickupScreen({ navigate }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: COLORS.navy, fontFamily: 'inherit', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <GlowDot color={COLORS.green} />Ready
        </div>
        <div style={{ fontSize: 13, color: '#6B82A8' }}>Order #SK-2847</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', gap: 24 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.white, textAlign: 'center', lineHeight: 1.2 }}>
          Skip the line.<br />
          <span style={{ color: COLORS.green }}>It's ready.</span>
        </div>

        {/* QR Code */}
        <div style={{
          background: COLORS.white, borderRadius: 20, padding: 20,
          boxShadow: `0 0 60px ${COLORS.green}33`,
        }}>
          {/* QR placeholder */}
          <div style={{ width: 160, height: 160, background: '#F0F0F0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Fake QR pattern */}
            {[...Array(6)].map((_, row) => (
              [...Array(6)].map((_, col) => (
                <div key={`${row}-${col}`} style={{
                  position: 'absolute',
                  width: 20, height: 20,
                  top: 10 + row * 24, left: 10 + col * 24,
                  background: (row + col) % 2 === 0 || (row === 0 && col < 3) || (row < 3 && col === 0) ? COLORS.navy : 'transparent',
                  borderRadius: 2,
                }} />
              ))
            ))}
            <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#999', zIndex: 1 }}>QR CODE</span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: COLORS.cyan, letterSpacing: '0.12em', fontVariantNumeric: 'tabular-nums' }}>
            SK-2847
          </div>
          <div style={{ fontSize: 13, color: '#6B82A8', marginTop: 4 }}>Show this to staff</div>
        </div>

        {/* Pickup details */}
        <div style={{
          width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ flex: 1, padding: '14px 16px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 10, color: '#6B82A8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Vendor</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>The Pit Grill</div>
            </div>
            <div style={{ flex: 1, padding: '14px 16px' }}>
              <div style={{ fontSize: 10, color: '#6B82A8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Stand</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>B-12, Gate 3</div>
            </div>
          </div>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📍</span>
            <div style={{ fontSize: 13, color: '#8BA3C7' }}>Turn left at main stage, follow SKIIP signs</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 32px' }}>
        <button onClick={() => navigate('home')} style={{
          width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14, padding: '14px', fontSize: 14, fontWeight: 600, color: COLORS.white,
          cursor: 'pointer',
        }}>
          Order Again
        </button>
      </div>
    </div>
  );
}

// ─── Bottom Nav ──────────────────────────────────────────────────────────────

function BottomNav({ active, navigate }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'menu', icon: '🍽️', label: 'Order' },
    { id: 'status', icon: '📦', label: 'Orders' },
    { id: 'pickup', icon: '👤', label: 'Profile' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: COLORS.white, borderTop: `1px solid ${COLORS.lightGray}`,
      display: 'flex', padding: '8px 0 12px',
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => navigate(t.id)} style={{
          flex: 1, background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          padding: '4px 0',
        }}>
          <span style={{ fontSize: 18 }}>{t.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: active === t.id ? COLORS.navy : COLORS.gray }}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

function AttendeeApp() {
  const [screen, setScreen] = React.useState('home');
  const [cart, setCart] = React.useState([
    { id: 1, name: 'Double Smash Burger', price: 14.50, qty: 1 },
  ]);

  const screenMap = {
    home: <HomeScreen navigate={setScreen} />,
    menu: <MenuScreen navigate={setScreen} cart={cart} setCart={setCart} />,
    cart: <CartScreen navigate={setScreen} cart={cart} setCart={setCart} />,
    status: <StatusScreen navigate={setScreen} />,
    pickup: <PickupScreen navigate={setScreen} />,
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
      {screenMap[screen] || screenMap['home']}
    </div>
  );
}

Object.assign(window, { AttendeeApp });
