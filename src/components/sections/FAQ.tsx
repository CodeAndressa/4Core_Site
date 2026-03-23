'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section variant="white" id="faq">
      <Container>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <SectionHeading
            subtitle="Dúvidas frequentes"
            title="Perguntas comuns"
            description="Respostas diretas sobre como blindamos e otimizamos sua operação de ponto."
            centered
            className="mb-12 lg:mb-16"
          />
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex items-center justify-between gap-4 text-left group hover:opacity-70 transition-opacity"
              >
                <h3 className="text-lg lg:text-xl font-semibold text-brand-deep pr-4">
                  {faq.q}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-brand-vibrant flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-base text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
