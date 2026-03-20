import { notFound } from 'next/navigation'
import { getProductBySlug, getCategoryBySlug } from '@/data/products'
import { ProductHero } from '@/components/sections/product/ProductHero'
import { ProblemSolution } from '@/components/sections/product/ProblemSolution'
import { ProductSpecs } from '@/components/sections/product/ProductSpecs'
import { ProductBenefits } from '@/components/sections/product/ProductBenefits'
import { ImplementationBlock } from '@/components/sections/product/ImplementationBlock'
import { CTA } from '@/components/sections/CTA'

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await params
  
  const product = getProductBySlug(slug)
  const category = getCategoryBySlug(categorySlug)

  if (!product || !category || product.category !== categorySlug) {
    notFound()
  }

  return (
    <main className="flex-1 bg-white">
      {/* 1. Hero: Impacto e Proposta de Valor do Produto */}
      <ProductHero 
        name={product.name}
        categoryName={category.name}
        description={product.description}
        image={product.image}
      />
      
      {/* 2. O Cenário: Qual dor resolve e qual solução a 4Core traz */}
      <ProblemSolution 
        problem={product.problem}
        solution={product.solution}
      />
      
      {/* 3. Base Técnica: Robustez e Engenharia */}
      <ProductSpecs 
        specs={product.specs}
      />
      
      {/* 4. Valor Operacional: Onde aplicar e o que ganha */}
      <ProductBenefits 
        benefits={product.benefits}
        applications={product.applications}
      />
      
      {/* 5. Diferencial Crítico: O Método de Implementação 4Core */}
      <ImplementationBlock />
      
      {/* 6. Conversão Final: Especialista e Orçamento Orientado */}
      <CTA />
    </main>
  )
}

