/**
 * Tipos do sistema de Analytics e Eventos
 */

export const TRACKABLE_EVENT_TYPES = [
  'page_view',
  'whatsapp_click',
  'form_submit',
  'form_view',
  'cta_click',
  'diagnostico_start',
  'diagnostico_complete',
  'diagnostic_answer',
  'lead_captured',
] as const

export type EventType = (typeof TRACKABLE_EVENT_TYPES)[number]

export type DeviceType = 'mobile' | 'desktop' | 'tablet'

export interface Event {
  id: string
  type: EventType
  page: string
  source?: string | null
  referrer?: string | null
  device?: DeviceType | null
  user_agent?: string | null
  session_id?: string | null
  created_at: string
}

export interface TrackEventInput {
  type: EventType
  page: string
  source?: string
  referrer?: string
  device?: DeviceType
}

export interface EventServiceResponse {
  success: boolean
  data?: Event
  error?: string
}

// Analytics Types
export interface DateRange {
  start: Date
  end: Date
}

export interface KPIMetrics {
  liveVisitors: number
  uniqueVisitors: number
  totalPageviews: number
  bounceRate: number
  avgSession: number
}

export interface TrafficData {
  date: string
  pageviews: number
  uniqueVisitors: number
}

export interface ConversionData {
  date: string
  whatsappClicks: number
  formSubmits: number
  totalConversions: number
}

export interface SourceData {
  source: string
  visitors: number
  conversions: number
  conversionRate: number
}

export interface PageData {
  page: string
  views: number
  uniqueViews: number
  conversions: number
  conversionRate: number
}

export interface DeviceData {
  device: DeviceType
  total: number
  percentage: number
}

export interface GeographyData {
  country: string
  visitors: number
  percentage: number
}

export interface AnalyticsDashboard {
  kpis: KPIMetrics
  traffic: TrafficData[]
  conversions: ConversionData[]
  sources: SourceData[]
  pages: PageData[]
  devices: DeviceData[]
  geography: GeographyData[]
  period: {
    start: string
    end: string
  }
}

export interface AnalyticsFilters {
  startDate: string
  endDate: string
  page?: string
  device?: DeviceType
}
