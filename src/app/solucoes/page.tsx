'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { solutions } from '@/data/solutions'
import { ArrowRight, Clock, Shield, Lock, Search, CheckCircle2 } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

const categoryConfig = [
  {
    slug: 'controle-de-jornada',
    label: 'Controle de Jornada',
    icon: <Clock className="w-5 h-5" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    borderActive: 'border-blue-500',
    description: 'Registro de ponto, gestão de jornada e conformidade trabalhista',
  },
  {
    slug: 'controle-de-acesso',
    label: 'Controle de Acesso',
    icon: <Lock className="w-5 h-5" />,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    borderActive: 'border-purple-500',
    description: 'Catracas, leitores biométricos e controle de fluxo de pessoas',
  },
  {
    slug: 'seguranca-operacional',
    label: 'Segurança Operacional',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-green-600',
    bg: 'bg-green-50',
    borderActive: 'border-green-500',
    description: 'Controle de rondas e gestão de segurança patrimonial',
  },
]

export default function SolutionsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSolutions = solutions.filter(sol => {
    const matchesCategory = selectedCategory === 'all' || sol.category === selectedCategory
    const matchesSearch =
      sol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedSolutions = categoryConfig
    .map(cat => ({
      ...cat,
      solutions: filteredSolutions.filter(s => s.category === cat.slug),
    }))
    .filter(cat => cat.solutions.length > 0)

  return (
    <main className="flex-1 min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-28 pb-14 bg-gradient-to-b from-brand-light/60 to-white border-b border-gray-100">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-vibrant/10 text-brand-vibrant rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-6 border border-brand-vibrant/15">
              Portfólio completo
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-deep mb-5 tracking-tight leading-[1.1]">
              Soluções 4Core para<br />
              <span className="text-brand-vibrant">controle inteligente</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed mb-10">
              Produto + consultoria + implementação. A 4Core é a integradora que transforma
              equipamentos em sistemas funcionando — do projeto à manutenção.
            </p>

            {/* Category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {categoryConfig.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug === selectedCategory ? 'all' : cat.slug)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                    selectedCategory === cat.slug
                      ? `${cat.borderActive} ${cat.bg} shadow-sm`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${cat.bg} ${cat.color} mb-3`}>
                    {cat.icon}
                  </div>
                  <p className={`text-sm font-bold ${selectedCategory === cat.slug ? cat.color : 'text-brand-deep'} mb-1`}>
                    {cat.label}
                  </p>
                  <p className="text-xs text-text-muted leading-snug">{cat.description}</p>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-4 bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <Container>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-brand-vibrant text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas ({solutions.length})
              </button>
              {categoryConfig.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug === selectedCategory ? 'all' : cat.slug)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-vibrant text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar solução..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-vibrant/30 focus:border-brand-vibrant"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="py-14">
        <Container>
          {filteredSolutions.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Nenhuma solução encontrada.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {groupedSolutions.map((group) => (
                <div key={group.slug} id={group.slug}>
                  {/* Category Header */}
                  <div className="mb-8 flex items-start gap-4">
                    <div className={`w-12 h-12 ${group.bg} ${group.color} rounded-2xl flex items-center justify-center shrink-0 mt-0.5`}>
                      {group.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-brand-deep">{group.label}</h2>
                      <p className="text-sm text-text-secondary mt-0.5">{group.description}</p>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.solutions.map((sol) => (
                      <Link
                        key={sol.slug}
                        href={`/solucoes/${sol.slug}`}
                        className="group block h-full focus-visible:outline-none"
                      >
                        <article className="h-full bg-white rounded-3xl border-2 border-gray-100 hover:border-brand-vibrant hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col">
                          {/* Image */}
                          <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                            <Image
                              src={sol.image}
                              alt={sol.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="absolute top-4 right-4 z-10">
                              <span className="bg-brand-vibrant text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
                                {sol.categoryLabel}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold text-brand-deep mb-2 group-hover:text-brand-vibrant transition-colors">
                              {sol.name}
                            </h3>
                            <p className="text-sm text-brand-vibrant font-semibold mb-3">
                              {sol.tagline}
                            </p>

                            {/* Key problems solved */}
                            <div className="mb-4 space-y-1.5">
                              {sol.problemsSolved.slice(0, 3).map((p, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                  <span>{p}</span>
                                </div>
                              ))}
                            </div>

                            {/* Variants hint */}
                            {sol.variants && sol.variants.length > 0 && (
                              <div className="mb-4 pb-4 border-t border-gray-100 pt-3">
                                <p className="text-xs text-gray-500 font-medium">
                                  {sol.variants.length} {sol.variants.length === 1 ? 'modelo' : 'modelos'}: {sol.variants.map(v => v.name).join(' · ')}
                                </p>
                              </div>
                            )}

                            {/* CTA */}
                            <div className="mt-auto pt-4 border-t border-gray-100">
                              <span className="text-brand-vibrant font-bold text-sm uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all">
                                Ver solução completa <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA banner */}
      <section className="py-16 bg-brand-deep">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Não sabe qual solução escolher?</h2>
            <p className="text-white/70 text-lg mb-8">
              A 4Core faz o diagnóstico completo da sua operação e indica o conjunto ideal de soluções para o seu cenário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-vibrant text-white rounded-xl font-semibold hover:bg-[#8912FF] transition-colors shadow-lg"
              >
                Solicitar diagnóstico gratuito <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={getWhatsAppUrl()}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Falar no WhatsApp
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
