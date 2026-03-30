'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface SolutionHeroProps {
  name: string
  categoryLabel: string
  tagline: string
  description: string
  image: string
  parentLink?: { href: string; label: string }
  trustBadgeText?: string
}

export function SolutionHero({ name, categoryLabel, tagline, description, image, parentLink, trustBadgeText }: SolutionHeroProps) {
  return (
    <Section variant="white" className="pt-32 lg:pt-44 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <Link href="/solucoes" className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.15em] hover:text-brand-vibrant transition-colors">
                Soluções
              </Link>
              <span className="text-brand-vibrant text-xs">›</span>
              {parentLink && (
                <>
                  <Link href={parentLink.href} className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.15em] hover:text-brand-vibrant transition-colors">
                    {parentLink.label}
                  </Link>
                  <span className="text-brand-vibrant text-xs">›</span>
                </>
              )}
              <Badge variant="primary" className="bg-brand-vibrant shadow-sm text-xs py-1 px-3">
                {categoryLabel}
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-brand-deep leading-[1.1] tracking-tight mb-6">
              {name}
            </h1>

            <p className="text-xl lg:text-2xl text-brand-vibrant font-semibold mb-4">
              {tagline}
            </p>

            <p className="text-lg text-text-secondary leading-relaxed font-medium mb-10 max-w-xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contato" className="bg-brand-vibrant text-white hover:bg-brand-deep px-8 py-4 text-sm font-bold border-none">
                Solicitar proposta <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              {trustBadgeText && (
                <div className="flex items-center gap-3 text-brand-deep font-bold text-sm uppercase tracking-widest opacity-70">
                  <ShieldCheck className="w-5 h-5 text-brand-vibrant" />
                  <span>{trustBadgeText}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative rounded-[32px] overflow-hidden shadow-premium border border-black/[0.03] group aspect-[4/3]">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-brand-vibrant/3" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-light rounded-full -z-10" />
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
