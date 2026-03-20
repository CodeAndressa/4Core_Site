import { Hero } from '@/components/sections/Hero'
import { RiskSection } from '@/components/sections/RiskSection'
import { Contrast } from '@/components/sections/Contrast'
import { Solutions } from '@/components/sections/Solutions'
import { TrustIndicators } from '@/components/sections/TrustIndicators'
import { AboutSection } from '@/components/sections/AboutSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

/**
 * Página Inicial da 4Core (Landing Page Premium B2B)
 * 
 * Estratégia de Conversão (CRO):
 * 1. Hero: Impacto e Proposta de Valor.
 * 2. RiskSection: Conscientização de risco e passivo trabalhista (URGÊNCIA).
 * 3. Solutions: Vitrine de hardware e software com contexto operacional.
 * 4. Contrast: Explicação consultiva fundamentada (Problema -> Solução).
 * 5. TrustIndicators/About: Diferencial 4Core, Metodologia e Autoridade Técnica.
 * 6. Social Proof & FAQ: Quebra de objeções e validação de mercado.
 * 7. CTA: Conversão final direta.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <RiskSection />
      <Solutions />
      <Contrast />
      <TrustIndicators />
      <AboutSection />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}


