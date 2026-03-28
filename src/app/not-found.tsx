import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada - 4Core',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-deep flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg">
        <Link href="/" aria-label="Ir para a página inicial">
          <Image
            src="/images/logo-white.png"
            alt="4Core"
            width={120}
            height={36}
            className="h-9 w-auto mx-auto mb-12"
          />
        </Link>

        <p className="text-brand-vibrant text-sm font-bold uppercase tracking-[0.2em] mb-4">
          Erro 404
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
          Página não encontrada
        </h1>

        <p className="text-brand-lilac/70 text-lg leading-relaxed mb-10">
          O link que você acessou não existe ou foi removido. Volte para a página inicial e encontre o que precisa.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-brand-vibrant hover:bg-[#8912FF] transition-colors"
          >
            Ir para a página inicial
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-brand-lilac border border-brand-lilac/30 hover:border-brand-lilac/60 transition-colors"
          >
            Falar com especialista
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-brand-lilac/50 text-sm mb-4">Ou acesse diretamente:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'Soluções', href: '/solucoes' },
              { label: 'Relógio de Ponto', href: '/solucoes/relogio-de-ponto' },
              { label: 'Catracas', href: '/solucoes/catracas' },
              { label: 'Controle de Acesso', href: '/solucoes/controle-de-acesso' },
              { label: 'Sobre', href: '/sobre' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-brand-lilac/70 hover:text-white transition-colors underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
