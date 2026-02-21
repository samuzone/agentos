import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentOSBase — Your Onchain AI Analyst',
  description: 'Personalized AI analysis for the Base ecosystem. Tokens, wallets, DeFi — ask anything. Free, no registration.',
  icons: { icon: '/logo.svg' },
  openGraph: {
    title: 'AgentOSBase — Your Onchain AI Analyst',
    description: 'Free AI agent specialized in the Base blockchain ecosystem.',
    type: 'website',
    images: ['/twitter-banner.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentOSBase — Your Onchain AI Analyst',
    description: 'Free AI agent for the Base ecosystem. Analyze tokens, wallets & DeFi — no registration needed.',
    images: ['/twitter-banner.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&family=Syne:wght@400;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
