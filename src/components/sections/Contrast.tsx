'use client'

import { motion } from 'framer-motion'
import { Check, X, Terminal, Activity, Zap } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Contrast() {
  const points = [
    {
      title: 'Configuração técnica',
      icon: <Terminal className="w-6 h-6" />,
      problem: 'Instalação rápida e genérica sem método.',
      solution: 'Parametrização orientada à Portaria 671 e às regras da sua empresa.',
    },
    {
      title: 'Integração com folha',
      icon: <Activity className="w-6 h-6" />,
      problem: 'Dados inconsistentes que geram retrabalho no fechamento.',
      solution: 'Fluxo de dados limpo e validado, pronto para o fechamento mensal.',
    },
    {
      title: 'Suporte consultivo',
      icon: <Zap className="w-6 h-6" />,
      problem: 'Atendimento reativo que só aparece após a crise.',
      solution: 'Prevenção de falhas e suporte especializado proativo.',
    }
  ]

  return (
    <Section variant="deep" className="relative">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-vibrant/10 blur-[150px] rounded-full pointer-events-none" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            subtitle="Diferencial 4Core"
            title="Onde o mercado falha, nós entregamos método."
            description="Enquanto o mercado entrega apenas o equipamento, a 4Core estrutura processos que garantem a conformidade total da sua operação."
            inverse
            className="max-w-4xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 lg:mt-24">
          {points.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group flex flex-col p-8 bg-white/[0.04] border border-white/5 rounded-[32px] hover:bg-white/[0.08] hover:border-brand-vibrant/20 transition-all duration-500"
            >
               <div className="w-16 h-16 bg-brand-vibrant/20 rounded-2xl flex items-center justify-center text-brand-vibrant mb-8 group-hover:scale-105 transition-transform duration-500">
                {point.icon}
               </div>
               
               <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">
                {point.title}
              </h3>
              
              <div className="mt-auto space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full bg-red-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <p className="text-white/50 text-sm font-medium leading-relaxed">
                    {point.problem}
                  </p>
                </div>
                
                <div className="flex gap-4 items-start p-6 bg-brand-vibrant/10 rounded-2xl border border-brand-vibrant/10 group-hover:bg-brand-vibrant/20 transition-colors duration-500">
                  <div className="w-5 h-5 rounded-full bg-brand-vibrant flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-brand-light text-sm font-bold leading-relaxed">
                    {point.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

