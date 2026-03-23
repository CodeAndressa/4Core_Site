import { supabaseAdmin } from '@/lib/supabase'
import type { Event, TrackEventInput, EventServiceResponse } from '@/types/analytics'

/**
 * Event Service
 * 
 * Gerencia CRUD de eventos no Supabase
 */

export class EventService {
  /**
   * Criar novo evento
   */
  static async createEvent(input: TrackEventInput & { 
    session_id?: string
    user_agent?: string
    referrer?: string
  }): Promise<EventServiceResponse> {
    if (!supabaseAdmin) {
      return { success: false, error: 'Supabase não configurado' }
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('events')
        .insert({
          type: input.type,
          page: input.page,
          source: input.source || null,
          referrer: input.referrer || null,
          device: input.device || null,
          user_agent: input.user_agent || null,
          session_id: input.session_id || null,
        })
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar evento:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data: data as Event }
    } catch (error) {
      console.error('Erro ao criar evento:', error)
      return { success: false, error: 'Erro interno ao criar evento' }
    }
  }

  /**
   * Buscar eventos por filtros
   */
  static async getEvents(filters: {
    startDate?: string
    endDate?: string
    type?: string
    page?: string
    limit?: number
  }) {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    let query = supabaseAdmin
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate)
    }

    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate)
    }

    if (filters.type) {
      query = query.eq('type', filters.type)
    }

    if (filters.page) {
      query = query.eq('page', filters.page)
    }

    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return data as Event[]
  }

  /**
   * Contar eventos por tipo
   */
  static async countEventsByType(startDate: string, endDate: string) {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .select('type')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    if (error) {
      throw new Error(error.message)
    }

    const counts = data.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return counts
  }
}
