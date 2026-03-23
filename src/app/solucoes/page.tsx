'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { categories, products } from '@/data/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { ArrowRight, Box, Shield, Users, Search } from 'lucide-react'

const iconMap = {
  'controle-de-jornada': <Box className="w-10 h-10" />,
  'controle-de-acesso': <Shield className="w-10 h-10" />,
  'seguranca-operacional': <Users className="w-10 h-10" />
}

export default function SolutionsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categories.includes(selectedCategory as any)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Agrupar por categoria
  const groupedProducts = categories.map(cat => ({
    ...cat,
    products: filteredProducts.filter(p => p.categories.includes(cat.slug as any))
  })).filter(cat => cat.products.length > 0)

  return (
    <main className="flex-1 min-h-screen bg-white">
      {/* Hero Section - Minimalista */}
      <section className="pt-28 pb-8 border-b border-gray-200">
        <Container>
          <h1 className="text-3xl font-bold text-brand-deep mb-2">Soluções</h1>
          <p className="text-gray-600">Portfólio completo para sua empresa</p>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-brand-vibrant text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Todas
              </button>
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-vibrant text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar solução..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-vibrant focus:border-transparent"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <Container>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Nenhuma solução encontrada.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {groupedProducts.map((cat) => (
                <div key={cat.slug} id={cat.slug}>
                  {/* Category Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-brand-vibrant/10 rounded-lg flex items-center justify-center text-brand-vibrant">
                        {iconMap[cat.slug as keyof typeof iconMap]}
                      </div>
                      <h2 className="text-2xl font-bold text-brand-deep">
                        {cat.name}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 ml-13">
                      {cat.description}
                    </p>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.products.map((prod) => (
                      <ProductCard
                        key={prod.slug}
                        product={prod}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
