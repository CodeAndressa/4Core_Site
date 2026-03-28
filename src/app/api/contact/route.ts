import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validators'
import { sendContactEmail, sendLeadMagnetEmail } from '@/lib/email'
import { createLead } from '@/lib/services/leadService'
import { enforceRateLimit, validateTrustedOrigin } from '@/lib/apiSecurity'
import type { ContactApiResponse } from '@/types/contact'

export async function POST(request: NextRequest) {
  const originCheck = validateTrustedOrigin(request)
  if (!originCheck.ok) {
    return originCheck.response
  }

  const rateLimit = enforceRateLimit(request, 'contact:create', {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  })
  if (!rateLimit.ok) {
    return rateLimit.response
  }

  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      const response: ContactApiResponse = {
        success: false,
        message: 'Dados inválidos. Verifique os campos e tente novamente.',
        errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      }

      return NextResponse.json(response, { status: 400 })
    }

    const leadResult = await createLead({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      company: result.data.company,
      employees: result.data.employees,
      message: result.data.message,
      source_page: '/contato',
      source_channel: 'form',
    })

    if (!leadResult.success) {
      console.error('[api/contact] Erro ao salvar lead:', leadResult.error)
    }

    const emailResult = await sendContactEmail(result.data)

    if (!emailResult.success) {
      const response: ContactApiResponse = {
        success: false,
        message:
          emailResult.error ||
          'Erro ao processar sua solicitação. Tente novamente mais tarde.',
      }

      return NextResponse.json(response, { status: 500 })
    }

    // Se for um cadastro da Isca Digital, disparar o email com material para o Lead
    if (result.data.message?.includes('Isca Digital')) {
      const magnetResult = await sendLeadMagnetEmail(result.data)
      if (!magnetResult.success) {
        console.error('[api/contact] Erro ao enviar material para o lead:', magnetResult.error)
      }
    }

    const responseContent: ContactApiResponse = {
      success: true,
      message: 'Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.',
    }

    return NextResponse.json(responseContent, { status: 200 })
  } catch (error) {
    console.error('[api/contact] Erro inesperado:', error)

    const responseContent: ContactApiResponse = {
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde.',
    }

    return NextResponse.json(responseContent, { status: 500 })
  }
}
