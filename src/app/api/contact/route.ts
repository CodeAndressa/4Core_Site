import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validators'
import { sendContactEmail } from '@/lib/email'
import { createLead } from '@/lib/services/leadService'
import type { ContactApiResponse } from '@/types/contact'

/**
 * POST /api/contact
 *
 * Recebe os dados do formulário de contato, valida com Zod,
 * salva no Supabase como lead e envia o e-mail para a empresa.
 *
 * Fluxo:
 * 1. Parse do JSON body
 * 2. Validação server-side (mesmo schema do client)
 * 3. Salvar lead no Supabase (CRM)
 * 4. Envio de e-mail via SMTP
 * 5. [FUTURO] Enviar para webhook n8n
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação server-side com o mesmo schema do client
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      const response: ContactApiResponse = {
        success: false,
        message: 'Dados inválidos. Verifique os campos e tente novamente.',
        errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      }

      return NextResponse.json(response, { status: 400 })
    }

    // Salvar lead no Supabase
    const leadResult = await createLead({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      company: result.data.company,
      employees: result.data.employees,
      message: result.data.message,
      source_page: 'contato',
      source_channel: 'form',
    })

    if (!leadResult.success) {
      console.error('[api/contact] Erro ao salvar lead:', leadResult.error)
      // NÃO bloqueia o fluxo - continua para enviar email
    }

    // Envio do e-mail
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

    // [FUTURO] Enviar dados para webhook n8n
    // await sendToWebhook(result.data)

    const responseContent: ContactApiResponse = {
      success: true,
      message:
        'Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.',
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
