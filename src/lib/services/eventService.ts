import { supabaseAdmin } from '@/lib/supabase'
import type { Event, TrackEventInput, EventServiceResponse, EventType } from '@/types/analytics'

type StoredEventInput = {
  type: string
  source?: string | null
  referrer?: string | null
}

const LEGACY_EVENT_MARKER = '__4core_event__'

function serializeLegacyEvent(type: EventType, source?: string) {
  return `${LEGACY_EVENT_MARKER}:${type}${source ? `:${source}` : ''}`
}

function mapEventForStorage(input: TrackEventInput & { referrer?: string }) {
  if (!['diagnostico_start', 'diagnostico_complete', 'diagnostic_answer', 'lead_captured'].includes(input.type)) {
    return {
      type: input.type,
      source: input.source || null,
      referrer: input.referrer || null,
    } satisfies StoredEventInput
  }

  return {
    type: 'cta_click',
    source: null,
    referrer: serializeLegacyEvent(input.type, input.source),
  } satisfies StoredEventInput
}

function mapStoredEvent(event: Event) {
  if (!event.referrer?.startsWith(`${LEGACY_EVENT_MARKER}:`)) {
    return event
  }

  const [, serializedType = '', serializedSource = ''] = event.referrer.split(':')

  return {
    ...event,
    type: serializedType as EventType,
    source: serializedSource || null,
    referrer: null,
  } satisfies Event
}

export class EventService {
  static async createEvent(
    input: TrackEventInput & {
      session_id?: string
      user_agent?: string
      referrer?: string
    }
  ): Promise<EventServiceResponse> {
    if (!supabaseAdmin) {
      return { success: false, error: 'Supabase não configurado' }
    }

    try {
      const storageEvent = mapEventForStorage(input)

      const { data, error } = await supabaseAdmin
        .from('events')
        .insert({
          type: storageEvent.type,
          page: input.page,
          source: storageEvent.source,
          referrer: storageEvent.referrer,
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

      return { success: true, data: mapStoredEvent(data as Event) }
    } catch (error) {
      console.error('Erro ao criar evento:', error)
      return { success: false, error: 'Erro interno ao criar evento' }
    }
  }

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

    let query = supabaseAdmin.from('events').select('*').order('created_at', { ascending: false })

    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate)
    }

    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate)
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

    const normalizedEvents = (data as Event[]).map(mapStoredEvent)

    if (filters.type) {
      return normalizedEvents.filter((event) => event.type === filters.type)
    }

    return normalizedEvents
  }

  static async countEventsByType(startDate: string, endDate: string) {
    if (!supabaseAdmin) {
      throw new Error('Supabase não configurado')
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    if (error) {
      throw new Error(error.message)
    }

    const counts = (data as Event[]).map(mapStoredEvent).reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return counts
  }
}
