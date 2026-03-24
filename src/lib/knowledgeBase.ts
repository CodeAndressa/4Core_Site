/**
 * Base de Conhecimento - Chatbot SDR 4Core
 * 
 * Sistema de pré-venda inteligente para qualificação de leads
 * e recomendação de soluções de controle de ponto e acesso.
 */

// ============================================
// TIPOS E INTERFACES
// ============================================

export interface Solution {
  id: string
  name: string
  category: 'controle-de-jornada' | 'controle-de-acesso' | 'seguranca-operacional'
  description: string
  whenToUse: string[]
  targetAudience: string[]
  problemsSolved: string[]
  benefits: string[]
  variations?: string[]
  priceRange?: string
  implementationTime?: string
}

export interface UserIntent {
  intent: string
  keywords: string[]
  response: string
  nextQuestion?: string
  suggestedSolution?: string[]
}

export interface QualificationQuestion {
  id: string
  question: string
  type: 'single' | 'multiple' | 'text' | 'number'
  options?: string[]
  weight: number
  category: string
}

export interface DecisionRule {
  condition: string
  companySize?: string
  workModel?: string
  currentSystem?: boolean
  urgency?: string
  suggestedSolutions: string[]
  reasoning: string
}

export interface LeadData {
  name?: string
  email?: string
  phone?: string
  company?: string
  companySize?: string
  interest: string[]
  urgency?: string
  budget?: string
  conversationContext: string
  source: 'chatbot'
  qualificationScore?: number
}

export interface ConversionTrigger {
  trigger: string
  condition: string
  action: 'suggest_whatsapp' | 'suggest_specialist' | 'capture_lead' | 'send_material'
  message: string
}

// ============================================
// SOLUÇÕES DETALHADAS
// ============================================

