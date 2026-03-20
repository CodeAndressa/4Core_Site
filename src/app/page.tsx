import { Hero } from '@/components/sections/Hero'
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
 * Narrativa de Conversão:
 * 1. Hero: Impacto, Proposta de Valor e Prova Social (Logos).
 * 2. Contrast: Diferenciação no mercado (Problema vs Solução).
 * 3. Solutions: Ecossistema de produtos (Como resolvemos).
 * 4. TrustIndicators: Autoridade técnica e Auditoria.
 * 5. About: Fundamento e Método (Quem somos/O que acreditamos).
 * 6. Testimonials: Prova Social Real.
 * 7. FAQ: Quebra de objeções.
 * 8. CTA: Conversão final.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Contrast />
      <Solutions />
      <TrustIndicators />
      <AboutSection />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}

