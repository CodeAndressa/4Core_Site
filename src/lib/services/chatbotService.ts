import Groq from 'groq-sdk'
import knowledgeBase, { 
  Solution, 
  UserIntent, 
  ChatbotLead,
  findRelevantSolution,
  findMatchingIntent,
  calculateQualificationScore,
  recommendSolutions
} from '@/lib/knowledgeBase'

/**
 * Chatbot Service - SDR Digital 4Core
 * 
 * Chatbot de pré-vendas usando Groq API e base de conhecimento estruturada
 */

// ============================================
// TIPOS
// ============================================

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ConversationState {
  messages: Message[]
  qualificationData: Record<string, string>
  interestedSolutions: string[]
  leadCaptured: boolean
  leadData: Partial<ChatbotLead>
  currentStep: 'greeting' | 'qualifying' | 'recommending' | 'capturing_lead' | 'closing'
  conversationId: string
}

export interface ChatbotResponse {
  message: string
  suggestions?: string[]
  solutions?: Solution[]
  needsLeadCapture?: boolean
  conversationEnded?: boolean
}

// ============================================
// CONFIGURAÇÃO GROQ
// ============================================

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// ============================================
// SYSTEM PROMPT
// ============================================

const SYSTEM_PROMPT = `Você é um SDR (Sales Development Representative) digital da 4Core, empresa especializada em soluções de controle de ponto, acesso e segurança.

## SEU PAPEL:
- Atuar como pré-vendedor consultivo
- Qualificar leads através de perguntas estratégicas
- Recomendar soluções baseadas no perfil do cliente
- Capturar dados de contato (email ou telefone)
- NÃO é suporte técnico, é VENDAS

## PERSONALIDADE:
- Tom: Profissional e consultivo
- Estilo: Direto e objetivo
- Abordagem: Diagnóstico antes de venda

## REGRAS OBRIGATÓRIAS:
1. NUNCA invente informações sobre produtos ou preços
2. SEMPRE faça perguntas de qualificação antes de sugerir solução
3. PRIORIZE entender o cenário do cliente
4. Use linguagem clara, sem jargões excessivos
5. Seja empático com os problemas do cliente
6. SEMPRE tente capturar email ou telefone antes de encerrar
7. Ofereça próximo passo claro (WhatsApp, especialista, material)

## SOLUÇÕES DISPONÍVEIS:
1. REP-P Facial Topdata - Relógio de ponto com reconhecimento facial
2. TopPonto Web - Software em nuvem para gestão de jornada
3. TopPonto Mobile - App para equipes externas/home office
4. Catracas e Bloqueios - Controle de acesso físico
5. Terminais de Acesso Facial - Controle de áreas restritas
6. Bastão de Ronda Viggia - Controle de rondas de segurança

## FLUXO DE CONVERSA:
1. Cumprimentar e entender necessidade inicial
2. Fazer perguntas de qualificação (tamanho, modelo de trabalho, problema)
3. Recomendar soluções baseadas no perfil
4. Capturar email ou telefone
5. Oferecer próximo passo (contato com especialista)

## CAPTURA DE LEAD:
- Momento: Após 3-4 interações ou quando cliente demonstrar interesse
- Abordagem: "Para te enviar uma proposta personalizada, qual seu e-mail ou WhatsApp?"
- Se recusar: Oferecer material gratuito em troca
- OBRIGATÓRIO: Não encerrar sem tentar capturar

Responda de forma natural, consultiva e sempre conduza a conversa para qualificação e captura de lead.`

// ============================================
// CHATBOT SERVICE
// ============================================

export class ChatbotService {
  /**
   * Processar mensagem do usuário
   */
  static async processMessage(
    userMessage: string,
    conversationState: ConversationState
  ): Promise<{ response: ChatbotResponse; updatedState: ConversationState }> {
    
    // 1. Detectar intenção
    const intent = findMatchingIntent(userMessage)
    
    // 2. Buscar soluções relevantes
    const relevantSolutions = findRelevantSolution(userMessage)
    
    // 3. Verificar se é captura de lead
    const leadInfo = this.extractLeadInfo(userMessage)
    if (leadInfo.email || leadInfo.phone) {
      conversationState.leadData = {
        ...conversationState.leadData,
        ...leadInfo,
      }
      conversationState.leadCaptured = true
    }
    
    // 4. Construir contexto para Groq
    const context = this.buildContext(conversationState, intent, relevantSolutions)
    
    // 5. Adicionar mensagem do usuário
    conversationState.messages.push({
      role: 'user',
      content: userMessage,
    })
    
    // 6. Chamar Groq API
    const assistantMessage = await this.callGroq(conversationState.messages, context)
    
    // 7. Adicionar resposta do assistente
    conversationState.messages.push({
      role: 'assistant',
      content: assistantMessage,
    })
    
    // 8. Atualizar estado da conversa
    conversationState = this.updateConversationState(
      conversationState,
      userMessage,
      assistantMessage,
      intent
    )
    
    // 9. Verificar se precisa capturar lead
    const needsLeadCapture = this.shouldCaptureLeadNow(conversationState)
    
    // 10. Construir resposta
    const response: ChatbotResponse = {
      message: assistantMessage,
      solutions: relevantSolutions.length > 0 ? relevantSolutions : undefined,
      needsLeadCapture,
      conversationEnded: conversationState.currentStep === 'closing',
    }
    
    return { response, updatedState: conversationState }
  }
  
