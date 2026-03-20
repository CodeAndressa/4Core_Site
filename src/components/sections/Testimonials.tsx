import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const testimonials = [
  {
    quote: "A 4Core organizou nossa operação de ponto que estava um caos. Hoje o fechamento da folha acontece sem sobresaltos.",
    author: "Diretor de RH",
    company: "Grupo Industrial"
  },
  {
    quote: "O suporte proativo deles é o que realmente faz a diferença. Eles encontram os erros antes de nós.",
    author: "Gerente de DP",
    company: "Serviços Logísticos"
  },
  {
    quote: "Integração limpa com nossa folha de pagamento. Finalmente um sistema que conversa de verdade com os dados.",
    author: "Gestor Financeiro",
    company: "Retailer Nacional"
  }
]

/**
 * Seção de Testemunhos inspirada no site 4core.site
 */
export function Testimonials() {
  return (
    <section className="py-24 bg-brand-deep overflow-hidden relative">
       {/* Background accent */}
       <div className="absolute top-0 left-0 w-64 h-64 bg-brand-vibrant/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
       
       <Container>
        <SectionHeading
          subtitle="A Prova do Método"
          title="O que dizem sobre nós."
          description="Resultados reais em empresas que buscam segurança jurídica no controle de jornada."
          centered
          inverse
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all duration-300">
               <div className="text-3xl mb-6 text-brand-vibrant">
                ★★★★★
               </div>
               <p className="text-brand-light/70 text-lg mb-8 leading-relaxed">
                "{t.quote}"
               </p>
               <div className="pt-6 border-t border-white/10">
                  <span className="block font-bold text-white text-sm uppercase tracking-widest">{t.author}</span>
                  <span className="block text-brand-vibrant text-xs font-bold mt-1 opacity-70">{t.company}</span>
               </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
