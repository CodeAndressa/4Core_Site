import { Hero } from '@/components/sections/Hero'
import { Contrast } from '@/components/sections/Contrast'
import { Solutions } from '@/components/sections/Solutions'
import { AboutSection } from '@/components/sections/AboutSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

/**
 * Página Inicial da 4Core (SPA / Landing Page Orientada à Conversão)
 * 
 * Estrutura baseada em Consultative Sales (B2B):
 * 1. Hero: Impacto e Proposta de Valor imediata.
 * 2. Contrast/Dor: Conscientização sobre fraude e passivo trabalhista (Por que agir).
 * 3. Solutions (Vitrine): Catálogo do ecossistema Topdata/4Core (Como nós resolvemos).
 * 4. AboutSection (Garantia/Autoridade): O método de auditoria e credibilidade.
 * 5. Testimonials (Prova Social): Casos de sucesso reais.
 * 6. FAQ: Quebra tática de objeções técnicas.
 * 7. CTA: Rota de conversão final (Agendamento online / WhatsApp).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Contrast />
      <Solutions />
      <AboutSection />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
