import { NextRequest, NextResponse } from 'next/server'
import { EventService } from '@/lib/services/eventService'
import { enforceRateLimit, requireAuthenticatedUser, validateTrustedOrigin } from '@/lib/apiSecurity'
import { trackEventSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  const originCheck = validateTrustedOrigin(request)
  if (!originCheck.ok) {
    return originCheck.response
  }

  const rateLimit = enforceRateLimit(request, 'events:create', {
    limit: 120,
    windowMs: 60 * 1000,
  })
  if (!rateLimit.ok) {
    return rateLimit.response
  }

  try {
    const body = await request.json()
    const parsedEvent = trackEventSchema.safeParse(body)

    if (!parsedEvent.success) {
      return NextResponse.json(
        { success: false, error: parsedEvent.error.issues[0]?.message || 'Evento inválido' },
        { status: 400 }
      )
    }

    const result = await EventService.createEvent(parsedEvent.data)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao processar evento:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const auth = await requireAuthenticatedUser()
  if (!auth.ok) {
    return auth.response
  }

  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      type: searchParams.get('type') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 100,
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
