'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Settings2, ShieldCheck, Microscope, HardDrive } from 'lucide-react'

/**
 * Bloco "Implementação 4Core"
 * Explica o diferencial consultivo na entrega do hardware.
 */
export function ImplementationBlock() {
  const steps = [
    {
      title: 'Diagnóstico Infra',
      desc: 'Análise técnica da rede e infraestrutura para garantir conectividade estável.',
      icon: <Microscope className="w-6 h-6" />
    },
    {
      title: 'Parametrização 671',
      desc: 'Configuração rigorosa seguindo os preceitos da Portaria 671 e regras da empresa.',
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: 'Integração Nativa',
      desc: 'Sincronização com seu ERP ou software de folha para evitar erros de importação.',
      icon: <Settings2 className="w-6 h-6" />
    },
    {
      title: 'Ativação e Testes',
      desc: 'Validação em campo com logs reais para garantir a blindagem operativa.',
      icon: <HardDrive className="w-6 h-6" />
    }
  ]

  return (
    <Section variant="deep">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
              A Implementação 4Core:<br />
              <span className="text-brand-vibrant">Hardware + Segurança Jurídica</span>
            </h2>
            <p className="text-xl text-white/60 leading-relaxed font-medium mb-12">
              Não apenas instalamos um equipamento. Nós estruturamos um processo de coleta de dados que resiste a fiscalizações e auditorias.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-vibrant mb-6 group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-500">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{step.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-vibrant/5 border border-white/5 p-10 lg:p-14 rounded-[48px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-vibrant/20 blur-[60px]" />
            <h3 className="text-2xl font-bold text-white mb-8">Por que isso importa?</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-vibrant mt-2 shrink-0" />
                <p className="text-lg text-white/80 font-medium">Evita que um relógio de ponto se torne uma "máquina de provas contra sua empresa".</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-vibrant mt-2 shrink-0" />
                <p className="text-lg text-white/80 font-medium">Garante que 100% dos registros sejam válidos e sem lacunas técnicas.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-vibrant mt-2 shrink-0" />
                <p className="text-lg text-white/80 font-medium">Reduz em até 95% o tempo de correção de ponto no RH.</p>
              </div>
            </div>
            
            <div className="mt-12 p-8 bg-white/5 rounded-[32px] border border-white/10 text-center">
              <p className="text-brand-vibrant font-bold text-xs uppercase tracking-[0.2em] mb-4">Nossa Promessa</p>
              <p className="text-white font-bold text-xl tracking-tight">Compliance Técnico Absoluto</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
