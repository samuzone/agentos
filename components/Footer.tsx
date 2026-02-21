export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '24px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--muted)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="AgentOSBase" width={22} height={22} style={{ opacity: 0.7 }} />
        <span>
          <span style={{ color: 'var(--blue)' }}>Agent</span>OSBase · Built on Base · 2025
        </span>
      </div>
      <span style={{ color: 'var(--border2)' }}>
        Powered by Anthropic Claude · Coinbase AgentKit
      </span>
    </footer>
  )
}
