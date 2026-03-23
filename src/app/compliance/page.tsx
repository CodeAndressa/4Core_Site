import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { company } from '@/data/company'

export const metadata: Metadata = {
  title: 'Compliance | 4Core',
  description: 'Programa de Compliance e Conformidade Legal da 4Core',
}

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-white">
      <Container className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-deep mb-8">
            Programa de Compliance
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p className="text-xl text-gray-600 leading-relaxed">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">1. Compromisso com a Conformidade</h2>
              <p>
                A <strong>{company.name}</strong> mantém um rigoroso programa de compliance para garantir que todas as suas 
                operações estejam em conformidade com as leis, regulamentos e normas aplicáveis ao setor de controle de ponto, 
                acesso e segurança.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">2. Legislação Trabalhista</h2>
              <p>
                Nossas soluções de controle de ponto estão em total conformidade com:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>CLT (Consolidação das Leis do Trabalho):</strong> Artigos 74 e seguintes sobre registro de jornada</li>
                <li><strong>Portaria MTP nº 671/2021:</strong> Regulamentação do registro eletrônico de ponto</li>
                <li><strong>Portaria MTP nº 373/2011:</strong> Sistemas alternativos de controle de jornada</li>
                <li><strong>Reforma Trabalhista (Lei 13.467/2017):</strong> Novas modalidades de trabalho</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">3. Proteção de Dados (LGPD)</h2>
              <p>
                Nosso programa de compliance em proteção de dados inclui:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Adequação à LGPD:</strong> Todos os processos seguem a Lei nº 13.709/2018</li>
                <li><strong>Dados Biométricos:</strong> Tratamento especial conforme Art. 11 da LGPD</li>
                <li><strong>Consentimento Expresso:</strong> Coleta de autorização para dados sensíveis</li>
                <li><strong>Direitos dos Titulares:</strong> Garantia de acesso, correção e exclusão de dados</li>
                <li><strong>Segurança da Informação:</strong> Medidas técnicas e administrativas robustas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">4. Certificações e Homologações</h2>
              <p>
                A 4Core trabalha exclusivamente com equipamentos e softwares que possuem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Certificação MTE/MTP:</strong> Registro no Ministério do Trabalho e Emprego</li>
                <li><strong>Homologação INMETRO:</strong> Quando aplicável aos equipamentos</li>
                <li><strong>Conformidade com Normas Técnicas:</strong> ABNT, ISO e padrões internacionais</li>
                <li><strong>Certificação de Segurança:</strong> Testes de vulnerabilidade e penetração</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">5. Código de Conduta</h2>
              <p>
                Nosso código de conduta estabelece princípios fundamentais:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ética e Integridade:</strong> Transparência em todas as relações comerciais</li>
                <li><strong>Anticorrupção:</strong> Tolerância zero com práticas ilícitas</li>
                <li><strong>Respeito aos Direitos Humanos:</strong> Dignidade e igualdade</li>
                <li><strong>Sustentabilidade:</strong> Responsabilidade socioambiental</li>
                <li><strong>Confidencialidade:</strong> Proteção de informações sensíveis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">6. Segurança Jurídica Operativa</h2>
              <p>
                Oferecemos consultoria especializada para garantir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conformidade com legislação trabalhista vigente</li>
                <li>Adequação de processos às normas regulamentadoras</li>
                <li>Documentação legal completa e atualizada</li>
                <li>Suporte em auditorias e fiscalizações</li>
                <li>Treinamento de equipes sobre compliance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">7. Gestão de Riscos</h2>
              <p>
                Mantemos processos contínuos de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identificação e avaliação de riscos legais e operacionais</li>
                <li>Monitoramento de mudanças legislativas</li>
                <li>Atualização de sistemas e procedimentos</li>
                <li>Planos de contingência e resposta a incidentes</li>
                <li>Auditorias internas periódicas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">8. Treinamento e Capacitação</h2>
              <p>
                Investimos continuamente em:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Capacitação da equipe em compliance e legislação</li>
                <li>Treinamento de clientes sobre uso correto das soluções</li>
                <li>Workshops sobre boas práticas e conformidade</li>
                <li>Materiais educativos e guias de orientação</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">9. Canal de Denúncias</h2>
              <p>
                Disponibilizamos canal confidencial para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Relatar violações ao código de conduta</li>
                <li>Denunciar práticas antiéticas ou ilegais</li>
                <li>Questionar procedimentos de compliance</li>
                <li>Sugerir melhorias nos processos</li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p><strong>E-mail:</strong> compliance@4core.site</p>
                <p className="text-sm text-gray-600 mt-2">
                  Todas as denúncias são tratadas com confidencialidade e sem retaliação.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">10. Responsabilidade Social</h2>
              <p>
                A 4Core está comprometida com:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Práticas comerciais justas e transparentes</li>
                <li>Respeito aos direitos trabalhistas</li>
                <li>Inclusão e diversidade</li>
                <li>Desenvolvimento sustentável</li>
                <li>Contribuição para a comunidade local</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">11. Monitoramento e Melhoria Contínua</h2>
              <p>
                Nosso programa de compliance é revisado periodicamente para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Incorporar mudanças legislativas</li>
                <li>Implementar melhores práticas do mercado</li>
                <li>Corrigir não conformidades identificadas</li>
                <li>Aprimorar processos e controles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">12. Contato</h2>
              <p>
                Para questões relacionadas a compliance, entre em contato:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p><strong>E-mail Geral:</strong> {company.email}</p>
                <p><strong>E-mail Compliance:</strong> compliance@4core.site</p>
                <p><strong>Telefone:</strong> {company.phone}</p>
                <p><strong>Localização:</strong> {company.address.city} - {company.address.state}</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}
