'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { getWhatsAppUrl } from '@/lib/constants'

export function CTA() {
  return (
    <section className="py-24 bg-surface-white overflow-hidden">
      <Container>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-brand-vibrant rounded-[60px] p-12 lg:p-24 text-white overflow-hidden shadow-2xl shadow-brand-vibrant/40"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[800px] h-full bg-white/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-deep/20 rounded-full blur-[80px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex gap-4 mb-8">
                 <div className="bg-white/20 p-3 rounded-2xl border border-white/30 backdrop-blur-md">
                    <ShieldCheck size={28} />
                 </div>
                 <div className="bg-white/20 p-3 rounded-2xl border border-white/30 backdrop-blur-md">
                    <Zap size={28} />
                 </div>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-semibold mb-8 leading-[0.9] tracking-tighter">
                Sua folha <br /> livre de erros <br /> <span className="opacity-50 underline decoration-white/30">hoje mesmo.</span>
              </h2>
              <p className="text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed max-w-md font-medium">
                Transformamos inconsistências jurídicas em processos de auditoria técnica automatizada.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Button 
                    href="/contato" 
                    className="bg-white text-brand-vibrant hover:bg-brand-deep hover:text-white px-10 py-7 text-xl rounded-2xl shadow-xl transition-all h-auto group"
                >
                  Consultoria Técnica <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                    href={getWhatsAppUrl()} 
                    target="_blank"
                    className="bg-brand-deep text-white hover:bg-white hover:text-brand-deep px-10 py-7 text-xl rounded-2xl transition-all h-auto group border-white/10 border"
                >
                  <MessageCircle className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" /> WhatsApp
                </Button>
              </div>
            </div>

            <motion.div 
               whileHover={{ y: -10, rotate: 1 }}
               className="relative hidden lg:block"
            >
               <div className="absolute -inset-4 bg-white/20 blur-3xl rounded-full" />
               <div className="relative rounded-[40px] overflow-hidden border-8 border-white/20 shadow-2xl skew-x-1">
                 <Image 
                    src="/images/hero-hr.png" 
                    alt="Profissional 4Core" 
                    width={500} 
                    height={600} 
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 bg-brand-vibrant/20 mix-blend-multiply" />
               </div>
               
               {/* Overlay Tag */}
               <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-border-light">
                  <span className="block text-[40px] font-bold text-brand-vibrant leading-none mb-1">98%</span>
                  <span className="text-xs font-bold text-brand-deep uppercase tracking-widest">Precisão de Fechamento</span>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
