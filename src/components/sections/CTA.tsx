'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { getWhatsAppUrl } from '@/lib/constants'

/**
 * Final CTA Section
 * Foco em conversão direta (WhatsApp / Contato) com alto contraste.
 */
export function CTA() {
  return (
    <Section variant="white" className="overflow-hidden">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-brand-deep rounded-[48px] p-12 lg:p-24 text-white overflow-hidden shadow-premium"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[600px] h-full bg-brand-vibrant/10 blur-[120px] translate-x-1/2 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-vibrant/10 rounded-full blur-[100px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex gap-4 mb-10">
                 <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <ShieldCheck size={24} className="text-brand-vibrant" />
                 </div>
                 <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <Zap size={24} className="text-brand-vibrant" />
                 </div>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight">
                Sua folha <br /> livre de erros <br /> 
                <span className="text-brand-vibrant">hoje mesmo.</span>
              </h2>
              
              <p className="text-lg lg:text-xl text-white/60 mb-12 leading-relaxed max-w-md font-medium">
                Transformamos inconsistências jurídicas em processos de auditoria técnica automatizada.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                    href="/contato" 
                    className="bg-brand-vibrant text-white hover:bg-white hover:text-brand-vibrant px-10 py-6 text-base font-bold shadow-premium border-none"
                >
                  Falar com Especialista <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                    href={getWhatsAppUrl()} 
                    target="_blank"
                    className="bg-white/10 text-white hover:bg-white hover:text-brand-deep px-10 py-6 text-base font-bold transition-all border-white/10 border backdrop-blur-sm"
                >
                  <MessageCircle className="mr-2 w-5 h-5 text-brand-vibrant" /> WhatsApp
                </Button>
              </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="relative hidden lg:block"
            >
               <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-premium">
                 <Image 
                    src="/images/hero-hr.png" 
                    alt="Profissional 4Core" 
                    width={500} 
                    height={600} 
                    className="w-full h-auto object-cover grayscale opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-transparent to-transparent" />
               </div>
               
               {/* Overlay Tag */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-premium border border-border-light"
               >
                  <span className="block text-4xl font-black text-brand-vibrant leading-none mb-2">98%</span>
                  <span className="text-xs font-bold text-brand-deep uppercase tracking-widest leading-tight block">Precisão de <br />Fechamento</span>
               </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

