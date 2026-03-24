'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { motion } from 'framer-motion'
import { CheckCircle2, Target, Settings, Cpu, Share2, ShieldCheck } from 'lucide-react'

interface SolutionBenefitsProps {
  benefits: string[]
  specs: { label: string; value: string }[]
  applications: string[]
}

const specIcons = [
  <Settings key={0} className="w-5 h-5" />,
  <Cpu key={1} className="w-5 h-5" />,
  <Share2 key={2} className="w-5 h-5" />,
  <ShieldCheck key={3} className="w-5 h-5" />,
]

export function SolutionBenefits({ benefits, specs, applications }: SolutionBenefitsProps) {
  return (
    <Section variant="gray">
      <Container>
        {/* Specs row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 rounded-2xl border border-black/[0.03] shadow-sm hover:shadow-lg transition-all duration-400 group"
            >
              <div className="w-10 h-10 bg-brand-vibrant/5 rounded-xl flex items-center justify-center text-brand-vibrant mb-4 group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-400">
                {specIcons[i] || specIcons[0]}
              </div>
              <p className="text-[10px] font-bold text-brand-vibrant/60 uppercase tracking-[0.2em] mb-2">
                {spec.label}
              </p>
              <h4 className="text-base font-bold text-brand-deep tracking-tight leading-snug">
                {spec.value}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* Benefits + Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-vibrant/5 text-brand-vibrant rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-brand-vibrant/10">
              <CheckCircle2 className="w-3 h-3" /> Benefícios reais
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-brand-deep mb-8 tracking-tight">
              Por que escolher esta solução
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 items-start p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-400 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-vibrant flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-400" />
                  <p className="text-text-secondary text-sm font-bold leading-snug group-hover:text-brand-deep transition-colors duration-300">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Applications sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-brand-deep rounded-3xl p-8 lg:p-10 text-white h-full relative overflow-hidden shadow-premium border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-vibrant/10 blur-[60px]" />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 text-brand-vibrant rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-white/10">
                <Target className="w-3 h-3" /> Onde aplicar
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-8 tracking-tight text-white">
                Cenários ideais
              </h3>
              <ul className="space-y-4">
                {applications.map((app, i) => (
                  <li key={i} className="flex items-center gap-3 text-base font-medium text-white/60 border-b border-white/5 pb-3 group transition-colors hover:text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-vibrant group-hover:scale-150 transition-transform" />
                    {app}
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-medium leading-relaxed text-white/30 italic">
                  &quot;A 4Core analisa sua estrutura para indicar a solução ideal para o seu cenário específico.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
