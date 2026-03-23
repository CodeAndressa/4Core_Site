import type { SourceData } from '@/types/analytics'

interface SourcesTableProps {
  data: SourceData[]
}

export function SourcesTable({ data }: SourcesTableProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fontes de Tráfego</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fonte</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Visitantes</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Conversões</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Taxa</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  Nenhum dado disponível
                </td>
              </tr>
            ) : (
              data.map((source) => (
                <tr key={source.source} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                    {source.source}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {source.visitors.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {source.conversions}
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {source.conversionRate.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
