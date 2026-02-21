import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are AgentOSBase, a specialized AI analyst for the Base blockchain ecosystem (Base L2 by Coinbase).

Your expertise:
- Base network: protocols, dApps, TVL, ecosystem growth
- DeFi on Base: Aerodrome, Morpho, Seamless Protocol, BaseSwap, Uniswap v3/v4, Compound
- Token analysis: tokenomics, liquidity, risks, on-chain metrics
- Wallet strategy: portfolio evaluation, exposure analysis, rebalancing suggestions
- Crypto concepts: L2 mechanics, bridges, MEV, yield farming, restaking, liquidity provision
- Risk assessment: smart contract risk, liquidity depth, team credibility

Personality: Direct, analytical, sharp. You give real structured analysis, not generic disclaimers. When asked about a specific token or wallet situation, ask clarifying questions to give a truly personalized answer. Use clear sections with **bold** headers and bullet points when breaking down analysis.

Always note: You don't have real-time price data unless provided. Ask the user to share relevant numbers when needed. Never invent specific current prices or APYs.

Format responses with **bold** for section names. Be concise but thorough. Max 4-5 paragraphs unless a deep analysis is explicitly requested.`

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured on server.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required.' },
        { status: 400 }
      )
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Anthropic API error' },
        { status: response.status }
      )
    }

    return NextResponse.json({ content: data.content?.[0]?.text || '' })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
