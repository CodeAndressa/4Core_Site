import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Controle de Acesso por Cartão RFID | Mifare e 125kHz',
  description: 'Controle de acesso por cartão RFID: compatível com Mifare e RFID 125kHz, ideal para visitantes e prestadores. Integra com crachás existentes, custo reduzido por ponto.',
}

export default function ControleAcessoRFIDPage() {
  const solution = getSolutionBySlug('controle-de-acesso')
  const variant = getVariantBySlug('controle-de-acesso', 'rfid')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/controle-de-acesso', label: 'Controle de Acesso' }}
    />
  )
}
