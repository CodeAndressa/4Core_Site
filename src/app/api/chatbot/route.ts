import { NextRequest, NextResponse } from 'next/server'
import ChatbotService, { ConversationState } from '@/lib/services/chatbotService'
import { supabaseAdmin } from '@/lib/supabase'
import { enforceRateLimit, validateTrustedOrigin } from '@/lib/apiSecurity'

export async function POST(request: NextRequest) {
  const originCheck = validateTrustedOrigin(request)
  if (!originCheck.ok) {
    return originCheck.response
  }

  const rateLimit = enforceRateLimit(request, 'chatbot:message', {
    limit: 30,
    windowMs: 5 * 60 * 1000,
  })
  if (!rateLimit.ok) {
    return rateLimit.response
  }

  try {
    const body = await request.json()
    const { message, conversationState } = body

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Mensagem é obrigatória' },
        { status: 400 }
      )
    }

    const previousState: ConversationState | null = conversationState || null
    const state = previousState || ChatbotService.initConversation()
    const { response, updatedState } = await ChatbotService.processMessage(message, state)
    const showContactButtons = ChatbotService.shouldShowContactButtons(updatedState)

    const leadJustCaptured = updatedState.leadCaptured && !previousState?.leadCaptured
    if (leadJustCaptured) {
      const saveResult = await saveLead(updatedState)

      if (!saveResult.success) {
        return NextResponse.json(
          { success: false, error: saveResult.error || 'Erro ao salvar lead do chatbot' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        message: response.message,
        solutions: response.solutions,
        needsLeadCapture: response.needsLeadCapture,
        conversationEnded: response.conversationEnded,
        conversationState: updatedState,
        showContactButtons,
      },
    })
  } catch (error) {
    console.error('Erro no chatbot:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}

async function saveLead(state: ConversationState) {
  if (!supabaseAdmin) {
    console.error('Supabase não configurado')
    return { success: false as const, error: 'CRM não configurado' }
  }

  try {
    const leadData = ChatbotService.prepareLeadForDatabase(state)

    const { error } = await supabaseAdmin.from('chatbot_leads').insert(leadData)

    if (error) {
      console.error('Erro ao salvar lead:', error)
      return { success: false as const, error: error.message }
    }

    return { success: true as const }
  } catch (error) {
    console.error('Erro ao salvar lead:', error)
    return { success: false as const, error: 'Erro interno ao salvar lead' }
  }
}
