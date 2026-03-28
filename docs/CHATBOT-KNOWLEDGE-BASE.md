# 📚 Base de Conhecimento - Chatbot SDR 4Core

## 🎯 Visão Geral

Base de conhecimento estruturada para um chatbot de pré-vendas (SDR Digital) que:
- Qualifica leads automaticamente
- Recomenda soluções baseadas no perfil do cliente
- Captura dados de contato
- Envia informações para o Supabase

---

## 📁 Estrutura do Arquivo

### 1. **Soluções Detalhadas** (`solutions`)

Array com 6 soluções principais:
- REP-P Facial Topdata
- TopPonto Web (Software)
- TopPonto Mobile (App)
- Catracas e Bloqueios
- Terminais de Acesso Facial
- Bastão de Ronda Viggia

**Cada solução contém:**
```typescript
{
  id: string                    // Identificador único
  name: string                  // Nome comercial
  category: string              // Categoria da solução
  description: string           // Descrição resumida
  whenToUse: string[]          // Cenários ideais
  targetAudience: string[]     // Público-alvo
  problemsSolved: string[]     // Problemas que resolve
  benefits: string[]           // Benefícios principais
  variations?: string[]        // Variações disponíveis
  priceRange?: string          // Faixa de preço
  implementationTime?: string  // Tempo de implementação
}
```

---

### 2. **Intenções do Usuário** (`userIntents`)

8 intenções mapeadas com keywords e respostas:
- Comprar relógio de ponto
- Controlar funcionários
- Solicitar orçamento
- Problema com ponto
- Conformidade legal
- Controle de acesso
- Home office
- Integração com sistema

**Estrutura:**
```typescript
{
  intent: string              // Nome da intenção
  keywords: string[]          // Palavras-chave para detectar
  response: string            // Resposta inicial
  nextQuestion?: string       // Próxima pergunta
  suggestedSolution?: string[] // Soluções sugeridas
}
```

---

### 3. **Fluxo de Qualificação** (`qualificationQuestions`)

7 perguntas estratégicas com peso:
1. Tamanho da empresa (peso 10)
2. Modelo de trabalho (peso 9)
3. Sistema atual (peso 7)
4. Principal problema (peso 10)
5. Urgência (peso 8)
6. Budget (peso 6)
7. Decisor (peso 5)

**Estrutura:**
```typescript
{
  id: string                  // ID da pergunta
  question: string            // Texto da pergunta
  type: 'single' | 'multiple' | 'text' | 'number'
  options?: string[]          // Opções de resposta
  weight: number              // Peso para scoring (0-10)
  category: string            // Categoria da pergunta
}
```

---

### 4. **Mapa de Decisão** (`decisionRules`)

9 regras de recomendação baseadas em:
- Tamanho da empresa
- Modelo de trabalho
- Urgência
- Tipo de problema

**Exemplo:**
```typescript
{
  condition: 'medium_company_hybrid',
  companySize: '51-200',
  workModel: 'Híbrido',
  suggestedSolutions: ['rep-p-facial', 'app-mobile', 'ponto-web'],
  reasoning: 'Operação híbrida precisa de hardware + app + software'
}
```

---

### 5. **Regras do Bot** (`botRules`)

Define personalidade e diretrizes:
- Tom: profissional e consultivo
- Estilo: direto e objetivo
- Abordagem: diagnóstico antes de venda

**Guidelines:**
- Nunca inventar informações
- Sempre qualificar antes de sugerir
- Capturar lead antes de encerrar
- Oferecer próximo passo claro

---

### 6. **Gatilhos de Conversão** (`conversionTriggers`)

7 gatilhos para ações específicas:
- Alto interesse → Capturar lead
- Urgência detectada → Sugerir especialista
- Pergunta de preço → Capturar lead
- Dúvida técnica → Sugerir especialista
- Fim de conversa → Capturar lead

**Estrutura:**
```typescript
{
  trigger: string             // Nome do gatilho
  condition: string           // Condição para ativar
  action: 'capture_lead' | 'suggest_specialist' | 'suggest_whatsapp' | 'send_material'
  message: string             // Mensagem para o usuário
}
```

---

### 7. **Templates de Captura** (`leadCaptureTemplates`)

3 tipos de abordagem:
- **Initial:** Primeira tentativa de captura
- **AfterRefusal:** Após recusa inicial
- **ValueProposition:** Oferecendo valor em troca

---

### 8. **Estrutura de Dados** (`ChatbotLead`)

Interface para envio ao Supabase:
```typescript
{
  // Dados pessoais
  name?: string
  email?: string
  phone?: string
  company?: string
  
  // Qualificação
  company_size?: string
  work_model?: string
  main_problem?: string
  urgency?: string
  budget?: string
  
  // Interesse
  interested_solutions: string[]
  conversation_summary: string
  qualification_score: number  // 0-100
  
  // Metadados
  source: 'chatbot'
  created_at: string
  conversation_id: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'closed'
}
```

---

## 🔧 Funções Auxiliares

### `findRelevantSolution(userMessage: string)`
Busca soluções relevantes baseadas na mensagem do usuário.

**Uso:**
```typescript
const solutions = findRelevantSolution("preciso de um relógio de ponto")
// Retorna: [rep-p-facial, ponto-web]
```

