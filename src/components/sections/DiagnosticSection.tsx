'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ArrowRight, Users, Building2, Clock, AlertTriangle } from 'lucide-react'

/**
 * Seção de Diagnóstico Rápido
 * Qualifica leads e direciona para solução certa
 */

interface DiagnosticOption {
  id: string
  label: string
  icon: React.ReactNode
}

const questions = {
  employees: {
    question: 'Quantos funcionários sua empresa tem?',
    options: [
      { id: '1-20', label: '1 a 20', icon: <Users className="w-5 h-5" /> },
      { id: '21-50', label: '21 a 50', icon: <Users className="w-5 h-5" /> },
      { id: '51-200', label: '51 a 200', icon: <Users className="w-5 h-5" /> },
      { id: '200+', label: 'Mais de 200', icon: <Building2 className="w-5 h-5" /> },
    ]
  },
  workModel: {
    question: 'Qual o modelo de trabalho?',
    options: [
      { id: 'presencial', label: '100% Presencial', icon: <Building2 className="w-5 h-5" /> },
      { id: 'hibrido', label: 'Híbrido', icon: <Clock className="w-5 h-5" /> },
      { id: 'remoto', label: 'Remoto/Externo', icon: <Clock className="w-5 h-5" /> },
    ]
  },
  currentSystem: {
    question: 'Você já tem sistema de ponto?',
    options: [
      { id: 'nao', label: 'Não tenho', icon: <AlertTriangle className="w-5 h-5" /> },
      { id: 'manual', label: 'Controle manual', icon: <AlertTriangle className="w-5 h-5" /> },
      { id: 'sim', label: 'Sim, mas com problemas', icon: <AlertTriangle className="w-5 h-5" /> },
      { id: 'sim-ok', label: 'Sim, funciona bem', icon: <CheckCircle2 className="w-5 h-5" /> },
    ]
  }
}

export function DiagnosticSection() {
  const [currentStep, setCurrentStep] = useState<'employees' | 'workModel' | 'currentSystem' | 'result'>('employees')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswer = (questionKey: string, answerId: string) => {
    const newAnswers = { ...answers, [questionKey]: answerId }
    setAnswers(newAnswers)

    // Avançar para próxima pergunta
    if (questionKey === 'employees') {
      setCurrentStep('workModel')
    } else if (questionKey === 'workModel') {
      setCurrentStep('currentSystem')
    } else if (questionKey === 'currentSystem') {
      setCurrentStep('result')
    }
  }

  const getRecommendation = () => {
    const { employees, workModel, currentSystem } = answers

    // Lógica de recomendação
    if (workModel === 'remoto' || workModel === 'hibrido') {
      return {
        title: 'Recomendamos: TopPonto Mobile + Web',
        description: 'Para equipes remotas e híbridas, você precisa de controle via app com geolocalização + sistema web para gestão.',
        risk: 'Risco Alto: Sem controle adequado de jornada remota, você está exposto a processos trabalhistas.',
        cta: 'Falar com especialista em ponto remoto'
      }
    }

    if (employees === '200+') {
      return {
        title: 'Recomendamos: Solução Enterprise Completa',
        description: 'Para grandes empresas, você precisa de REP-P Facial + Software Web + Integração ERP.',
        risk: 'Risco Crítico: Volume alto de funcionários exige conformidade rigorosa e automação total.',
        cta: 'Solicitar consultoria enterprise'
      }
    }

    if (currentSystem === 'nao' || currentSystem === 'manual') {
      return {
        title: 'Recomendamos: REP-P Facial + TopPonto Web',
        description: 'Você precisa urgentemente de um sistema certificado. Controle manual expõe sua empresa a riscos graves.',
        risk: 'Risco Crítico: Sem sistema certificado, você está vulnerável a multas de até R$ 6 mil por funcionário.',
        cta: 'Implementar sistema certificado agora'
      }
    }

    return {
      title: 'Recomendamos: Auditoria de Conformidade',
      description: 'Mesmo com sistema, é essencial verificar se está 100% em conformidade com a Portaria 671.',
      risk: 'Risco Médio: Sistemas mal configurados são a principal causa de processos trabalhistas.',
      cta: 'Solicitar auditoria gratuita'
    }
  }

  const currentQuestion = questions[currentStep as keyof typeof questions]
  const recommendation = currentStep === 'result' ? getRecommendation() : null

  return (
    <Section id="diagnostico" variant="gray" className="scroll-mt-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-deep mb-4">
              Diagnóstico Rápido: Qual solução é ideal para você?
            </h2>
            <p className="text-lg text-gray-600">
              Responda 3 perguntas e descubra a solução certa para sua empresa
            </p>
          </motion.div>

          {/* Progress Bar */}
          {currentStep !== 'result' && (
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Pergunta {currentStep === 'employees' ? '1' : currentStep === 'workModel' ? '2' : '3'} de 3
                </span>
                <span className="text-sm font-medium text-brand-vibrant">
                  {currentStep === 'employees' ? '33%' : currentStep === 'workModel' ? '66%' : '100%'}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-vibrant"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: currentStep === 'employees' ? '33%' : currentStep === 'workModel' ? '66%' : '100%' 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Question */}
          {currentStep !== 'result' && currentQuestion && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-brand-deep mb-8">
                {currentQuestion.question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(currentStep, option.id)}
                    className="flex items-center gap-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-brand-vibrant hover:bg-brand-vibrant/5 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 group-hover:bg-brand-vibrant group-hover:text-white transition-all">
                      {option.icon}
                    </div>
                    <span className="text-lg font-semibold text-gray-700 group-hover:text-brand-vibrant">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {currentStep === 'result' && recommendation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-brand-deep mb-4">
                  {recommendation.title}
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  {recommendation.description}
                </p>
              </div>

              {/* Risk Alert */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-red-900 mb-1">Atenção ao Risco:</p>
                    <p className="text-red-800">{recommendation.risk}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/contato" 
                  size="lg"
                  className="px-8 py-6 text-base font-bold shadow-xl"
                >
                  {recommendation.cta} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => {
                    setCurrentStep('employees')
                    setAnswers({})
                  }}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-base font-bold"
                >
                  Refazer diagnóstico
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </Section>
  )
}
