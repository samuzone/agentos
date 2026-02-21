'use client'

export default function Nav() {
  const scrollToAgent = () => {
    document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', alignItems: 'center',
      padding: '14px 40px',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(2,5,9,0.9)',
      backdropFilter: 'blur(24px)',
    }}>
      <a href="#" style={{
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: "'Space Mono', monospace",
        fontSize: 14, fontWeight: 700,
        color: 'var(--white)', textDecoration: 'none',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="AgentOSBase logo" width={34} height={34}
          style={{ animation: 'glow-pulse 3s ease infinite' }} />
        <span>
          <span style={{ color: 'var(--blue)' }}>Agent</span>OSBase
        </span>
      </a>

      <div style={{
        marginLeft: 24, display: 'flex', alignItems: 'center', gap: 7,
        background: 'var(--blue-dim)', border: '1px solid rgba(0,82,255,0.3)',
        padding: '5px 14px', borderRadius: 100,
        fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#5588ff',
        letterSpacing: '0.08em',
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)',
          animation: 'blink 1.5s ease infinite',
        }} />
        Base Network
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <button onClick={scrollToAgent} style={{
          background: 'var(--blue)', color: '#fff',
          padding: '8px 20px', borderRadius: 6,
          fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
          border: 'none', cursor: 'pointer', letterSpacing: '0.04em',
        }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = '#0044dd'
            ;(e.target as HTMLElement).style.boxShadow = '0 0 24px rgba(0,82,255,0.4)'
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = '#0052FF'
            ;(e.target as HTMLElement).style.boxShadow = 'none'
          }}
        >
          Try Free →
        </button>
      </div>
    </nav>
  )
}
