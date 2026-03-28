/**
 * Tipos do sistema de Leads/CRM
 */

export type LeadStatus = 'new' | 'contacting' | 'no_response' | 'closed' | 'invalid'

export const LEAD_SOURCE_CHANNELS = ['form', 'whatsapp', 'phone', 'email'] as const

export type LeadSourceChannel = (typeof LEAD_SOURCE_CHANNELS)[number]

export interface Lead {
  id: string
  
  // Dados do lead
  name: string
  email?: string | null
  phone?: string | null
  company?: string | null
  employees?: string | null
  message?: string | null
  
  // Metadados de origem
  source_page: string
  source_channel: LeadSourceChannel
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  
  // Gestão CRM
  status: LeadStatus
  interest?: string | null
  assigned_to?: string | null
  
  // Timestamps
  created_at: string
  last_contact_at?: string | null
  converted_at?: string | null
}

export interface CreateLeadInput {
  name: string
  email?: string
  phone?: string
  company?: string
  employees?: string
  message?: string
  source_page: string
  source_channel?: LeadSourceChannel
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  interest?: string
}

export interface LeadServiceResponse {
  success: boolean
  data?: Lead
  error?: string
}
