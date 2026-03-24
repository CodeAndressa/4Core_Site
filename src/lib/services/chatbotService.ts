import Groq from 'groq-sdk'
import knowledgeBase, {
  Solution,
  UserIntent,
  ChatbotLead,
  findRelevantSolution,
  findMatchingIntent,
  calculateQualificationScore,
  recommendSolutions,
} from '@/lib/knowledgeBase'

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

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const SYSTEM_PROMPT = `Você é um SDR digital da 4Core — empresa especializada em controle de ponto, acesso e segurança patrimonial.

## OBJETIVO:
Entender o cenário rapidamente → Recomendar a solução → Capturar contato → Direcionar para o comercial.

## FLUXO OBRIGATÓRIO:
1. Se o usuário JÁ forneceu contexto (empresa, tamanho, problema, solução) → RECOMENDE IMEDIATAMENTE, não pergunte mais nada
2. Se precisar de contexto → faça NO MÁXIMO 1 pergunta objetiva e curta
3. Após recomendar → peça contato de forma natural
4. Após capturar contato → direcione para o WhatsApp comercial

## PERSONALIDADE:
- Tom: profissional e consultivo
- Estilo: direto e objetivo
- Respostas: no máximo 3 linhas

## REGRAS CRÍTICAS:
1. NUNCA faça mais de 1 pergunta por vez
2. Se o usuário já deu contexto suficiente, RECOMENDE JÁ — não repita diagnóstico nem peça mais dados
3. NUNCA diga "vou te enviar por e-mail" ou "posso te mandar por e-mail" — isso não existe
4. Quando o usuário pedir orçamento, proposta ou especialista → PARE tudo e capture o contato AGORA
5. Em caso de erro técnico, não exponha — diga: "Tive um problema aqui, pode repetir seu contato?"

## COMO RECOMENDAR:
Seja direto. Exemplo:
"Para um escritório com 10 pessoas, o REP-P Facial é a solução ideal — simples, sem contato e em conformidade com a Portaria 671."

## COMO CAPTURAR CONTATO:
Após recomendar, peça assim:
"Posso te direcionar para um especialista que explica a implementação. Me informa seu WhatsApp ou e-mail?"
Aceite qualquer um (WhatsApp OU e-mail). Não repita o pedido se recusar.

## COMO FINALIZAR:
SEMPRE diga: "Nosso time comercial vai entrar em contato em breve. Você também pode falar direto pelo WhatsApp: (41) 98847-6431"
NUNCA prometa envio por e-mail.

## SOLUÇÕES DISPONÍVEIS:
- REP-P Facial: relógio de ponto com reconhecimento facial, sem contato, Portaria 671
- TopPonto Web: software em nuvem para gestão de jornada e fechamento de folha
- TopPonto Mobile: app para equipes externas com geolocalização
- Catracas: controle de fluxo físico em portarias (modelos Revolution, Fit, Box, PNE)
- Terminais Faciais: controle de acesso para áreas restritas
- Bastão de Ronda Viggia: controle de rondas de segurança patrimonial`

function cloneConversationState(state: ConversationState): ConversationState {
  return {
    messages: [...state.messages],
    qualificationData: { ...state.qualificationData },
    interestedSolutions: [...state.interestedSolutions],
    leadCaptured: state.leadCaptured,
    leadData: { ...state.leadData },
    currentStep: state.currentStep,
    conversationId: state.conversationId,
  }
}

