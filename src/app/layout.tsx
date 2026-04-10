import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'
import { PageViewTracker } from '@/components/tracking/PageViewTracker'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: '4Core - Especialista em controle de ponto e acesso',
    template: '%s - 4Core',
  },
  description:
    'Relógio de ponto + software: a solução completa para controle de jornada e acesso. Consultoria especializada para RH e departamento pessoal.',
  keywords: [
    'controle de ponto',
    'relógio de ponto',
    'software de ponto',
    'controle de acesso',
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
    title: '4Core - Especialista em controle de ponto e acesso',
    description:
      'Relógio de ponto + software: a solução completa para controle de jornada e acesso. Consultoria especializada para RH e DP.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17861688846"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17861688846');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <PageViewTracker />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
