import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/data/solutions'
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Bastão de Ronda – Kit Viggia | Controle de Rondas e Segurança',
  description: 'Kit completo para controle de rondas de segurança patrimonial. Bastão Viggia + iButtons + Software TopRonda. Relatórios detalhados e auditoria inviolável.',
}

export default function BastaoDeRondaPage() {
  const solution = getSolutionBySlug('bastao-de-ronda')
  if (!solution) notFound()

  return <SolutionPageTemplate solution={solution} />
}
