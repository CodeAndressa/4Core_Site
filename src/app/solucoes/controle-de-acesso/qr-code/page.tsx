import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Controle de Acesso por QR Code | Visitantes e Acessos Temporários',
  description: 'Controle de acesso por QR Code: ideal para visitantes e acessos temporários. Envio do QR por e-mail ou WhatsApp, sem custo com cartões ou crachás físicos.',
}

export default function ControleAcessoQrCodePage() {
  const solution = getSolutionBySlug('controle-de-acesso')
  const variant = getVariantBySlug('controle-de-acesso', 'qr-code')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/controle-de-acesso', label: 'Controle de Acesso' }}
    />
  )
}
