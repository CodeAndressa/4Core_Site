import { HomeHeroDiagnostic } from '@/components/sections/HomeHeroDiagnostic'
import { Solutions } from '@/components/sections/Solutions'
import { RiskSection } from '@/components/sections/RiskSection'
import { Contrast } from '@/components/sections/Contrast'
import { LeadMagnet } from '@/components/sections/LeadMagnet'
import { TrustIndicators } from '@/components/sections/TrustIndicators'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

/**
 * Pagina Inicial da 4Core - Otimizada para Conversao
 * Ordem estrategica: Hero (risco + diagnostico via pop-up) -> Solucoes -> Prova Social -> CTA
 */
export default function HomePage() {
  return (
    <>
      <HomeHeroDiagnostic />
      <Solutions />
      <RiskSection />
      <Contrast />
      <LeadMagnet />
      <TrustIndicators />
      <FAQ />
      <CTA />
    </>
  )
}
