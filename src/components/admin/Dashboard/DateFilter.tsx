'use client'

import { useState } from 'react'

interface DateFilterProps {
  onFilterChange: (startDate: string, endDate: string) => void
}

export function DateFilter({ onFilterChange }: DateFilterProps) {
  const [selectedRange, setSelectedRange] = useState('7d')
  const [showCustom, setShowCustom] = useState(false)
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')

  const ranges = [
    { value: '7d', label: 'Últimos 7 dias' },
    { value: '30d', label: 'Últimos 30 dias' },
    { value: '90d', label: 'Últimos 90 dias' },
    { value: 'all', label: 'Todos os dados' },
    { value: 'custom', label: 'Personalizado' },
  ]

  const handleRangeChange = (range: string) => {
    setSelectedRange(range)
    
    if (range === 'custom') {
      setShowCustom(true)
      return
    }
    
    setShowCustom(false)
    const endDate = new Date()
    const startDate = new Date()
    
    switch (range) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(endDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(endDate.getDate() - 90)
        break
      case 'all':
        // Começar de 1 ano atrás para pegar todos os dados
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
    }
    
    onFilterChange(startDate.toISOString(), endDate.toISOString())
  }

  const handleCustomApply = () => {
    if (!customStart || !customEnd) {
      alert('Por favor, selecione as datas de início e fim')
      return
    }
    
    const start = new Date(customStart)
    const end = new Date(customEnd)
    
    if (start > end) {
      alert('A data de início deve ser anterior à data de fim')
      return
    }
    
    // Ajustar para incluir o dia inteiro
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)
    
    onFilterChange(start.toISOString(), end.toISOString())
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ranges.map((range) => (
          <button
            key={range.value}
            onClick={() => handleRangeChange(range.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedRange === range.value
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {showCustom && (
        <div className="bg-white p-4 rounded-lg border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Início
              </label>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Fim
              </label>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <button
                onClick={handleCustomApply}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
