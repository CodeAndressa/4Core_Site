import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface ProductBenefitsProps {
  benefits: string[]
  applications: string[]
}

export function ProductBenefits({ benefits, applications }: ProductBenefitsProps) {
  return (
    <section className="py-24 bg-surface-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <h2 className="text-3xl lg:text-4xl font-semibold text-brand-deep mb-12 uppercase tracking-tight">
              Benefícios Operacionais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start p-6 bg-surface-gray rounded-3xl group hover:bg-brand-vibrant/5 transition-colors"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-vibrant flex-shrink-0 mt-0.5" />
                  <p className="text-text-secondary text-lg font-bold leading-tight group-hover:text-brand-deep transition-colors">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-brand-deep rounded-[60px] p-12 text-white h-full relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-vibrant/20 blur-3xl opacity-50" />
               <h3 className="text-2xl font-semibold mb-8 uppercase tracking-widest text-brand-vibrant">
                Onde Aplicar
               </h3>
               <ul className="space-y-6">
                 {applications.map((app, i) => (
                   <li key={i} className="flex items-center gap-4 text-xl font-medium text-brand-light/70 border-b border-white/5 pb-4">
                      <span className="w-2 h-2 rounded-full bg-brand-vibrant" />
                      {app}
                   </li>
                 ))}
               </ul>
               <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-sm font-medium leading-relaxed text-white/40">
                    A 4Core analisa sua estrutura para indicar o modelo de bloqueio ou coletor ideal para o seu fluxo.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
