import { NextRequest, NextResponse } from 'next/server'
import { createLead, getLeadByEmail } from '@/lib/services/leadService'
import { enforceRateLimit, requireAuthenticatedUser, validateTrustedOrigin } from '@/lib/apiSecurity'
import { leadCaptureSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  const originCheck = validateTrustedOrigin(request)
  if (!originCheck.ok) {
    return originCheck.response
  }

  const rateLimit = enforceRateLimit(request, 'lead:create', {
    limit: 8,
    windowMs: 10 * 60 * 1000,
  })
  if (!rateLimit.ok) {
    return rateLimit.response
  }

  try {
    const body = await request.json()
    const result = leadCaptureSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Dados inválidos. Verifique os campos e tente novamente.',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const leadResult = await createLead(result.data)

    if (!leadResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: leadResult.error || 'Erro ao criar lead',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead criado com sucesso',
        data: {
          id: leadResult.data?.id,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[api/lead] Erro inesperado:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno do servidor',
      },
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
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const lead = await getLeadByEmail(email)

    if (!lead) {
      return NextResponse.json(
        { success: false, message: 'Lead não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: lead,
    })
  } catch (error) {
    console.error('[api/lead] Erro ao buscar lead:', error)
    return NextResponse.json(
      { success: false, message: 'Erro interno' },
      { status: 500 }
    )
  }
}
