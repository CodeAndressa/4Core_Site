'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CheckCircle2, Shield, Users, Zap, HeadphonesIcon, MapPin, Settings, Wrench, FileText } from 'lucide-react'

type SolutionCategory = 'controle-de-jornada' | 'controle-de-acesso' | 'seguranca-operacional'

interface ImplementationSectionProps {
  category?: SolutionCategory
}

const config: Record<SolutionCategory, { steps: { icon: React.ReactNode; title: string; description: string }[]; guarantees: string[] }> = {
  'controle-de-jornada': {
    steps: [
      { icon: <Users className="w-6 h-6" />, title: 'Consultoria Inicial', description: 'Analisamos sua operação e desenhamos a implementação ideal para seu cenário' },
      { icon: <Shield className="w-6 h-6" />, title: 'Configuração Técnica', description: 'Parametrizamos o sistema 100% em conformidade com a Portaria 671 e suas regras internas' },
      { icon: <Zap className="w-6 h-6" />, title: 'Integração com ERP', description: 'Conectamos com seu sistema de folha para eliminar retrabalho e erros de importação' },
      { icon: <HeadphonesIcon className="w-6 h-6" />, title: 'Suporte Proativo', description: 'Monitoramos indicadores e antecipamos problemas antes do fechamento da folha' },
    ],
    guarantees: [
      'Conformidade 100% com Portaria 671',
      'Dados prontos para fiscalização',
      'Redução de 80% no tempo de fechamento',
      'Zero retrabalho com importação de dados',
    ],
  },
  'controle-de-acesso': {
    steps: [
      { icon: <MapPin className="w-6 h-6" />, title: 'Análise de Ambientes', description: 'Mapeamos todos os pontos de controle e definimos a topologia ideal para sua estrutura' },
      { icon: <Settings className="w-6 h-6" />, title: 'Projeto de Integração', description: 'Desenhamos a arquitetura de coletores, leitores e software para máxima eficiência' },
      { icon: <Wrench className="w-6 h-6" />, title: 'Instalação e Configuração', description: 'Instalamos e configuramos todos os pontos de acesso com os perfis de usuário corretos' },
      { icon: <HeadphonesIcon className="w-6 h-6" />, title: 'Treinamento e Suporte', description: 'Capacitamos a equipe e monitoramos o sistema para garantir operação sem falhas' },
    ],
    guarantees: [
      'Projeto técnico personalizado para sua estrutura',
      'Integração com sistemas de portaria e CFTV',
      'Controle granular por usuário, horário e área',
      'Trilha de auditoria completa de todos os acessos',
    ],
  },
  'seguranca-operacional': {
    steps: [
      { icon: <MapPin className="w-6 h-6" />, title: 'Mapeamento de Rondas', description: 'Definimos os pontos de verificação e o roteiro ideal de ronda para sua estrutura' },
      { icon: <Settings className="w-6 h-6" />, title: 'Instalação dos iButtons', description: 'Fixamos os botões inteligentes em locais estratégicos e invioláveis' },
      { icon: <Zap className="w-6 h-6" />, title: 'Configuração do TopRonda', description: 'Parametrizamos o software com horários, rotas e alertas de conformidade' },
      { icon: <FileText className="w-6 h-6" />, title: 'Treinamento e Relatórios', description: 'Capacitamos a equipe e configuramos os relatórios automáticos de auditoria' },
    ],
    guarantees: [
      '100% dos postos monitorados e verificados',
      'Relatórios invioláveis para auditoria de segurança',
      'Comprovação de rondas com horário e rota precisos',
      'Alertas automáticos de desvios e não conformidades',
    ],
  },
}

/**
 * Seção de Implementação 4Core
 * Diferencial competitivo - mostra o que vai além do produto
 */
export function ImplementationSection({ category = 'controle-de-jornada' }: ImplementationSectionProps) {
  const { steps, guarantees } = config[category]

  return (
    <Section variant="deep" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-vibrant/10 blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Implementação 4Core: O que nos diferencia
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Não entregamos apenas o equipamento. Garantimos que sua operação funcione em total conformidade.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-brand-vibrant rounded-xl flex items-center justify-center text-white mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Garantias da Implementação 4Core
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guarantees.map((guarantee, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                  <span className="text-white font-medium">{guarantee}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
