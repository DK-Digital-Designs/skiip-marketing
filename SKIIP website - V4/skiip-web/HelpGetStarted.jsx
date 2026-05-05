
// ── Help & Get Started ────────────────────────────────────────────────────────

// ── Help Page ─────────────────────────────────────────────────────────────────
function HelpPage() {
  const [category, setCategory] = React.useState('general');
  const [submitted, setSubmitted] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });

  const categories = [
    { id: 'general', label: 'General Enquiry', icon: '💬' },
    { id: 'refund',  label: 'Refund Request',  icon: '↩️' },
    { id: 'tech',    label: 'Technical Issue',  icon: '🔧' },
    { id: 'vendor',  label: 'Vendor Support',   icon: '🍔' },
  ];

  const faqs = [
    { q: 'Do I need to download an app?', a: 'No. SKIIP runs entirely in your mobile browser. Just open the link and start ordering — no download, no account required.' },
    { q: 'How do I collect my order?', a: 'Once your order is ready, you\'ll receive a notification. Head to the vendor\'s dedicated SKIIP collection point and show your QR code or order number.' },
    { q: 'What payment methods are accepted?', a: 'Apple Pay, Google Pay, and all major credit/debit cards are accepted. Payments are processed securely in-app.' },
    { q: 'Can I get a refund if I change my mind?', a: 'Once an order is accepted by the vendor it enters preparation. Refunds are available for orders not yet accepted. Use the refund form on this page.' },
    { q: 'I placed an order but the vendor is closed. What happens?', a: 'If a vendor closes after your order is placed, you will receive a full automatic refund to your original payment method within 3–5 business days.' },
    { q: 'How do I become a vendor on SKIIP?', a: 'Head to our Vendors page and click "Become a Vendor Partner". The application takes around 5 minutes and our team will be in touch within 24 hours.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section style={{ background: C.bgAlt, padding: '120px 32px 64px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn><Eyebrow>Help & Support</Eyebrow></FadeIn>
          <FadeIn delay={0.1}><H2>How can we help?</H2></FadeIn>
          <FadeIn delay={0.2}><Lead style={{ margin: '0 auto' }}>Fill in the form below or browse the FAQ. We aim to respond within 4 hours during event days.</Lead></FadeIn>
        </div>
      </section>

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 960, margin: '0 auto' }}>
          {/* Contact form */}
          <FadeIn>
            <div>
              <H3 style={{ marginBottom: 24 }}>Send us a message</H3>
              {submitted ? (
                <div style={{
                  background: C.green + '12', border: `1px solid ${C.green}33`,
                  borderRadius: 16, padding: '32px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
                  <H3 style={{ color: C.green }}>You're in the queue — just kidding.</H3>
                  <p style={{ ...T.sm }}>Message sent. We'll get back to you at <strong>{form.email}</strong> within 4 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }} style={{
                    marginTop: 20, background: 'none', border: 'none', color: C.accent,
                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  }}>Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Category select */}
                  <div>
                    <label style={labelStyle}>Category</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {categories.map(cat => (
                        <button key={cat.id} type="button" onClick={() => setCategory(cat.id)} style={{
                          padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                          border: `1.5px solid ${category === cat.id ? C.accent : C.border}`,
                          background: category === cat.id ? C.accent + '10' : C.white,
                          color: category === cat.id ? C.accent : C.textMuted,
                          fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}>
                          <span>{cat.icon}</span> {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Alex Thompson" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email address</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="alex@example.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Describe your issue or question…" rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }} />
                  </div>
                  <Btn variant="primary" size="md" style={{ alignSelf: 'flex-start' }}>Send Message</Btn>
                </form>
              )}
            </div>
          </FadeIn>

          {/* FAQ */}
          <FadeIn delay={0.15}>
            <div>
              <H3 style={{ marginBottom: 24 }}>Frequently asked questions</H3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{
                    background: C.white, borderRadius: 14, border: `1px solid ${openFaq === i ? C.accent + '44' : C.border}`,
                    overflow: 'hidden', transition: 'border-color 0.15s',
                  }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                      width: '100%', padding: '14px 18px', background: 'none', border: 'none',
                      cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      gap: 12, fontFamily: 'Space Grotesk, sans-serif',
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.navy, textAlign: 'left' }}>{faq.q}</span>
                      <span style={{ color: C.textMuted, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, fontSize: 18 }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: '0 18px 16px', fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 700,
  color: C.navy, marginBottom: 6, fontFamily: 'Space Grotesk, sans-serif',
};
const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: `1.5px solid ${C.border}`, background: C.white,
  fontSize: 14, color: C.navy, fontFamily: 'Space Grotesk, sans-serif',
  outline: 'none', transition: 'border-color 0.15s',
};

// ── Get Started ───────────────────────────────────────────────────────────────
function GetStartedPage({ setPage }) {
  const navigate = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const [selected, setSelected] = React.useState(null);

  const roles = [
    {
      id: 'attendee', icon: '🎶', label: 'Attendee',
      headline: 'Order at your next event',
      desc: 'No account needed. Open SKIIP at your event, browse vendors, and order.',
      steps: ['Look for SKIIP at your event', 'Scan the QR code or visit the link', 'Browse, order, and collect'],
      cta: 'Find Events',
      color: C.accent,
    },
    {
      id: 'vendor', icon: '🍔', label: 'Vendor',
      headline: 'Become a vendor partner',
      desc: 'Sell more, serve faster. Apply in 5 minutes and go live at your next event.',
      steps: ['Submit a quick application', 'Upload your menu', 'Attend a 20-min briefing', 'Go live'],
      cta: 'Apply Now',
      color: C.green,
    },
    {
      id: 'organiser', icon: '🏟️', label: 'Organiser',
      headline: 'Add SKIIP to your event',
      desc: 'Improve flow, delight attendees, and unlock event ordering data.',
      steps: ['Book an intro call', 'We handle vendor onboarding', 'SKIIP is live for your event'],
      cta: 'Book a Call',
      color: C.cyan,
    },
  ];

  return (
    <div>
      <section style={{ background: C.bgAlt, padding: '120px 32px 64px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn><Eyebrow>Get Started</Eyebrow></FadeIn>
          <FadeIn delay={0.1}><H2>Pick your lane.</H2></FadeIn>
          <FadeIn delay={0.2}><Lead style={{ margin: '0 auto' }}>Choose your role and we'll show you exactly what comes next.</Lead></FadeIn>
        </div>
      </section>

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 960, margin: '0 auto 56px' }}>
          {roles.map((r, i) => (
            <FadeIn key={r.id} delay={i * 0.1}>
              <div
                onClick={() => setSelected(selected === r.id ? null : r.id)}
                style={{
                  background: C.white, borderRadius: 20, padding: '28px 24px',
                  border: `2px solid ${selected === r.id ? r.color : C.border}`,
                  cursor: 'pointer',
                  boxShadow: selected === r.id ? `0 12px 40px ${r.color}22` : '0 2px 16px rgba(11,15,47,0.05)',
                  transform: selected === r.id ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: r.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{r.icon}</div>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${selected === r.id ? r.color : C.border}`, background: selected === r.id ? r.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                    {selected === r.id && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
                  </div>
                </div>
                <Chip color={r.color}>{r.label}</Chip>
                <H3 style={{ marginTop: 10 }}>{r.headline}</H3>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, marginBottom: 20 }}>{r.desc}</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Next Steps</div>
                  {r.steps.map((s, j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: C.textMuted }}>
                      <span style={{ color: r.color, fontWeight: 800, flexShrink: 0 }}>0{j + 1}</span> {s}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {selected && (
          <FadeIn>
            <div style={{ textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
              {(() => {
                const r = roles.find(x => x.id === selected);
                return (
                  <>
                    <H3>Ready to go as a{selected === 'attendee' ? 'n' : ''} {r.label.toLowerCase()}?</H3>
                    <p style={{ fontSize: 15, color: C.textMuted, marginBottom: 24 }}>{r.desc}</p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                      <Btn variant="primary" size="lg" onClick={() => r.id === 'vendor' ? navigate('vendor-apply') : navigate('help')}>{r.cta}</Btn>
                      <Btn variant="outline" size="lg" onClick={() => navigate('how')}>Learn more</Btn>
                    </div>
                  </>
                );
              })()}
            </div>
          </FadeIn>
        )}

        {!selected && (
          <div style={{ textAlign: 'center', color: C.textMuted, fontSize: 15 }}>
            ↑ Select your role above to continue
          </div>
        )}
      </Section>
    </div>
  );
}

// ── Vendor Apply Page ─────────────────────────────────────────────────────────
function VendorApplyPage({ setPage }) {
  const navigate = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const [submitted, setSubmitted] = React.useState(false);
  const [workedAtEvents, setWorkedAtEvents] = React.useState(null);
  const [form, setForm] = React.useState({
    businessName: '', vendorType: '', whatYouSell: '',
    yourName: '', email: '', phone: '',
    whichEvents: '', instagram: '',
  });
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section style={{ background: C.bgAlt, padding: '120px 32px 64px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <button onClick={() => navigate('getstarted')} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, color: C.textMuted, marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto 24px',
              fontFamily: 'inherit',
            }}>← Back to Get Started</button>
            <Chip color={C.green}>Vendor Application</Chip>
            <H2 style={{ marginTop: 16 }}>Let's get you on the bill.</H2>
            <Lead style={{ margin: '0 auto' }}>5 minutes to apply. 24 hours to hear back. Job done.</Lead>
          </FadeIn>
        </div>
      </section>

      <Section>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {submitted ? (
            <FadeIn>
              <div style={{
                background: C.green + '10', border: `1px solid ${C.green}33`,
                borderRadius: 20, padding: '48px 40px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <H2 style={{ color: C.green, marginBottom: 12 }}>You're in. We're cooking. 🔥</H2>
                <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.75, maxWidth: 420, margin: '0 auto 28px' }}>
                  Nice one, <strong>{form.yourName || form.businessName}</strong>. Application received — we'll be in touch at <strong>{form.email}</strong> within 24 hours.
                </p>
                <Btn variant="primary" onClick={() => navigate('home')}>Back to Home</Btn>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Business details */}
                <div style={{ background: C.white, borderRadius: 18, padding: '28px', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: `1px solid ${C.border}`, paddingBottom: 14, marginBottom: 2 }}>
                    Your Business
                  </div>

                  <div>
                    <label style={labelStyle}>Business Name <span style={{ color: C.green }}>*</span></label>
                    <input required value={form.businessName} onChange={set('businessName')} placeholder="e.g. The Pit Grill" style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Vendor Type <span style={{ color: C.green }}>*</span></label>
                    <select required value={form.vendorType} onChange={set('vendorType')} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235A6480' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36, color: form.vendorType ? C.navy : '#aaa' }}>
                      <option value="" disabled>Select a category…</option>
                      <option value="food">Food</option>
                      <option value="drinks">Drinks</option>
                      <option value="merchandise">Merchandise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>What do you sell? <span style={{ color: C.green }}>*</span></label>
                    <input required value={form.whatYouSell} onChange={set('whatYouSell')} placeholder="e.g. Burgers, loaded fries, hot dogs" style={inputStyle} />
                  </div>
                </div>

                {/* Contact details */}
                <div style={{ background: C.white, borderRadius: 18, padding: '28px', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: `1px solid ${C.border}`, paddingBottom: 14, marginBottom: 2 }}>
                    Your Details
                  </div>

                  <div>
                    <label style={labelStyle}>Your Name <span style={{ color: C.green }}>*</span></label>
                    <input required value={form.yourName} onChange={set('yourName')} placeholder="First and last name" style={inputStyle} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Email Address <span style={{ color: C.green }}>*</span></label>
                      <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number <span style={{ color: C.green }}>*</span></label>
                      <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="+44 7700 000000" style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* Event experience */}
                <div style={{ background: C.white, borderRadius: 18, padding: '28px', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: `1px solid ${C.border}`, paddingBottom: 14, marginBottom: 2 }}>
                    Event Experience
                  </div>

                  <div>
                    <label style={labelStyle}>Have you worked at events before? <span style={{ color: C.green }}>*</span></label>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                      {['Yes', 'No'].map(opt => (
                        <button key={opt} type="button" onClick={() => setWorkedAtEvents(opt)} style={{
                          flex: 1, padding: '11px', borderRadius: 10, cursor: 'pointer',
                          border: `2px solid ${workedAtEvents === opt ? C.green : C.border}`,
                          background: workedAtEvents === opt ? C.green + '12' : C.white,
                          color: workedAtEvents === opt ? C.green : C.textMuted,
                          fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
                          transition: 'all 0.15s',
                        }}>{opt}</button>
                      ))}
                    </div>
                  </div>

                  {workedAtEvents === 'Yes' && (
                    <FadeIn dir="none">
                      <div>
                        <label style={labelStyle}>Which events? <span style={{ color: C.textMuted, fontWeight: 400 }}>(optional)</span></label>
                        <input value={form.whichEvents} onChange={set('whichEvents')} placeholder="e.g. Glastonbury, Reading Festival, Croke Park…" style={inputStyle} />
                      </div>
                    </FadeIn>
                  )}
                </div>

                {/* Social / photos */}
                <div style={{ background: C.white, borderRadius: 18, padding: '28px', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: `1px solid ${C.border}`, paddingBottom: 14, marginBottom: 2 }}>
                    Showcase <span style={{ color: C.textMuted, fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 12 }}>(optional)</span>
                  </div>

                  <div>
                    <label style={labelStyle}>Instagram Handle</label>
                    <input value={form.instagram} onChange={set('instagram')} placeholder="@yourhandle" style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Upload Photos</label>
                    <div style={{
                      border: `2px dashed ${C.border}`, borderRadius: 12, padding: '24px',
                      textAlign: 'center', background: C.bgAlt, cursor: 'pointer',
                    }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>📷</div>
                      <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.5 }}>
                        Drag photos here or <span style={{ color: C.accent, fontWeight: 600, cursor: 'pointer' }}>browse files</span>
                      </p>
                      <p style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>JPG, PNG up to 10MB each</p>
                      <input type="file" accept="image/*" multiple style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer' }} />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Btn variant="primary" size="lg" style={{ flex: 1, justifyContent: 'center' }}>Submit Application →</Btn>
                </div>
                <p style={{ fontSize: 12, color: C.textMuted, textAlign: 'center' }}>
                  We'll review your application and be in touch within 24 hours.
                </p>
              </form>
            </FadeIn>
          )}
        </div>
      </Section>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const navigate = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const cols = [
    { title: 'Product', links: [['Home','home'],['How It Works','how'],['Experience','experience']] },
    { title: 'Partners',  links: [['Vendors','vendors'],['Organisers','organisers'],['Get Started','getstarted']] },
    { title: 'Support',   links: [['Help & FAQ','help'],['Contact Us','help']] },
  ];
  return (
    <footer style={{ background: C.navy, padding: '64px 32px 32px', color: '#8BA3C7' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="uploads/LOGO without the white background.png" alt="SKIIP" style={{ height: 32, width: 'auto' }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Skip the queues. Order food &amp; drinks instantly at events. No app download required.</p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{col.title}</div>
              {col.links.map(([label, id]) => (
                <button key={label} onClick={() => navigate(id)} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#8BA3C7', marginBottom: 10, fontFamily: 'Space Grotesk, sans-serif', padding: 0, textAlign: 'left' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = '#8BA3C7'}
                >{label}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13 }}>© 2026 SKIIP. All rights reserved.</span>
          <span style={{ fontSize: 13 }}>Built for live events.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { HelpPage, GetStartedPage, VendorApplyPage, Footer });
