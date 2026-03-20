'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Compass, BookOpen, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-surface-white overflow-visible">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative isolate">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'circOut' }}
              className="relative z-10"
            >
              <div className="absolute -inset-6 bg-brand-vibrant/10 blur-3xl rounded-full" />
              <div className="relative bg-white border border-border-light p-10 lg:p-12 rounded-[56px] shadow-2xl">
                 <div className="relative h-[500px] w-full rounded-[40px] overflow-hidden mb-10 border border-border-light">
                   <Image 
                      src="/images/team-consulting.png" 
                      alt="Consultoria 4Core em reunião de estratégia" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-110 transition-transform duration-[2000ms]"
                   />
                 </div>
                 
                 <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-deep tracking-tight mb-1">
                        Consultoria Especializada
                      </h3>
                      <p className="text-text-secondary font-medium">Segurança e Processo em primeiro lugar.</p>
                    </div>
                    <Button href="/sobre" variant="outline" className="border-border-default rounded-2xl group py-6 px-8 h-auto shadow-sm">
                      Nossa História <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <SectionHeading
              subtitle="Fundamento & Propósito"
              title="Precisão onde sempre faltou."
              description="Nascemos da percepção de que o mercado não entrega o básico: implementação correta, integração limpa e suporte que realmente resolve. Estamos aqui para restaurar a ordem na sua operação de ponto."
            />
            
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 rounded-[24px] bg-brand-light/30 flex items-center justify-center text-brand-vibrant flex-shrink-0 group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-500 shadow-sm">
                    <Compass size={28} />
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-brand-deep mb-3 tracking-tight ">
                    Restabelecendo a Confiança
                  </h4>
                  <p className="text-text-secondary text-base lg:text-lg leading-relaxed font-medium">
                    A 4Core existe para devolver controle e tranquilidade a quem carrega a operação nas costas. Restauramos a confiança nos dados para gestores e colaboradores.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-8 group">
                <div className="w-16 h-16 rounded-[24px] bg-brand-light/30 flex items-center justify-center text-brand-vibrant flex-shrink-0 group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-500 shadow-sm">
                    <BookOpen size={28} />
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-brand-deep mb-3 tracking-tight ">
                    Institucionalizando o Processo
                  </h4>
                  <p className="text-text-secondary text-base lg:text-lg leading-relaxed font-medium">
                    Transformamos o improviso em método. Nosso diferencial não é apenas tecnologia, é como as pessoas e os sistemas trabalham em harmonia e conformidade.
                  </p>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button href="/contato" size="lg" className="px-12 py-8 text-xl rounded-[24px] w-full lg:w-auto shadow-2xl shadow-brand-vibrant/30">
                  Agende sua Auditoria Técnica
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
