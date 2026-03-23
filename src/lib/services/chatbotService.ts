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
- Fazer perguntas estratégicas UMA DE CADA VEZ
- Recomendar soluções APENAS após entender o cenário
- Capturar dados de contato (email ou telefone)

## PERSONALIDADE:
- Tom: Amigável e profissional
- Estilo: Conversacional e direto
- Respostas: CURTAS (máximo 2-3 linhas)

## REGRAS OBRIGATÓRIAS:
1. NUNCA invente informações sobre produtos ou preços
2. Faça APENAS UMA pergunta por vez
3. AGUARDE a resposta antes de sugerir soluções
4. Use linguagem simples e clara
5. Respostas CURTAS e objetivas
6. NÃO liste múltiplas opções de uma vez
7. Conduza a conversa de forma natural, como um humano

## SOLUÇÕES DISPONÍVEIS:
1. REP-P Facial - Relógio de ponto com reconhecimento facial
2. TopPonto Web - Software em nuvem para gestão de jornada
3. TopPonto Mobile - App para equipes externas/home office
4. Catracas - Controle de acesso físico
5. Terminais Faciais - Controle de áreas restritas
6. Bastão de Ronda - Controle de rondas de segurança

## FLUXO DE CONVERSA:
1. Cumprimentar de forma amigável
2. Perguntar qual a necessidade (UMA pergunta)
3. Fazer perguntas de qualificação (UMA por vez)
4. SOMENTE após 3-4 respostas, sugerir solução
5. Capturar email ou telefone
6. Oferecer próximo passo

## ESTILO DE RESPOSTA:
❌ ERRADO: "Temos várias opções: REP-P Facial que custa X, TopPonto Web que faz Y, e também..."
✅ CORRETO: "Entendi! Para te ajudar melhor, quantos funcionários vocês têm?"

❌ ERRADO: "Baseado no seu perfil, recomendo as seguintes soluções: 1) REP-P Facial porque..."
✅ CORRETO: "Perfeito! Para 50 funcionários presenciais, o ideal é o REP-P Facial. Quer saber mais?"

## CAPTURA DE LEAD:
- Momento: Após demonstrar interesse em solução específica
- Abordagem: "Posso te enviar mais detalhes por e-mail?"
- Se recusar: "Sem problemas! Prefere WhatsApp?"

Responda de forma natural, conversacional e SEMPRE aguarde a resposta antes de avançar.`

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
    
    // 2. Buscar soluções relevantes (mas não mostrar automaticamente)
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
    
    // 10. Mostrar soluções APENAS se o bot mencionou alguma especificamente
    const shouldShowSolutions = this.shouldShowSolutions(assistantMessage, relevantSolutions)
    
    // 11. Construir resposta
    const response: ChatbotResponse = {
      message: assistantMessage,
      solutions: shouldShowSolutions ? relevantSolutions.slice(0, 1) : undefined, // Mostrar apenas 1
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
        temperature: 0.8,
        max_tokens: 150,
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
    let context = '## CONTEXTO:\n\n'
    
    // Intenção detectada
    if (intent) {
      context += `Intent: ${intent.intent}\n`
      if (intent.nextQuestion) {
        context += `Sugestão: ${intent.nextQuestion}\n`
      }
      context += '\n'
    }
    
    // Dados coletados (resumido)
    const dataCount = Object.keys(state.qualificationData).length
    if (dataCount > 0) {
      context += `Dados coletados: ${dataCount}/7\n`
      Object.entries(state.qualificationData).forEach(([key, value]) => {
        context += `- ${key}: ${value}\n`
      })
      context += '\n'
    }
    
    // Soluções relevantes (apenas nomes)
    if (solutions.length > 0 && dataCount >= 2) {
      context += 'Soluções relevantes: '
      context += solutions.map(s => s.name).join(', ')
      context += '\n\n'
    }
    
    // Score e ações
    if (dataCount >= 3) {
      const score = calculateQualificationScore(state.qualificationData)
      context += `Score: ${score}/100\n`
      
      if (score > 70 && !state.leadCaptured) {
        context += 'AÇÃO: Lead quente! Capture contato agora.\n'
      }
      context += '\n'
    }
    
    // Instruções baseadas no estado
    if (state.messages.length <= 2) {
      context += 'INSTRUÇÃO: Faça UMA pergunta para entender a necessidade.\n'
    } else if (dataCount < 3) {
      context += 'INSTRUÇÃO: Continue qualificando. Faça UMA pergunta por vez.\n'
    } else if (dataCount >= 3 && solutions.length > 0 && !state.leadCaptured) {
      context += 'INSTRUÇÃO: Sugira UMA solução específica (a mais relevante).\n'
    } else if (!state.leadCaptured && state.messages.length >= 6) {
      context += 'INSTRUÇÃO: Capture email/telefone AGORA.\n'
    } else if (state.leadCaptured) {
      context += 'INSTRUÇÃO: Lead capturado! Ofereça próximo passo.\n'
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
   * Verificar se deve mostrar soluções
   */
  private static shouldShowSolutions(assistantMessage: string, solutions: Solution[]): boolean {
    if (solutions.length === 0) return false
    
    const messageLower = assistantMessage.toLowerCase()
    
    // Verificar se o bot mencionou alguma solução específica
    const mentionedSolution = solutions.some(solution => {
      const nameLower = solution.name.toLowerCase()
      return messageLower.includes(nameLower) || 
             messageLower.includes('rep-p') ||
             messageLower.includes('topponto') ||
             messageLower.includes('catraca') ||
             messageLower.includes('bastão') ||
             messageLower.includes('terminal')
    })
    
    return mentionedSolution
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
   * Gerar resumo da conversa para WhatsApp
   */
  static generateConversationSummary(state: ConversationState): string {
    const parts: string[] = []
    
    // Soluções de interesse
    if (state.interestedSolutions.length > 0) {
      const solutionNames = state.interestedSolutions
        .map(id => knowledgeBase.solutions.find(s => s.id === id)?.name)
        .filter(Boolean)
        .join(', ')
      parts.push(`Me interessei em: ${solutionNames}`)
    }
    
    // Dados de qualificação
    if (state.qualificationData.company_size) {
      parts.push(`Empresa com ${state.qualificationData.company_size} funcionários`)
    }
    
    if (state.qualificationData.work_model) {
      parts.push(`Modelo: ${state.qualificationData.work_model}`)
    }
    
    if (state.qualificationData.current_system) {
      parts.push(`Sistema atual: ${state.qualificationData.current_system}`)
    }
    
    if (state.qualificationData.urgency) {
      parts.push(`Urgência: ${state.qualificationData.urgency}`)
    }
    
    if (state.qualificationData.main_problem) {
      parts.push(`Problema: ${state.qualificationData.main_problem}`)
    }
    
    // Adicionar chamada final
    parts.push('Gostaria de falar com um especialista')
    
    return parts.join('. ') + '.'
  }
  
  /**
   * Verificar se deve mostrar botões de contato
   */
  static shouldShowContactButtons(state: ConversationState): boolean {
    // Apenas mostrar se escolheu uma solução E já tem dados suficientes
    const hasChosenSolution = state.interestedSolutions.length > 0
    const hasEnoughData = Object.keys(state.qualificationData).length >= 3
    
    // OU se já teve muitas interações (8+)
    const userMessages = state.messages.filter(m => m.role === 'user').length
    const tooManyMessages = userMessages >= 8
    
    return (hasChosenSolution && hasEnoughData) || tooManyMessages
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
