import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { getCategoryBySlug, getProductsByCategory } from '@/data/products'
import { ChevronLeft } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params
  const categorySlug = resolvedParams.category
  
  const category = getCategoryBySlug(categorySlug)
  const categoryProducts = getProductsByCategory(categorySlug)

  if (!category) {
    return (
      <Section variant="white" className="pt-48">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-brand-deep mb-8">Categoria não encontrada</h1>
            <Link href="/solucoes" className="text-brand-vibrant font-bold underline">Voltar para Soluções</Link>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <main className="flex-1 bg-white">
      {/* Category Header */}
      <Section variant="gray" className="border-b border-black/[0.03]">
        <Container>
          <Link 
            href="/solucoes" 
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-vibrant mb-12 hover:-translate-x-1 transition-transform"
          >
             <ChevronLeft size={14} /> Voltar para Soluções
          </Link>
          
          <div className="max-w-4xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-vibrant/60 mb-4">Soluções 4Core</span>
            <h1 className="text-5xl lg:text-7xl font-bold text-brand-deep tracking-tight leading-[1.1] mb-8">
              {category.name}
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary font-medium leading-relaxed max-w-3xl">
              {category.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Grid listing */}
      <Section variant="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {categoryProducts.map((prod) => (
              <ProductCard 
                key={prod.slug}
                product={prod}
                badgeText={categorySlug === 'controle-de-jornada' ? 'Jornada' : 'Acesso'}
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  )
}

