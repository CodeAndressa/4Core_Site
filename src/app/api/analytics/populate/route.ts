import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAuthenticatedUser } from '@/lib/apiSecurity'

const PAGES = ['/', '/solucoes', '/sobre', '/contato', '/compliance']
const SOURCES = ['direct', 'google', 'facebook', 'linkedin', 'instagram']
const DEVICES = ['mobile', 'desktop', 'tablet']

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function POST() {
  const auth = await requireAuthenticatedUser()
  if (!auth.ok) {
    return auth.response
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ success: false, error: 'Supabase não configurado' }, { status: 500 })
  }

  try {
    const events = []
    const now = new Date()
    const sessions = new Set<string>()

    // Gerar eventos dos últimos 30 dias
    for (let day = 0; day < 30; day++) {
      const date = new Date(now)
      date.setDate(date.getDate() - day)

      // 10-50 sessões por dia
      const dailySessions = randomInt(10, 50)

      for (let s = 0; s < dailySessions; s++) {
        const sessionId = `session-${date.getTime()}-${s}`
        sessions.add(sessionId)
        
        const device = randomItem(DEVICES)
        const source = randomItem(SOURCES)
        const sessionStart = new Date(date)
        sessionStart.setHours(randomInt(8, 22), randomInt(0, 59), randomInt(0, 59))

        // 2-8 pageviews por sessão
        const pageviews = randomInt(2, 8)
        
        for (let p = 0; p < pageviews; p++) {
          const eventTime = new Date(sessionStart)
          eventTime.setSeconds(eventTime.getSeconds() + p * randomInt(10, 120))

          events.push({
            type: 'page_view',
            page: randomItem(PAGES),
            source,
            device,
            session_id: sessionId,
            created_at: eventTime.toISOString(),
          })
        }

        // 30% de chance de conversão
        if (Math.random() < 0.3) {
          const conversionTime = new Date(sessionStart)
          conversionTime.setSeconds(conversionTime.getSeconds() + pageviews * 60)
          
          const conversionType = Math.random() < 0.6 ? 'whatsapp_click' : 'form_submit'
          
          events.push({
            type: conversionType,
            page: randomItem(PAGES),
            source,
            device,
            session_id: sessionId,
            created_at: conversionTime.toISOString(),
          })
        }
      }
    }

    // Inserir em lotes de 500
    const batchSize = 500
    for (let i = 0; i < events.length; i += batchSize) {
      const batch = events.slice(i, i + batchSize)
      const { error } = await supabaseAdmin.from('events').insert(batch)
      
      if (error) {
        console.error('Erro ao inserir lote:', error)
        return NextResponse.json(
          { success: false, error: `Erro ao inserir dados: ${error.message}` },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        eventsCreated: events.length,
        sessionsCreated: sessions.size,
        daysPopulated: 30,
      },
    })
  } catch (error: any) {
    console.error('Erro ao popular dados:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao popular dados' },
      { status: 500 }
    )
  }
}
