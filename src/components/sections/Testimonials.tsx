'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "A 4Core organizou nossa operação de ponto que estava um caos. Hoje o fechamento da folha acontece sem sobressaltos.",
    author: "Diretor de RH",
    company: "Grupo Industrial"
  },
  {
    quote: "O suporte proativo deles é o que realmente faz a diferença. Eles encontram os erros antes de nós.",
    author: "Gerente de DP",
    company: "Serviços Logísticos"
  },
  {
    quote: "Integração limpa com nossa folha de pagamento. Finalmente um sistema que conversa de verdade com os dados.",
    author: "Gestor Financeiro",
    company: "Retailer Nacional"
  }
]

export function Testimonials() {
  return (
    <Section variant="deep" className="overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-0 left-0 w-96 h-96 bg-brand-vibrant/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
       
       <Container>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <SectionHeading
            subtitle="Prova do Método"
            title="Resultados em quem confia."
            description="Empresas que priorizam a segurança jurídica já transformaram sua operação com a 4Core."
            centered
            inverse
            className="mb-16 lg:mb-24"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col p-10 bg-white/[0.03] border border-white/5 rounded-[40px] hover:bg-white/[0.08] hover:border-brand-vibrant/20 transition-all duration-500"
            >
               <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, star) => (
                    <div key={star} className="w-4 h-4 text-brand-vibrant fill-brand-vibrant">
                      ★
                    </div>
                  ))}
               </div>
               <p className="text-white/70 text-lg mb-12 leading-relaxed font-medium italic">
                "{t.quote}"
               </p>
               <div className="mt-auto pt-8 border-t border-white/10">
                  <span className="block font-bold text-white text-base tracking-tight mb-1">{t.author}</span>
                  <span className="block text-brand-vibrant text-sm font-bold opacity-80 uppercase tracking-widest">{t.company}</span>
               </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

