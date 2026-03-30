'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { ShieldCheck, ChevronRight, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface ProductHeroProps {
  name: string
  categoryName: string
  description: string
  image: string
}

export function ProductHero({ name, categoryName, description, image }: ProductHeroProps) {
  return (
    <Section variant="white" className="pt-32 lg:pt-48 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-10 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
               <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Soluções 4Core</span>
               <ChevronRight size={12} className="text-brand-vibrant shrink-0" />
               <Badge variant="primary" className="bg-brand-vibrant shadow-sm text-xs py-1 px-3">
                {categoryName}
               </Badge>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold text-brand-deep leading-[1.1] tracking-tight mb-8">
              {name}
            </h1>
            
            <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed font-medium mb-10 max-w-xl">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3 text-brand-vibrant font-bold text-sm uppercase tracking-widest">
                  <ShieldCheck className="w-6 h-6" />
                  <span>Conformidade Portaria 671</span>
              </div>
              <div className="flex items-center gap-3 text-brand-deep font-bold text-sm uppercase tracking-widest opacity-60">
                  <AlertCircle className="w-5 h-5" />
                  <span>Risco Zero na Implementação</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Aspect Ratio container for consistent images */}
            <div className="relative rounded-[40px] overflow-hidden shadow-premium border border-black/[0.03] group aspect-[4/3] lg:aspect-square">
               <Image 
                 src={image} 
                 alt={name} 
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-105"
                 priority
               />
               <div className="absolute inset-0 bg-brand-vibrant/3" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-light rounded-full -z-10 blur-3xl opacity-50" />
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

