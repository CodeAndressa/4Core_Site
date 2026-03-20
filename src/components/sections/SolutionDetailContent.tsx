'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Check, 
  ShieldCheck, 
  ArrowRight,
  LayoutDashboard,
  Smartphone,
  UserCheck,
  Fingerprint,
  Lock,
  FileText
} from 'lucide-react'
import { Solution } from '@/types/solution'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import React from 'react'

const iconMap = {
  LayoutDashboard: <LayoutDashboard size={48} />,
  Smartphone: <Smartphone size={48} />,
  UserCheck: <UserCheck size={48} />,
  Fingerprint: <Fingerprint size={48} />,
}

export function SolutionDetailContent({ solution }: { solution: Solution }) {
  return (
    <main className="flex-1 pt-32 pb-24 bg-surface-white">
      <Container>
        {/* Solution Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-brand-light text-brand-vibrant border-brand-vibrant/20 font-bold uppercase tracking-widest px-4 py-1">
              Solução técnica
            </Badge>
            
            <div className="text-brand-vibrant mb-8 flex items-center gap-4">
               <div className="w-20 h-20 bg-brand-vibrant/10 rounded-3xl flex items-center justify-center text-brand-vibrant shadow-sm">
                 {iconMap[solution.iconName as keyof typeof iconMap]}
               </div>
               <h1 className="text-4xl lg:text-6xl font-bold text-brand-deep leading-[0.9] tracking-tighter">
                {solution.title}
               </h1>
            </div>

            <p className="text-xl lg:text-2xl text-text-secondary mb-10 leading-relaxed font-medium">
              {solution.fullDescription}
            </p>
            
            <Button href="/contato" size="lg" className="rounded-2xl px-10 py-7 text-lg shadow-xl shadow-brand-vibrant/20">
              Solicitar auditoria técnica <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative rounded-[56px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(123,0,255,0.2)] border-8 border-white p-2"
          >
             <Image 
                src={solution.image} 
                alt={solution.title} 
                width={800} 
                height={600} 
                className="w-full h-auto rounded-[48px] hover:scale-105 transition-transform duration-[3000ms]"
                priority
             />
          </motion.div>
        </div>

        {/* Problema & Impacto Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-surface-gray rounded-[48px] p-12 border border-border-light relative overflow-hidden group hover:border-brand-vibrant/30 transition-colors"
           >
              <div className="absolute top-0 right-0 p-8 text-brand-vibrant/10 pointer-events-none group-hover:scale-110 transition-transform">
                <ShieldCheck size={120} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-brand-deep mb-6 leading-none">O problema</h2>
              <p className="text-text-secondary text-lg leading-relaxed font-medium relative z-10">
                {solution.problem}
              </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="bg-brand-deep rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                <Lock size={120} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-brand-vibrant mb-6 leading-none ">A solução</h2>
              <p className="text-brand-light/70 text-lg leading-relaxed font-medium relative z-10">
                {solution.impact}
              </p>
           </motion.div>
        </div>

        {/* Benefícios & Como Funciona */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
           <div className="lg:col-span-5 space-y-12">
              <h2 className="text-3xl font-semibold text-brand-deep uppercase tracking-tight flex items-center gap-3">
                 <ShieldCheck className="text-brand-vibrant" /> Diferenciais técnicos
              </h2>
              <div className="space-y-6">
                {solution.benefits.map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 p-6 bg-surface-gray rounded-3xl border border-transparent hover:border-brand-vibrant/20 transition-all hover:bg-white hover:shadow-xl group"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-vibrant/10 flex items-center justify-center text-brand-vibrant group-hover:bg-brand-vibrant group-hover:text-white transition-all">
                      <Check size={16} />
                    </div>
                    <span className="text-text-secondary font-bold text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
           </div>

           <div className="lg:col-span-7 space-y-12">
              <h2 className="text-3xl font-semibold text-brand-deep uppercase tracking-tight flex items-center gap-3">
                 <FileText className="text-brand-vibrant" /> Plano de implementação
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {solution.howItWorks.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 border border-border-light rounded-[40px] hover:shadow-xl hover:-translate-y-1 transition-all group"
                  >
                    <span className="text-5xl font-bold text-brand-vibrant/20 block mb-6 leading-none group-hover:text-brand-vibrant transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-text-secondary text-lg font-medium leading-relaxed">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
           </div>
        </div>

        {/* Final Final CTA */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 p-12 lg:p-20 bg-brand-vibrant rounded-[60px] text-white text-center shadow-2xl shadow-brand-vibrant/40 relative overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-[400px] h-full bg-white/10 -skew-x-12 translate-x-[-1/2] pointer-events-none" />
           <h2 className="text-4xl lg:text-6xl font-semibold mb-8 leading-[1] tracking-tighter relative z-10">
             Elimine a insegurança jurídica agora.
           </h2>
           <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-medium relative z-10">
             Agende uma reunião estratégica para entendermos sua operação e propor o melhor ecossistema de conformidade.
           </p>
           <Button href="/contato" className="bg-brand-deep text-white hover:bg-white hover:text-brand-deep px-12 py-8 text-xl rounded-2xl shadow-2xl">
             Agendar reunião técnica <ArrowRight className="ml-2 w-6 h-6" />
           </Button>
        </motion.div>
      </Container>
    </main>
  )
}
