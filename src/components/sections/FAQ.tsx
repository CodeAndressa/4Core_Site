'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const faqs = [
  {
    q: 'A 4Core vende relógios de ponto físicos?',
    a: 'Sim, entregamos hardware certificado (REP-P e REP-C), mas nosso diferencial é a implementação correta e a segurança jurídica contínua desses dispositivos.'
  },
  {
    q: 'O sistema está de acordo com a Portaria 671?',
    a: 'Sim, todos os hardwares e softwares implementados pela 4Core estão em total conformidade com a Portaria 671 do MTE, garantindo validade jurídica total.'
  },
  {
    q: 'É possível integrar com qualquer folha de pagamento?',
    a: 'Sim. Projetamos integrações reais com os principais ERPs e sistemas de folha, evitando duplicidade de dados e erros de importação.'
  },
  {
    q: 'Como funciona o suporte proativo da 4Core?',
    a: 'Diferente do mercado tradicional, nossa equipe monitora indicadores de operação e antecipa inconsistências antes que elas afetem o fechamento da sua folha.'
  }
]

export function FAQ() {
  return (
    <Section variant="gray" id="faq">
      <Container>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <SectionHeading
            subtitle="Dúvidas Frequentes"
            title="Perguntas comuns."
            description="Respostas diretas sobre como blindamos e otimizamos sua operação de ponto."
            centered
            className="mb-16 lg:mb-24"
          />
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-8 lg:p-10 bg-white rounded-3xl border border-black/[0.03] hover:shadow-premium transition-all duration-300"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-brand-deep mb-4 flex items-start gap-4">
                <span className="text-brand-vibrant block pt-0.5 select-none font-black">?</span>
                {faq.q}
              </h3>
              <p className="text-text-secondary text-base lg:text-lg leading-relaxed pl-8 lg:pl-10 font-medium">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

