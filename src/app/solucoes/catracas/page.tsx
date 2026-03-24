import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/data/solutions'
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Catracas Eletrônicas | Controle de Fluxo de Pessoas',
  description: 'Linha completa de catracas eletrônicas: Revolution, Fit, Box e PNE. Controle rigoroso de entrada/saída com reconhecimento facial, biometria, RFID e QR Code.',
}

export default function CatracasPage() {
  const solution = getSolutionBySlug('catracas')
  if (!solution) notFound()

  return (
    <SolutionPageTemplate
      solution={solution}
      variantsBasePath="/solucoes/catracas"
      variantsTitle="Modelos de catracas"
      variantsSubtitle="Cada ambiente pede um modelo. A 4Core indica o ideal para sua portaria."
    />
  )
}
