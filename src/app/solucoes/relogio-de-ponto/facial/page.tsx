import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Relógio de Ponto com Reconhecimento Facial | REP-P Facial',
  description: 'Relógio de ponto com reconhecimento facial por IA e detecção de rosto vivo. Sem contato, higiênico, ultra-rápido e em conformidade com a Portaria 671.',
}

export default function FacialPage() {
  const solution = getSolutionBySlug('relogio-de-ponto')
  const variant = getVariantBySlug('relogio-de-ponto', 'facial')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/relogio-de-ponto', label: 'Relógio de Ponto' }}
    />
  )
}
