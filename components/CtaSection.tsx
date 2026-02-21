'use client'

export default function CtaSection() {
  return (
    <section style={{
      position: 'relative', zIndex: 1,
      padding: '130px 40px', textAlign: 'center',
      borderTop: '1px solid var(--border)',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(0,82,255,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <h2 style={{
        fontSize: 'clamp(40px, 8vw, 88px)', fontWeight: 900,
        color: 'var(--white)', letterSpacing: '-0.045em', lineHeight: 0.92,
        marginBottom: 24, position: 'relative',
      }}>
        Your next onchain<br />
        move starts <span style={{ color: 'var(--blue)' }}>here.</span>
      </h2>

      <p style={{
        fontFamily: "'Space Mono', monospace", fontSize: 12,
        color: 'var(--muted)', marginBottom: 40,
        position: 'relative', fontStyle: 'italic',
      }}>
        Free · No registration · Built on Base
      </p>

      <div style={{
        display: 'flex', gap: 12, justifyContent: 'center',
        flexWrap: 'wrap', position: 'relative',
      }}>
        <button
          onClick={() => document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'var(--blue)', color: '#fff',
            padding: '15px 32px', borderRadius: 8,
            fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
            letterSpacing: '0.05em', border: 'none', cursor: 'pointer',
            transition: 'all 0.22s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#0044dd'
            e.currentTarget.style.boxShadow = '0 0 36px var(--blue-glow)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--blue)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ◈ Start Analyzing
        </button>
        <a href="#" style={{
          background: 'transparent', color: 'var(--muted)',
          padding: '15px 32px', borderRadius: 8,
          fontFamily: "'Space Mono', monospace", fontSize: 12,
          border: '1px solid var(--border2)', cursor: 'pointer',
          transition: 'all 0.22s', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center',
        }}>
          Read the pitch deck →
        </a>
      </div>
    </section>
  )
}
