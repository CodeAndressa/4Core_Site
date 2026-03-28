'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { AnalyticsDashboard } from '@/types/analytics'
import { KPICards } from '@/components/admin/Dashboard/KPICards'
import { TrafficChart } from '@/components/admin/Dashboard/TrafficChart'
import { ConversionChart } from '@/components/admin/Dashboard/ConversionChart'
import { SourcesTable } from '@/components/admin/Dashboard/SourcesTable'
import { PagesTable } from '@/components/admin/Dashboard/PagesTable'
import { DeviceStats } from '@/components/admin/Dashboard/DeviceStats'
import { DateFilter } from '@/components/admin/Dashboard/DateFilter'

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsDashboard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  })
  const [stats, setStats] = useState<any>(null)
  const [populating, setPopulating] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
    fetchStats()
  }, [])

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchDashboard()
    }
  }, [dateRange])

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push('/admin/login')
    }
  }

  const fetchDashboard = async () => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({
        startDate: dateRange.start,
        endDate: dateRange.end,
      })

      const response = await fetch(`/api/analytics?${params}`)
      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Erro ao carregar dados')
        return
      }

      setData(result.data)
    } catch {
      setError('Erro ao carregar dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleDateFilterChange = (start: string, end: string) => {
    setDateRange({ start, end })
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics/stats')
      const result = await response.json()
      if (result.success) {
        setStats(result.data)
      }
    } catch {
      // Silenciar erro
    }
  }

  const handlePopulateData = async () => {
    if (!confirm('Isso irá adicionar dados de teste dos últimos 30 dias. Continuar?')) {
      return
    }

    setPopulating(true)
    try {
      const response = await fetch('/api/analytics/populate', { method: 'POST' })
      const result = await response.json()

      if (result.success) {
        alert(`✅ Sucesso! ${result.data.eventsCreated} eventos criados em ${result.data.sessionsCreated} sessões.`)
        await fetchStats()
        await fetchDashboard()
      } else {
        alert(`❌ Erro: ${result.error}`)
      }
    } catch (error) {
      alert('❌ Erro ao popular dados')
    } finally {
      setPopulating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Erro</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchDashboard}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const hasData = data.kpis.totalPageviews > 0 || data.kpis.uniqueVisitors > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">4Core Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(data.period.start).toLocaleDateString('pt-BR')} - {new Date(data.period.end).toLocaleDateString('pt-BR')}
              </p>
              {stats && (
                <p className="text-xs text-gray-500 mt-1">
                  📊 {stats.totalEvents.toLocaleString()} eventos no banco
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePopulateData}
                disabled={populating}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                {populating ? '⏳ Populando...' : '🎲 Popular Dados'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <DateFilter onFilterChange={handleDateFilterChange} />
        </div>

        {!hasData ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum dado no período selecionado</h2>
            <p className="text-gray-600 mb-6">
              {stats?.totalEvents > 0 
                ? 'Há eventos no banco, mas não no período selecionado. Tente "Todos os dados" no filtro acima.'
                : 'Não há eventos registrados no banco de dados.'}
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-purple-900 mb-2">🎲 Opção 1: Dados de Teste</p>
                <p className="text-sm text-purple-700 mb-3">
                  Clique em &quot;Popular Dados&quot; no topo para gerar 30 dias de dados realistas.
                </p>
                <button
                  onClick={handlePopulateData}
                  disabled={populating}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {populating ? '⏳ Populando...' : '🎲 Popular Dados Agora'}
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">🌐 Opção 2: Dados Reais</p>
                <p className="text-sm text-blue-700 mb-1">
                  Navegue pelo site para gerar eventos:
                </p>
                <ul className="text-xs text-blue-600 text-left space-y-1">
                  <li>✓ Visite páginas diferentes</li>
                  <li>✓ Clique no botão WhatsApp</li>
                  <li>✓ Envie formulários</li>
                </ul>
              </div>
            </div>

            {stats && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-xs font-semibold text-gray-700 mb-2">📈 Status do Banco:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>Total de eventos: <strong>{stats.totalEvents}</strong></div>
                  <div>Tipos: <strong>{Object.keys(stats.eventsByType || {}).length}</strong></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-8">
              <KPICards metrics={data.kpis} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <TrafficChart data={data.traffic} />
              <ConversionChart data={data.conversions} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <PagesTable data={data.pages} />
              </div>
              <div>
                <DeviceStats data={data.devices} />
              </div>
            </div>

            <div className="mb-8">
              <SourcesTable data={data.sources} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
