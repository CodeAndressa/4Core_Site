import { supabaseAdmin } from '@/lib/supabase'
import type { CreateLeadInput, Lead, LeadServiceResponse } from '@/types/lead'

/**
 * Lead Service
 * 
 * Camada de serviço para operações de Lead no Supabase.
 * Centraliza toda a lógica de negócio relacionada a leads.
 * 
 * Responsabilidades:
 * - Inserção de leads
 * - Validação de duplicatas
 * - Normalização de dados
 * - Log de erros
 */

/**
 * Cria um novo lead no Supabase
 */
export async function createLead(
  input: CreateLeadInput
): Promise<LeadServiceResponse> {
  // Se Supabase não estiver configurado, retorna sucesso silencioso
  if (!supabaseAdmin) {
    console.warn('[leadService] Supabase não configurado - lead não será salvo')
    return { success: true }
  }

  try {
    // Normalizar dados
    const leadData = {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      company: input.company?.trim() || null,
      employees: input.employees || null,
      message: input.message?.trim() || null,
      source_page: input.source_page,
      source_channel: input.source_channel || 'form',
      utm_source: input.utm_source || null,
      utm_medium: input.utm_medium || null,
      utm_campaign: input.utm_campaign || null,
      status: 'novo',
    }

    // Inserir no Supabase
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert(leadData)
      .select()
      .single()

    if (error) {
      console.error('[leadService] Erro ao inserir lead:', error)
      
      // Tratamento de erro de duplicata
      if (error.code === '23505') {
        return {
          success: false,
          error: 'Este e-mail já foi cadastrado recentemente.',
        }
      }

      return {
        success: false,
        error: 'Erro ao salvar lead no banco de dados.',
      }
    }

    console.log('[leadService] Lead criado com sucesso:', data.id)

    return {
      success: true,
      data: data as Lead,
    }
  } catch (error) {
    console.error('[leadService] Erro inesperado:', error)
    return {
      success: false,
      error: 'Erro interno ao processar lead.',
    }
  }
}

/**
 * Busca lead por email
 */
export async function getLeadByEmail(email: string): Promise<Lead | null> {
  if (!supabaseAdmin) return null

  try {
    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      return null
    }

    return data as Lead
  } catch {
    return null
  }
}

/**
 * Atualiza status do lead
 */
export async function updateLeadStatus(
  leadId: string,
  status: Lead['status']
): Promise<LeadServiceResponse> {
  if (!supabaseAdmin) {
    return { success: false, error: 'Supabase não configurado' }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('leads')
      .update({ 
        status,
        last_contact_at: new Date().toISOString(),
      })
      .eq('id', leadId)
      .select()
      .single()

    if (error) {
      return {
        success: false,
        error: 'Erro ao atualizar status do lead.',
      }
    }

    return {
      success: true,
      data: data as Lead,
    }
  } catch {
    return {
      success: false,
      error: 'Erro interno ao atualizar lead.',
    }
  }
}