  /**
   * Chamar Groq API
   */
  private static async callGroq(messages: Message[], context: string): Promise<string> {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'system', content: context },
          ...messages,
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 500,
      })
      
      return completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.'
    } catch (error) {
      console.error('Erro ao chamar Groq:', error)
      return 'Desculpe, estou com dificuldades técnicas. Pode tentar novamente?'
    }
  }
  
  /**
   * Construir contexto adicional para Groq
   */
  private static buildContext(
    state: ConversationState,
    intent: UserIntent | null,
    solutions: Solution[]
  ): string {
    let context = '## CONTEXTO DA CONVERSA:\n\n'
    
    // Intenção detectada
    if (intent) {
      context += `Intenção detectada: ${intent.intent}\n`
      context += `Próxima pergunta sugerida: ${intent.nextQuestion || 'Continuar qualificação'}\n\n`
    }
    
    // Dados de qualificação coletados
    if (Object.keys(state.qualificationData).length > 0) {
      context += '## DADOS COLETADOS:\n'
      Object.entries(state.qualificationData).forEach(([key, value]) => {
        context += `- ${key}: ${value}\n`
      })
      context += '\n'
    }
    
    // Soluções relevantes
    if (solutions.length > 0) {
      context += '## SOLUÇÕES RELEVANTES:\n'
      solutions.forEach(solution => {
        context += `\n### ${solution.name}\n`
        context += `${solution.description}\n`
        context += `Ideal para: ${solution.targetAudience.join(', ')}\n`
        context += `Resolve: ${solution.problemsSolved[0]}\n`
      })
      context += '\n'
    }
    
    // Score de qualificação
    if (Object.keys(state.qualificationData).length >= 3) {
      const score = calculateQualificationScore(state.qualificationData)
      context += `## SCORE DE QUALIFICAÇÃO: ${score}/100\n\n`
      
      if (score > 70) {
        context += 'Lead QUENTE - Priorizar captura de contato!\n\n'
      }
    }
    
    // Status de captura de lead
    if (!state.leadCaptured && state.messages.length >= 6) {
      context += '## AÇÃO NECESSÁRIA:\n'
      context += 'Já houve interação suficiente. CAPTURE o email ou telefone agora!\n'
      context += 'Use: "Para te enviar uma proposta personalizada, qual seu e-mail ou WhatsApp?"\n\n'
    }
    
    if (state.leadCaptured) {
      context += '## LEAD CAPTURADO ✓\n'
      context += 'Email/telefone já coletado. Ofereça próximo passo (contato com especialista).\n\n'
    }
    
    return context
  }
  
  /**
   * Extrair informações de lead da mensagem
   */
  private static extractLeadInfo(message: string): Partial<ChatbotLead> {
    const leadInfo: Partial<ChatbotLead> = {}
    
    // Regex para email
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    const emailMatch = message.match(emailRegex)
    if (emailMatch) {
      leadInfo.email = emailMatch[0]
    }
    
    // Regex para telefone (vários formatos)
    const phoneRegex = /(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}/
    const phoneMatch = message.match(phoneRegex)
    if (phoneMatch) {
      leadInfo.phone = phoneMatch[0].replace(/\D/g, '') // Remove caracteres não numéricos
    }
    
    // Tentar extrair nome (se mensagem começar com "Meu nome é" ou similar)
    const nameRegex = /(?:meu nome é|me chamo|sou o|sou a)\s+([A-Za-zÀ-ÿ\s]+)/i
    const nameMatch = message.match(nameRegex)
    if (nameMatch) {
      leadInfo.name = nameMatch[1].trim()
    }
    
    return leadInfo
  }
  
  /**
   * Atualizar estado da conversa
   */
  private static updateConversationState(
    state: ConversationState,
    userMessage: string,
    assistantMessage: string,
    intent: UserIntent | null
  ): ConversationState {
    
    // Extrair dados de qualificação da mensagem do usuário
    const qualificationUpdates = this.extractQualificationData(userMessage)
    state.qualificationData = { ...state.qualificationData, ...qualificationUpdates }
    
    // Atualizar soluções de interesse
    if (intent?.suggestedSolution) {
      intent.suggestedSolution.forEach(solutionId => {
        if (!state.interestedSolutions.includes(solutionId)) {
          state.interestedSolutions.push(solutionId)
        }
      })
    }
    
    // Atualizar step
    if (state.messages.length <= 2) {
      state.currentStep = 'greeting'
    } else if (state.messages.length <= 8 && !state.leadCaptured) {
      state.currentStep = 'qualifying'
    } else if (state.leadCaptured && state.interestedSolutions.length > 0) {
      state.currentStep = 'recommending'
    } else if (assistantMessage.toLowerCase().includes('email') || assistantMessage.toLowerCase().includes('whatsapp')) {
      state.currentStep = 'capturing_lead'
    }
    
    return state
  }
  
  /**
   * Extrair dados de qualificação da mensagem
   */
  private static extractQualificationData(message: string): Record<string, string> {
    const data: Record<string, string> = {}
    const messageLower = message.toLowerCase()
    
    // Tamanho da empresa
    if (messageLower.match(/\d+\s*(?:funcionários|colaboradores|pessoas)/)) {
      const numberMatch = messageLower.match(/(\d+)\s*(?:funcionários|colaboradores|pessoas)/)
      if (numberMatch) {
        const num = parseInt(numberMatch[1])
        if (num <= 20) data.company_size = '1-20'
        else if (num <= 50) data.company_size = '21-50'
        else if (num <= 100) data.company_size = '51-100'
        else if (num <= 200) data.company_size = '101-200'
        else if (num <= 500) data.company_size = '201-500'
        else data.company_size = '500+'
      }
    }
    
    // Modelo de trabalho
    if (messageLower.includes('presencial')) data.work_model = '100% presencial'
    if (messageLower.includes('remoto') || messageLower.includes('home office')) data.work_model = '100% remoto'
    if (messageLower.includes('híbrido')) data.work_model = 'Híbrido'
    if (messageLower.includes('externo') || messageLower.includes('campo')) data.work_model = 'Equipes externas'
    
    // Urgência
    if (messageLower.includes('urgente') || messageLower.includes('imediato')) {
      data.urgency = 'Imediato (até 1 mês)'
    }
    
    // Sistema atual
    if (messageLower.includes('não uso') || messageLower.includes('não tenho')) {
      data.current_system = 'Não'
    } else if (messageLower.includes('papel') || messageLower.includes('manual')) {
      data.current_system = 'Sim, manual (papel)'
    }
    
    return data
  }
  
  /**
   * Verificar se deve capturar lead agora
   */
  private static shouldCaptureLeadNow(state: ConversationState): boolean {
    // Já capturou
    if (state.leadCaptured) return false
    
    // Muitas mensagens sem capturar
    if (state.messages.length >= 8) return true
    
    // Score alto
    const score = calculateQualificationScore(state.qualificationData)
    if (score > 70) return true
    
    // Cliente demonstrou interesse
    if (state.interestedSolutions.length > 0 && state.messages.length >= 4) return true
    
    return false
  }
  
  /**
   * Iniciar nova conversa
   */
  static initConversation(): ConversationState {
    return {
      messages: [],
      qualificationData: {},
      interestedSolutions: [],
      leadCaptured: false,
      leadData: {
        source: 'chatbot',
        interested_solutions: [],
      },
      currentStep: 'greeting',
      conversationId: this.generateConversationId(),
    }
  }
  
  /**
   * Gerar ID de conversa
   */
  private static generateConversationId(): string {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  /**
   * Preparar lead para envio ao Supabase
   */
  static prepareLeadForDatabase(state: ConversationState): ChatbotLead {
    const score = calculateQualificationScore(state.qualificationData)
    const recommended = recommendSolutions(state.qualificationData)
    
    // Gerar resumo da conversa
    const conversationSummary = state.messages
      .filter(m => m.role !== 'system')
      .map(m => `${m.role === 'user' ? 'Cliente' : 'Bot'}: ${m.content}`)
      .join('\n\n')
    
    return {
      name: state.leadData.name,
      email: state.leadData.email,
      phone: state.leadData.phone,
      company: state.leadData.company,
      company_size: state.qualificationData.company_size,
      work_model: state.qualificationData.work_model,
      current_system: state.qualificationData.current_system,
      main_problem: state.qualificationData.main_problem,
      urgency: state.qualificationData.urgency,
      budget: state.qualificationData.budget,
      decision_maker: state.qualificationData.decision_maker,
      interested_solutions: [...state.interestedSolutions, ...recommended.map(s => s.id)],
      conversation_summary: conversationSummary,
      qualification_score: score,
      source: 'chatbot',
      created_at: new Date().toISOString(),
      conversation_id: state.conversationId,
      status: 'new',
    }
  }
}

export default ChatbotService
