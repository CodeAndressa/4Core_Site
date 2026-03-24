import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Catraca Fit | Compacta para Academias e Escolas',
  description: 'Catraca Fit: design compacto e moderno para ambientes com espaço reduzido. Ideal para academias, escolas e pequenas portarias. Fácil instalação e manutenção.',
}

export default function CatracaFitPage() {
  const solution = getSolutionBySlug('catracas')
  const variant = getVariantBySlug('catracas', 'fit')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/catracas', label: 'Catracas' }}
    />
  )
}
