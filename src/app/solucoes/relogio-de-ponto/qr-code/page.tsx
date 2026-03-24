import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Relógio de Ponto com QR Code | Identificação por Código',
  description: 'Relógio de ponto com leitura de QR Code e código de barras. Solução prática e econômica, ideal para visitantes e funcionários temporários.',
}

export default function QrCodePage() {
  const solution = getSolutionBySlug('relogio-de-ponto')
  const variant = getVariantBySlug('relogio-de-ponto', 'qr-code')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/relogio-de-ponto', label: 'Relógio de Ponto' }}
    />
  )
}
