import { NextRequest, NextResponse } from 'next/server'
import { updateLeadStatus } from '@/lib/services/leadService'
import { requireAuthenticatedUser } from '@/lib/apiSecurity'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuthenticatedUser()
  if (!auth.ok) {
    return auth.response
  }

  try {
    const { id } = await params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status é obrigatório' },
        { status: 400 }
      )
    }

    const result = await updateLeadStatus(id, status)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || 'Erro ao atualizar status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error('[api/admin/leads/[id]] Erro:', error)
    return NextResponse.json(
      { success: false, message: 'Erro interno' },
      { status: 500 }
    )
  }
}
