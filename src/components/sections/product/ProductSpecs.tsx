import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductSpecs as Specs } from '@/types/product'
import { motion } from 'framer-motion'
import { Settings, Cpu, Share2, ShieldCheck } from 'lucide-react'

interface ProductSpecsProps {
  specs: Specs
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const items = [
    { label: 'Tipo de Dispositivo', value: specs.tipo, icon: <Settings className="w-6 h-6" /> },
    { label: 'Tecnologia Aplicada', value: specs.tecnologia, icon: <Cpu className="w-6 h-6" /> },
    { label: 'Conectividade', value: specs.conectividade, icon: <Share2 className="w-6 h-6" /> },
    { label: 'Conformidade Legal', value: specs.conformidade, icon: <ShieldCheck className="w-6 h-6" /> },
  ]

  return (
    <section className="py-24 bg-surface-gray">
      <Container>
        <SectionHeading
          subtitle="Fundamentos Técnicos"
          title="Especificações de Engenharia"
          description="Nossos equipamentos são selecionados por sua robustez e aderência rigorosa aos padrões técnicos brasileiros."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-[40px] border border-border-light shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-brand-vibrant/10 rounded-2xl flex items-center justify-center text-brand-vibrant mb-8 group-hover:bg-brand-vibrant group-hover:text-white transition-all">
                {item.icon}
              </div>
              <p className="text-xs font-bold text-brand-vibrant uppercase tracking-widest mb-4">
                {item.label}
              </p>
              <h4 className="text-xl font-semibold text-brand-deep tracking-tight">
                {item.value}
              </h4>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
