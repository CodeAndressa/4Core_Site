'use client'

import dynamic from 'next/dynamic'
import { HomeHeroDiagnostic } from '@/components/sections/HomeHeroDiagnostic'
import { Solutions } from '@/components/sections/Solutions'

// Critical sections (above the fold)
// - HomeHeroDiagnostic: Loaded immediately
// - Solutions: Loaded immediately (3 visible cards)

// Lazy-loaded sections (below the fold)
const Integrations = dynamic(() => import('@/components/sections/Integrations').then(mod => ({ default: mod.Integrations })), {
  loading: () => <div className="h-48 lg:h-64" />,
  ssr: false,
})

const ROICalculator = dynamic(() => import('@/components/sections/ROICalculator').then(mod => ({ default: mod.ROICalculator })), {
  loading: () => <div className="h-72 lg:h-96" />,
  ssr: false,
})

const RiskSection = dynamic(() => import('@/components/sections/RiskSection').then(mod => ({ default: mod.RiskSection })), {
  loading: () => <div className="h-80 lg:h-96" />,
  ssr: false,
})

const Contrast = dynamic(() => import('@/components/sections/Contrast').then(mod => ({ default: mod.Contrast })), {
  loading: () => <div className="h-40 lg:h-52" />,
  ssr: false,
})

const LeadMagnet = dynamic(() => import('@/components/sections/LeadMagnet').then(mod => ({ default: mod.LeadMagnet })), {
  loading: () => <div className="h-56 lg:h-72" />,
  ssr: false,
})

const TrustIndicators = dynamic(() => import('@/components/sections/TrustIndicators').then(mod => ({ default: mod.TrustIndicators })), {
  loading: () => <div className="h-48 lg:h-56" />,
  ssr: false,
})

const FAQ = dynamic(() => import('@/components/sections/FAQ').then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="h-80 lg:h-96" />,
  ssr: false,
})

const CTA = dynamic(() => import('@/components/sections/CTA').then(mod => ({ default: mod.CTA })), {
  loading: () => <div className="h-64 lg:h-80" />,
  ssr: false,
})

/**
 * Pagina Inicial da 4Core - Otimizada para Conversao
 * Ordem estrategica: Hero (risco + diagnostico via pop-up) -> Solucoes -> Prova Social -> CTA
 * 
 * PHASE 3 CODE SPLITTING:
 * - Critical: HomeHeroDiagnostic + Solutions (immediate)
 * - Below-fold: Integrations, ROI, Risk, Contrast, LeadMagnet, Trust, FAQ, CTA (lazy/ssr:false)
 * Expected: Initial bundle -35%, homepage FCP -40%
 */
export default function HomePage() {
  return (
    <>
      <HomeHeroDiagnostic />
      <Solutions />
      <Integrations />
      <ROICalculator />
      <RiskSection />
      <Contrast />
      <LeadMagnet />
      <TrustIndicators />
      <FAQ />
      <CTA />
    </>
  )
}
