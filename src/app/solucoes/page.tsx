import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { categories, products } from '@/data/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { ArrowRight, Box, Shield, Users } from 'lucide-react'

const iconMap = {
  'controle-de-jornada': <Box className="w-10 h-10" />,
  'controle-de-acesso': <Shield className="w-10 h-10" />,
  'seguranca-operacional': <Users className="w-10 h-10" />
}

export default function SolutionsDirectory() {
  return (
    <main className="flex-1 min-h-screen bg-surface-white">
      {/* Hero Section */}
      <section className="pb-20 lg:pb-32 bg-brand-deep text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-vibrant/10 blur-3xl pointer-events-none" />
        <Container>
           <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-none mb-10">
              Soluções técnicas <br />
              <span className="text-brand-vibrant underline decoration-white/10 uppercase">em conformidade.</span>
           </h1>
           <p className="text-xl lg:text-3xl text-brand-light/70 max-w-3xl font-medium leading-relaxed">
             Da gestão de jornada ao monitoramento de segurança operacional, entregamos consultoria técnica baseada em performance e estabilidade.
           </p>
        </Container>
      </section>

      {/* Category Folders */}
      <section className="py-24">
        <Container>
          <div className="space-y-32">
            {categories.map((cat, i) => {
              const catProducts = products.filter(p => p.category === cat.slug)
              
              return (
                <div key={cat.slug} className="group">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 border-b border-border-light pb-12">
                     <div className="max-w-3xl">
                        <div className="w-20 h-20 bg-brand-vibrant/10 rounded-3xl flex items-center justify-center text-brand-vibrant mb-8 group-hover:scale-110 transition-transform">
                           {iconMap[cat.slug as keyof typeof iconMap]}
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-semibold text-brand-deep mb-6 tracking-tight">
                           {cat.name}
                        </h2>
                        <p className="text-lg lg:text-xl text-text-secondary leading-relaxed font-medium">
                           {cat.description}
                        </p>
                     </div>
                     <Link 
                        href={`/solucoes/${cat.slug}`}
                        className="inline-flex items-center gap-4 text-brand-vibrant font-bold text-lg uppercase tracking-tight hover:gap-6 transition-all"
                     >
                        Ver categoria completa <ArrowRight />
                     </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                     {catProducts.map((prod) => (
                       <ProductCard
                         key={prod.slug}
                         product={prod}
                       />
                     ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </main>
  )
}
