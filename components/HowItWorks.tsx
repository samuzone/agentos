const STEPS = [
  {
    num: '01',
    style: 'done',
    title: 'Ask anything',
    desc: 'Type your question — a token address, a portfolio description, a DeFi strategy you\'re considering. No format required.',
  },
  {
    num: '02',
    style: 'active',
    title: 'Agent analyzes',
    desc: 'AgentOSBase processes your specific context using deep knowledge of the Base ecosystem — not generic, template-based answers.',
  },
  {
    num: '03',
    style: 'future',
    title: 'Act with confidence',
    desc: 'Get a structured, clear analysis you can act on. Ask follow-ups. Refine your strategy. The agent remembers the conversation.',
  },
]

const dotStyles: Record<string, React.CSSProperties> = {
  done: {
    background: 'var(--blue)', color: '#fff',
    border: '2px solid var(--blue)',
    boxShadow: '0 0 20px var(--blue-glow)',
  },
  active: {
    background: 'var(--surface)', color: 'var(--accent)',
    border: '2px solid var(--accent)',
    animation: 'glow-pulse 2s ease infinite',
  },
  future: {
    background: 'var(--surface)', color: 'var(--muted)',
    border: '2px solid var(--border2)',
  },
}

export default function HowItWorks() {
  return (
    <section id="how" style={{
      position: 'relative', zIndex: 1,
      padding: '100px 40px',
      maxWidth: 1160, margin: '0 auto',
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 10,
        letterSpacing: '0.2em', color: 'var(--blue)', textTransform: 'uppercase',
        marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: 'var(--muted)' }}>//</span> How it works
      </div>

      <h2 style={{
        fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900,
        color: 'var(--white)', letterSpacing: '-0.035em', lineHeight: 1.05,
        marginBottom: 64,
      }}>
        Simple. Powerful. Free.
      </h2>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        position: 'relative',
      }}>
        {/* Connector line */}
        <div style={{
          position: 'absolute', top: 22, left: '16%', right: '16%',
          height: 1, background: 'var(--border2)',
        }} />

        {STEPS.map(step => (
          <div key={step.num} style={{ padding: '0 20px', textAlign: 'center' }}>
            <div style={{
              width: 46, height: 46, borderRadius: '50%',
              margin: '0 auto 22px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
              position: 'relative', zIndex: 1,
              ...dotStyles[step.style],
            }}>
              {step.num}
            </div>
            <div style={{
              fontSize: 17, fontWeight: 800, color: 'var(--white)',
              marginBottom: 10, letterSpacing: '-0.01em',
            }}>
              {step.title}
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11,
              color: 'var(--muted)', lineHeight: 1.8,
            }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
