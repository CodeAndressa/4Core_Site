'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, ShieldX, FileWarning, TrendingDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

/**
 * Seção de Risco (Impacto e Consequências)
 * Focado em CRO para gerar urgência e mostrar o valor da conformidade.
 */
export function RiskSection() {
  const risks = [
    {
      title: 'Passivo trabalhista',
      icon: <FileWarning className="w-10 h-10 text-red-500 mb-6" />,
      desc: 'Relógios mal configurados e logs editáveis são a maior causa de condenações na justiça do trabalho.'
    },
    {
      title: 'Multas por descumprimento',
      icon: <ShieldX className="w-10 h-10 text-red-500 mb-6" />,
      desc: 'A Portaria 671 exige conformidade técnica absoluta. O descumprimento gera multas pesadas por cada colaborador.'
    },
    {
      title: 'Inconsistência de dados',
      icon: <TrendingDown className="w-10 h-10 text-red-500 mb-6" />,
      desc: 'Erros na importação de dados para a folha geram retrabalho e pagamentos indevidos que drenam seu caixa.'
    }
  ]

  return (
    <Section variant="gray" id="riscos">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-red-100">
              <AlertTriangle className="w-4 h-4" /> Alerta de Risco
            </div>
            <SectionHeading
              title="Sua gestão de ponto é uma bomba relógio ou uma blindagem jurídica?"
              description="A maioria das empresas acredita que comprar um relógio de ponto resolve o problema. A realidade é que hardware sem implementação técnica é apenas um gerador de provas contra você."
              noMargin
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 lg:p-14 rounded-[48px] shadow-premium border border-red-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[60px] translate-x-1/2 -translate-y-1/2" />
            
            <h4 className="text-3xl font-bold text-brand-deep mb-8 tracking-tight">O custo da "solução simples":</h4>
            <div className="space-y-6">
              {[
                'Processos trabalhistas por horas extras não computadas',
                'Logs de registro vulneráveis e passíveis de fraude',
                'Divergência entre o ponto e a folha de pagamento',
                'Hardware desatualizado para a nova Portaria 671'
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                  </div>
                  <span className="text-text-secondary font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {risks.map((risk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-[40px] border border-black/[0.03] shadow-sm hover:shadow-premium transition-all duration-500 group"
            >
              <div className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                {risk.icon}
              </div>
              <h5 className="text-xl font-bold text-brand-deep mb-4 tracking-tight">{risk.title}</h5>
              <p className="text-text-secondary font-medium leading-relaxed">{risk.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
