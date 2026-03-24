import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Catraca Revolution | Design Premium para Lobbies Corporativos',
  description: 'Catraca Revolution: design sofisticado em aço inox com múltiplos leitores integrados e braço antipânico. Ideal para ambientes de alto padrão e portarias corporativas.',
}

export default function CatracaRevolutionPage() {
  const solution = getSolutionBySlug('catracas')
  const variant = getVariantBySlug('catracas', 'revolution')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/catracas', label: 'Catracas' }}
    />
  )
}