export const solutions: Solution[] = [
  {
    id: 'rep-p-facial',
    name: 'REP-P Facial Topdata',
    category: 'controle-de-jornada',
    description: 'Relógio de ponto com reconhecimento facial, IA e conformidade total com Portaria 671',
    whenToUse: [
      'Empresa com mais de 50 funcionários',
      'Alto fluxo de entrada/saída',
      'Necessidade de eliminar fraudes no ponto',
      'Exigência de conformidade fiscal',
      'Preocupação com higiene (sem contato)',
    ],
    targetAudience: [
      'Indústrias',
      'Varejo com grande equipe',
      'Empresas B2B',
      'Operações com turnos',
      'Empresas auditadas pelo MTP',
    ],
    problemsSolved: [
      'Marcação de ponto por terceiros (fraude)',
      'Filas lentas na entrada/saída',
      'Contaminação por contato físico',
      'Não conformidade com Portaria 671',
      'Falta de rastreabilidade nas marcações',
    ],
    benefits: [
      'Eliminação total de fraudes',
      'Registro em menos de 1 segundo',
      'Funciona com máscaras',
      'Detecção de rosto vivo (impede fotos)',
      'Conformidade fiscal garantida',
      'Redução de custos com auditoria',
    ],
    variations: [
      'Modelo básico (até 500 usuários)',
      'Modelo avançado (até 3000 usuários)',
      'Com leitor de cartão adicional',
      'Com módulo de temperatura',
    ],
    priceRange: 'R$ 3.500 - R$ 8.000 (hardware + licença)',
    implementationTime: '1-2 semanas',
  },
  {
    id: 'ponto-web',
    name: 'TopPonto Web (Software em Nuvem)',
    category: 'controle-de-jornada',
    description: 'Plataforma cloud para gestão completa de jornada, cálculo automático e fechamento de folha',
    whenToUse: [
      'Necessidade de centralizar dados de múltiplos coletores',
      'Cálculo automático de horas extras',
      'Integração com ERP/Folha',
      'Acesso remoto para gestores',
      'Relatórios gerenciais em tempo real',
    ],
    targetAudience: [
      'Equipes de RH e DP',
      'Gestores de múltiplas unidades',
      'Contabilidades',
      'Empresas com operação distribuída',
    ],
    problemsSolved: [
      'Fechamento manual de folha',
      'Erros de cálculo de HE e DSR',
      'Falta de visibilidade em tempo real',
      'Dificuldade de integração com ERP',
      'Processos trabalhistas por erro de cálculo',
    ],
    benefits: [
      'Cálculo automático de HE, DSR e adicional noturno',
      'Acesso de qualquer lugar',
      'Alertas de inconsistências',
      'Integração nativa com ERPs',
      'Redução de 80% no tempo de fechamento',
    ],
    priceRange: 'R$ 15-30/funcionário/mês',
    implementationTime: '1-3 dias',
  },
  {
    id: 'app-mobile',
    name: 'TopPonto Mobile (App)',
    category: 'controle-de-jornada',
    description: 'Aplicativo para registro de ponto externo com geolocalização e reconhecimento facial',
    whenToUse: [
      'Equipes externas ou em campo',
      'Home office',
      'Representantes comerciais',
      'Logística e entregas',
      'Obras e construção civil',
    ],
    targetAudience: [
      'Times de vendas externas',
      'Equipes de manutenção',
      'Motoristas e entregadores',
      'Consultores em campo',
      'Funcionários em home office',
    ],
    problemsSolved: [
      'Impossibilidade de controlar jornada externa',
      'Falta de prova de presença no local',
      'Custo alto com hardware físico',
      'Dificuldade de monitorar home office',
    ],
    benefits: [
      'Geofencing (cerca geográfica)',
      'Reconhecimento facial no app',
      'Funciona offline',
      'GPS com coordenadas exatas',
      'Custo zero com hardware',
    ],
    priceRange: 'R$ 8-15/usuário/mês',
    implementationTime: 'Imediato (download do app)',
  },
  {
    id: 'catracas',
    name: 'Catracas e Bloqueios Físicos',
    category: 'controle-de-acesso',
    description: 'Equipamentos de controle de fluxo com biometria, RFID ou QR Code',
    whenToUse: [
      'Necessidade de controle rigoroso de entrada',
      'Portarias industriais',
      'Prédios comerciais',
      'Academias e clubes',
      'Controle de visitantes',
    ],
    targetAudience: [
      'Indústrias',
      'Condomínios empresariais',
      'Academias',
      'Escolas e universidades',
      'Hospitais',
    ],
    problemsSolved: [
      'Acesso não autorizado',
      'Falta de registro de visitantes',
      'Controle manual de portaria',
      'Risco de segurança patrimonial',
    ],
    benefits: [
      'Controle total de entradas/saídas',
      'Integração com recepção',
      'Braços antipânico',
      'Baixa manutenção',
      'Relatórios de fluxo',
    ],
    priceRange: 'R$ 5.000 - R$ 15.000 (por catraca)',
    implementationTime: '1-2 semanas',
  },
  {
    id: 'acesso-facial',
    name: 'Terminais de Acesso Facial',
    category: 'controle-de-acesso',
    description: 'Leitores biométricos faciais para áreas restritas e sensíveis',
    whenToUse: [
      'Controle de salas de servidores',
      'Acesso a estoques',
      'Áreas de TI',
      'Laboratórios',
      'Cofres e tesouraria',
    ],
    targetAudience: [
      'Empresas de tecnologia',
      'Indústrias farmacêuticas',
      'Bancos e financeiras',
      'Data centers',
      'Hospitais (áreas restritas)',
    ],
    problemsSolved: [
      'Uso compartilhado de chaves/cartões',
      'Falta de rastreabilidade de acessos',
      'Perdas em estoques',
      'Risco de invasão digital',
    ],
    benefits: [
      'Auditoria completa de acessos',
      'Sem contato físico',
      'Bloqueio remoto imediato',
      'Integração com alarmes',
      'Redução de perdas',
    ],
    priceRange: 'R$ 2.500 - R$ 6.000 (por terminal)',
    implementationTime: '3-5 dias',
  },
  {
    id: 'bastao-ronda',
    name: 'Bastão de Ronda Viggia',
    category: 'seguranca-operacional',
    description: 'Sistema completo para controle de rondas com bastão, iButtons e software',
    whenToUse: [
      'Controle de vigilância noturna',
      'Rondas patrimoniais',
      'Empresas de segurança',
      'Condomínios',
      'Shoppings e indústrias',
    ],
    targetAudience: [
      'Empresas de segurança privada',
      'Condomínios residenciais',
      'Indústrias',
      'Shoppings centers',
      'Hospitais',
    ],
    problemsSolved: [
      'Falta de controle sobre rondas',
      'Vigilantes que não cumprem roteiro',
      'Ausência de prova de ronda',
      'Risco patrimonial',
    ],
    benefits: [
      'Garantia de execução de rondas',
      'Relatórios invioláveis',
      'Leitura ultra-rápida',
      'Alta durabilidade',
      'Custo-benefício excelente',
    ],
    priceRange: 'R$ 1.500 - R$ 3.000 (kit completo)',
    implementationTime: '1 semana',
  },
]

