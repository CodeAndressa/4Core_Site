import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/components/forms/ContactForm'
import { company } from '@/data/company'

export const metadata: Metadata = {
  title: 'Fale com um Especialista',
  description:
    'Entre em contato com a 4Core. Nosso time de especialistas está pronto para ajudar sua empresa com controle de ponto e conformidade trabalhista.',
}

/**
 * Página de Contato completa.
 * Apresenta o formulário de conversão e detalhes de suporte direto.
 */
export default function ContatoPage() {
  return (
    <div className="bg-surface-gray min-h-[80vh]">
      <section className="py-12 lg:py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Sidebar info */}
            <div className="lg:w-1/3">
              <SectionHeading
                subtitle="Contato Direto"
                title="Estamos prontos para ouvir sua demanda."
                description="Seja para tirar uma dúvida sobre conformidade ou iniciar um diagnóstico estruturado da sua operação, nossa equipe técnica está à disposição."
                className="mb-10 lg:mb-12"
              />
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-brand-deep text-lg mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-vibrant" />
                    Atendimento comercial
                  </h4>
                  <ul className="space-y-4">
                     <li className="flex items-center gap-4 text-text-secondary">
                        <span className="text-brand-vibrant">📧</span>
                        <a href={`mailto:${company.email}`} className="hover:text-brand-vibrant transition-colors font-medium">{company.email}</a>
                     </li>
                     <li className="flex items-center gap-4 text-text-secondary">
                        <span className="text-brand-vibrant">📞</span>
                        <span className="font-medium">{company.phone}</span>
                     </li>
                  </ul>
                </div>
                
                <div className="bg-brand-light/20 p-8 rounded-3xl border border-brand-light">
                   <h4 className="font-semibold text-brand-deep mb-3">O que esperar?</h4>
                   <p className="text-text-secondary text-sm leading-relaxed">
                     Ao enviar sua solicitação, um consultor sênior analisará seus dados iniciais e entrará em contato em até <span className="font-bold text-brand-deep">24 horas úteis</span> para agendar uma diagnose técnica.
                   </p>
                </div>
              </div>
            </div>
            
            {/* Main Form */}
            <div className="lg:w-2/3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
