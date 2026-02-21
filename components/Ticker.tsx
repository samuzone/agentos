const ITEMS = [
  { text: 'Analyze any Base token', accent: true },
  { text: 'DeFi protocol deep-dives', accent: false },
  { text: 'Wallet strategy review', accent: true },
  { text: 'Yield farming opportunities', accent: false },
  { text: 'L2 ecosystem insights', accent: true },
  { text: 'Risk assessment onchain', accent: false },
  { text: 'Base builder analysis', accent: true },
  { text: 'Powered by Claude AI', accent: false },
]

export default function Ticker() {
  const allItems = [...ITEMS, ...ITEMS] // duplicate for seamless loop

  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: '12px 0',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        display: 'flex', width: 'max-content',
        animation: 'ticker 28s linear infinite',
      }}>
        {allItems.map((item, i) => (
          <div key={i} style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: 'var(--muted)', padding: '0 36px', whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ color: item.accent ? 'var(--blue)' : 'var(--green)' }}>
              {item.accent ? '◈' : '·'}
            </span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