// ============================================
// INTENÇÕES DO USUÁRIO
// ============================================

export const userIntents: UserIntent[] = [
  {
    intent: 'comprar_relogio_ponto',
    keywords: ['relógio', 'ponto', 'comprar', 'adquirir', 'preço', 'quanto custa'],
    response: 'Entendo que você está buscando um relógio de ponto. Para te recomendar a melhor solução, preciso entender melhor sua operação.',
    nextQuestion: 'Quantos funcionários vocês têm atualmente?',
    suggestedSolution: ['rep-p-facial', 'ponto-web'],
  },
  {
    intent: 'controlar_funcionarios',
    keywords: ['controlar', 'monitorar', 'funcionários', 'equipe', 'colaboradores'],
    response: 'Perfeito! Temos soluções específicas para controle de jornada. Vou te ajudar a encontrar a ideal.',
    nextQuestion: 'Seus funcionários trabalham presencialmente, remotamente ou ambos?',
    suggestedSolution: ['ponto-web', 'app-mobile'],
  },
  {
    intent: 'solicitar_orcamento',
    keywords: ['orçamento', 'proposta', 'cotação', 'valor', 'investimento'],
    response: 'Vou preparar um orçamento personalizado para você. Antes disso, preciso de algumas informações.',
    nextQuestion: 'Qual o tamanho da sua empresa? (Pequena: até 50 / Média: 50-200 / Grande: 200+)',
  },
  {
    intent: 'problema_ponto',
    keywords: ['problema', 'erro', 'não funciona', 'fraude', 'marcação errada'],
    response: 'Entendo sua preocupação. Problemas com controle de ponto podem gerar riscos trabalhistas sérios.',
    nextQuestion: 'Qual o principal problema que você está enfrentando hoje?',
    suggestedSolution: ['rep-p-facial', 'ponto-web'],
  },
  {
    intent: 'conformidade_legal',
    keywords: ['portaria 671', 'conformidade', 'fiscal', 'auditoria', 'MTP', 'trabalhista'],
    response: 'Conformidade com a Portaria 671 é fundamental. Todas as nossas soluções são 100% conformes.',
    nextQuestion: 'Vocês já foram auditados pelo Ministério do Trabalho?',
    suggestedSolution: ['rep-p-facial', 'ponto-web'],
  },
  {
    intent: 'controle_acesso',
    keywords: ['catraca', 'acesso', 'portaria', 'entrada', 'visitante', 'segurança'],
    response: 'Temos soluções completas de controle de acesso. Vou te ajudar a escolher a melhor.',
    nextQuestion: 'Você precisa controlar acesso de funcionários, visitantes ou ambos?',
    suggestedSolution: ['catracas', 'acesso-facial'],
  },
  {
    intent: 'home_office',
    keywords: ['home office', 'remoto', 'externo', 'campo', 'distância'],
    response: 'Para equipes remotas, temos uma solução específica com geolocalização e reconhecimento facial.',
    nextQuestion: 'Quantas pessoas trabalham remotamente?',
    suggestedSolution: ['app-mobile', 'ponto-web'],
  },
  {
    intent: 'integracao_sistema',
    keywords: ['integração', 'ERP', 'folha', 'sistema', 'API', 'conectar'],
    response: 'Nossas soluções se integram nativamente com os principais ERPs do mercado.',
    nextQuestion: 'Qual sistema de folha ou ERP vocês utilizam atualmente?',
    suggestedSolution: ['ponto-web'],
  },
]

// ============================================
// FLUXO DE QUALIFICAÇÃO
// ============================================

