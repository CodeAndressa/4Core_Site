import { Hero } from '@/components/sections/Hero'
import { DiagnosticSection } from '@/components/sections/DiagnosticSection'
import { Solutions } from '@/components/sections/Solutions'
import { RiskSection } from '@/components/sections/RiskSection'
import { Contrast } from '@/components/sections/Contrast'
import { TrustIndicators } from '@/components/sections/TrustIndicators'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

/**
 * Página Inicial da 4Core - Otimizada para Conversão
 * Ordem estratégica: Hero (risco) → Diagnóstico → Soluções → Prova Social → CTA
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <DiagnosticSection />
      <Solutions />
      <RiskSection />
      <Contrast />
      <TrustIndicators />
      <FAQ />
      <CTA />
    </>
  )
}



