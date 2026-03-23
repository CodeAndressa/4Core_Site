import { NextRequest, NextResponse } from 'next/server'
import ChatbotService, { ConversationState } from '@/lib/services/chatbotService'
import { supabaseAdmin } from '@/lib/supabase'

/**
 * POST /api/chatbot
 * 
 * Endpoint para processar mensagens do chatbot
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationState } = body

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Mensagem é obrigatória' },
        { status: 400 }
      )
    }

    // Se não houver estado, iniciar nova conversa
    let state: ConversationState = conversationState || ChatbotService.initConversation()

    // Processar mensagem
    const { response, updatedState } = await ChatbotService.processMessage(message, state)

    // Verificar se deve mostrar botões de contato
    const showContactButtons = ChatbotService.shouldShowContactButtons(updatedState)

    // Se lead foi capturado, salvar no Supabase
    if (updatedState.leadCaptured && !conversationState?.leadCaptured) {
      await saveLead(updatedState)
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

/**
 * Salvar lead no Supabase
 */
async function saveLead(state: ConversationState) {
  if (!supabaseAdmin) {
    console.error('Supabase não configurado')
    return
  }

  try {
    const leadData = ChatbotService.prepareLeadForDatabase(state)

    const { error } = await supabaseAdmin
      .from('chatbot_leads')
      .insert(leadData)

    if (error) {
      console.error('Erro ao salvar lead:', error)
    } else {
      console.log('Lead salvo com sucesso:', leadData.email || leadData.phone)
    }
  } catch (error) {
    console.error('Erro ao salvar lead:', error)
  }
}
