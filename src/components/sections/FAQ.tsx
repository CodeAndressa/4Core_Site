import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const faqs = [
  {
    q: 'A 4Core vende relógios de ponto físicos?',
    a: 'Entregamos soluções completas que incluem hardware certificado (REP-P e REP-C), mas nosso foco principal é a implementação correta e a segurança jurídica operacional desses dispositivos.'
  },
  {
    q: 'O sistema está de acordo com a Portaria 671?',
    a: 'Sim, todos os sistemas e hardwares recomendados e implementados pela 4Core estão em total conformidade com a Portaria 671 do MTE, garantindo validade jurídica às marcações.'
  },
  {
    q: 'É possível integrar com qualquer folha de pagamento?',
    a: 'Sim. Projetamos integrações limpas e reais com os principais softwares de ERP e folha do mercado brasileiro, evitando duplicidades de dados e erros de importação.'
  },
  {
    q: 'Como funciona o suporte proativo da 4Core?',
    a: 'Diferente do mercado tradicional, nossa equipe monitora indicadores de operação e antecipa inconsistências de dados antes que elas afetem o fechamento da sua folha.'
  }
]

/**
 * Seção de FAQ inspirada no site 4core.site
 */
export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-surface-white">
      <Container>
        <SectionHeading
          subtitle="Tire Suas Dúvidas"
          title="Frequentes"
          description="Respostas diretas sobre como blindamos sua operação de ponto."
          centered
        />
        
        <div className="max-w-3xl mx-auto space-y-6 mt-12">
          {faqs.map((faq, i) => (
            <div key={i} className="group p-8 bg-surface-gray rounded-3xl border border-border-light hover:bg-white hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-brand-deep mb-4 flex items-start gap-4">
                <span className="text-brand-vibrant block pt-0.5 select-none">Q.</span>
                {faq.q}
              </h3>
              <p className="text-text-secondary text-base leading-relaxed pl-9">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
