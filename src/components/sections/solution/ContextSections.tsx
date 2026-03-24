'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Users, Target, Clock, AlertTriangle } from 'lucide-react'

interface ContextSectionsProps {
  forWho: string[]
  whenToUse: string[]
  problemsSolved: string[]
  risk: string
}

export function ContextSections({ forWho, whenToUse, problemsSolved, risk }: ContextSectionsProps) {
  return (
    <Section variant="white">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Para quem é */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-2xl p-7 border border-blue-200/60"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-deep">Para quem é</h3>
              </div>
              <ul className="space-y-2.5">
                {forWho.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* O que resolve */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-2xl p-7 border border-green-200/60"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-deep">Problemas que resolve</h3>
              </div>
              <ul className="space-y-2.5">
                {problemsSolved.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Quando usar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-2xl p-7 border border-purple-200/60 mb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-deep">Quando usar</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {whenToUse.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-purple-600 font-bold mt-0.5">→</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Risco */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-red-50 to-red-50/50 rounded-2xl p-7 border border-red-200/60"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-deep mb-2">Risco que você evita</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{risk}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
