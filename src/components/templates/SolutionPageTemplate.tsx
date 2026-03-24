import type { Solution } from '@/data/solutions'
import { SolutionHero, SolutionOverview, ProductVariants, ContextSections, SolutionBenefits } from '@/components/sections/solution'
import { ImplementationSection } from '@/components/sections/product/ImplementationSection'
import { CTA } from '@/components/sections/CTA'

const trustBadgeByCategory: Record<string, string> = {
  'controle-de-jornada': 'Conformidade Portaria 671',
  'controle-de-acesso': 'Projeto técnico certificado',
  'seguranca-operacional': 'Auditoria patrimonial garantida',
}

interface SolutionPageTemplateProps {
  solution: Solution
  parentLink?: { href: string; label: string }
  /** Base path for variant links (e.g. /solucoes/relogio-de-ponto) */
  variantsBasePath?: string
  variantsTitle?: string
  variantsSubtitle?: string
}

export function SolutionPageTemplate({
  solution,
  parentLink,
  variantsBasePath,
  variantsTitle,
  variantsSubtitle,
}: SolutionPageTemplateProps) {
  return (
    <main className="flex-1 bg-white">
      {/* 1. Hero */}
      <SolutionHero
        name={solution.name}
        categoryLabel={solution.categoryLabel}
        tagline={solution.tagline}
        description={solution.description}
        image={solution.image}
        parentLink={parentLink}
        trustBadgeText={trustBadgeByCategory[solution.category]}
      />

      {/* 2. Problema vs Solução */}
      <SolutionOverview
        problem={solution.problem}
        solution={solution.solution}
      />

      {/* 3. Variantes / Modelos (se houver) */}
      {solution.variants && solution.variants.length > 0 && (
        <ProductVariants
          variants={solution.variants}
          basePath={variantsBasePath}
          title={variantsTitle}
          subtitle={variantsSubtitle}
        />
      )}

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