---

### `findMatchingIntent(userMessage: string)`
Identifica a intenção do usuário.

**Uso:**
```typescript
const intent = findMatchingIntent("quanto custa um relógio de ponto?")
// Retorna: { intent: 'comprar_relogio_ponto', ... }
```

---

### `calculateQualificationScore(answers: Record<string, string>)`
Calcula score de qualificação (0-100) baseado nas respostas.

**Uso:**
```typescript
const score = calculateQualificationScore({
  company_size: '51-100',
  urgency: 'Imediato (até 1 mês)',
  decision_maker: 'Sim, sou o decisor'
})
// Retorna: 85
```

---

### `recommendSolutions(qualificationData: Record<string, string>)`
Recomenda soluções baseadas no perfil qualificado.

**Uso:**
```typescript
const recommended = recommendSolutions({
  company_size: '51-100',
  work_model: 'Híbrido',
  urgency: 'Imediato'
})
// Retorna: [rep-p-facial, app-mobile, ponto-web]
```

---

## 🤖 Como Integrar com Chatbot

### Exemplo de Fluxo:

```typescript
import knowledgeBase from '@/lib/knowledgeBase'

// 1. Detectar intenção
const intent = knowledgeBase.findMatchingIntent(userMessage)

if (intent) {
  // 2. Responder com base na intenção
  await sendMessage(intent.response)
  
  // 3. Fazer próxima pergunta
  if (intent.nextQuestion) {
    await sendMessage(intent.nextQuestion)
  }
  
  // 4. Buscar soluções relevantes
  const solutions = knowledgeBase.findRelevantSolution(userMessage)
  
  // 5. Apresentar soluções
  solutions.forEach(solution => {
    await sendMessage(`
      ${solution.name}
      ${solution.description}
      
      Ideal para: ${solution.targetAudience.join(', ')}
      Resolve: ${solution.problemsSolved[0]}
    `)
  })
}

// 6. Após qualificação, calcular score
const score = knowledgeBase.calculateQualificationScore(userAnswers)

// 7. Recomendar soluções
const recommended = knowledgeBase.recommendSolutions(userAnswers)

// 8. Capturar lead
if (score > 60) {
  await sendMessage(knowledgeBase.leadCaptureTemplates.initial[0])
}

// 9. Salvar no Supabase
const leadData: ChatbotLead = {
  email: userEmail,
  phone: userPhone,
  company_size: userAnswers.company_size,
  interested_solutions: recommended.map(s => s.id),
  qualification_score: score,
  source: 'chatbot',
  status: 'new',
  created_at: new Date().toISOString(),
  conversation_id: generateId()
}

await supabase.from('leads').insert(leadData)
```

---

## 🎯 Estratégia de Captura de Lead

### Momento Ideal:
- Após 3-4 interações
- Quando cliente demonstra interesse
- Antes de encerrar conversa
- Ao oferecer material/proposta

### Abordagem:
1. **Oferecer valor:** "Posso te enviar uma proposta personalizada"
2. **Ser direto:** "Qual seu e-mail ou WhatsApp?"
3. **Alternativa:** Se recusar email, pedir telefone
4. **Persistir:** Usar templates de value proposition

### Obrigatório:
- Capturar pelo menos email OU telefone
- Nunca encerrar sem tentar capturar
- Oferecer algo em troca (proposta, material, calculadora)

---

## 📊 Integração com Supabase

### Tabela Sugerida: `chatbot_leads`

```sql
CREATE TABLE chatbot_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Dados pessoais
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  
  -- Qualificação
  company_size TEXT,
  work_model TEXT,
  current_system TEXT,
  main_problem TEXT,
  urgency TEXT,
  budget TEXT,
  decision_maker TEXT,
  
  -- Interesse
  interested_solutions TEXT[],
  conversation_summary TEXT,
  qualification_score INTEGER,
  
  -- Metadados
  source TEXT DEFAULT 'chatbot',
  conversation_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Status
  status TEXT DEFAULT 'new',
  
  -- Índices
  CONSTRAINT valid_score CHECK (qualification_score >= 0 AND qualification_score <= 100)
);

-- Índices
CREATE INDEX idx_chatbot_leads_email ON chatbot_leads(email);
CREATE INDEX idx_chatbot_leads_status ON chatbot_leads(status);
CREATE INDEX idx_chatbot_leads_score ON chatbot_leads(qualification_score DESC);
CREATE INDEX idx_chatbot_leads_created ON chatbot_leads(created_at DESC);
```

---

## 🚀 Próximos Passos

1. **Criar interface do chatbot** (UI)
2. **Integrar com Groq/OpenAI** para processamento de linguagem natural
3. **Implementar função de envio ao Supabase**
4. **Criar dashboard de leads no CRM**
5. **Adicionar notificações para equipe comercial**

---

## 📝 Notas Importantes

- ✅ Base 100% estruturada e tipada
- ✅ Pronta para consumo por chatbot
- ✅ Funções auxiliares incluídas
- ✅ Estratégia de captura definida
- ✅ Integração com Supabase preparada
- ✅ Baseada em dados reais dos produtos 4Core

---

**A base está pronta para uso imediato! 🎉**
