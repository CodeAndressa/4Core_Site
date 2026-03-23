import { supabaseAdmin } from '@/lib/supabase'
import type {
  AnalyticsDashboard,
  KPIMetrics,
  TrafficData,
  ConversionData,
  SourceData,
  PageData,
  DeviceData,
  GeographyData,
} from '@/types/analytics'

/**
 * Analytics Service
 * 
 * Queries complexas para dashboard de analytics
 * Todas as métricas são calculadas em tempo real do Supabase
 */

export class AnalyticsService {
  /**
   * Obter dashboard completo
   */
  static async getDashboard(startDate: string, endDate: string): Promise<AnalyticsDashboard> {
    const [kpis, traffic, conversions, sources, pages, devices, geography] = await Promise.all([
      this.getKPIs(startDate, endDate),
      this.getTrafficData(startDate, endDate),
      this.getConversionData(startDate, endDate),
      this.getSourcesData(startDate, endDate),
      this.getPagesData(startDate, endDate),
      this.getDevicesData(startDate, endDate),
      this.getGeographyData(startDate, endDate),
    ])

    return {
      kpis,
      traffic,
      conversions,
      sources,
      pages,
      devices,
      geography,
      period: { start: startDate, end: endDate },
    }
  }

  /**
   * KPIs principais
   */
  static async getKPIs(startDate: string, endDate: string): Promise<KPIMetrics> {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    // Total de eventos no período
    const { data: events, error } = await supabaseAdmin
      .from('events')
      .select('type, session_id, created_at')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    if (error) throw new Error(error.message)

    // Visitantes únicos
    const uniqueVisitors = new Set(events?.map(e => e.session_id).filter(Boolean)).size

    // Total de pageviews
    const totalPageviews = events?.filter(e => e.type === 'page_view').length || 0

    // Live visitors (últimos 5 minutos)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const liveVisitors = new Set(
      events?.filter(e => e.created_at >= fiveMinutesAgo).map(e => e.session_id).filter(Boolean)
    ).size

    // Bounce rate (sessões com apenas 1 pageview)
    const sessionPageviews = events
      ?.filter(e => e.type === 'page_view' && e.session_id)
      .reduce((acc, e) => {
        acc[e.session_id!] = (acc[e.session_id!] || 0) + 1
        return acc
      }, {} as Record<string, number>)

    const bouncedSessions = Object.values(sessionPageviews || {}).filter(count => count === 1).length
    const totalSessions = Object.keys(sessionPageviews || {}).length
    const bounceRate = totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0

    // Tempo médio de sessão (estimado: 30s por pageview)
    const avgSession = totalSessions > 0 ? (totalPageviews / totalSessions) * 30 : 0