export class ChatbotService {
  static async processMessage(
    userMessage: string,
    conversationState: ConversationState
  ): Promise<{ response: ChatbotResponse; updatedState: ConversationState }> {
    const nextState = cloneConversationState(conversationState)
    const intent = findMatchingIntent(userMessage)
    const relevantSolutions = findRelevantSolution(userMessage)
    const directInfoSolution = this.resolveInformationalSolution(userMessage, relevantSolutions)

    const leadInfo = this.extractLeadInfo(userMessage)
    if (leadInfo.email || leadInfo.phone || leadInfo.name) {
      nextState.leadData = {
        ...nextState.leadData,
        ...leadInfo,
      }
      nextState.leadCaptured = Boolean(nextState.leadData.email || nextState.leadData.phone)
    }

    nextState.messages.push({
      role: 'user',
      content: userMessage,
    })

    let assistantMessage: string

    if (directInfoSolution) {
      assistantMessage = this.buildInformationalResponse(directInfoSolution)
    } else {
      const context = this.buildContext(nextState, intent, relevantSolutions)
      assistantMessage = await this.callGroq(nextState.messages, context)
    }

    nextState.messages.push({
      role: 'assistant',
      content: assistantMessage,
    })

    const updatedState = this.updateConversationState(
      nextState,
      userMessage,
      assistantMessage,
      intent,
      directInfoSolution
    )

    const shouldShowSolutions =
      (directInfoSolution && !updatedState.leadCaptured) ||
      this.shouldShowSolutions(assistantMessage, relevantSolutions)

    const response: ChatbotResponse = {
      message: assistantMessage,
      solutions: shouldShowSolutions
        ? (directInfoSolution ? [directInfoSolution] : relevantSolutions.slice(0, 1))
        : undefined,
      needsLeadCapture: this.shouldCaptureLeadNow(updatedState),
      conversationEnded: updatedState.currentStep === 'closing',
    }

    return { response, updatedState }
  }

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
        max_tokens: 150,
      })

      return completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.'
    } catch (error) {
      console.error('Erro ao chamar Groq:', error)
      return 'Desculpe, estou com dificuldades técnicas. Pode tentar novamente?'
    }
  }

  private static buildContext(
    state: ConversationState,
    intent: UserIntent | null,
    solutions: Solution[]
  ): string {
    let context = '## CONTEXTO:\n\n'
    const dataCount = Object.keys(state.qualificationData).length
    const userMessages = state.messages.filter((m) => m.role === 'user').length
    const lastUserMessage = state.messages.filter((m) => m.role === 'user').slice(-1)[0]?.content ?? ''
    const isHighIntent = this.detectHighIntent(lastUserMessage)

    if (intent) {
      context += `Intenção detectada: ${intent.intent}\n\n`
    }

    if (dataCount > 0) {
      context += 'Contexto do usuário:\n'
      Object.entries(state.qualificationData).forEach(([key, value]) => {
        context += `- ${key}: ${value}\n`
      })
      context += '\n'
    }

    if (solutions.length > 0) {
      context += `Soluções relevantes: ${solutions.map((s) => s.name).join(', ')}\n\n`
    }

    // Instrução baseada no estado — sem limiar artificial de 3 dados
    if (isHighIntent && !state.leadCaptured) {
      context += 'PRIORIDADE MÁXIMA: O usuário quer orçamento ou falar com especialista. CAPTURE O CONTATO AGORA. Não faça mais perguntas. Direcione para WhatsApp: (41) 98847-6431.\n'
    } else if (state.leadCaptured) {
      context += 'INSTRUÇÃO: Contato capturado. Finalize direcionando para o WhatsApp comercial: (41) 98847-6431.\n'
    } else if (dataCount >= 1 || solutions.length > 0 || userMessages >= 2) {
      context += 'INSTRUÇÃO: Você já tem contexto suficiente. Recomende a solução mais adequada agora e peça o contato do usuário (WhatsApp ou e-mail). Direcione para WhatsApp: (41) 98847-6431 ou (41) 98803-5657.\n'
    } else {
      context += 'INSTRUÇÃO: Faça UMA pergunta objetiva para entender o cenário (ex: quantos funcionários ou qual o principal problema).\n'
    }

    return context
  }

  private static detectHighIntent(message: string): boolean {
    const lower = message.toLowerCase()
    return /(orçamento|orcamento|proposta|cotação|cotacao|valor|quanto custa|especialista|falar com|quero comprar|quero contratar|urgente|imediato)/i.test(lower)
  }

  private static buildInformationalResponse(solution: Solution) {
    const mainBenefit = solution.benefits[0]
    return `${solution.name} é ${solution.description.toLowerCase()}. Principal ganho: ${mainBenefit.toLowerCase()}. Posso te conectar com um especialista para detalhar como funciona na sua operação. Me informa seu WhatsApp ou e-mail?`
  }

  private static resolveInformationalSolution(userMessage: string, solutions: Solution[]) {
    const directlyMentionedSolution = this.findSolutionByDirectMention(userMessage)
    const candidateSolutions =
      directlyMentionedSolution
        ? [directlyMentionedSolution, ...solutions.filter((solution) => solution.id !== directlyMentionedSolution.id)]
        : solutions

    if (candidateSolutions.length === 0) return null

    const normalizedMessage = normalizeText(userMessage)
    const looksInformational =
      normalizedMessage.includes('?') ||
      /(o que|como funciona|para que|serve|diferenca|qual a diferenca|preco|valor|quanto custa|me explica)/i.test(
        normalizedMessage
      )

    return looksInformational ? candidateSolutions[0] : null
  }

  private static findSolutionByDirectMention(userMessage: string) {
    const normalizedMessage = normalizeText(userMessage)

    return (
      knowledgeBase.solutions.find((solution) => {
        const candidates = [
          solution.name,
          solution.id,
          ...(solution.variations || []),
          ...solution.name.split(/[()/-]/),
        ]

        return candidates
          .map((candidate) => normalizeText(candidate).trim())
          .filter((candidate) => candidate.length >= 3)
          .some((candidate) => normalizedMessage.includes(candidate))
      }) || null
    )
  }

  private static extractLeadInfo(message: string): Partial<ChatbotLead> {
    const leadInfo: Partial<ChatbotLead> = {}

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    const emailMatch = message.match(emailRegex)
    if (emailMatch) {
      leadInfo.email = emailMatch[0]
    }

    const phoneRegex = /(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}/
    const phoneMatch = message.match(phoneRegex)
    if (phoneMatch) {
      leadInfo.phone = phoneMatch[0].replace(/\D/g, '')
    }

    const nameRegex = /(?:meu nome é|me chamo|sou o|sou a)\s+([A-Za-zÀ-ÿ\s]+)/i
    const nameMatch = message.match(nameRegex)
    if (nameMatch) {
      leadInfo.name = nameMatch[1].trim()
    }

    return leadInfo
  }

  private static updateConversationState(
    state: ConversationState,
    userMessage: string,
    assistantMessage: string,
    intent: UserIntent | null,
    directInfoSolution: Solution | null
  ): ConversationState {
    const qualificationUpdates = this.extractQualificationData(userMessage)
    state.qualificationData = { ...state.qualificationData, ...qualificationUpdates }

    if (directInfoSolution && !state.interestedSolutions.includes(directInfoSolution.id)) {
      state.interestedSolutions.push(directInfoSolution.id)
    }

    if (intent?.suggestedSolution) {
      intent.suggestedSolution.forEach((solutionId) => {
        if (!state.interestedSolutions.includes(solutionId)) {
          state.interestedSolutions.push(solutionId)
        }
      })
    }

    if (state.leadCaptured) {
      state.currentStep = 'closing'
      return state
    }

    if (assistantMessage.toLowerCase().includes('whatsapp') || assistantMessage.toLowerCase().includes('98847') || assistantMessage.toLowerCase().includes('98803') || assistantMessage.toLowerCase().includes('9893')) {
      state.currentStep = 'capturing_lead'
      return state
    }

    if (state.interestedSolutions.length > 0 && Object.keys(state.qualificationData).length >= 2) {
      state.currentStep = 'recommending'
      return state
    }

    state.currentStep = state.messages.length <= 2 ? 'greeting' : 'qualifying'
    return state
  }

  private static extractQualificationData(message: string): Record<string, string> {
    const data: Record<string, string> = {}
    const messageLower = message.toLowerCase()

    if (messageLower.match(/\d+\s*(?:funcionários|funcionarios|colaboradores|pessoas)/)) {
      const numberMatch = messageLower.match(/(\d+)\s*(?:funcionários|funcionarios|colaboradores|pessoas)/)
      if (numberMatch) {
        const num = parseInt(numberMatch[1], 10)
        if (num <= 20) data.company_size = '1-20'
        else if (num <= 50) data.company_size = '21-50'
        else if (num <= 100) data.company_size = '51-100'
        else if (num <= 200) data.company_size = '101-200'
        else if (num <= 500) data.company_size = '201-500'
        else data.company_size = '500+'
      }
    }

    if (messageLower.includes('presencial')) data.work_model = '100% presencial'
    if (messageLower.includes('remoto') || messageLower.includes('home office')) data.work_model = '100% remoto'
    if (messageLower.includes('híbrido') || messageLower.includes('hibrido')) data.work_model = 'Híbrido'
    if (messageLower.includes('externo') || messageLower.includes('campo')) data.work_model = 'Equipes externas'

    if (messageLower.includes('urgente') || messageLower.includes('imediato') || messageLower.includes('este mês')) {
      data.urgency = 'Imediato (até 1 mês)'
    }

    if (messageLower.includes('não uso') || messageLower.includes('não tenho')) {
      data.current_system = 'Não'
    } else if (messageLower.includes('papel') || messageLower.includes('manual')) {
      data.current_system = 'Sim, manual (papel)'
    }

    if (messageLower.includes('hora extra')) {
      data.main_problem = 'Fechamento de folha demorado'
    } else if (messageLower.includes('fraude')) {
      data.main_problem = 'Fraudes no ponto'
    } else if (messageLower.includes('conformidade') || messageLower.includes('portaria 671')) {
      data.main_problem = 'Conformidade legal'
    }

    return data
  }

  private static shouldCaptureLeadNow(state: ConversationState): boolean {
    if (state.leadCaptured) return false
    const userMessages = state.messages.filter((m) => m.role === 'user').length
    // Captura após 2ª mensagem do usuário, ou assim que uma solução for identificada
    return userMessages >= 2 || state.interestedSolutions.length > 0
  }

  private static shouldShowSolutions(assistantMessage: string, solutions: Solution[]): boolean {
    if (solutions.length === 0) return false

    const messageLower = assistantMessage.toLowerCase()

    return solutions.some((solution) => {
      const nameLower = solution.name.toLowerCase()
      return (
        messageLower.includes(nameLower) ||
        messageLower.includes('rep-p') ||
        messageLower.includes('topponto') ||
        messageLower.includes('catraca') ||
        messageLower.includes('bastão') ||
        messageLower.includes('terminal')
      )
    })
  }

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

  private static generateConversationId(): string {
    return `chat_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
  }

  static generateConversationSummary(state: ConversationState): string {
    const parts: string[] = []

    if (state.interestedSolutions.length > 0) {
      const solutionNames = state.interestedSolutions
        .map((id) => knowledgeBase.solutions.find((solution) => solution.id === id)?.name)
        .filter(Boolean)
        .join(', ')
      parts.push(`Tenho interesse em: ${solutionNames}`)
    }

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

    parts.push('Gostaria de falar com um especialista')

    return parts.join('. ') + '.'
  }

  static shouldShowContactButtons(state: ConversationState): boolean {
    const hasChosenSolution = state.interestedSolutions.length > 0
    const userMessages = state.messages.filter((m) => m.role === 'user').length
    // Mostra botões de contato após 2ª mensagem ou assim que uma solução for identificada
    return hasChosenSolution || userMessages >= 2
  }

  static prepareLeadForDatabase(state: ConversationState): ChatbotLead {
    const score = calculateQualificationScore(state.qualificationData)
    const recommended = recommendSolutions(state.qualificationData)
    const conversationSummary = state.messages
      .filter((message) => message.role !== 'system')
      .map((message) => `${message.role === 'user' ? 'Cliente' : 'Bot'}: ${message.content}`)
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
      interested_solutions: [...new Set([...state.interestedSolutions, ...recommended.map((solution) => solution.id)])],
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
