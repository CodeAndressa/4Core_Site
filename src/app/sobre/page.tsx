import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CTA } from '@/components/sections/CTA'
import { company } from '@/data/company'

export const metadata: Metadata = {
  title: 'Sobre a 4Core',
  description:
    'Consultoria especializada em conformidade trabalhista e controle de ponto. O relógio é o meio. A conformidade é o fim.',
}

/**
 * Página Sobre.
 * Foca no posicionamento e propósito da empresa.
 */
export default function SobrePage() {
  return (
    <>
      <section className="py-12 lg:py-16 bg-surface-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-24">
            <div className="lg:w-1/2">
              <SectionHeading
                subtitle="O propósito da 4Core"
                title="Não vendemos apenas tecnologia. Entregamos método e segurança."
                className="mb-8"
              />
              <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                <p>
                  A 4Core nasceu de uma lacuna crítica no mercado brasileiro: o distanciamento entre a tecnologia de controle de jornada e a realidade jurídica do Departamento Pessoal.
                </p>
                <p>
                  Muitas empresas possuem sistemas de ponto modernos, mas continuam acumulando passivos trabalhistas significativos por falta de parametrização correta, método de tratamento e visão preventiva.
                </p>
                <p className="font-bold text-brand-deep">
                  Nós existimos para mudar isso.
                </p>
                <p>
                  Atuamos como o elo técnico entre o sistema de registro e a segurança jurídica operacional. O relógio é apenas o meio de captura; a conformidade com a legislação é o nosso objetivo final e o que realmente gera valor para o seu negócio.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 lg:pt-20">
              {[
                { label: 'Conformidade', desc: '100% de aderência legal às portarias vigentes.', icon: '⚖️' },
                { label: 'Segurança', desc: 'Blindagem contra passivos trabalhistas invisíveis.', icon: '🛡️' },
                { label: 'Método', desc: 'Processos estruturados e documentados com rigor.', icon: '⚙️' },
                { label: 'Tranquilidade', desc: 'Foco no que importa: a operação da sua empresa.', icon: '🧘' },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-surface-gray rounded-3xl border border-border-light shadow-sm">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="font-semibold text-brand-deep mb-2">{item.label}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-gray rounded-[40px] p-12 md:p-20 text-center">
             <SectionHeading
                title="Nossos Valores"
                description="O que guia cada decisão da nossa consultoria."
                centered
                className="mb-12"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { title: 'Excelência técnica', text: 'Não aceitamos o "mais ou menos". Cada parâmetro é verificado com rigor jurídico.' },
                  { title: 'Visão consultiva', text: 'Ouvimos as dores operacionais da sua empresa antes de sugerir qualquer solução.' },
                  { title: 'Ética legal', text: 'Garantimos que cada ação de registro esteja em compliance com a Portaria 671.' }
                ].map((v, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-12 h-1 bg-brand-vibrant mb-6" />
                    <h5 className="text-xl font-bold text-brand-deep mb-4">{v.title}</h5>
                    <p className="text-text-secondary text-base leading-relaxed">{v.text}</p>
                  </div>
                ))}
              </div>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  )
}
