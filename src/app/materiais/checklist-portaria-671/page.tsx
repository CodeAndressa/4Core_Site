import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CheckCircle2, ShieldCheck, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ChecklistPage() {
  return (
    <Section variant="gray" className="pt-32 pb-24">
      <Container className="max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <p className="text-purple-600 font-bold uppercase tracking-wider text-sm mb-1">Seu Material Exclusivo</p>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                Checklist Completo: Portaria 671 MTP
              </h1>
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-8 font-medium">
            Use este guia passo a passo para garantir que o setor de DP da sua empresa está totalmente adequado às novas normas trabalhistas e livre de riscos de multas.
          </p>

          <div className="space-y-6 mb-12">
            
            {/* Bloco 1 */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
                1. Equipamento e Hardware (REP)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">O relógio de ponto utilizado possui certificado do Inmetro (obrigatório para REP-C e REP-P)?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">O equipamento emite o comprovante de registro de ponto do trabalhador (físico ou arquivo eletrônico)?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">Há porta fiscal (USB) não obstruída para auditoria do MTE em caso de fiscalização?</span>
                </li>
              </ul>
            </div>

            {/* Bloco 2 */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
                2. Software e Tratamento (PTRP)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">O software de tratamento de ponto (TopPonto) emite o Arquivo Fonte de Dados Tratados (AFDT)?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">O sistema é capaz de gerar o Arquivo de Controle de Jornada para Efeitos Fiscais (ACJEF)?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">O sistema possui o comprovante de registro de software no INPI (Instituto Nacional de Propriedade Industrial)?</span>
                </li>
              </ul>
            </div>

            {/* Bloco 3 */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
                3. Operação e Home Office
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">A marcação de ponto por aplicativo (REP-A) possui acordo ou convenção coletiva vigente autorizando seu uso?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">O aplicativo de celular utilizado não restringe a marcação e não possui alteração prévia de horários?</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="bg-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ainda tem dúvidas ou marcou "Não" em algum dos itens?</h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Sua empresa pode estar vulnerável a autuações trabalhistas. Fale agora com nosso time comercial para adequar seu sistema antes da próxima fiscalização.
            </p>
            <Button href="/contato" size="lg" className="bg-white text-purple-600 hover:bg-gray-50 font-bold border-none">
              Falar com o time comercial
            </Button>
          </div>

        </div>
      </Container>
    </Section>
  )
}
