import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Catraca PNE | Acessibilidade para Pessoas com Deficiência',
  description: 'Catraca PNE: passagem ampla para cadeiras de rodas, em conformidade com normas de acessibilidade. Obrigatória em locais de uso público e necessária para adequação legal.',
}

export default function CatracaPNEPage() {
  const solution = getSolutionBySlug('catracas')
  const variant = getVariantBySlug('catracas', 'pne')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/catracas', label: 'Catracas' }}
    />
  )
}
