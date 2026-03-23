/**
 * Tipos do sistema de Leads/CRM
 */

export type LeadStatus = 'novo' | 'contatado' | 'qualificado' | 'convertido' | 'perdido'

export type LeadSourceChannel = 'form' | 'whatsapp' | 'phone' | 'email'

export interface Lead {
  id: string
  
  // Dados do lead
  name: string
  email: string
  phone: string
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
  email: string
  phone: string
  company?: string
  employees?: string
  message?: string
  source_page: string
  source_channel?: LeadSourceChannel
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface LeadServiceResponse {
  success: boolean
  data?: Lead
  error?: string
}
