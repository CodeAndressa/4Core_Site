'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { Solution, SolutionVariant } from '@/data/solutions'
import { SolutionHero, SolutionOverview, ContextSections, SolutionBenefits } from '@/components/sections/solution'
import { ImplementationSection } from '@/components/sections/product/ImplementationSection'
import { CTA } from '@/components/sections/CTA'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

const trustBadgeByCategory: Record<string, string> = {
  'controle-de-jornada': 'Conformidade Portaria 671',
  'controle-de-acesso': 'Projeto técnico certificado',
  'seguranca-operacional': 'Auditoria patrimonial garantida',
}

interface VariantPageTemplateProps {
  solution: Solution
  variant: SolutionVariant
  parentLink: { href: string; label: string }
}

export function VariantPageTemplate({ solution, variant, parentLink }: VariantPageTemplateProps) {
  return (
    <main className="flex-1 bg-white">
      {/* 1. Hero com nome do variant */}
      <SolutionHero
        name={`${solution.name}: ${variant.name}`}
        categoryLabel={solution.categoryLabel}
        tagline={variant.shortDescription}
        description={solution.description}
        image={variant.image}
        parentLink={parentLink}
        trustBadgeText={trustBadgeByCategory[solution.category]}
      />

      {/* 2. Destaques específicos desta tecnologia/modelo */}
      <Section variant="gray">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-vibrant/60 mb-3">
                Por que este modelo
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-brand-deep tracking-tight">
                Destaques da tecnologia {variant.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {variant.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-black/[0.04] shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-vibrant shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-brand-deep leading-snug">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* 3. Problema vs Solução */}
      <SolutionOverview
        problem={solution.problem}
        solution={solution.solution}
      />

      {/* 4. Contexto: Para quem, Quando usar, Problemas, Risco */}
      <ContextSections
        forWho={solution.forWho}
        whenToUse={solution.whenToUse}
        problemsSolved={solution.problemsSolved}
        risk={solution.risk}
      />

      {/* 5. Benefícios + Specs + Aplicações */}
      <SolutionBenefits
        benefits={solution.benefits}
        specs={solution.specs}
        applications={solution.applications}
      />

      {/* 6. Diferencial 4Core */}
      <ImplementationSection category={solution.category} />

      {/* 7. CTA final */}
      <CTA />
    </main>
  )
}
