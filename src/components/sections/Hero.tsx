'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

/**
 * Hero Section - Foco em Risco e Conversão
 * Clareza imediata + Urgência + CTA forte
 */
export function Hero() {
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
    <Section variant="white" className="pb-0">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge de Urgência */}
            <Badge variant="primary" className="mb-6 py-2 px-4 rounded-lg bg-red-50 text-red-600 border border-red-200">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Seu controle de ponto pode estar te expondo a riscos
              </span>
            </Badge>

            {/* Título com Problema + Solução */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-deep mb-6 leading-[1.05] tracking-tight">
              Evite processos trabalhistas com <span className="text-brand-vibrant">controle de ponto em conformidade</span>
            </h1>

            {/* Proposta de Valor Clara */}
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
              Relógio de ponto + software + implementação correta. A 4Core garante conformidade com a Portaria 671 e elimina riscos trabalhistas da sua empresa.
            </p>

            {/* Riscos Evitados */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
              <p className="text-sm font-bold text-red-900 mb-4 uppercase tracking-wide">⚠️ Riscos que você evita:</p>
              <ul className="space-y-3">
                {risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-red-800 text-sm font-medium">
                    {risk.icon}
                    <span>{risk.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefícios */}
            <ul className="space-y-3 mb-8">
              {solutions.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 text-gray-700 font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            {/* CTAs Orientados a Conversão */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                href="/contato" 
                size="lg" 
                className="px-8 py-6 text-base font-bold shadow-xl bg-brand-vibrant hover:bg-brand-vibrant/90"
              >
                <TrendingUp className="mr-2 w-5 h-5" />
                Avaliar meu risco gratuitamente
              </Button>
              <Button 
                href="#diagnostico" 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-base font-bold border-2 border-gray-300 hover:border-brand-vibrant hover:text-brand-vibrant"
              >
                Fazer diagnóstico rápido
              </Button>
            </div>

            {/* Prova Social Rápida */}
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="font-semibold">100% Conformidade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Certificado MTE</span>
              </div>
            </div>
          </motion.div>

          {/* Imagem com Prova de Conformidade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-brand-deep aspect-[4/5] max-w-[500px] ml-auto">
              <Image
                src="/images/products/app-mobile.png"
                alt="Aplicativo Mobile TopPonto - Controle de Ponto Digital"
                width={600}
                height={750}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-deep/80 to-transparent" />
            </div>

            {/* Card de Conformidade */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-12 z-20 bg-white p-6 rounded-2xl shadow-2xl border border-green-200 max-w-[280px]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-deep">Portaria 671</p>
                  <p className="text-xs text-gray-600 font-medium">100% em conformidade</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}