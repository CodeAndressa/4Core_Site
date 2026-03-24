import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Catraca Box | Aço Inox para Indústrias e Grandes Empresas',
  description: 'Catraca Box: gabinete 100% em aço inox com alta resistência a vandalismo e braço antipânico de série. Solução robusta para indústrias, portarias pesadas e ambientes agressivos.',
}

export default function CatracaBoxPage() {
  const solution = getSolutionBySlug('catracas')
  const variant = getVariantBySlug('catracas', 'box')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/catracas', label: 'Catracas' }}
    />
  )
}
