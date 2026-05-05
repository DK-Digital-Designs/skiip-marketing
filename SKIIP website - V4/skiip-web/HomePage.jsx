
// ── Home Page ─────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  // Cycle phone screens in hero
  const [phoneScreen, setPhoneScreen] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setPhoneScreen(s => (s + 1) % 3), 2800);
    return () => clearInterval(t);
  }, []);

  const navigate = (id) => { setPage(id); window.scrollTo({ top: 0 }); };

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${C.accent}08 0%, transparent 70%), ${C.bg}`,
        padding: '120px 32px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background shapes */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.cyan}0a 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '8%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${C.accent}0a 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <FadeIn delay={0}>
              <Chip color={C.green}>The queue is not the main event.</Chip>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{
                fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 900,
                color: C.navy, lineHeight: 1.05, letterSpacing: '-0.03em',
                margin: '20px 0 24px',
              }}>
                Skip the queues.<br />
                <span style={{ color: C.accent }}>Order instantly</span><br />
                at events.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ ...T.body, marginBottom: 36, maxWidth: 460 }}>
                Browse vendors, order food &amp; drinks from your spot, pay in seconds — and collect when it's ready. No queuing. No missing the moment.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Btn variant="primary" size="lg" onClick={() => navigate('getstarted')}>Skip the Queue →</Btn>
                <Btn variant="outline" size="lg" onClick={() => navigate('vendors')}>Sell at Events</Btn>
              </div>
            </FadeIn>

          </div>

          {/* Right — phone + floating cards */}
          <FadeIn delay={0.2} dir="left" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', height: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Glow behind phone */}
              <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: `${C.accent}`, opacity: 0.08, filter: 'blur(50px)' }} />
              <PhoneMockup screen={phoneScreen} scale={1.3} />

              {/* Floating card 1 */}
              <FloatingCard style={{ top: 20, left: -60 }} delay={0.5}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `${C.green}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✅</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>Order Ready</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>Stand B-12</div>
                  </div>
                </div>
              </FloatingCard>

              {/* Floating card 2 */}
              <FloatingCard style={{ bottom: 60, right: -50 }} delay={0.7}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `${C.cyan}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>2 min wait</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>Neon Sips</div>
                  </div>
                </div>
              </FloatingCard>

              {/* Floating card 3 */}
              <FloatingCard style={{ bottom: 160, left: -70 }} delay={0.9}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `${C.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💳</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>Paid via Apple Pay</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>£24.50</div>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works Preview ── */}
      <Section alt>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Eyebrow>How It Works</Eyebrow>
            <H2>Four steps. Less than two minutes.</H2>
            <Lead style={{ margin: '0 auto' }}>From hungry to hand-in-order — before the next song starts.</Lead>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative' }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: 32, left: '12.5%', right: '12.5%', height: 1, background: `linear-gradient(to right, transparent, ${C.border} 20%, ${C.border} 80%, transparent)`, zIndex: 0 }} />
          {[
            { step: '01', icon: '🗺️', title: 'Browse Vendors', desc: 'See every vendor at your event with live wait times and menus.' },
            { step: '02', icon: '📱', title: 'Order & Pay', desc: 'Add items, checkout with Apple Pay or card — one tap.' },
            { step: '03', icon: '🔔', title: 'Get Notified', desc: 'Push notification the moment your order is ready.' },
            { step: '04', icon: '🎉', title: 'Collect & Enjoy', desc: 'Skip the queue, collect from the vendor, get back to the show.' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: C.white, border: `2px solid ${C.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, margin: '0 auto 16px',
                  boxShadow: '0 4px 20px rgba(11,15,47,0.06)',
                }}>{s.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: '0.06em', marginBottom: 8 }}>{s.step}</div>
                <H3 style={{ fontSize: 16, marginBottom: 8 }}>{s.title}</H3>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Btn variant="ghost" onClick={() => navigate('how')}>See full walkthrough →</Btn>
          </div>
        </FadeIn>
      </Section>

      {/* ── Value Proposition ── */}
      <Section>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Eyebrow color={C.cyan}>Built for everyone</Eyebrow>
            <H2>SKIIP works for the whole crew.</H2>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            {
              icon: '🎶', label: 'Attendees', color: C.accent,
              headline: 'Stay in the moment',
              points: ['Zero queue time', 'Order from your spot', 'Real-time order tracking', 'Instant pickup notification'],
              cta: 'Get Started', action: 'getstarted',
            },
            {
              icon: '🍔', label: 'Vendors', color: C.green,
              headline: 'Serve more, stress less',
              points: ['More orders, faster throughput', 'Reduce front-of-queue congestion', 'Handle peak demand confidently', 'Simple fulfilment dashboard'],
              cta: 'Become a Partner', action: 'vendors',
            },
            {
              icon: '🏟️', label: 'Organisers', color: C.cyan,
              headline: 'Better events for everyone',
              points: ['Reduce crowd congestion', 'Improve attendee satisfaction', 'Data & insights on demand', 'Easy vendor onboarding'],
              cta: 'Partner With Us', action: 'organisers',
            },
          ].map((v, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: v.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{v.icon}</div>
                  <Chip color={v.color}>{v.label}</Chip>
                </div>
                <H3>{v.headline}</H3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 28px', flex: 1 }}>
                  {v.points.map((p, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10, fontSize: 14, color: C.textMuted, lineHeight: 1.5 }}>
                      <span style={{ color: v.color, marginTop: 1, fontWeight: 700, flexShrink: 0 }}>✓</span> {p}
                    </li>
                  ))}
                </ul>
                <Btn variant={i === 0 ? 'primary' : i === 1 ? 'dark' : 'outline'} size="sm" onClick={() => navigate(v.action)}>{v.cta} →</Btn>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Product visual ── */}
      <Section dark style={{ background: C.navy, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <FadeIn>
            <Eyebrow color={C.accent}>The product</Eyebrow>
            <H2 style={{ color: '#fff' }}>Designed for<br /><span style={{ color: C.accent }}>real conditions.</span></H2>
            <p style={{ ...T.body, color: '#8BA3C7', marginBottom: 32 }}>
              Built for noisy, crowded, low-light environments. Big tap targets, high contrast, minimal steps — because when the headline act comes on, nobody wants to fight with an app.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                [C.accent, 'Mobile-first, no app download required'],
                [C.cyan,   'Works in low signal environments'],
                [C.green,  'One-tap secure checkout with Apple & Google Pay'],
              ].map(([col, txt], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#C4D2EC' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: col, boxShadow: `0 0 8px ${col}`, flexShrink: 0 }} />
                  {txt}
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2} dir="left" style={{ display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'flex-end' }}>
            <PhoneMockup screen={0} scale={1.2} />
            <PhoneMockup screen={2} scale={1.0} />
          </FadeIn>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section style={{ textAlign: 'center', padding: '120px 32px' }}>
        <FadeIn>
          <div style={{
            background: `linear-gradient(135deg, ${C.accent}12 0%, ${C.cyan}08 100%)`,
            border: `1px solid ${C.accent}22`, borderRadius: 28,
            padding: '72px 48px', maxWidth: 640, margin: '0 auto',
          }}>
            <Eyebrow>Ready?</Eyebrow>
            <H2>Less waiting. More living.</H2>
            <Lead style={{ margin: '0 auto 36px' }}>
              Free for attendees. No app to download. Just open, order, and get back to the good stuff.
            </Lead>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn variant="primary" size="lg" onClick={() => navigate('getstarted')}>Queue dodged. Let's go →</Btn>
              <Btn variant="outline" size="lg" onClick={() => navigate('experience')}>Our Story</Btn>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

function FloatingCard({ children, style = {}, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      position: 'absolute',
      background: C.white, borderRadius: 14, padding: '10px 14px',
      boxShadow: '0 8px 32px rgba(11,15,47,0.12)',
      border: `1px solid ${C.border}`,
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(12px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      whiteSpace: 'nowrap', fontFamily: 'Space Grotesk, sans-serif',
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, { HomePage });
