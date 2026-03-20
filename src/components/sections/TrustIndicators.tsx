'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, FileText, Lock } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

/**
 * Seção de Autoridade e Confiança (Trust Indicators)
 * Reflete o compromisso com a auditoria e conformidade técnica.
 */
export function TrustIndicators() {
  const items = [
    { 
      title: 'Auditoria Mensal', 
      icon: <ShieldCheck className="w-10 h-10 text-brand-vibrant mb-6" />,
      desc: 'Não apenas instalamos. Auditamos mensalmente os logs para garantir que sua empresa permaneça 100% blindada.' 
    },
    { 
      title: 'Integridade de Dados', 
      icon: <FileText className="w-10 h-10 text-brand-vibrant mb-6" />,
      desc: 'Garantimos arquivos AFDT e ACJEF sem edições, prontos para qualquer fiscalização trabalhista ou auditoria externa.' 
    },
    { 
      title: 'Capacitação Estratégica', 
      icon: <Lock className="w-10 h-10 text-brand-vibrant mb-6" />,
      desc: 'Treinamos seu DP para utilizar as ferramentas de forma estratégica, reduzindo o tempo de fechamento da folha.' 
    }
  ]

  return (
    <Section variant="deep" className="relative">
      {/* Visual background treatment */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-vibrant/10 blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col items-start">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-8">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-white/60 text-base leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