export const qualificationQuestions: QualificationQuestion[] = [
  {
    id: 'company_size',
    question: 'Quantos funcionários sua empresa tem?',
    type: 'single',
    options: ['1-20', '21-50', '51-100', '101-200', '201-500', '500+'],
    weight: 10,
    category: 'sizing',
  },
  {
    id: 'work_model',
    question: 'Como sua equipe trabalha?',
    type: 'single',
    options: ['100% presencial', 'Híbrido', '100% remoto', 'Equipes externas'],
    weight: 9,
    category: 'operation',
  },
  {
    id: 'current_system',
    question: 'Vocês já utilizam algum sistema de controle de ponto?',
    type: 'single',
    options: ['Não', 'Sim, manual (papel)', 'Sim, sistema antigo', 'Sim, mas insatisfeitos'],
    weight: 7,
    category: 'maturity',
  },
  {
    id: 'main_problem',
    question: 'Qual o principal desafio que você quer resolver?',
    type: 'single',
    options: [
      'Fraudes no ponto',
      'Conformidade legal',
      'Fechamento de folha demorado',
      'Controlar equipes externas',
      'Integração com ERP',
      'Reduzir custos',
    ],
    weight: 10,
    category: 'pain',
  },
  {
    id: 'urgency',
    question: 'Qual a urgência para implementar a solução?',
    type: 'single',
    options: ['Imediato (até 1 mês)', 'Curto prazo (1-3 meses)', 'Médio prazo (3-6 meses)', 'Apenas pesquisando'],
    weight: 8,
    category: 'timing',
  },
  {
    id: 'budget',
    question: 'Qual o investimento mensal que você considera viável?',
    type: 'single',
    options: ['Até R$ 500', 'R$ 500 - R$ 2.000', 'R$ 2.000 - R$ 5.000', 'Acima de R$ 5.000', 'Preciso entender melhor'],
    weight: 6,
    category: 'budget',
  },
  {
    id: 'decision_maker',
    question: 'Você é o responsável pela decisão de compra?',
    type: 'single',
    options: ['Sim, sou o decisor', 'Sou influenciador', 'Estou pesquisando para apresentar'],
    weight: 5,
    category: 'authority',
  },
]

// ============================================
// MAPA DE DECISÃO
// ============================================

export const decisionRules: DecisionRule[] = [
  {
    condition: 'small_company_presential',
    companySize: '1-50',
    workModel: '100% presencial',
    suggestedSolutions: ['rep-p-facial', 'ponto-web'],
    reasoning: 'Para empresas pequenas presenciais, o ideal é um REP-P básico + software web para gestão centralizada.',
  },
  {
    condition: 'medium_company_hybrid',
    companySize: '51-200',
    workModel: 'Híbrido',
    suggestedSolutions: ['rep-p-facial', 'app-mobile', 'ponto-web'],
    reasoning: 'Operação híbrida precisa de hardware para presenciais + app para remotos + software centralizador.',
  },
  {
    condition: 'large_company_presential',
    companySize: '200+',
    workModel: '100% presencial',
    suggestedSolutions: ['rep-p-facial', 'ponto-web', 'catracas'],
    reasoning: 'Grandes empresas precisam de hardware robusto, software enterprise e controle de acesso integrado.',
  },
  {
    condition: 'remote_team',
    workModel: '100% remoto',
    suggestedSolutions: ['app-mobile', 'ponto-web'],
    reasoning: 'Equipes 100% remotas não precisam de hardware físico. App + software web é suficiente.',
  },
  {
    condition: 'external_team',
    workModel: 'Equipes externas',
    suggestedSolutions: ['app-mobile', 'ponto-web'],
    reasoning: 'Times externos precisam de app com geolocalização + software para gestão centralizada.',
  },
  {
    condition: 'fraud_problem',
    urgency: 'Imediato',
    suggestedSolutions: ['rep-p-facial'],
    reasoning: 'Fraudes exigem solução imediata com biometria facial e detecção de rosto vivo.',
  },
  {
    condition: 'compliance_urgency',
    urgency: 'Imediato',
    suggestedSolutions: ['rep-p-facial', 'ponto-web'],
    reasoning: 'Conformidade urgente requer hardware certificado + software com relatórios fiscais.',
  },
  {
    condition: 'access_control_need',
    suggestedSolutions: ['catracas', 'acesso-facial'],
    reasoning: 'Necessidade de controle de acesso indica catracas para fluxo + terminais para áreas restritas.',
  },
  {
    condition: 'security_rounding',
    suggestedSolutions: ['bastao-ronda'],
    reasoning: 'Controle de rondas de segurança requer bastão Viggia com iButtons e software de auditoria.',
  },
]

