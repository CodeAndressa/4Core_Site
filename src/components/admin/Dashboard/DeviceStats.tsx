'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { DeviceData } from '@/types/analytics'

interface DeviceStatsProps {
  data: DeviceData[]
}

const COLORS = {
  mobile: '#10b981',
  desktop: '#3b82f6',
  tablet: '#f59e0b',
}

export function DeviceStats({ data }: DeviceStatsProps) {
  const chartData = data.map(item => ({
    name: item.device.charAt(0).toUpperCase() + item.device.slice(1),
    value: item.total,
    percentage: item.percentage,
  }))

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispositivos</h3>
      
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum dado disponível
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[data[index].device as keyof typeof COLORS]} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {data.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[device.device as keyof typeof COLORS] }}
                  />
                  <span className="text-sm text-gray-700 capitalize">{device.device}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {device.total.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
