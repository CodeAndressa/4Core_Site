import type { KPIMetrics } from '@/types/analytics'

interface KPICardsProps {
  metrics: KPIMetrics
}

export function KPICards({ metrics }: KPICardsProps) {
  const kpis = [
    {
      label: 'Live Visitors',
      value: metrics.liveVisitors,
      icon: '🟢',
      color: 'text-green-600',
    },
    {
      label: 'Unique Visitors',
      value: metrics.uniqueVisitors.toLocaleString(),
      icon: '👥',
      color: 'text-blue-600',
    },
    {
      label: 'Total Pageviews',
      value: metrics.totalPageviews.toLocaleString(),
      icon: '📄',
      color: 'text-purple-600',
    },
    {
      label: 'Bounce Rate',
      value: `${metrics.bounceRate}%`,
      icon: '📊',
      color: 'text-orange-600',
    },
    {
      label: 'Avg Session',
      value: `${metrics.avgSession}s`,
      icon: '⏱️',
      color: 'text-indigo-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{kpi.icon}</span>
          </div>
          <div className={`text-3xl font-bold ${kpi.color} mb-1`}>
            {kpi.value}
          </div>
          <div className="text-sm text-gray-600">{kpi.label}</div>
        </div>
      ))}
    </div>
  )
}
