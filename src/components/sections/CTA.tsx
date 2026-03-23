'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { getWhatsAppUrl } from '@/lib/constants'

export function CTA() {
  return (
    <Section variant="white" className="overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative nebula-stage rounded-[48px] p-12 lg:p-24 text-white shadow-premium"
        >
          <div className="nebula-layer nebula-layer-a" />
          <div className="nebula-layer nebula-layer-b" />
          <div className="nebula-vignette" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex gap-4 mb-10">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                  <ShieldCheck size={24} className="text-brand-lilac" />
                </div>
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                  <Zap size={24} className="text-brand-lilac" />
                </div>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight">
                Pronto para eliminar <br /> riscos trabalhistas?
              </h2>

              <p className="text-lg lg:text-xl text-white/75 mb-12 leading-relaxed max-w-md font-medium">
                Agende uma avaliacao gratuita e descubra como a 4Core pode blindar sua empresa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contato" className="bg-white text-brand-nebula hover:bg-brand-light px-10 py-6 text-base font-bold border-none">
                  Solicitar avaliacao gratuita <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  href={getWhatsAppUrl()}
                  target="_blank"
                  className="bg-green-600 text-white hover:bg-green-700 px-10 py-6 text-base font-bold border-none cta-glow"
                >
                  <MessageCircle className="mr-2 w-5 h-5" /> Falar no WhatsApp
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
                  src="/images/cta-access.png"
                  alt="Tecnologia de Acesso 4Core"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180430]/90 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-premium border border-border-light"
              >
                <span className="block text-4xl font-black text-brand-vibrant leading-none mb-2">100%</span>
                <span className="text-xs font-bold text-brand-deep uppercase tracking-widest leading-tight block">
                  Conformidade <br />
                  garantida
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
