# ◈ AgentOSBase

Your onchain AI analyst for the Base ecosystem. Built with Next.js + Anthropic Claude.

## Setup in 3 steps

### 1. Install dependencies
```bash
npm install
```

### 2. Configure your API key
```bash
cp .env.local.example .env.local
```
Open `.env.local` and paste your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```
Get your key at: https://console.anthropic.com/settings/keys

### 3. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Deploy to Vercel (recommended)

1. Push this repo to GitHub
2. Go to https://vercel.com → New Project → Import your repo
3. Add environment variable:
   - `ANTHROPIC_API_KEY` = your key
   - `NEXT_PUBLIC_DAILY_LIMIT` = `10`
4. Click Deploy → done ✓

Your API key stays secure on the server. Users never see it.

---

## Project structure

```
agentosbase/
├── app/
│   ├── api/chat/route.ts     ← Backend proxy (keeps API key secret)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Ticker.tsx
│   ├── Features.tsx
│   ├── AgentChat.tsx         ← Main chat component
│   ├── HowItWorks.tsx
│   ├── CtaSection.tsx
│   └── Footer.tsx
├── public/
│   ├── logo.svg              ← Brand logo
│   ├── pfp-logo.jpg          ← Twitter PFP (500x500)
│   ├── twitter-banner.jpg    ← Twitter banner (1500x500)
│   ├── post1.jpg             ← Twitter post images
│   ├── post2.jpg
│   └── post3.jpg
├── .env.local.example
└── package.json
```

## Customize

- **Daily limit**: `NEXT_PUBLIC_DAILY_LIMIT` in `.env.local`
- **Agent personality**: `SYSTEM_PROMPT` in `app/api/chat/route.ts`
- **Suggestions**: `SUGGESTIONS` array in `components/AgentChat.tsx`
- **Colors**: CSS variables in `app/globals.css`
