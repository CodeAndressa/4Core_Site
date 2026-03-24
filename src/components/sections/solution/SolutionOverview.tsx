'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface SolutionOverviewProps {
  problem: string
  solution: string
}

export function SolutionOverview({ problem, solution }: SolutionOverviewProps) {
  return (
    <Section variant="gray">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* O Problema */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 lg:p-10 rounded-3xl border border-red-100 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] -translate-y-1/2 translate-x-1/2" />
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-deep mb-4 tracking-tight">O cenário sem solução</h3>
              <p className="text-gray-600 leading-relaxed">{problem}</p>
              <div className="mt-6 pt-6 border-t border-red-50">
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest">⚠️ Risco operacional e trabalhista</span>
              </div>
            </motion.div>

            {/* A Solução 4Core */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-brand-deep p-8 lg:p-10 rounded-3xl shadow-premium relative overflow-hidden group border border-white/5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-vibrant/20 blur-[50px] -translate-y-1/2 translate-x-1/2" />
              <div className="w-12 h-12 bg-brand-vibrant rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">O método 4Core</h3>
              <p className="text-white/80 leading-relaxed">{solution}</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-xs font-bold text-brand-vibrant uppercase tracking-widest">✅ Implementação consultiva garantida</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