// ============================================
// REGRAS DO BOT
// ============================================

export const botRules = {
  personality: {
    tone: 'profissional e consultivo',
    style: 'direto e objetivo',
    approach: 'diagnóstico antes de venda',
  },
  
  guidelines: [
    'NUNCA inventar informações sobre produtos ou preços',
    'Se o usuário já deu contexto suficiente, RECOMENDE IMEDIATAMENTE — não faça mais perguntas',
    'Fazer no máximo 1 pergunta quando for realmente necessário entender o cenário',
    'Usar linguagem clara e sem jargões técnicos excessivos',
    'Capturar contato (WhatsApp OU e-mail) após recomendar — aceitar qualquer um dos dois',
    'NUNCA prometer envio por e-mail — a 4Core não envia materiais por e-mail',
    'Finalizar sempre direcionando para o WhatsApp comercial: (41) 98847-6431',
  ],
  
  prohibitions: [
    'Não dar preços exatos sem qualificação',
    'Não prometer prazos sem validação',
    'Não criticar concorrentes',
    'Não usar termos muito técnicos sem explicar',
    'Não encerrar conversa sem tentar capturar lead',
  ],
  
  leadCaptureStrategy: {
    timing: 'Após 3-4 interações ou quando cliente demonstrar interesse',
    approach: 'Oferecer valor em troca (proposta, material, demonstração)',
    mandatory: true,
    fallback: 'Se recusar email, pedir WhatsApp. Se recusar ambos, oferecer continuar conversa.',
  },
}

// ============================================
// GATILHOS DE CONVERSÃO
// ============================================

export const conversionTriggers: ConversionTrigger[] = [
  {
    trigger: 'high_interest',
    condition: 'Cliente demonstrou interesse em uma solução',
    action: 'capture_lead',
    message: 'Posso te direcionar para um especialista que vai detalhar a implementação. Me informa seu WhatsApp ou e-mail?',
  },
  {
    trigger: 'urgency_detected',
    condition: 'Cliente mencionou urgência ou prazo curto',
    action: 'suggest_specialist',
    message: 'Entendo a urgência. Posso te conectar agora com um especialista. Me passa seu WhatsApp ou e-mail?',
  },
  {
    trigger: 'budget_question',
    condition: 'Cliente perguntou sobre preços ou orçamento',
    action: 'capture_lead',
    message: 'Posso te conectar com um especialista para um orçamento personalizado. Me informa seu WhatsApp ou e-mail?',
  },
  {
    trigger: 'technical_doubt',
    condition: 'Cliente tem dúvidas técnicas complexas',
    action: 'suggest_specialist',
    message: 'Nosso especialista técnico pode te responder isso com precisão. Qual seu WhatsApp para ele entrar em contato?',
  },
  {
    trigger: 'end_of_conversation',
    condition: 'Cliente indica que vai encerrar',
    action: 'capture_lead',
    message: 'Antes de ir — posso te conectar com um especialista para continuar quando quiser. Me passa seu WhatsApp ou e-mail?',
  },
  {
    trigger: 'positive_feedback',
    condition: 'Cliente demonstrou satisfação com a solução',
    action: 'suggest_whatsapp',
    message: 'Que bom que fez sentido! Nosso time comercial pode te passar todos os detalhes: (41) 98847-6431',
  },
]

// ============================================
// TEMPLATES DE CAPTURA DE LEAD
// ============================================

