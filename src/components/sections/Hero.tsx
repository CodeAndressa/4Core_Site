'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

/**
 * Hero Section Professional B2B
 * Foco em Proposta de Valor e Autoridade imediata.
 */
export function Hero() {
  const benefits = [
    'Conformidade com Portaria 671',
    'Integração com principais ERPs',
    'Segurança jurídica e técnica',
  ]

  return (
    <Section variant="gradient" className="pb-16 lg:pb-24">
      {/* Background Blobs for depth */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-vibrant/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-vibrant/5 blur-[100px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-6 py-1.5 px-4 rounded-lg">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Líder em Conformidade Técnica
              </span>
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-deep mb-8 leading-[1.05] tracking-tight">
              Hardware + Método: <br />
              A base sólida para o seu <span className="text-brand-vibrant">controle de jornada.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-xl font-medium">
              Não vendemos apenas tecnologia. Entregamos conformidade absoluta com a 
              Portaria 671 e blindagem jurídica total para a gestão de ponto da sua empresa.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 text-text-secondary font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-vibrant shrink-0" />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contato" size="lg" className="px-8 py-6 text-base font-bold shadow-premium">
                Falar com um Especialista <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button href="/solucoes" variant="outline" size="lg" className="px-8 py-6 text-base font-bold bg-white/50 hover:bg-white text-brand-deep">
                Conhecer Hardware
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {/* Image Container with depth */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-premium bg-brand-deep aspect-[4/5] max-w-[500px] ml-auto">
              <Image
                src="/images/hero-hr.png"
                alt="Gestão de RH Profissional 4Core"
                width={600}
                height={750}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-deep/80 to-transparent" />
            </div>

            {/* Floating Trust Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-12 z-20 glass p-6 rounded-2xl shadow-premium max-w-[280px]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-vibrant/10 rounded-xl flex items-center justify-center text-brand-vibrant">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-deep">Gestão 671</p>
                  <p className="text-xs text-text-secondary font-medium">100% de Conformidade Técnica</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

    </Section>
  )
}


