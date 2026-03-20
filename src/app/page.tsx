import { Hero } from '@/components/sections/Hero'
import { RiskSection } from '@/components/sections/RiskSection'
import { Contrast } from '@/components/sections/Contrast'
import { Solutions } from '@/components/sections/Solutions'
import { TrustIndicators } from '@/components/sections/TrustIndicators'
import { AboutSection } from '@/components/sections/AboutSection'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

/**
 * Página Inicial da 4Core (Landing Page Premium B2B)
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
      <FAQ />
      <CTA />
    </>
  )
}



