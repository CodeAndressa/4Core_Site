import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/data/solutions'
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Controle de Acesso | Biométrico, Facial, RFID e QR Code',
  description: 'Soluções completas de controle de acesso para portas, portões e cancelas. Tecnologias biométrica, facial, RFID e QR Code com software de monitoramento em tempo real.',
}

export default function ControleDeAcessoPage() {
  const solution = getSolutionBySlug('controle-de-acesso')
  if (!solution) notFound()

  return (
    <SolutionPageTemplate
      solution={solution}
      variantsBasePath="/solucoes/controle-de-acesso"
      variantsTitle="Tecnologias de identificação"
      variantsSubtitle="Diferentes pontos de acesso pedem diferentes tecnologias. A 4Core projeta a solução completa."
    />
  )
}
