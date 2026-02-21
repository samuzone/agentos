const FEATURES = [
  {
    icon: '🔍',
    title: 'Token Analysis',
    desc: 'Ask about any token on Base — tokenomics, liquidity, risks, on-chain metrics. Get a clear, structured breakdown instantly.',
  },
  {
    icon: '💼',
    title: 'Wallet Strategy',
    desc: 'Describe your portfolio and goals. The agent evaluates your exposure, suggests rebalancing, and flags risks based on your specific situation.',
  },
  {
    icon: '⚡',
    title: 'DeFi Navigation',
    desc: 'Aerodrome, Morpho, Seamless, BaseSwap — ask how protocols work, compare yields, and find the best strategy for your capital.',
  },
  {
    icon: '🛡️',
    title: 'Risk Assessment',
    desc: 'Before aping in, ask the agent. It analyzes smart contract risk, liquidity depth, team credibility, and market conditions.',
  },
  {
    icon: '📊',
    title: 'Market Context',
    desc: 'Understand what's happening in the Base ecosystem — new protocols, TVL trends, builder activity, and macro context in plain language.',
  },
  {
    icon: '🔗',
    title: 'Onchain Explained',
    desc: 'Complex concepts made clear — bridges, MEV, restaking, L2 sequencers. Ask anything and get an answer tailored to your knowledge level.',
  },
]

export default function Features() {
  return (
    <section style={{
      position: 'relative', zIndex: 1,
      padding: '100px 40px',
      maxWidth: 1160, margin: '0 auto',
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 10,
        letterSpacing: '0.2em', color: 'var(--blue)', textTransform: 'uppercase',
        marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: 'var(--muted)' }}>//</span> What it does
      </div>

      <h2 style={{
        fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900,
        color: 'var(--white)', letterSpacing: '-0.035em', lineHeight: 1.05,
        marginBottom: 60,
      }}>
        Personalized crypto intelligence,<br />built for Base.
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 1,
        background: 'var(--border)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{
            background: 'var(--surface)',
            padding: 36,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--card)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface)')}
          >
            <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
            <div style={{
              fontSize: 18, fontWeight: 800,
              color: 'var(--white)', marginBottom: 10, letterSpacing: '-0.02em',
            }}>{f.title}</div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              color: 'var(--muted)', lineHeight: 1.7,
            }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
