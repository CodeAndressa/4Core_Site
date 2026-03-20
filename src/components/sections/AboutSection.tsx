'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Compass, BookOpen, ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function AboutSection() {
  return (
    <Section variant="white" id="sobre">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Image mask/frame premium */}
            <div className="relative z-10 rounded-[48px] overflow-hidden shadow-premium aspect-square lg:aspect-[4/5] max-w-[500px]">
              <Image 
                src="/images/team-consulting.png" 
                alt="Consultoria 4Core em reunião de estratégia" 
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-light rounded-full -z-10 blur-xl" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <SectionHeading
              subtitle="Fundamento & Método"
              title="A precisão que o RH precisa."
              description="Nascemos da percepção de que o mercado entrega apenas tecnologia. A 4Core entrega processos, conformidade e suporte especializado."
            />
            
            <div className="space-y-10 mt-12">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-light/50 flex items-center justify-center text-brand-vibrant shrink-0 group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-500">
                    <Compass size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-deep mb-3 tracking-tight">
                    Restaurando a Confiança
                  </h4>
                  <p className="text-text-secondary text-base leading-relaxed font-medium">
                    Devolvemos o controle total dos dados de jornada para o DP e RH, eliminando a insegurança jurídica e operacional.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-light/50 flex items-center justify-center text-brand-vibrant shrink-0 group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-500">
                    <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-deep mb-3 tracking-tight">
                    Institucionalizando Processos
                  </h4>
                  <p className="text-text-secondary text-base leading-relaxed font-medium">
                    Transformamos tecnologia instável em método certificado. Garantimos que sua operação de ponto funcione em harmonia com a lei.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Button href="/contato" size="lg" className="px-10 py-6 text-base font-bold shadow-premium">
                Agende uma Auditoria Técnica <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

