'use client'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '120px 40px 80px',
      position: 'relative', zIndex: 1,
    }}>
      {/* Logo */}
      <div className="fade-up-1" style={{ marginBottom: 28 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="AgentOSBase"
          width={100}
          height={100}
          style={{ filter: 'drop-shadow(0 0 28px rgba(0,82,255,0.55))' }}
        />
      </div>

      {/* Eyebrow */}
      <div className="fade-up-2" style={{
        fontFamily: "'Space Mono', monospace", fontSize: 10,
        letterSpacing: '0.22em', color: 'var(--blue)', textTransform: 'uppercase',
        marginBottom: 28,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 36, height: 1, background: 'var(--blue)', opacity: 0.4, display: 'block' }} />
        Base Ecosystem · AI Agent · Free to use
        <span style={{ width: 36, height: 1, background: 'var(--blue)', opacity: 0.4, display: 'block' }} />
      </div>

      {/* Title */}
      <h1 className="fade-up-3" style={{
        fontSize: 'clamp(52px, 10vw, 120px)',
        fontWeight: 900, lineHeight: 0.9,
        letterSpacing: '-0.04em',
        marginBottom: 4,
      }}>
        <span style={{ color: 'var(--blue)' }}>Agent</span>
        <span style={{ color: 'var(--white)' }}>OS</span>
        <span style={{ color: 'var(--white)' }}>Base</span>
      </h1>

      <p className="fade-up-4" style={{
        fontSize: 'clamp(22px, 4vw, 56px)',
        fontWeight: 800, opacity: 0.1, letterSpacing: '-0.03em',
        color: 'var(--white)', lineHeight: 1,
        marginBottom: 28,
      }}>
        Your onchain analyst.
      </p>

      <p className="fade-up-5" style={{
        maxWidth: 520, fontSize: 18, lineHeight: 1.65,
        color: 'var(--muted)', fontWeight: 400,
        marginBottom: 44,
      }}>
        Ask anything about{' '}
        <strong style={{ color: 'var(--text)' }}>tokens, wallets, DeFi protocols, and the Base ecosystem</strong>.
        <br />Get personalized analysis — not generic answers.
      </p>

      {/* Buttons */}
      <div className="fade-up-6" style={{
        display: 'flex', gap: 12, flexWrap: 'wrap',
        justifyContent: 'center', marginBottom: 44,
      }}>
        <a href="#agent" style={{
          background: 'var(--blue)', color: '#fff',
          padding: '15px 32px', borderRadius: 8,
          fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
          letterSpacing: '0.05em', border: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          textDecoration: 'none',
        }}>
          ◈ Talk to the Agent
        </a>
        <a href="#how" style={{
          background: 'transparent', color: 'var(--muted)',
          padding: '15px 32px', borderRadius: 8,
          fontFamily: "'Space Mono', monospace", fontSize: 12,
          border: '1px solid var(--border2)',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          textDecoration: 'none',
        }}>
          How it works →
        </a>
      </div>

      {/* Social proof */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--muted)',
        animation: 'fadeUp 0.7s 0.38s ease both',
      }}>
        <div style={{ display: 'flex' }}>
          {['🧑', '👩', '🧔', '👨'].map((e, i) => (
            <div key={i} style={{
              width: 30, height: 30, borderRadius: '50%',
              border: '2px solid var(--bg)',
              background: 'var(--border2)',
              marginLeft: i === 0 ? 0 : -8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13,
            }}>{e}</div>
          ))}
        </div>
        10 free messages/day · No registration needed
      </div>
    </section>
  )
}
