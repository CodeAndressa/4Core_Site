import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsService } from '@/lib/services/analyticsService'
import { requireAuthenticatedUser } from '@/lib/apiSecurity'

export async function GET(request: NextRequest) {
  const auth = await requireAuthenticatedUser()
  if (!auth.ok) {
    return auth.response
  }

  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Parâmetros startDate e endDate são obrigatórios' },
        { status: 400 }
      )
    }

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
