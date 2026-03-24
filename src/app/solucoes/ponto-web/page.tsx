import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/data/solutions'
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Ponto Web – TopPonto | Gestão de Jornada em Nuvem',
  description: 'Plataforma 100% em nuvem que centraliza marcações de ponto, automatiza cálculos de horas extras e simplifica o fechamento de folha. Integração com os principais ERPs.',
}

export default function PontoWebPage() {
  const solution = getSolutionBySlug('ponto-web')
  if (!solution) notFound()

  return <SolutionPageTemplate solution={solution} />
}