    return {
      liveVisitors,
      uniqueVisitors,
      totalPageviews,
      bounceRate: Math.round(bounceRate),
      avgSession: Math.round(avgSession),
    }
  }

  /**
   * Dados de tráfego ao longo do tempo
   */
  static async getTrafficData(startDate: string, endDate: string): Promise<TrafficData[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .select('created_at, session_id, type')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .eq('type', 'page_view')

    if (error) throw new Error(error.message)

    // Agrupar por dia
    const grouped = data?.reduce((acc, event) => {
      const date = event.created_at.split('T')[0]
      if (!acc[date]) {
        acc[date] = { pageviews: 0, sessions: new Set() }
      }
      acc[date].pageviews++
      if (event.session_id) {
        acc[date].sessions.add(event.session_id)
      }
      return acc
    }, {} as Record<string, { pageviews: number; sessions: Set<string> }>)

    return Object.entries(grouped || {})
      .map(([date, data]) => ({
        date,
        pageviews: data.pageviews,
        uniqueVisitors: data.sessions.size,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }

  /**
   * Dados de conversão ao longo do tempo
   */
  static async getConversionData(startDate: string, endDate: string): Promise<ConversionData[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .select('created_at, type')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .in('type', ['whatsapp_click', 'form_submit'])

    if (error) throw new Error(error.message)

    // Agrupar por dia
    const grouped = data?.reduce((acc, event) => {
      const date = event.created_at.split('T')[0]
      if (!acc[date]) {
        acc[date] = { whatsappClicks: 0, formSubmits: 0 }
      }
      if (event.type === 'whatsapp_click') acc[date].whatsappClicks++
      if (event.type === 'form_submit') acc[date].formSubmits++
      return acc
    }, {} as Record<string, { whatsappClicks: number; formSubmits: number }>)

    return Object.entries(grouped || {})
      .map(([date, data]) => ({
        date,
        whatsappClicks: data.whatsappClicks,
        formSubmits: data.formSubmits,
        totalConversions: data.whatsappClicks + data.formSubmits,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }

  /**
   * Dados de fontes de tráfego
   */
  static async getSourcesData(startDate: string, endDate: string): Promise<SourceData[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .select('source, type, session_id')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    if (error) throw new Error(error.message)

    const grouped = data?.reduce((acc, event) => {
      const source = event.source || 'direct'
      if (!acc[source]) {
        acc[source] = { sessions: new Set(), conversions: 0 }
      }
      if (event.session_id) acc[source].sessions.add(event.session_id)
      if (['whatsapp_click', 'form_submit'].includes(event.type)) {
        acc[source].conversions++
      }
      return acc
    }, {} as Record<string, { sessions: Set<string>; conversions: number }>)

    return Object.entries(grouped || {})
      .map(([source, data]) => {
        const visitors = data.sessions.size
        return {
          source,
          visitors,
          conversions: data.conversions,
          conversionRate: visitors > 0 ? (data.conversions / visitors) * 100 : 0,
        }
      })
      .sort((a, b) => b.visitors - a.visitors)
  }

  /**
   * Dados de páginas
   */
  static async getPagesData(startDate: string, endDate: string): Promise<PageData[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .select('page, type, session_id')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    if (error) throw new Error(error.message)

    const grouped = data?.reduce((acc, event) => {
      const page = event.page
      if (!acc[page]) {
        acc[page] = { views: 0, sessions: new Set(), conversions: 0 }
      }
      if (event.type === 'page_view') {
        acc[page].views++
        if (event.session_id) acc[page].sessions.add(event.session_id)
      }
      if (['whatsapp_click', 'form_submit'].includes(event.type)) {
        acc[page].conversions++
      }
      return acc
    }, {} as Record<string, { views: number; sessions: Set<string>; conversions: number }>)

    return Object.entries(grouped || {})
      .map(([page, data]) => ({
        page,
        views: data.views,
        uniqueViews: data.sessions.size,
        conversions: data.conversions,
        conversionRate: data.views > 0 ? (data.conversions / data.views) * 100 : 0,
      }))
      .sort((a, b) => b.views - a.views)
  }

  /**
   * Dados de dispositivos
   */
  static async getDevicesData(startDate: string, endDate: string): Promise<DeviceData[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .select('device')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .not('device', 'is', null)

    if (error) throw new Error(error.message)

    const grouped = data?.reduce((acc, event) => {
      const device = event.device!
      acc[device] = (acc[device] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const total = Object.values(grouped || {}).reduce((sum, count) => sum + count, 0)

    return Object.entries(grouped || {})
      .map(([device, count]) => ({
        device: device as any,
        total: count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total)
  }

  /**
   * Dados de geografia (baseado em eventos reais)
   */
  static async getGeographyData(startDate: string, endDate: string): Promise<GeographyData[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    // Por enquanto, retorna Brasil como padrão já que não temos geolocalização
    // No futuro, pode-se adicionar detecção de país via IP
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('session_id')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    if (error) throw new Error(error.message)

    const uniqueVisitors = new Set(data?.map(e => e.session_id).filter(Boolean)).size

    return [
      { country: 'Brasil', visitors: uniqueVisitors, percentage: 100 },
    ]
  }
}
