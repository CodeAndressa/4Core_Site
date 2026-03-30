'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, MessageCircle } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getWhatsAppUrl } from '@/lib/constants'

interface HeroProps {
  onOpenDiagnostic?: () => void
}

export function Hero({ onOpenDiagnostic }: HeroProps) {
  const risks = [
    { icon: <AlertTriangle className="w-5 h-5" />, text: 'Processos trabalhistas por ponto irregular' },
    { icon: <AlertTriangle className="w-5 h-5" />, text: 'Multas de até R$ 6 mil por funcionário' },
    { icon: <AlertTriangle className="w-5 h-5" />, text: 'Dados inconsistentes gerando retrabalho' },
  ]

  const solutions = [
    'Conformidade 100% com Portaria 671',
    'Implementação técnica correta',
    'Blindagem jurídica total',
  ]

  return (
    <Section variant="deep" className="pb-0 nebula-stage">
      <div className="nebula-layer nebula-layer-a" />
      <div className="nebula-layer nebula-layer-b" />
      <div className="nebula-layer nebula-layer-c" />
      <div className="nebula-grid" />
      <div className="nebula-vignette" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-6 py-2 px-4 rounded-lg bg-white/10 backdrop-blur-md text-brand-light border border-white/20 shadow-lg hover:border-white/40 transition-all duration-300">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Seu controle de ponto pode estar te expondo a riscos
              </span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Evite processos trabalhistas com{' '}
              <span className="text-brand-vibrant">controle de ponto em conformidade</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed font-medium max-w-2xl">
              Relógio de ponto + software + implementação correta. A 4Core garante conformidade com a Portaria 671
              e elimina riscos trabalhistas da sua empresa.
            </p>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300">
              <p className="text-sm font-bold text-brand-vibrant mb-4 uppercase tracking-wide">Riscos que você evita:</p>
              <ul className="space-y-3">
                {risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/85 text-sm font-medium">
                    <span className="text-brand-vibrant">{risk.icon}</span>
                    <span>{risk.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="space-y-3 mb-8">
              {solutions.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-white/90 font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-vibrant shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contato" size="lg" className="px-8 py-6 text-base font-bold cta-glow">
                <TrendingUp className="mr-2 w-5 h-5" />
                Avaliar meu risco gratuitamente
              </Button>
              <Button
                onClick={onOpenDiagnostic}
                size="lg"
                className="px-8 py-6 text-base font-black bg-gradient-to-r from-brand-lilac via-white to-brand-lilac text-brand-nebula hover:from-white hover:to-brand-lilac border border-white/35 shadow-[0_18px_42_px_-18px_rgba(123,0,255,0.9)] cta-diagnostic"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Fazer diagnóstico rápido
              </Button>
            </div>

            {/* Micro-CTA WhatsApp */}
            <div
              className="mt-6 flex items-center justify-center sm:justify-start gap-2"
            >
              <p className="text-white/60 text-sm font-medium italic">Prefere falar agora?</p>
              <a
                href={getWhatsAppUrl('Olá, quero falar com um especialista!')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-all font-bold text-sm tracking-tight border-b border-green-400/30 hover:border-green-300 pb-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                Chamar especialista no WhatsApp
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-white/75">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-vibrant" />
                <span className="font-semibold">100% Conformidade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-vibrant" />
                <span className="font-semibold">Certificado MTE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative block mt-12 lg:mt-0"
          >
            <div className="absolute -inset-8 rounded-[42px] bg-brand-vibrant/5" />
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-brand-deep/50 border border-white/10 aspect-[4/5] max-w-[500px] mx-auto lg:ml-auto">
              <Image
                src="/images/products/facial-reader.png"
                alt="Leitor Facial TopPonto - Reconhecimento Facial de Alta Precisão"
                width={600}
                height={750}
                className="w-full h-full object-contain p-4"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#120224] via-[#120224]/50 to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              className="absolute -bottom-8 -right-12 z-20 bg-white/95 p-6 rounded-2xl shadow-2xl border border-brand-lilac/40 max-w-[280px]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-lilac/40 rounded-xl flex items-center justify-center text-brand-nebula">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-nebula">Portaria 671</p>
                  <p className="text-xs text-brand-nebula/70 font-medium">100% em conformidade</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
