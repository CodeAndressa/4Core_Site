import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Controle de Acesso Facial | Reconhecimento por IA sem Contato',
  description: 'Controle de acesso por reconhecimento facial com IA: sem contato físico, higiene total e detecção de rosto vivo. Ideal para hospitais, clínicas e ambientes que exigem higiene.',
}

export default function ControleAcessoFacialPage() {
  const solution = getSolutionBySlug('controle-de-acesso')
  const variant = getVariantBySlug('controle-de-acesso', 'facial')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/controle-de-acesso', label: 'Controle de Acesso' }}
    />
  )
}
