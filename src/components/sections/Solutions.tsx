'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Clock, 
  Shield, 
  Eye,
  ShieldCheck,
  FileText,
  Lock,
  Box,
  Fingerprint
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ui/ProductCard'

// Mostramos apenas os principais para a Home
const featuredProducts = products.filter(p => 
  ['relogio-de-ponto', 'ponto-web', 'catracas'].includes(p.slug)
)

const iconMap = {
  'relogio-de-ponto': <Fingerprint className="w-8 h-8" />,
  'ponto-web': <Box className="w-8 h-8" />,
  'catracas': <Shield className="w-8 h-8" />,
}

export function Solutions() {
  return (
    <section id="portfolio" className="py-24 bg-surface-white">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <SectionHeading
              subtitle="Nossas Frentes de Atuação"
              title="Ecossistema de conformidade."
              description="Da gestão de jornada ao controle de acesso físico, entregamos o que o mercado apenas promete: implementação real e auditoria técnica constante."
              noMargin
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
               href="/solucoes" 
               className="inline-flex items-center gap-4 text-brand-vibrant font-bold uppercase tracking-widest hover:gap-6 transition-all"
            >
              Ver Todas as Soluções <ArrowRight />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {featuredProducts.map((sol, i) => (
            <motion.div
              key={sol.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <ProductCard 
                product={sol} 
                icon={iconMap[sol.slug as keyof typeof iconMap] || <Box />}
                badgeText={sol.category === 'controle-de-jornada' ? 'Jornada' : 'Acesso'}
              />

            </motion.div>
          ))}
        </div>
        
        {/* Auditoria & Garantia */}
        <motion.div 
           initial={{ opacity: 0, y: 100 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-24 p-12 lg:p-20 bg-brand-deep rounded-[60px] text-white relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-vibrant/20 blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative z-10">
              {[
                { 
                  title: 'Auditoria Mensal', 
                  icon: <ShieldCheck className="w-10 h-10 text-brand-vibrant mb-6" />,
                  desc: 'Não apenas instalamos. Auditamos mensalmente os logs de registro para garantir que sua empresa permaneça 100% blindada.' 
                },
                { 
                  title: 'Integridade de Dados', 
                  icon: <FileText className="w-10 h-10 text-brand-vibrant mb-6" />,
                  desc: 'Garantimos arquivos AFDT e ACJEF sem edições, prontos para qualquer fiscalização trabalhista ou auditoria externa.' 
                },
                { 
                  title: 'Treinamento Real', 
                  icon: <Lock className="w-10 h-10 text-brand-vibrant mb-6" />,
                  desc: 'Capacitamos seu DP e RH para utilizar as ferramentas de forma estratégica, otimizando o fechamento da folha.' 
                }
              ].map((item, i) => (
                <div key={i}>
                  {item.icon}
                  <h4 className="text-2xl font-semibold text-white mb-6 uppercase tracking-tight ">
                    {item.title}
                  </h4>
                  <p className="text-brand-light/70 text-base leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
           </div>
        </motion.div>
      </Container>
    </section>
  )
}

