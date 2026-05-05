
// SKIIP Vendor Dashboard

const DASH_COLORS = {
  navy: '#0B0F2F',
  purple: '#2A0A4A',
  neonPurple: '#8B5CF6',
  cyan: '#22D3EE',
  green: '#22C55E',
  white: '#FFFFFF',
  surface: '#111936',
  card: '#161D3F',
  border: 'rgba(255,255,255,0.08)',
  text: '#F0F4FF',
  muted: '#6B82A8',
  gray: '#94A3B8',
};

const orders = [
  { id: 'SK-2847', items: ['Double Smash Burger', 'Crispy Fries'], time: 2, status: 'pending', notes: '' },
  { id: 'SK-2848', items: ['BBQ Pulled Pork x2', 'Loaded Nachos'], time: 5, status: 'preparing', notes: 'No onions please' },
  { id: 'SK-2849', items: ['Veggie Wrap', 'Crispy Fries'], time: 8, status: 'ready', notes: '' },
  { id: 'SK-2850', items: ['Double Smash Burger x3'], time: 1, status: 'pending', notes: 'Extra sauce on all' },
  { id: 'SK-2851', items: ['Loaded Nachos x2', 'BBQ Pulled Pork'], time: 11, status: 'preparing', notes: '' },
];

const statusConfig = {
  pending:   { label: 'Pending',    color: DASH_COLORS.neonPurple, next: 'preparing', nextLabel: 'Start Preparing' },
  preparing: { label: 'Preparing',  color: DASH_COLORS.cyan,       next: 'ready',     nextLabel: 'Mark Ready' },
  ready:     { label: 'Ready',      color: DASH_COLORS.green,      next: null,        nextLabel: null },
};

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: DASH_COLORS.card, borderRadius: 16, padding: '18px 20px',
      border: `1px solid ${DASH_COLORS.border}`, flex: 1,
    }}>
      <div style={{ fontSize: 11, color: DASH_COLORS.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: accent || DASH_COLORS.text, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: DASH_COLORS.muted, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status];
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      padding: '3px 9px', borderRadius: 99,
      background: cfg.color + '22', color: cfg.color,
      border: `1px solid ${cfg.color}44`,
    }}>{cfg.label}</span>
  );
}

// Mini sparkline using SVG
function Sparkline({ data, color, width = 120, height = 36 }) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * (height - 4) - 2}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function OrderCard({ order, onAdvance }) {
  const cfg = statusConfig[order.status];
  const borderColor = cfg.color + '55';
  return (
    <div style={{
      background: DASH_COLORS.card, borderRadius: 14, padding: '16px',
      border: `1px solid ${borderColor}`,
      marginBottom: 10,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: DASH_COLORS.text, marginBottom: 4 }}>{order.id}</div>
          <StatusBadge status={order.status} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: DASH_COLORS.muted, marginBottom: 2 }}>Placed</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: order.time < 5 ? DASH_COLORS.cyan : DASH_COLORS.muted }}>
            {order.time}m ago
          </div>
        </div>
      </div>
      <div style={{ marginBottom: order.notes ? 10 : 12 }}>
        {order.items.map((item, i) => (
          <div key={i} style={{ fontSize: 13, color: DASH_COLORS.gray, marginBottom: 2 }}>· {item}</div>
        ))}
      </div>
      {order.notes && (
        <div style={{
          background: `${DASH_COLORS.neonPurple}18`, borderRadius: 8, padding: '7px 10px',
          fontSize: 12, color: DASH_COLORS.neonPurple, marginBottom: 12,
          border: `1px solid ${DASH_COLORS.neonPurple}33`,
        }}>
          📝 {order.notes}
        </div>
      )}
      {cfg.next && (
        <button onClick={() => onAdvance(order.id)} style={{
          width: '100%', background: cfg.color, border: 'none', borderRadius: 10,
          padding: '10px', fontSize: 13, fontWeight: 700, color: DASH_COLORS.navy,
          cursor: 'pointer', letterSpacing: '0.02em',
        }}>
          {cfg.nextLabel} →
        </button>
      )}
    </div>
  );
}

