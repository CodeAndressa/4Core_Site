import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAuthenticatedUser } from '@/lib/apiSecurity'

export async function GET() {
  const auth = await requireAuthenticatedUser()
  if (!auth.ok) {
    return auth.response
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ success: false, error: 'Supabase não configurado' }, { status: 500 })
  }

  try {
    // Contar total de eventos
    const { count: totalEvents, error: countError } = await supabaseAdmin
      .from('events')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      return NextResponse.json(
        { success: false, error: countError.message },
        { status: 500 }
      )
    }

    // Buscar evento mais antigo e mais recente
    const { data: oldestEvent } = await supabaseAdmin
      .from('events')
      .select('created_at')
      .order('created_at', { ascending: true })
      .limit(1)
      .single()

    const { data: newestEvent } = await supabaseAdmin
      .from('events')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // Contar eventos por tipo
    const { data: eventsByType } = await supabaseAdmin
      .from('events')
      .select('type')

    const typeCounts = eventsByType?.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      success: true,
      data: {
        totalEvents: totalEvents || 0,
        oldestEvent: oldestEvent?.created_at || null,
        newestEvent: newestEvent?.created_at || null,
        eventsByType: typeCounts || {},
      },
    })
  } catch (error: any) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
}
