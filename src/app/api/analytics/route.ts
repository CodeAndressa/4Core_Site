import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsService } from '@/lib/services/analyticsService'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/analytics
 * 
 * Endpoint protegido para obter dados do dashboard
 * Requer autenticação
 */

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Obter parâmetros de data
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Parâmetros startDate e endDate são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar dados do dashboard
    const dashboard = await AnalyticsService.getDashboard(startDate, endDate)

    return NextResponse.json({ success: true, data: dashboard })
  } catch (error) {
    console.error('Erro ao buscar analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar dados de analytics' },
      { status: 500 }
    )
  }
}
