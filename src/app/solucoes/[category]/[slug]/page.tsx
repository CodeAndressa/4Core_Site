import { notFound } from 'next/navigation'
import { getProductBySlug, getCategoryBySlug } from '@/data/products'
import { ProductHero } from '@/components/sections/product/ProductHero'
import { ProblemSolution } from '@/components/sections/product/ProblemSolution'
import { ProductSpecs } from '@/components/sections/product/ProductSpecs'
import { ProductBenefits } from '@/components/sections/product/ProductBenefits'
import { CTA } from '@/components/sections/CTA'

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await params
  
  const product = getProductBySlug(slug)
  const category = getCategoryBySlug(categorySlug)

  if (!product || !category || product.category !== categorySlug) {
    notFound()
  }

  return (
    <main className="flex-1 bg-surface-white">
      <ProductHero 
        name={product.name}
        categoryName={category.name}
        description={product.description}
        image={product.image}
      />
      
      <ProblemSolution 
        problem={product.problem}
        solution={product.solution}
      />
      
      <ProductSpecs 
        specs={product.specs}
      />
      
      <ProductBenefits 
        benefits={product.benefits}
        applications={product.applications}
      />
      
      <CTA />
    </main>
  )
}
