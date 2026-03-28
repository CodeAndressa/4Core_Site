import { NextRequest, NextResponse } from 'next/server'
import { getAllLeads } from '@/lib/services/leadService'
import { requireAuthenticatedUser } from '@/lib/apiSecurity'

export async function GET(request: NextRequest) {
  const auth = await requireAuthenticatedUser()
  if (!auth.ok) {
    return auth.response
  }

  try {
    const leads = await getAllLeads()
    return NextResponse.json({
      success: true,
      data: leads,
    })
  } catch (error) {
    console.error('[api/admin/leads] Erro:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar leads' },
      { status: 500 }
    )
  }
}
