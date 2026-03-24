'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { SolutionVariant } from '@/data/solutions'

interface ProductVariantsProps {
  title?: string
  subtitle?: string
  variants: SolutionVariant[]
  /** Base href para link de cada variante (ex: /solucoes/relogio-de-ponto) */
  basePath?: string
}

export function ProductVariants({ title = 'Modelos e variações', subtitle = 'Escolha a tecnologia ideal para o seu cenário', variants, basePath }: ProductVariantsProps) {
  return (
    <Section variant="white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-vibrant/60 mb-4">
              Tipos disponíveis
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-deep tracking-tight mb-3">
              {title}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {variants.map((variant, i) => {
              const content = (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border-2 border-gray-100 hover:border-brand-vibrant hover:shadow-xl hover:-translate-y-1 transition-all duration-400 overflow-hidden h-full flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={variant.image}
                      alt={variant.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-brand-deep mb-2 group-hover:text-brand-vibrant transition-colors">
                      {variant.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {variant.shortDescription}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-4 flex-1">
                      {variant.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-vibrant shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {basePath && (
                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <span className="text-brand-vibrant font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          Ver detalhes <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    )}
                  </div>
                </motion.article>
              )

              if (basePath) {
                return (
                  <Link key={variant.slug} href={`${basePath}/${variant.slug}`} className="block h-full focus-visible:outline-none">
                    {content}
                  </Link>
                )
              }

              return <div key={variant.slug} className="h-full">{content}</div>
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
