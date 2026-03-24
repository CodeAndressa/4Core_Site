import type { Metadata } from 'next'
import { getSolutionBySlug, getVariantBySlug } from '@/data/solutions'
import { VariantPageTemplate } from '@/components/templates/VariantPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Controle de Acesso Biométrico | Impressão Digital',
  description: 'Controle de acesso por impressão digital: impossível de compartilhar, ideal para áreas restritas e laboratórios. Sensor óptico de alta resolução, funciona online ou offline.',
}

export default function ControleAcessoBiometricoPage() {
  const solution = getSolutionBySlug('controle-de-acesso')
  const variant = getVariantBySlug('controle-de-acesso', 'biometrico')
  if (!solution || !variant) notFound()

  return (
    <VariantPageTemplate
      solution={solution}
      variant={variant}
      parentLink={{ href: '/solucoes/controle-de-acesso', label: 'Controle de Acesso' }}
    />
  )
}
