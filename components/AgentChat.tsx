'use client'

import { useState, useEffect, useRef } from 'react'

const DAILY_LIMIT = Number(process.env.NEXT_PUBLIC_DAILY_LIMIT) || 10
const STORAGE_KEY = 'baseagent_usage'

interface Message {
  role: 'user' | 'assistant'
  content: string
  time: string
}

const SUGGESTIONS = [
  'Analyze AERO tokenomics',
  'Best DeFi yields on Base right now',
  'Is my wallet overexposed to one asset?',
  'Explain Aerodrome vs Uniswap on Base',
]

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function getUsage(): { count: number; date: string } {
  if (typeof window === 'undefined') return { count: 0, date: getToday() }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { count: 0, date: getToday() }
    const data = JSON.parse(raw)
    if (data.date !== getToday()) return { count: 0, date: getToday() }
    return data
  } catch { return { count: 0, date: getToday() } }
}

function incrementUsage() {
  const u = getUsage()
  u.count += 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  return u.count
}

function nowStr() {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
}

function formatContent(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--white)">$1</strong>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
    .replace(/•/g, '<span style="color:var(--blue)">•</span>')
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [usage, setUsage] = useState({ count: 0, date: getToday() })
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setUsage(getUsage())
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const isLimitReached = usage.count >= DAILY_LIMIT
  const usagePct = Math.min((usage.count / DAILY_LIMIT) * 100, 100)

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || isLoading || isLimitReached) return

    const userMsg: Message = { role: 'user', content, time: nowStr() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setShowSuggestions(false)
    setIsLoading(true)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const history = [...messages, userMsg].map(m => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ Error: ${data.error || 'Something went wrong. Please try again.'}`,
          time: nowStr(),
        }])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content,
          time: nowStr(),
        }])
        const newCount = incrementUsage()
        setUsage({ count: newCount, date: getToday() })
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Connection error. Check your network and try again.',
        time: nowStr(),
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }

  const fillColor = usagePct >= 100 ? 'var(--red)' : usagePct >= 70 ? 'var(--orange)' : 'var(--blue)'

  return (
    <section id="agent" style={{
      position: 'relative', zIndex: 1,
      padding: '0 40px 120px',
      maxWidth: 900, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10,
          letterSpacing: '0.2em', color: 'var(--blue)', textTransform: 'uppercase',
          marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{ color: 'var(--muted)' }}>//</span> Live Agent
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900,
          color: 'var(--white)', letterSpacing: '-0.035em',
          marginBottom: 8,
        }}>
          Talk to AgentOSBase now.
        </h2>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--muted)',
        }}>
          No account needed · {DAILY_LIMIT} messages/day · Free forever
        </p>
      </div>

      {/* Window */}
      <div style={{
        border: '1px solid var(--border2)',
        borderRadius: 20, overflow: 'hidden',
        background: 'var(--surface)',
        boxShadow: '0 0 80px rgba(0,82,255,0.08)',
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '16px 24px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--card)',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{ marginLeft: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="AgentOSBase" width={24} height={24} />
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              fontWeight: 700, color: 'var(--white)', letterSpacing: '0.04em',
            }}>AgentOSBase v1.0</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--green)',
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)' }} />
              Online · Base Network
            </div>
          </div>
          {/* Usage bar */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.05em' }}>
              DAILY LIMIT
            </span>
            <div style={{ width: 80, height: 4, background: 'var(--border2)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: fillColor, borderRadius: 2, width: `${usagePct}%`, transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--muted)', minWidth: 36, textAlign: 'right' }}>
              {usage.count}/{DAILY_LIMIT}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ height: 420, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Welcome message */}
          <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(14,32,64,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--blue)' }}>
                ▸ BASEAGENT
              </span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--muted)', marginLeft: 'auto' }}>
                {nowStr()}
              </span>
            </div>
            <div style={{
              fontSize: 14, lineHeight: 1.7, color: '#d0e4ff',
              paddingLeft: 14, borderLeft: '2px solid rgba(0,82,255,0.3)',
            }}>
              Hey — I&apos;m AgentOSBase, your onchain analyst for the Base ecosystem. I can help you analyze tokens,
              evaluate DeFi strategies, review wallet positions, and navigate the Base network.
              <br /><br />
              What are you working on? Drop a token address, describe your portfolio, or ask anything about Base.
            </div>
          </div>

          {/* Dynamic messages */}
          {messages.map((msg, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid rgba(14,32,64,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: msg.role === 'user' ? 'var(--orange)' : 'var(--blue)',
                }}>
                  {msg.role === 'user' ? '▸ YOU' : '▸ BASEAGENT'}
                </span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--muted)', marginLeft: 'auto' }}>
                  {msg.time}
                </span>
              </div>
              <div
                style={{
                  fontSize: 14, lineHeight: 1.7,
                  color: msg.role === 'assistant' ? '#d0e4ff' : 'var(--text)',
                  paddingLeft: 14,
                  borderLeft: `2px solid ${msg.role === 'assistant' ? 'rgba(0,82,255,0.3)' : 'var(--border2)'}`,
                }}
                dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
              />
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{ padding: '14px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, color: 'var(--blue)' }}>
                  ▸ BASEAGENT
                </span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--muted)', marginLeft: 'auto' }}>
                  analyzing...
                </span>
              </div>
              <div style={{ paddingLeft: 14, display: 'flex', gap: 4 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: 'var(--blue)',
                    animation: `bounce 1s ${i * 0.15}s ease infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div style={{ padding: '0 24px 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SUGGESTIONS.map(s => (
              <button key={s}
                onClick={() => sendMessage(s)}
                style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10,
                  color: 'var(--muted)', background: 'var(--card)',
                  border: '1px solid var(--border2)', borderRadius: 100,
                  padding: '6px 14px', cursor: 'pointer',
                  transition: 'all 0.18s', letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--blue)'
                  e.currentTarget.style.color = 'var(--white)'
                  e.currentTarget.style.background = 'var(--blue-dim)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border2)'
                  e.currentTarget.style.color = 'var(--muted)'
                  e.currentTarget.style.background = 'var(--card)'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Limit banner */}
        {isLimitReached && (
          <div style={{
            margin: '0 20px 16px',
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 10, padding: '14px 18px',
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: '#ff6b6b', lineHeight: 1.6,
          }}>
            <strong style={{ color: '#ff9999' }}>Daily limit reached.</strong> You&apos;ve used all {DAILY_LIMIT} free messages today.
            Your limit resets at midnight UTC. Want unlimited access?{' '}
            <strong style={{ color: '#ff9999' }}>Connect your wallet</strong> on Base — stakers get priority access.
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border)',
          background: 'var(--card)',
          display: 'flex', gap: 10, alignItems: 'flex-end',
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--surface)', border: '1px solid var(--border2)',
            borderRadius: 10, padding: '11px 16px',
          }}>
            <span style={{ color: 'var(--blue)', fontFamily: "'Space Mono', monospace", fontSize: 13 }}>▸</span>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={autoResize}
              onKeyDown={handleKey}
              disabled={isLoading || isLimitReached}
              placeholder="Ask about tokens, wallets, DeFi, Base ecosystem..."
              rows={1}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--white)', fontFamily: "'Space Mono', monospace", fontSize: 13,
                resize: 'none', lineHeight: 1.5, maxHeight: 100, overflowY: 'auto',
              }}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || isLimitReached || !input.trim()}
            style={{
              background: (isLoading || isLimitReached || !input.trim()) ? 'var(--border2)' : 'var(--blue)',
              color: (isLoading || isLimitReached || !input.trim()) ? 'var(--muted)' : '#fff',
              border: 'none', borderRadius: 8, cursor: (isLoading || isLimitReached) ? 'not-allowed' : 'pointer',
              padding: '12px 20px',
              fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.04em', transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
          >
            RUN ↵
          </button>
        </div>
      </div>
    </section>
  )
}
