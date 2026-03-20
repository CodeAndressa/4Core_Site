'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Target,
  ArrowRight
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'

export function Benefits() {
  const benefits = [
    {
      title: 'Fechamento de folha muito mais rápido',
      subtitle: 'Produtividade no DP',
      icon: <TrendingUp className="w-6 h-6" />,
      desc: 'Uma rotina limpa de erros reduz correções manuais e acelera todo o processo do DP.',
      tags: ['Até 2 dias antes', 'Menos retrabalho']
    },
    {
      title: 'Redução real de riscos jurídicos',
      subtitle: 'Segurança jurídica',
      icon: <ShieldCheck className="w-6 h-6" />,
      desc: 'Com dados consistentes, sua empresa evita passivos trabalhistas e inconsistências legais.',
      tags: ['Zero divergências', 'Conformidade']
    },
    {
      title: 'Equipes mais organizadas e produtivas',
      subtitle: 'Eficiência operacional',
      icon: <Users className="w-6 h-6" />,
      desc: 'Registros corretos melhoram previsibilidade, gestão da jornada e tomada de decisão.',
      tags: ['Precisão nas horas', 'Operação fluida']
    },
    {
      title: 'RH estratégico e focado em pessoas',
      subtitle: 'Foco estratégico',
      icon: <Target className="w-6 h-6" />,
      desc: 'Com menos erros e menos correções, o RH ganha tempo para focar no que realmente importa.',
      tags: ['Menos tarefas', 'Foco humano']
    }
  ]

  return (
    <section className="py-24 bg-surface-gray overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <SectionHeading
               subtitle="O Resultado do Método"
               title="Diferencial 4Core: funciona de verdade."
               description="Os benefícios abaixo são consequência direta de uma implementação técnica precisa e suporte proativo."
             />
             
             <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 text-brand-deep font-bold">
                <div className="w-6 h-6 bg-brand-vibrant/20 rounded-full flex items-center justify-center text-brand-vibrant">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Totalmente integrado com sua folha</span>
              </div>
              <div className="flex items-center gap-4 text-brand-deep font-bold">
                <div className="w-6 h-6 bg-brand-vibrant/20 rounded-full flex items-center justify-center text-brand-vibrant">
                    <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Suporte proativo e humanizado</span>
              </div>
             </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative rounded-[48px] overflow-hidden shadow-2xl border-8 border-white p-2 bg-white"
           >
             <Image 
                src="/images/products/software-web.png" 
                alt="Ecossistema TopPonto (Web e Mobile)" 
                width={700} 
                height={500} 
                className="w-full h-auto rounded-[38px] hover:scale-105 transition-transform duration-1000"
             />
             <div className="absolute -bottom-6 -right-6 bg-brand-vibrant p-10 rounded-full text-white shadow-2xl group cursor-pointer hover:scale-110 transition-transform">
                <ArrowRight size={32} />
             </div>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-12 rounded-[56px] border border-border-light shadow-sm hover:shadow-2xl hover:border-brand-vibrant/20 transition-all group"
            >
              <div className="w-16 h-16 bg-brand-light/30 rounded-2xl flex items-center justify-center text-brand-vibrant mb-8 group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              
              <span className="text-brand-vibrant font-bold text-xs uppercase tracking-widest mb-4 block">
                {item.subtitle}
              </span>
              <h3 className="text-2xl lg:text-3xl font-semibold text-brand-deep mb-6 leading-[1.1] tracking-tight">
                {item.title}
              </h3>
              <p className="text-text-secondary text-lg mb-10 leading-relaxed font-medium">
                {item.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-8 border-t border-border-light">
                {item.tags.map(tag => (
                  <Badge key={tag} className="bg-surface-gray text-brand-deep font-bold border-transparent hover:bg-brand-vibrant hover:text-white transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
