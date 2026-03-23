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
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchDashboard()
    }
  }, [dateRange])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
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
    } catch (err) {
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
          <div className="text-red-600 text-center mb-4">❌</div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">4Core Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(data.period.start).toLocaleDateString('pt-BR')} - {new Date(data.period.end).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Filter */}
        <div className="mb-6">
          <DateFilter onFilterChange={handleDateFilterChange} />
        </div>

        {/* KPIs */}
        <div className="mb-8">
          <KPICards metrics={data.kpis} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrafficChart data={data.traffic} />
          <ConversionChart data={data.conversions} />
        </div>

        {/* Tables and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PagesTable data={data.pages} />
          </div>
          <div>
            <DeviceStats data={data.devices} />
          </div>
        </div>

        {/* Sources */}
        <div className="mb-8">
          <SourcesTable data={data.sources} />
        </div>
      </main>
    </div>
  )
}
