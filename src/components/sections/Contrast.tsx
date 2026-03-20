'use client'

import { motion } from 'framer-motion'
import { Check, X, Terminal, Activity, Zap } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Contrast() {
  const points = [
    {
      title: 'Configuração Técnica',
      icon: <Terminal className="w-6 h-6" />,
      problem: 'O mercado instala rápido e sem método.',
      solution: 'Parametrização correta desde o primeiro dia, alinhada à Portaria 671.',
    },
    {
      title: 'Integração com Folha',
      icon: <Activity className="w-6 h-6" />,
      problem: 'Integrações mal feitas que geram erros no fechamento.',
      solution: 'Integração limpa e real, sem inconsistências ou duplicidades.',
    },
    {
      title: 'Suporte e Presença',
      icon: <Zap className="w-6 h-6" />,
      problem: 'Só aparecem quando o problema já aconteceu.',
      solution: 'Suporte proativo que previne falhas antes que virem problemas.',
    }
  ]

  return (
    <section className="py-24 bg-brand-deep text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 text-[300px] font-bold text-white/[0.03] select-none pointer-events-none translate-x-1/4 leading-none">
        4CORE
      </div>
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            subtitle="A Diferença da 4Core"
            title="O mercado promete, mas não faz."
            description="Enquanto o mercado entrega tecnologia instável, a 4Core entrega processos que funcionam de verdade."
            inverse
            className="max-w-4xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {points.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group p-8 bg-white/[0.03] border border-white/10 rounded-[40px] hover:bg-white/[0.08] hover:border-brand-vibrant/30 transition-all duration-500"
            >
               <div className="w-14 h-14 bg-brand-vibrant/20 rounded-2xl flex items-center justify-center text-brand-vibrant mb-8 group-hover:scale-110 transition-transform">
                {point.icon}
               </div>
               
               <h3 className="text-xl font-semibold text-white mb-8 tracking-tight">
                {point.title}
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-white/40 text-sm font-medium">
                    {point.problem}
                  </p>
                </div>
                
                <div className="flex gap-4 items-start p-5 bg-brand-vibrant/10 rounded-2xl border border-brand-vibrant/20 group-hover:bg-brand-vibrant/20 transition-colors">
                  <Check className="w-5 h-5 text-brand-vibrant mt-1 flex-shrink-0" />
                  <p className="text-brand-light text-sm font-bold leading-relaxed">
                    {point.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
