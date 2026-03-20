'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AlertTriangle, Lightbulb } from 'lucide-react'

interface ProblemSolutionProps {
  problem: string
  solution: string
}

export function ProblemSolution({ problem, solution }: ProblemSolutionProps) {
  return (
    <section className="py-24 bg-surface-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-light rounded-[60px] overflow-hidden border border-border-light shadow-sm">
          <div className="bg-white p-16 lg:p-20 group">
             <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-10 group-hover:scale-110 transition-transform">
                <AlertTriangle />
             </div>
             <h3 className="text-3xl font-semibold text-brand-deep mb-8 tracking-tight">O Problema</h3>
             <p className="text-xl text-text-secondary leading-relaxed font-medium">
               {problem}
             </p>
          </div>
          <div className="bg-brand-light/30 p-16 lg:p-20 group border-l border-border-light">
             <div className="w-14 h-14 bg-brand-vibrant/20 rounded-2xl flex items-center justify-center text-brand-vibrant mb-10 group-hover:scale-110 transition-transform">
                <Lightbulb />
             </div>
             <h3 className="text-3xl font-semibold text-brand-deep mb-8 tracking-tight">O Método 4Core</h3>
             <p className="text-xl text-brand-deep leading-relaxed font-bold">
               {solution}
             </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
