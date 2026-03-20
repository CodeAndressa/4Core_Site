import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

/**
 * Seção de Conformidade (Portaria 671).
 * Foca na autoridade técnica e tranquilidade operacional.
 */
export function Compliance() {
  return (
    <section className="py-24 bg-brand-deep relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute left-0 bottom-0 top-0 w-1/3 bg-brand-vibrant/10 -skew-x-[30deg] transform -translate-x-1/2 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 order-2 lg:order-1">
             <SectionHeading
              subtitle="Conformidade em primeiro lugar"
              title="Sua empresa está segura perante a Portaria 671?"
              description="Nossa consultoria audita e adequa toda a sua estrutura de registro eletrônico de ponto (REP-P, REP-A, REP-C) para garantir que sua empresa não seja alvo de multas ou autuações laborais."
              inverse
              className="mb-8 lg:mb-12"
            />
            
            <ul className="space-y-4 mb-10">
              {[
                'Auditoria técnica de sistemas atuais',
                'Parametrização legal de jornadas e escalas',
                'Documentação de conformidade (Atestado Técnico)',
                'Treinamento de boas práticas para RH e DP'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-brand-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-vibrant" />
                  <span className="text-sm md:text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <Button href="/solucoes/adequacao-portaria-671" variant="outline" className="text-white border-white/20 hover:bg-white/5">
              Saber mais sobre conformidade
            </Button>
          </div>
          
          <div className="flex-1 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-vibrant/20 blur-3xl rounded-full" />
              <div className="relative bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm">
                 <div className="text-xs font-bold text-brand-vibrant uppercase tracking-widest mb-4">Certificação 4Core</div>
                 <div className="text-4xl lg:text-5xl font-bold text-white mb-6">Método<br />Comprovado.</div>
                 <p className="text-brand-light/60 text-sm leading-relaxed mb-8">
                   Aplicamos uma metodologia ágil de auditoria que identifica 100% dos riscos críticos em menos de 15 dias de consultoria direta.
                 </p>
                 <div className="flex items-center gap-4 py-6 border-t border-white/10">
                    <div className="text-3xl font-bold text-brand-vibrant">100%</div>
                    <div className="text-xs uppercase tracking-wider text-brand-light/70 font-semibold leading-tight">Segurança nos<br />Auditores Fiscais</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
