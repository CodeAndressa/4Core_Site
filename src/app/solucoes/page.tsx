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
    <main className="flex-1 min-h-screen bg-white">
      {/* Hero Section - Compacto */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-deep mb-6 tracking-tight">
              Nossas Soluções
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Portfólio completo de relógios de ponto, software e controle de acesso para sua empresa.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Sections */}
      <section className="py-16">
        <Container>
          <div className="space-y-24">
            {categories.map((cat, i) => {
              const catProducts = products.filter(p => p.categories.includes(cat.slug as any))
              
              return (
                <div key={cat.slug} id={cat.slug}>
                  {/* Category Header */}
                  <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-brand-vibrant/10 rounded-xl flex items-center justify-center text-brand-vibrant">
                        {iconMap[cat.slug as keyof typeof iconMap]}
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-brand-deep tracking-tight">
                        {cat.name}
                      </h2>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed max-w-3xl">
                      {cat.description}
                    </p>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
