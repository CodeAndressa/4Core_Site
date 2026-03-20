import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { getCategoryBySlug, getProductsByCategory } from '@/data/products'
import { ChevronLeft } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params
  console.log(">> ROUTE HIT [category]:", resolvedParams)
  const categorySlug = resolvedParams.category
  
  const category = getCategoryBySlug(categorySlug)
  const categoryProducts = getProductsByCategory(categorySlug)

  if (!category) {
    console.log(">> CATEGORY NOT FOUND FOR:", categorySlug)
    return <div className="p-20 text-black">Erro: Categoria não encontrada para slug: "{categorySlug}"</div>
  }

  return (
    <main className="flex-1 bg-surface-white">
      {/* Category Header */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-24 border-b border-border-light">
        <Container>
          <Link 
            href="/solucoes" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-vibrant mb-12 hover:-translate-x-2 transition-transform"
          >
             <ChevronLeft size={16} /> Voltar para Soluções
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-brand-deep tracking-tighter leading-none mb-10">
              {category.name}
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary font-medium leading-relaxed ">
              {category.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Grid listing specific to the category */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categoryProducts.map((prod) => (
              <ProductCard 
                key={prod.slug}
                product={prod}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
