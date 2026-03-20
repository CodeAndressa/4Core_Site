import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const problems = [
  {
    title: 'Risco trabalhista invisível',
    description: 'Empresas sem controle de jornada estruturado acumulam passivos milionários que só aparecem em processos ou auditorias.',
    icon: '⚖️',
  },
  {
    title: 'Inconsistência de dados',
    description: 'Falhas no registro e tratamento de ponto geram divergências no fechamento da folha e erros no pagamento de horas extras.',
    icon: '📉',
  },
  {
    title: 'Desorientação legal',
    description: 'Dificuldade em acompanhar e implementar as constantes mudanças nas portarias (como a 671) e convenções coletivas.',
    icon: '📑',
  },
  {
    title: 'Operação ineficiente',
    description: 'Processos manuais e sem método no controle de jornada consomem tempo produtivo do DP e RH desnecessariamente.',
    icon: '⚙️',
  },
]

/**
 * Seção de Problemas/Dores.
 * Estabelece a necessidade da consultoria focando em riscos reais.
 */
export function Problems() {
  return (
    <section className="py-24 bg-surface-white">
      <Container>
        <SectionHeading
          subtitle="O desafio do controle de ponto"
          title="O que gera risco para seu negócio?"
          description="O controle de jornada não é apenas uma obrigação burocrática, é uma camada crítica de segurança jurídica para qualquer empresa."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, i) => (
            <div 
              key={i} 
              className="group p-8 bg-surface-gray rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border-light"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:bg-brand-vibrant group-hover:text-white transition-colors">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold text-brand-deep mb-4">
                {problem.title}
              </h3>
              <p className="text-text-secondary line-height-relaxed text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
