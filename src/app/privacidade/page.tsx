import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { company } from '@/data/company'

export const metadata: Metadata = {
  title: 'Política de Privacidade | 4Core',
  description: 'Política de Privacidade e Proteção de Dados da 4Core',
}

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-white">
      <Container className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-deep mb-8">
            Política de Privacidade
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p className="text-xl text-gray-600 leading-relaxed">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">1. Introdução</h2>
              <p>
                A <strong>{company.name}</strong> está comprometida com a proteção da privacidade e dos dados pessoais de seus clientes, 
                parceiros e visitantes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos 
                suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">2. Dados Coletados</h2>
              <p>Coletamos os seguintes tipos de dados:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de Identificação:</strong> Nome, e-mail, telefone, empresa, cargo</li>
                <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência</li>
                <li><strong>Dados de Interação:</strong> Mensagens enviadas via formulários de contato ou chatbot</li>
                <li><strong>Dados Biométricos:</strong> Quando aplicável, em soluções de reconhecimento facial (com consentimento expresso)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">3. Finalidade do Tratamento</h2>
              <p>Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Responder solicitações de contato e fornecer suporte técnico</li>
                <li>Enviar propostas comerciais e informações sobre nossos produtos e serviços</li>
                <li>Melhorar a experiência do usuário em nosso site</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Realizar análises estatísticas e de desempenho</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">4. Base Legal</h2>
              <p>O tratamento de dados pessoais pela 4Core é fundamentado nas seguintes bases legais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consentimento:</strong> Para envio de comunicações de marketing</li>
                <li><strong>Execução de Contrato:</strong> Para prestação de serviços contratados</li>
                <li><strong>Legítimo Interesse:</strong> Para análise de dados e melhoria de serviços</li>
                <li><strong>Obrigação Legal:</strong> Para cumprimento de obrigações fiscais e trabalhistas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">5. Compartilhamento de Dados</h2>
              <p>
                Seus dados podem ser compartilhados com:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Fornecedores de Tecnologia:</strong> Provedores de hospedagem, CRM e ferramentas de analytics</li>
                <li><strong>Parceiros Comerciais:</strong> Quando necessário para execução de serviços</li>
                <li><strong>Autoridades Legais:</strong> Quando exigido por lei ou ordem judicial</li>
              </ul>
              <p className="mt-4">
                <strong>Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">6. Segurança dos Dados</h2>
              <p>
                Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, 
                perda, destruição ou alteração, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso baseados em função</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Treinamento regular de equipe sobre proteção de dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">7. Retenção de Dados</h2>
              <p>
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, 
                ou conforme exigido por lei. Após esse período, os dados são anonimizados ou excluídos de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">8. Seus Direitos</h2>
              <p>De acordo com a LGPD, você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Revogar o consentimento</li>
                <li>Obter informações sobre compartilhamento de dados</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">9. Cookies</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação. 
                Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">10. Contato</h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p><strong>E-mail:</strong> {company.email}</p>
                <p><strong>Telefone:</strong> {company.phone}</p>
                <p><strong>Localização:</strong> {company.address.city} - {company.address.state}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-deep mt-12 mb-4">11. Alterações</h2>
              <p>
                Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você revise esta página 
                regularmente para se manter informado sobre como protegemos seus dados.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}
