'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

const integrations = [
  'TOTVS',
  'Senior',
  'Alterdata',
  'Domínio',
  'Nasajon',
  'Secullum',
  'Sankhya',
  'Prosoft',
  'ADP'
]

export function Integrations() {
  return (
    <Section variant="white" className="border-t border-slate-100 py-16">
      <Container>
        <div className="text-center mb-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Integração Universal e Nativa</h3>
          <p className="text-xl md:text-2xl font-bold text-slate-800 max-w-3xl mx-auto">
            O TopPonto exporta o arquivo <span className="text-purple-600">ACJEF / AFDT</span> oficial exigido pelo MTE, 100% integrável com a sua folha de pagamento atual.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {integrations.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
            >
              {name}
            </motion.div>
          ))}
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: integrations.length * 0.05 }}
             className="px-6 py-3 bg-purple-50 border border-purple-200 rounded-xl font-bold text-purple-700 shadow-sm"
          >
            + Qualquer outro ERP B2B
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
