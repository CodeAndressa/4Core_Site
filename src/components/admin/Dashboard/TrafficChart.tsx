'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { TrafficData } from '@/types/analytics'

interface TrafficChartProps {
  data: TrafficData[]
}

export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tráfego ao Longo do Tempo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="pageviews" 
            stroke="#9333ea" 
            strokeWidth={2}
            name="Pageviews"
            dot={{ fill: '#9333ea', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="uniqueVisitors" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Visitantes Únicos"
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