export const leadCaptureTemplates = {
  initial: [
    'Posso te direcionar para um especialista que explica como implementar. Me informa seu WhatsApp ou e-mail?',
    'Nosso time pode te dar todos os detalhes. Me passa seu contato (WhatsApp ou e-mail)?',
    'Para te conectar com um especialista, me informa seu WhatsApp ou e-mail?',
  ],

  afterRefusal: [
    'Sem problemas. Você também pode falar direto pelo WhatsApp: (41) 98847-6431',
    'Tudo bem. Se precisar, nosso time está disponível em: (41) 98847-6431',
  ],

  valueProposition: [
    'Nosso especialista pode te mostrar como outras empresas do seu segmento implementaram. Me passa seu contato?',
    'Posso te conectar com quem vai montar a proposta certa para o seu cenário. WhatsApp ou e-mail?',
  ],
}

// ============================================
// ESTRUTURA DE DADOS PARA SUPABASE
// ============================================

export interface ChatbotLead {
  // Dados pessoais
  name?: string
  email?: string
  phone?: string
  company?: string
  
  // Qualificação
  company_size?: string
  work_model?: string
  current_system?: string
  main_problem?: string
  urgency?: string
  budget?: string
  decision_maker?: string
  
  // Interesse
  interested_solutions: string[] // IDs das soluções
  conversation_summary: string
  qualification_score: number // 0-100
  
  // Metadados
  source: 'chatbot'
  created_at: string
  conversation_id: string
  
  // Status
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'closed'
}

// ============================================
// FUNÇÃO DE BUSCA (RAG SIMPLES)
// ============================================

export function findRelevantSolution(userMessage: string): Solution[] {
  const messageLower = userMessage.toLowerCase()
  const relevantSolutions: Solution[] = []
  
  // Buscar por intenções
  const matchedIntents = userIntents.filter(intent =>
    intent.keywords.some(keyword => messageLower.includes(keyword))
  )
  
  // Coletar soluções sugeridas
  matchedIntents.forEach(intent => {
    if (intent.suggestedSolution) {
      intent.suggestedSolution.forEach(solutionId => {
        const solution = solutions.find(s => s.id === solutionId)
        if (solution && !relevantSolutions.includes(solution)) {
          relevantSolutions.push(solution)
        }
      })
    }
  })
  
  return relevantSolutions
}

export function findMatchingIntent(userMessage: string): UserIntent | null {
  const messageLower = userMessage.toLowerCase()
  
  return userIntents.find(intent =>
    intent.keywords.some(keyword => messageLower.includes(keyword))
  ) || null
}

export function calculateQualificationScore(answers: Record<string, string>): number {
  let score = 0
  let totalWeight = 0
  
  qualificationQuestions.forEach(question => {
    const answer = answers[question.id]
    if (answer) {
      totalWeight += question.weight
      
      // Pontuação baseada na resposta
      if (question.id === 'urgency' && answer.includes('Imediato')) {
        score += question.weight
      } else if (question.id === 'decision_maker' && answer.includes('decisor')) {
        score += question.weight
      } else if (question.id === 'budget' && !answer.includes('Preciso entender')) {
        score += question.weight * 0.8
      } else {
        score += question.weight * 0.5
      }
    }
  })
  
  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0
}

export function recommendSolutions(qualificationData: Record<string, string>): Solution[] {
  const recommended: Solution[] = []
  
  // Aplicar regras de decisão
  decisionRules.forEach(rule => {
    let matches = true
    
    if (rule.companySize && !qualificationData.company_size?.includes(rule.companySize)) {
      matches = false
    }
    if (rule.workModel && qualificationData.work_model !== rule.workModel) {
      matches = false
    }
    if (rule.urgency && qualificationData.urgency !== rule.urgency) {
      matches = false
    }
    
    if (matches) {
      rule.suggestedSolutions.forEach(solutionId => {
        const solution = solutions.find(s => s.id === solutionId)
        if (solution && !recommended.includes(solution)) {
          recommended.push(solution)
        }
      })
    }
  })
  
  return recommended
}

// ============================================
// EXPORT DEFAULT
// ============================================

export const knowledgeBase = {
  solutions,
  userIntents,
  qualificationQuestions,
  decisionRules,
  botRules,
  conversionTriggers,
  leadCaptureTemplates,
  
  // Funções auxiliares
  findRelevantSolution,
  findMatchingIntent,
  calculateQualificationScore,
  recommendSolutions,
}

export default knowledgeBase
