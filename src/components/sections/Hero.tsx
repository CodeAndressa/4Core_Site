'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, ArrowDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

/**
 * Hero Section Premium & Interativa
 * Foco visual em imagens reais e animações Framer Motion.
 */
export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-surface-white">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-light/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-brand-vibrant uppercase bg-brand-light/30 rounded-full border border-brand-vibrant/10"
            >
              <ShieldCheck className="w-4 h-4" />
              Consultoria Técnica Especializada
            </motion.span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-brand-deep leading-[0.9] mb-8 tracking-tighter">
              Controle de ponto <br />
              <span className="text-brand-vibrant">com conformidade total.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed max-w-xl font-medium">
              Implementação de REP-P, integração com folha e suporte proativo para garantir conformidade real no controle de jornada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button href="/contato" size="lg" className="group px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-brand-vibrant/30">
                Fale Conosco <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="/solucoes" variant="outline" size="lg" className="px-10 py-7 text-lg rounded-2xl border-border-default text-brand-deep hover:bg-surface-gray">
                Ver Soluções
              </Button>
            </div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.5 }}
               transition={{ delay: 1, duration: 2 }}
               className="mt-16 flex items-center gap-4 text-brand-deep animate-bounce opacity-50"
            >
                <ArrowDown className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Explore Nosso Método</span>
            </motion.div>
          </motion.div>

          {/* Imagem de Herói Gerada */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand-vibrant/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
              <Image 
                src="/images/hero-hr.png" 
                alt="Gestão de RH Profissional" 
                width={800} 
                height={1000} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            
            {/* Elemento flutuante interativo */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-border-light hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-tight">Status de Conformidade</p>
                  <p className="text-lg font-bold text-brand-deep">100% Protegido</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
