import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    default: '4Core — Consultoria em Controle de Ponto e Conformidade Trabalhista',
    template: '%s — 4Core',
  },
  description:
    'Blindagem jurídica e eficiência operacional no controle de jornada. Consultoria especializada para RH e Departamento Pessoal.',
  keywords: [
    'controle de ponto',
    'conformidade trabalhista',
    'portaria 671',
    'gestão de jornada',
    'consultoria trabalhista',
    'registro eletrônico de ponto',
    'REP',
    '4Core',
  ],
  authors: [{ name: '4Core Consultoria' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: '4Core',
    title: '4Core — Consultoria em Controle de Ponto e Conformidade Trabalhista',
    description:
      'Blindagem jurídica e eficiência operacional no controle de jornada. Consultoria especializada para RH e DP.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-24 lg:pt-32">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
