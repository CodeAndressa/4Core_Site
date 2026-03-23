import { NextRequest, NextResponse } from 'next/server'
import { EventService } from '@/lib/services/eventService'
import type { TrackEventInput } from '@/types/analytics'

/**
 * POST /api/events
 * 
 * Endpoint público para capturar eventos do site
 * Usado pela função trackEvent() do frontend
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar campos obrigatórios
    if (!body.type || !body.page) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios: type, page' },
        { status: 400 }
      )
    }

    // Validar tipo de evento
    const validTypes = ['page_view', 'whatsapp_click', 'form_submit', 'form_view', 'cta_click']
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { success: false, error: 'Tipo de evento inválido' },
        { status: 400 }
      )
    }

    // Criar evento
    const result = await EventService.createEvent({
      type: body.type,
      page: body.page,
      source: body.source,
      referrer: body.referrer,
      device: body.device,
      session_id: body.session_id,
      user_agent: body.user_agent,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (error) {
    console.error('Erro ao processar evento:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/events
 * 
 * Endpoint protegido para listar eventos (admin)
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      type: searchParams.get('type') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100,
    }

    const events = await EventService.getEvents(filters)

    return NextResponse.json({ success: true, data: events })
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar eventos' },
      { status: 500 }
    )
  }
}
