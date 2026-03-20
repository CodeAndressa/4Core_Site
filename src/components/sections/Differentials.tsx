import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const differentials = [
  {
    title: 'Abordagem consultiva',
    description: 'Não apenas instalamos software; entendemos sua regra de negócio e orientamos a melhor prática operacional.',
    icon: '🤝'
  },
  {
    title: 'Especialistas em Portaria 671',
    description: 'Conhecimento técnico profundo nas exigências do MTE para garantir blindagem jurídica total.',
    icon: '📜'
  },
  {
    title: 'Foco em redução de risco',
    description: 'Cada etapa do nosso método é desenhada para eliminar brechas que geram passivo trabalhista.',
    icon: '🛡️'
  },
  {
    title: 'Suporte técnico e jurídico',
    description: 'Equipe multidisciplinar para atender tanto dúvidas sistêmicas quanto interpretações de CCT.',
    icon: '⚖️'
  }
]

/**
 * Diferenciais da 4Core.
 * Reforça o posicionamento: Conformidade, Segurança, Método.
 */
export function Differentials() {
  return (
    <section className="py-24 bg-surface-white">
      <Container>
        <SectionHeading
          subtitle="Por que a 4Core?"
          title="Segurança jurídica e método operacional"
          description="Diferente de empresas que vendem apenas tecnologia, nós entregamos o resultado final: uma operação de ponto blindada e eficiente."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {differentials.map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-3xl mb-6">{item.icon}</div>
              <h3 className="text-lg font-semibold text-brand-deep mb-3 uppercase tracking-wide">
                {item.title}
              </h3>
              <div className="w-10 h-1 bg-brand-vibrant mb-6" />
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
