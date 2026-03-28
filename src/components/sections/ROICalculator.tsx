'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingDown, Clock, Building2 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export function ROICalculator() {
  const [employees, setEmployees] = useState<number>(50)
  const [salary, setSalary] = useState<number>(2500)
  const [minutesLost, setMinutesLost] = useState<number>(10) // Minutos perdidos por dia por funcionário (café, conversas no ponto, arredondamentos incorretos)

  // Calculations
  const hourlyRate = salary / 220
  const minuteRate = hourlyRate / 60
  const dailyLossPerEmployee = minuteRate * minutesLost
  const monthlyLoss = dailyLossPerEmployee * 22 * employees // 22 working days
  const annualLoss = monthlyLoss * 12

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Section variant="gray" className="relative bg-slate-50 overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-2xl mb-6">
            <Calculator className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Descubra o custo oculto do seu <span className="text-purple-600">Ponto atual</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Falta de batidas de ponto, arredondamentos indevidos e &quot;ponto amigo&quot; geram prejuízos silenciosos diários. Calcule quanto sua empresa perde sem um sistema inteligente com reconhecimento facial.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Controls */}
            <div className="space-y-10">
              {/* Slider Funcionários */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    Número de Funcionários
                  </label>
                  <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-lg text-sm">
                    {employees}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Slider Salário Médio */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-purple-600" />
                    Salário Médio Base (R$)
                  </label>
                  <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-lg text-sm">
                    {formatCurrency(salary)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="10000"
                  step="100"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Slider Minutos Perdidos */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    Tempo perdido por pessoa/dia
                  </label>
                  <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-lg text-sm">
                    {minutesLost} minutos
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={minutesLost}
                  onChange={(e) => setMinutesLost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <p className="text-xs text-slate-500 mt-2 font-medium">Atrasos não descontados, horários arredondados incorretamente e fraudes biométricas.</p>
              </div>
            </div>

            {/* Results */}
            <motion.div
              key={annualLoss}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl shadow-purple-900/20"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl mix-blend-overlay pointer-events-none"></div>
              
              <h3 className="text-xl font-bold text-purple-200 mb-2">Prejuízo Financeiro Estimado</h3>
              <p className="text-sm text-purple-200/80 mb-8 font-medium">O quanto sua empresa &quot;sangra&quot; silenciosamente por ano.</p>
              
              <div className="mb-8 relative z-10">
                <p className="text-purple-300 text-sm font-bold uppercase tracking-wider mb-1">Custo Mensal</p>
                <p className="text-3xl font-black text-white/90">{formatCurrency(monthlyLoss)}<span className="text-lg text-purple-300 font-medium">/mês</span></p>
              </div>

              <div className="mb-10 relative z-10 bg-white/10 p-6 border border-white/20 rounded-2xl backdrop-blur-sm">
                <p className="text-purple-200 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-300" /> Ralo Anual
                </p>
                <p className="text-5xl lg:text-6xl font-black text-white tracking-tight">
                  {formatCurrency(annualLoss)}
                </p>
                <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full w-full"></div>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-purple-500/30">
                <p className="text-sm text-purple-100 mb-6 font-medium">
                  Com o sistema de reconhecimento facial da 4Core integrando ao seu software, você zera as perdas de {formatCurrency(annualLoss)} já no primeiro ano. O relógio se paga em poucos meses.
                </p>
                <Button href="/contato" size="lg" className="w-full bg-white text-purple-600 hover:bg-slate-50 font-black text-lg py-4 border-none shadow-lg">
                  Quero zerar essas perdas
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </Container>
    </Section>
  )
}
