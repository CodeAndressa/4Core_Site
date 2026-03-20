import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductSpecs as Specs } from '@/types/product'
import { motion } from 'framer-motion'
import { Settings, Cpu, Share2, ShieldCheck } from 'lucide-react'

interface ProductSpecsProps {
  specs: Specs
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const items = [
    { label: 'Estrutura e Gabinete', value: specs.tipo, icon: <Settings className="w-5 h-5" /> },
    { label: 'Processamento e Sensores', value: specs.tecnologia, icon: <Cpu className="w-5 h-5" /> },
    { label: 'Protocolos de Rede', value: specs.conectividade, icon: <Share2 className="w-5 h-5" /> },
    { label: 'Padrão Regulatório', value: specs.conformidade, icon: <ShieldCheck className="w-5 h-5" /> },
  ]

  return (
    <Section variant="white" id="specs">
      <Container>
        <SectionHeading
          subtitle="Engenharia e Robustez"
          title="Especificações Técnicas"
          description="Hardware desenvolvido para operações de alta criticidade e aderência rigorosa aos padrões técnicos brasileiros."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 lg:p-10 bg-white rounded-[32px] border border-black/[0.03] shadow-sm hover:shadow-premium transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-brand-vibrant/5 rounded-2xl flex items-center justify-center text-brand-vibrant mb-8 group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <p className="text-[10px] font-bold text-brand-vibrant/60 uppercase tracking-[0.2em] mb-4">
                {item.label}
              </p>
              <h4 className="text-xl font-bold text-brand-deep tracking-tight leading-snug">
                {item.value}
              </h4>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

