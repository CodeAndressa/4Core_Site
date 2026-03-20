'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ProblemSolutionProps {
  problem: string
  solution: string
}

export function ProblemSolution({ problem, solution }: ProblemSolutionProps) {
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
              className="bg-white p-10 lg:p-12 rounded-[40px] border border-red-100 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] -translate-y-1/2 translate-x-1/2" />
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-deep mb-6 tracking-tight">O Cenário Comum</h3>
              <p className="text-lg text-text-secondary leading-relaxed font-medium line-clamp-6">
                {problem}
              </p>
              <div className="mt-8 pt-8 border-t border-red-50">
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest">⚠️ Risco de Passivo Trabalhista</span>
              </div>
            </motion.div>

            {/* A Solução 4Core */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-brand-deep p-10 lg:p-12 rounded-[40px] shadow-premium relative overflow-hidden group border border-white/5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-vibrant/20 blur-[50px] -translate-y-1/2 translate-x-1/2" />
              <div className="w-12 h-12 bg-brand-vibrant rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">O Método 4Core</h3>
              <p className="text-lg text-white/80 leading-relaxed font-medium line-clamp-6">
                {solution}
              </p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <span className="text-xs font-bold text-brand-vibrant uppercase tracking-widest">✅ Blindagem Operativa Garantida</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

