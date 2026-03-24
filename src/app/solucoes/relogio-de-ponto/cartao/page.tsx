import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Relógio de Ponto por Cartão de Proximidade | RFID',
  description: 'Relógio de ponto com leitura por cartão de proximidade RFID (Mifare / 125kHz). Registro instantâneo por aproximação, ideal para ambientes com uso de luvas.',
}

export default function CartaoPage() {
  const solution = getSolutionBySlug('relogio-de-ponto')
  const variant = getVariantBySlug('relogio-de-ponto', 'cartao')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/relogio-de-ponto', label: 'Relógio de Ponto' }}
    />
  )
}
