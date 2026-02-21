import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Features from '@/components/Features'
import AgentChat from '@/components/AgentChat'
import HowItWorks from '@/components/HowItWorks'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Background orbs */}
      <div style={{
        position: 'fixed', borderRadius: '50%', filter: 'blur(140px)',
        pointerEvents: 'none', zIndex: 0,
        width: 700, height: 700, background: 'var(--blue)', opacity: 0.07,
        top: -280, left: -180,
      }} />
      <div style={{
        position: 'fixed', borderRadius: '50%', filter: 'blur(140px)',
        pointerEvents: 'none', zIndex: 0,
        width: 400, height: 400, background: 'var(--accent)', opacity: 0.04,
        bottom: 0, right: -100,
      }} />

      <Nav />
      <Hero />
      <Ticker />
      <Features />
      <AgentChat />
      <HowItWorks />
      <CtaSection />
      <Footer />
    </>
  )
}
