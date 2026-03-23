import { NextResponse } from 'next/server'
import { createLead } from '@/lib/services/leadService'
import type { CreateLeadInput } from '@/types/lead'

/**
 * POST /api/lead
 * 
 * Endpoint para criar leads no Supabase.
 * Usado pelo formulário de contato e preparado para receber de outras fontes.
 * 
 * Body esperado:
 * {
 *   name: string
 *   email: string
 *   phone: string
 *   company?: string
 *   employees?: string
 *   message?: string
 *   source_page: string
 *   source_channel?: 'form' | 'whatsapp' | 'phone' | 'email'
 *   utm_source?: string
 *   utm_medium?: string
 *   utm_campaign?: string
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.name || !body.email || !body.phone || !body.source_page) {
      return NextResponse.json(
        {
          success: false,
          message: 'Campos obrigatórios: name, email, phone, source_page',
        },
        { status: 400 }
      )
    }

    // Criar lead
    const result = await createLead(body as CreateLeadInput)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error || 'Erro ao criar lead',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead criado com sucesso',
        data: result.data,
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

/**
 * GET /api/lead?email=xxx
 * 
 * Busca lead por email (para uso interno/admin)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const { getLeadByEmail } = await import('@/lib/services/leadService')
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
