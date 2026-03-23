import type { PageData } from '@/types/analytics'

interface PagesTableProps {
  data: PageData[]
}

export function PagesTable({ data }: PagesTableProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Páginas Mais Acessadas</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Página</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Views</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Únicos</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Conversões</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Taxa</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  Nenhum dado disponível
                </td>
              </tr>
            ) : (
              data.map((page) => (
                <tr key={page.page} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                    {page.page}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {page.uniqueViews.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {page.conversions}
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {page.conversionRate.toFixed(1)}%
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
