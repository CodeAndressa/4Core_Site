'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { ShieldCheck, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface ProductHeroProps {
  name: string
  categoryName: string
  description: string
  image: string
}

export function ProductHero({ name, categoryName, description, image }: ProductHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-surface-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-light/20 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-8">
               <span className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">Soluções</span>
               <ChevronRight size={14} className="text-brand-vibrant" />
               <Badge variant="outline" className="bg-brand-vibrant/5 text-brand-vibrant border-brand-vibrant/20 font-bold uppercase py-0.5">
                {categoryName}
               </Badge>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold text-brand-deep leading-[0.9] tracking-tighter mb-8 ">
              {name}
            </h1>
            
            <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed font-medium mb-10 max-w-xl">
              {description}
            </p>
            
            <div className="flex items-center gap-4 text-brand-vibrant font-bold text-sm uppercase tracking-widest">
                <ShieldCheck className="w-6 h-6" />
                <span>Implementação Técnica Consultiva</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand-vibrant/10 blur-[100px] rounded-full" />
            <div className="relative rounded-[60px] overflow-hidden border-8 border-white shadow-2xl skew-y-1">
               <Image 
                 src={image} 
                 alt={name} 
                 width={800} 
                 height={600} 
                 className="w-full h-auto rounded-[52px] hover:scale-105 transition-all duration-[2000ms]"
                 priority
               />
               <div className="absolute inset-0 bg-brand-vibrant/10 mix-blend-multiply" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
