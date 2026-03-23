'use client'

import { useState } from 'react'

interface DateFilterProps {
  onFilterChange: (startDate: string, endDate: string) => void
}

export function DateFilter({ onFilterChange }: DateFilterProps) {
  const [selectedRange, setSelectedRange] = useState('7d')

  const ranges = [
    { value: '7d', label: 'Últimos 7 dias' },
    { value: '30d', label: 'Últimos 30 dias' },
    { value: '90d', label: 'Últimos 90 dias' },
  ]

  const handleRangeChange = (range: string) => {
    setSelectedRange(range)
    
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
    }
    
    onFilterChange(startDate.toISOString(), endDate.toISOString())
  }

  return (
    <div className="flex gap-2">
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
  )
}
