import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Relógio de Ponto Biométrico | Impressão Digital',
  description: 'Relógio de ponto com leitura de impressão digital de alta precisão. Sensor óptico robusto para ambientes industriais e corporativos. Conformidade total com Portaria 671.',
}

export default function BiometricoPage() {
  const solution = getSolutionBySlug('relogio-de-ponto')
  const variant = getVariantBySlug('relogio-de-ponto', 'biometrico')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/relogio-de-ponto', label: 'Relógio de Ponto' }}
    />
  )
}
