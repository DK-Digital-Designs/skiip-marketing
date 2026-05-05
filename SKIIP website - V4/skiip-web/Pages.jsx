
// ── How It Works, Experience, Vendors, Organisers ─────────────────────────────

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorksPage({ setPage }) {
  const navigate = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const steps = [
    {
      num: '01', icon: '🗺️', title: 'Browse Vendors at Your Event',
      body: 'Open SKIIP on any device — no app download needed. See every food and drink vendor at the event, with live wait times, ratings, and full menus.',
      detail: ['Organised by category: Food, Drinks, Merch', 'Live wait time indicators', 'Search by name or cuisine', 'Vendor ratings and popular items'],
      color: C.accent,
    },
    {
      num: '02', icon: '🛒', title: 'Order & Pay Through the Web App',
      body: 'Choose your items, customise if needed, and checkout in seconds. No account required — pay with Apple Pay, Google Pay, or any card.',
      detail: ['One-tap Apple Pay & Google Pay', 'No account needed to order', 'Secure in-app payment', 'Instant order confirmation'],
      color: C.cyan,
    },
    {
      num: '03', icon: '🔔', title: 'Get Notified When Ready',
      body: "Real-time order status updates on-screen. You'll get a push notification the moment your order is ready — no checking, no refreshing.",
      detail: ['Live preparation tracker', 'Push or on-screen notification', 'Estimated time shown upfront', 'Order number for fast handoff'],
      color: C.green,
    },
    {
      num: '04', icon: '🎉', title: 'Collect From the Vendor — Skip the Line',
      body: "Walk straight to the dedicated SKIIP collection point, show your order code or QR, and you're done. Back to the music in under 60 seconds.",
      detail: ['Dedicated SKIIP collection points', 'Show QR code or order number', 'Fast, no-queue collection', 'Zero friction handoff'],
      color: C.accent,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: C.bgAlt, padding: '120px 32px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn><Eyebrow>How It Works</Eyebrow></FadeIn>
          <FadeIn delay={0.1}><H2>From hungry to collected<br />in under two minutes</H2></FadeIn>
          <FadeIn delay={0.2}><Lead style={{ margin: '0 auto' }}>No apps. No accounts. No drama. Here's exactly how it works.</Lead></FadeIn>
        </div>
      </section>

      {/* Steps */}
      <Section>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={0.1}>
              <div style={{
                display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, marginBottom: 64,
                paddingBottom: 64, borderBottom: i < steps.length - 1 ? `1px solid ${C.border}` : 'none',
              }}>
                {/* Step number + connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: s.color + '15', border: `2px solid ${s.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, flexShrink: 0,
                  }}>{s.icon}</div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 40, background: `linear-gradient(to bottom, ${s.color}33, transparent)`, marginTop: 8 }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ paddingTop: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: s.color, letterSpacing: '0.1em' }}>{s.num}</span>
                    <H3 style={{ margin: 0 }}>{s.title}</H3>
                  </div>
                  <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.7, marginBottom: 20 }}>{s.body}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {s.detail.map((d, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: C.textMuted }}>
                        <span style={{ color: s.color, fontWeight: 700, flexShrink: 0 }}>✓</span> {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section alt style={{ textAlign: 'center' }}>
        <FadeIn>
          <H2>Ready to dodge the queue?</H2>
          <Lead style={{ margin: '0 auto 32px' }}>No app. No account. Just open, order, and get back to the good part.</Lead>
          <Btn variant="primary" size="lg" onClick={() => navigate('getstarted')}>Skip it →</Btn>
        </FadeIn>
      </Section>
    </div>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function ExperiencePage({ setPage }) {
  const navigate = (id) => { setPage(id); window.scrollTo({ top: 0 }); };

  return (
    <div>
      {/* ── Opening hero ── */}
      <section style={{
        background: C.navy, paddingTop: 140, paddingBottom: 0,
        paddingLeft: 32, paddingRight: 32,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 600, height: 600, borderRadius: '50%', background: C.accent, opacity: 0.05, filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: C.cyan, opacity: 0.04, filter: 'blur(80px)', pointerEvents: 'none' }} />

        {/* Hero text */}
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', paddingBottom: 120 }}>
          <FadeIn>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 28 }}>Our Story</p>
            <h1 style={{ fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 36 }}>
              You were there.<br />
              <span style={{ color: C.accent }}>But you missed it.</span>
            </h1>
            <p style={{ fontSize: 19, color: '#8BA3C7', lineHeight: 1.75, maxWidth: 560, margin: '0 auto' }}>
              We built SKIIP after standing in too many queues, missing too many moments, and asking ourselves — why does this still happen?
            </p>
          </FadeIn>
        </div>

        {/* Gradient fade from navy to white */}
        <div style={{
          position: 'relative', height: 160, marginLeft: -32, marginRight: -32,
          background: `linear-gradient(to bottom, ${C.navy} 0%, #FAFAF8 100%)`,
        }} />
      </section>

      {/* ── Founder story ── */}
      <section style={{ background: C.bg, padding: '0 32px 96px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <FadeIn>
            {/* Accent bar + eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <div style={{ width: 3, height: 40, background: C.accent, borderRadius: 99, flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Where it started</span>
            </div>

            {/* Bridge line */}
            <p style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: C.navy, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 40 }}>
              So did we.
            </p>

            {/* Story lines — displayed as punchy separated statements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: C.navy, lineHeight: 1.5 }}>
                We've been to hundreds of events.<br />
                <span style={{ color: C.textMuted, fontWeight: 400 }}>We spent too many of them in queues.</span>
              </p>

              <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.8 }}>
                SKIIP was built by event-goers — not from a report, but from experience.
              </p>

              <div style={{ borderLeft: `3px solid ${C.lightBorder || C.border}`, paddingLeft: 20 }}>
                <p style={{ fontSize: 17, fontWeight: 600, color: C.navy, lineHeight: 1.6 }}>
                  45-minute waits. Missed songs.<br />Moments you don't get back.
                </p>
              </div>

              <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.8 }}>
                After enough of it, we stopped asking if it could be fixed —<br />
                <span style={{ fontWeight: 700, color: C.navy }}>and started building it.</span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>



      {/* ── Why it hasn't been fixed ── */}
      <Section style={{ background: C.bg }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <FadeIn>
            <Eyebrow color={C.accent}>The insight</Eyebrow>
            <H2>It was never a hard problem.<br />It just needed someone to care enough.</H2>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.85, marginBottom: 20 }}>
              The queue exists because there was no alternative. No system designed specifically for event environments, built for the moment someone is thirsty and the headline act is about to come on. No option that works on a £50 phone with patchy signal, in the dark, with 60,000 people around you.
            </p>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.85, marginBottom: 20 }}>
              Every component already existed. Smartphones. Digital payments. Real-time notifications. What was missing was a thin, frictionless layer connecting them — designed not for ideal conditions, but for real ones.
            </p>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.85 }}>
              That's SKIIP. Not an app to download. Not a system to learn. A web-based link you open, an order you place in under a minute, and a notification that brings you back to collect when it's ready.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── Mission + Vision ── */}
      <Section dark style={{ background: C.navy }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <FadeIn>
            <div style={{ padding: '36px', background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', height: '100%' }}>
              <Eyebrow color={C.accent}>Our mission</Eyebrow>
              <H2 style={{ color: '#fff', fontSize: 30 }}>Give people back the moments they paid for.</H2>
              <p style={{ color: '#8BA3C7', lineHeight: 1.8, fontSize: 16 }}>
                Every missed goal, every song heard from a concourse, every parent who turned back too late — that's a failure the event industry has accepted for too long. We haven't.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ padding: '36px', background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', height: '100%' }}>
              <Eyebrow color={C.cyan}>Our vision</Eyebrow>
              <H2 style={{ color: '#fff', fontSize: 30 }}>A world where no one misses the moment.</H2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                {[
                  'No more 45-minute queues',
                  'Parents present on the sideline',
                  'Fans in their seats for kick-off',
                  'Every moment, uninterrupted',
                ].map((v, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#C4D2EC', fontSize: 15 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.cyan, boxShadow: `0 0 6px ${C.cyan}`, flexShrink: 0 }} />
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── Closing ── */}
      <Section style={{ textAlign: 'center', padding: '120px 32px' }}>
        <FadeIn>
          <p style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: C.navy, lineHeight: 1.2, maxWidth: 620, margin: '0 auto 20px', letterSpacing: '-0.025em' }}>
            "Let people enjoy the event."
          </p>
          <p style={{ fontSize: 17, color: C.textMuted, maxWidth: 460, margin: '0 auto 40px', lineHeight: 1.7 }}>
            That's the whole brief. Not a product vision. Not a growth strategy. Just a simple belief that people deserve to be present at the things they love.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn variant="primary" size="lg" onClick={() => navigate('getstarted')}>Join SKIIP</Btn>
            <Btn variant="outline" size="lg" onClick={() => navigate('how')}>See How It Works</Btn>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

// ── Vendors ───────────────────────────────────────────────────────────────────
function VendorsPage({ setPage }) {
  const navigate = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  return (
    <div>
      <section style={{ background: C.bgAlt, padding: '120px 32px 80px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <FadeIn><Chip color={C.green}>For Vendors</Chip></FadeIn>
            <FadeIn delay={0.1}><H2 style={{ marginTop: 16 }}>Serve more customers.<br /><span style={{ color: C.green }}>Without the chaos.</span></H2></FadeIn>
            <FadeIn delay={0.2}><Lead>SKIIP gives your stall a digital ordering lane — so customers order ahead, you fulfil on time, and everyone moves faster.</Lead></FadeIn>
            <FadeIn delay={0.3}><div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <Btn variant="primary" size="lg" onClick={() => navigate('getstarted')}>Become a Vendor Partner</Btn>
            </div></FadeIn>
          </div>
          <FadeIn delay={0.2} dir="left">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: '📈', val: '+40%', label: 'Revenue increase' },
                { icon: '⚡', val: '2×', label: 'Faster throughput' },
                { icon: '😌', val: '0', label: 'Queue chaos' },
                { icon: '💳', val: '100%', label: 'Digital payments' },
              ].map((s, i) => (
                <Card key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: C.green, letterSpacing: '-0.02em' }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{s.label}</div>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Section>
        <FadeIn><div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Eyebrow color={C.green}>Benefits</Eyebrow>
          <H2>Why vendors choose SKIIP</H2>
          <Lead style={{ margin: '4px auto 0' }}>Food runs shouldn't feel like side quests — for your customers, or your team.</Lead>
        </div></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: '💰', title: 'Increase Revenue', body: 'Pre-orders mean more orders processed per hour. Customers who might have given up in a queue become paying customers.' },
            { icon: '⚙️', title: 'Faster Service', body: 'Your team focuses on fulfilment, not taking orders. Dedicated SKIIP collection points keep lines moving.' },
            { icon: '📊', title: 'Handle Peak Demand', body: 'Order flow is spread more evenly across the event. No more crushing demand spikes at set breaks.' },
            { icon: '📱', title: 'No Hardware Needed', body: 'SKIIP runs in a browser on any tablet or device you already have. No expensive POS equipment required.' },
            { icon: '🔔', title: 'Simple Dashboard', body: "A clean, real-time order feed. Accept, prepare, mark ready — three taps, that's your whole workflow." },
            { icon: '🤝', title: 'Dedicated Support', body: 'Our vendor success team is on call during every event to handle any issues before they become problems.' },
          ].map((b, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <Card style={{ height: '100%' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{b.icon}</div>
                <H3>{b.title}</H3>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>{b.body}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* How onboarding works */}
      <Section alt>
        <FadeIn><div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <Eyebrow color={C.green}>Onboarding</Eyebrow>
          <H2>Up and running in 24 hours</H2>
          <Lead style={{ margin: '0 auto' }}>No lengthy setup. No hardware. No learning curve. Just a better way to sell.</Lead>
        </div></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 900, margin: '0 auto' }}>
          {['Apply online', 'Upload your menu', 'Attend a 20-min briefing', 'Go live at your event'].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.green + '15', border: `2px solid ${C.green}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 16, fontWeight: 800, color: C.green }}>0{i + 1}</div>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.5 }}>{s}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section style={{ textAlign: 'center' }}>
        <FadeIn>
          <H2>Ready to serve smarter?</H2>
          <Lead style={{ margin: '0 auto 32px' }}>Join our growing network of event vendors. Application takes 5 minutes.</Lead>
          <Btn variant="primary" size="lg" onClick={() => navigate('getstarted')}>Become a Vendor Partner →</Btn>
        </FadeIn>
      </Section>
    </div>
  );
}

// ── Organisers ────────────────────────────────────────────────────────────────
function OrganisersPage({ setPage }) {
  const navigate = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  return (
    <div>
      <section style={{ background: C.navy, padding: '120px 32px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: C.cyan, opacity: 0.05, filter: 'blur(80px)' }} />
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <FadeIn><Chip color={C.cyan}>For Organisers</Chip></FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ ...T.h1, color: '#fff', margin: '20px 0 24px', maxWidth: 700 }}>
              Better events start with<br /><span style={{ color: C.cyan }}>better flow.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ ...T.body, color: '#8BA3C7', maxWidth: 520, marginBottom: 36 }}>
              SKIIP gives you a modern ordering layer that keeps crowds moving, keeps attendees happy, and gives you data to make every event better than the last.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}><Btn variant="primary" size="lg" onClick={() => navigate('getstarted')}>Partner with Us</Btn></FadeIn>
        </div>
      </section>

      <Section>
        <FadeIn><div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Eyebrow color={C.cyan}>Operational Benefits</Eyebrow>
          <H2>Infrastructure that works as hard as you do</H2>
        </div></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {[
            { icon: '🌊', title: 'Improve Crowd Flow', body: 'By spreading ordering across the event timeline instead of concentrating it at break times, SKIIP reduces physical queue build-up by up to 60%.' },
            { icon: '😊', title: 'Enhance Attendee Experience', body: 'Attendees who can order easily spend more, stay longer, and rate events higher. SKIIP directly improves your NPS scores.' },
            { icon: '📉', title: 'Reduce Congestion', body: 'Dedicated collection points separate browsers from collectors. Vendor stalls become more efficient and less chaotic.' },
            { icon: '📊', title: 'Access Event Insights', body: 'See real-time ordering data, peak demand windows, popular vendors, and revenue trends — all in your organiser dashboard.' },
          ].map((b, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Card style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>{b.icon}</div>
                <div>
                  <H3 style={{ marginBottom: 8 }}>{b.title}</H3>
                  <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>{b.body}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section alt style={{ textAlign: 'center' }}>
        <FadeIn>
          <H2>Let's build better events, together.</H2>
          <Lead style={{ margin: '0 auto 32px' }}>SKIIP plugs straight into your existing event setup. Say hello — let's talk.</Lead>
          <Btn variant="primary" size="lg" onClick={() => navigate('getstarted')}>Let's Talk →</Btn>
        </FadeIn>
      </Section>
    </div>
  );
}

Object.assign(window, { HowItWorksPage, ExperiencePage, VendorsPage, OrganisersPage });
