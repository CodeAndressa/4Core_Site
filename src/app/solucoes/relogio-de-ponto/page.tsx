import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/data/solutions'
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Relógio de Ponto Eletrônico | Facial, Biométrico, Cartão e QR Code',
  description: 'Linha completa de relógios de ponto eletrônicos certificados (REP-P/REP-C). Reconhecimento facial com IA, biometria digital, cartão RFID e QR Code. Conformidade total com a Portaria 671.',
}

export default function RelogioDePontoPage() {
  const solution = getSolutionBySlug('relogio-de-ponto')
  if (!solution) notFound()

  return (
    <SolutionPageTemplate
      solution={solution}
      variantsBasePath="/solucoes/relogio-de-ponto"
      variantsTitle="Tecnologias de identificação"
      variantsSubtitle="Cada cenário pede uma tecnologia. A 4Core indica a ideal para sua operação."
    />
  )
}