function VendorDashboard() {
  const [activeTab, setActiveTab] = React.useState('orders');
  const [storeStatus, setStoreStatus] = React.useState('open');
  const [liveOrders, setLiveOrders] = React.useState(orders);
  const [notifOpen, setNotifOpen] = React.useState(false);

  const advanceOrder = (id) => {
    setLiveOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const next = statusConfig[o.status].next;
      return next ? { ...o, status: next } : o;
    }));
  };

  const pending = liveOrders.filter(o => o.status === 'pending').length;
  const preparing = liveOrders.filter(o => o.status === 'preparing').length;
  const ready = liveOrders.filter(o => o.status === 'ready').length;

  const hourlyData = [4, 7, 5, 9, 13, 18, 22, 19, 24, 28, 21, 17];

  const statusColors = { open: DASH_COLORS.green, busy: DASH_COLORS.cyan, closed: DASH_COLORS.neonPurple };

  return (
    <div style={{
      width: '100%', height: '100%', background: DASH_COLORS.navy,
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      display: 'flex', flexDirection: 'column', overflow: 'hidden', color: DASH_COLORS.text,
    }}>
      {/* Top bar */}
      <div style={{
        background: DASH_COLORS.surface, padding: '0 24px',
        borderBottom: `1px solid ${DASH_COLORS.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 56, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', color: DASH_COLORS.text }}>
            SKIIP <span style={{ color: DASH_COLORS.neonPurple }}>Vendor</span>
          </div>
          <div style={{ width: 1, height: 20, background: DASH_COLORS.border }} />
          <div style={{ fontSize: 13, color: DASH_COLORS.muted }}>The Pit Grill · Stand B-12</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Status toggle */}
          <div style={{ display: 'flex', background: DASH_COLORS.card, borderRadius: 99, padding: 3, gap: 2, border: `1px solid ${DASH_COLORS.border}` }}>
            {['open', 'busy', 'closed'].map(s => (
              <button key={s} onClick={() => setStoreStatus(s)} style={{
                background: storeStatus === s ? statusColors[s] : 'transparent',
                border: 'none', borderRadius: 99, padding: '5px 12px',
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
                color: storeStatus === s ? DASH_COLORS.navy : DASH_COLORS.muted,
                cursor: 'pointer', transition: 'all 0.15s',
              }}>{s}</button>
            ))}
          </div>
          {/* Notification bell */}
          <button onClick={() => setNotifOpen(v => !v)} style={{
            background: DASH_COLORS.card, border: `1px solid ${DASH_COLORS.border}`,
            borderRadius: 10, width: 36, height: 36, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', fontSize: 16,
          }}>
            🔔
            <span style={{
              position: 'absolute', top: 6, right: 6, width: 8, height: 8,
              borderRadius: '50%', background: DASH_COLORS.neonPurple,
              boxShadow: `0 0 6px ${DASH_COLORS.neonPurple}`,
            }} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{
          width: 200, background: DASH_COLORS.surface, borderRight: `1px solid ${DASH_COLORS.border}`,
          padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0,
        }}>
          {[
            { id: 'orders', icon: '📋', label: 'Live Orders', badge: pending + preparing },
            { id: 'overview', icon: '📊', label: 'Overview' },
            { id: 'insights', icon: '📈', label: 'Insights' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
              background: activeTab === tab.id ? `${DASH_COLORS.neonPurple}22` : 'transparent',
              color: activeTab === tab.id ? DASH_COLORS.text : DASH_COLORS.muted,
              fontSize: 13, fontWeight: 600,
              transition: 'all 0.15s',
            }}>
              <span>{tab.icon}</span>
              <span style={{ flex: 1 }}>{tab.label}</span>
              {tab.badge > 0 && (
                <span style={{
                  background: DASH_COLORS.neonPurple, borderRadius: 99, padding: '1px 7px',
                  fontSize: 11, fontWeight: 700, color: DASH_COLORS.white,
                }}>{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, position: 'relative' }}>

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: DASH_COLORS.text }}>Live Orders</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                {/* Pending column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: DASH_COLORS.neonPurple, boxShadow: `0 0 8px ${DASH_COLORS.neonPurple}` }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: DASH_COLORS.neonPurple, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      Pending · {pending}
                    </span>
                  </div>
                  {liveOrders.filter(o => o.status === 'pending').map(o => (
                    <OrderCard key={o.id} order={o} onAdvance={advanceOrder} />
                  ))}
                  {pending === 0 && <div style={{ fontSize: 13, color: DASH_COLORS.muted, padding: '20px 0', textAlign: 'center' }}>All caught up</div>}
                </div>

                {/* Preparing column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: DASH_COLORS.cyan, boxShadow: `0 0 8px ${DASH_COLORS.cyan}` }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: DASH_COLORS.cyan, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      Preparing · {preparing}
                    </span>
                  </div>
                  {liveOrders.filter(o => o.status === 'preparing').map(o => (
                    <OrderCard key={o.id} order={o} onAdvance={advanceOrder} />
                  ))}
                  {preparing === 0 && <div style={{ fontSize: 13, color: DASH_COLORS.muted, padding: '20px 0', textAlign: 'center' }}>Nothing cooking</div>}
                </div>

                {/* Ready column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: DASH_COLORS.green, boxShadow: `0 0 8px ${DASH_COLORS.green}` }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: DASH_COLORS.green, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      Ready · {ready}
                    </span>
                  </div>
                  {liveOrders.filter(o => o.status === 'ready').map(o => (
                    <OrderCard key={o.id} order={o} onAdvance={advanceOrder} />
                  ))}
                  {ready === 0 && <div style={{ fontSize: 13, color: DASH_COLORS.muted, padding: '20px 0', textAlign: 'center' }}>None ready yet</div>}
                </div>
              </div>
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: DASH_COLORS.text }}>Dashboard Overview</div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <StatCard label="In Queue" value={pending + preparing} sub="Orders active" accent={DASH_COLORS.neonPurple} />
                <StatCard label="Completed" value="47" sub="Today's orders" accent={DASH_COLORS.cyan} />
                <StatCard label="Revenue" value="£1,284" sub="Live today" accent={DASH_COLORS.green} />
                <StatCard label="Avg. Time" value="4.2m" sub="Per order" accent={DASH_COLORS.gray} />
              </div>

              {/* Queue summary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: DASH_COLORS.card, borderRadius: 16, padding: '20px', border: `1px solid ${DASH_COLORS.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: DASH_COLORS.muted, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Queue Breakdown</div>
                  {[
                    { label: 'Pending', count: pending, color: DASH_COLORS.neonPurple },
                    { label: 'Preparing', count: preparing, color: DASH_COLORS.cyan },
                    { label: 'Ready', count: ready, color: DASH_COLORS.green },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: row.color, boxShadow: `0 0 6px ${row.color}` }} />
                      <span style={{ flex: 1, fontSize: 14, color: DASH_COLORS.text }}>{row.label}</span>
                      <span style={{ fontSize: 20, fontWeight: 800, color: row.color }}>{row.count}</span>
                      <div style={{ width: 80, height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ width: `${(row.count / 5) * 100}%`, height: '100%', background: row.color, borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: DASH_COLORS.card, borderRadius: 16, padding: '20px', border: `1px solid ${DASH_COLORS.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: DASH_COLORS.muted, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recent Completed</div>
                  {['SK-2844', 'SK-2843', 'SK-2842', 'SK-2841'].map((id, i) => (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${DASH_COLORS.border}` }}>
                      <span style={{ fontSize: 14, color: DASH_COLORS.text, fontWeight: 600 }}>{id}</span>
                      <span style={{ fontSize: 12, color: DASH_COLORS.green, fontWeight: 600 }}>✓ Picked up</span>
                      <span style={{ fontSize: 12, color: DASH_COLORS.muted }}>{5 + i * 2}m ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INSIGHTS TAB */}
          {activeTab === 'insights' && (
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: DASH_COLORS.text }}>Performance Insights</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                {/* Orders per hour */}
                <div style={{ background: DASH_COLORS.card, borderRadius: 16, padding: '20px', border: `1px solid ${DASH_COLORS.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: DASH_COLORS.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Orders Per Hour</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: DASH_COLORS.cyan, marginBottom: 16 }}>28 <span style={{ fontSize: 14, color: DASH_COLORS.muted, fontWeight: 500 }}>peak</span></div>
                  {/* Bar chart */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
                    {hourlyData.map((v, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{
                          width: '100%', borderRadius: '3px 3px 0 0',
                          height: `${(v / 28) * 100}%`,
                          background: i === hourlyData.length - 4 ? DASH_COLORS.cyan : `${DASH_COLORS.neonPurple}66`,
                          transition: 'height 0.3s',
                        }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: DASH_COLORS.muted }}>10am</span>
                    <span style={{ fontSize: 10, color: DASH_COLORS.muted }}>Now</span>
                  </div>
                </div>

                {/* Peak times */}
                <div style={{ background: DASH_COLORS.card, borderRadius: 16, padding: '20px', border: `1px solid ${DASH_COLORS.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: DASH_COLORS.muted, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Peak Windows Today</div>
                  {[
                    { time: '12:00–1:00 PM', orders: 28, pct: 95, color: DASH_COLORS.neonPurple },
                    { time: '3:30–4:30 PM', orders: 22, pct: 72, color: DASH_COLORS.cyan },
                    { time: '6:00–7:00 PM', orders: 17, pct: 55, color: DASH_COLORS.green },
                  ].map(p => (
                    <div key={p.time} style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: DASH_COLORS.text }}>{p.time}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.orders} orders</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top items */}
                <div style={{ background: DASH_COLORS.card, borderRadius: 16, padding: '20px', border: `1px solid ${DASH_COLORS.border}`, gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: DASH_COLORS.muted, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Top Items</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {[
                      { name: 'Double Smash Burger', count: 34, rev: '£493' },
                      { name: 'Crispy Fries', count: 29, rev: '£174' },
                      { name: 'BBQ Pulled Pork', count: 18, rev: '£288' },
                      { name: 'Loaded Nachos', count: 15, rev: '£142' },
                    ].map((item, i) => (
                      <div key={i} style={{
                        background: DASH_COLORS.navy, borderRadius: 12, padding: '14px',
                        border: `1px solid ${DASH_COLORS.border}`,
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: DASH_COLORS.muted, marginBottom: 8 }}>#{i + 1}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: DASH_COLORS.text, marginBottom: 6, lineHeight: 1.3 }}>{item.name}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 12, color: DASH_COLORS.cyan }}>{item.count} sold</span>
                          <span style={{ fontSize: 12, color: DASH_COLORS.green }}>{item.rev}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications panel */}
        {notifOpen && (
          <div style={{
            width: 280, background: DASH_COLORS.surface, borderLeft: `1px solid ${DASH_COLORS.border}`,
            padding: '20px 16px', overflowY: 'auto', flexShrink: 0,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: DASH_COLORS.text }}>Notifications</div>
            {[
              { icon: '🔥', msg: 'High demand — 5 orders in last 3 min', time: '1m ago', color: DASH_COLORS.neonPurple },
              { icon: '⚡', msg: 'New order SK-2850 needs attention', time: '2m ago', color: DASH_COLORS.cyan },
              { icon: '⚠️', msg: 'Order SK-2848 — 5 min wait exceeded', time: '5m ago', color: DASH_COLORS.neonPurple },
              { icon: '✅', msg: 'SK-2844 picked up successfully', time: '8m ago', color: DASH_COLORS.green },
              { icon: '📢', msg: 'System: Neon Sips vendor offline', time: '12m ago', color: DASH_COLORS.gray },
            ].map((n, i) => (
              <div key={i} style={{
                background: DASH_COLORS.card, borderRadius: 12, padding: '12px',
                marginBottom: 8, border: `1px solid ${DASH_COLORS.border}`,
              }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 16 }}>{n.icon}</span>
                  <span style={{ fontSize: 12, color: DASH_COLORS.text, lineHeight: 1.4, flex: 1 }}>{n.msg}</span>
                </div>
                <div style={{ fontSize: 10, color: DASH_COLORS.muted, marginLeft: 24 }}>{n.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { VendorDashboard });
