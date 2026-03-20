'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { motion } from 'framer-motion'
import { CheckCircle2, Target } from 'lucide-react'

interface ProductBenefitsProps {
  benefits: string[]
  applications: string[]
}

export function ProductBenefits({ benefits, applications }: ProductBenefitsProps) {
  return (
    <Section variant="gray">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-vibrant/5 text-brand-vibrant rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-brand-vibrant/10">
              <CheckCircle2 className="w-3 h-3" /> Valor Operacional
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-deep mb-12 tracking-tight">
              Benefícios Reais para sua Gestão
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start p-8 bg-white rounded-[32px] shadow-sm hover:shadow-premium transition-all duration-500 group"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-vibrant flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-500" />
                  <p className="text-text-secondary text-lg font-bold leading-tight group-hover:text-brand-deep transition-colors duration-300">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-brand-deep rounded-[48px] p-10 lg:p-14 text-white h-full relative overflow-hidden shadow-premium border border-white/5">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-vibrant/10 blur-[60px] opacity-100" />
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-brand-vibrant rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-white/10">
                 <Target className="w-3 h-3" /> Onde Aplicar
               </div>
               <h3 className="text-2xl lg:text-3xl font-bold mb-10 tracking-tight text-white">
                Cenários Ideais
               </h3>
               <ul className="space-y-6">
                 {applications.map((app, i) => (
                   <li key={i} className="flex items-center gap-4 text-lg lg:text-xl font-medium text-white/60 border-b border-white/5 pb-5 group transition-colors hover:text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-vibrant group-hover:scale-150 transition-transform" />
                      {app}
                   </li>
                 ))}
               </ul>
               <div className="mt-12 p-8 bg-white/5 rounded-[32px] border border-white/10">
                  <p className="text-sm font-medium leading-relaxed text-white/30 italic">
                    "A 4Core analisa sua estrutura para indicar o modelo de hardware ideal para o seu fluxo específico."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

