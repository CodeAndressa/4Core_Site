'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Fingerprint, Box, Shield } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ui/ProductCard'

// Mostramos apenas os principais para a Home
const featuredProducts = products.filter(p => 
  ['relogio-de-ponto', 'ponto-web', 'catracas'].includes(p.slug)
)

const iconMap = {
  'relogio-de-ponto': <Fingerprint className="w-8 h-8" />,
  'ponto-web': <Box className="w-8 h-8" />,
  'catracas': <Shield className="w-8 h-8" />,
}

export function Solutions() {
  return (
    <Section id="solucoes" variant="white">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <SectionHeading
              subtitle="Nossas Soluções"
              title="Tecnologia a serviço da conformidade."
              description="Do hardware robusto ao software inteligente, entregamos um ecossistema completo para gestão de jornada e acesso."
              noMargin
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link 
               href="/solucoes" 
               className="group inline-flex items-center gap-4 text-brand-vibrant font-bold uppercase tracking-wider text-sm hover:gap-6 transition-all"
            >
              Ver Todas as Soluções <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProducts.map((sol, i) => (
            <motion.div
              key={sol.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <ProductCard 
                product={sol} 
                icon={iconMap[sol.slug as keyof typeof iconMap] || <Box />}
                badgeText={sol.category === 'controle-de-jornada' ? 'Jornada' : 'Acesso'}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}


