# 🤖 Chatbot SDR - 4Core

## 🎯 Visão Geral

Chatbot de pré-vendas (SDR Digital) integrado com Groq AI que:
- Qualifica leads automaticamente
- Recomenda soluções baseadas no perfil
- Captura email/telefone
- Salva leads no Supabase
- Mantém contexto da conversa

---

## 📦 Arquivos Criados

### 1. **Serviço do Chatbot**
`src/lib/services/chatbotService.ts`
- Lógica principal do chatbot
- Integração com Groq API
- Processamento de mensagens
- Extração de dados de lead
- Cálculo de score de qualificação

### 2. **API Route**
`src/app/api/chatbot/route.ts`
- Endpoint POST `/api/chatbot`
- Processa mensagens
- Salva leads no Supabase

### 3. **Componente React**
`src/components/ui/Chatbot.tsx`
- Interface do chatbot
- Botão flutuante
- Janela de chat
- Exibição de soluções

### 4. **SQL do Banco**
`supabase-chatbot-leads.sql`
- Tabela `chatbot_leads`
- Views de analytics
- Funções auxiliares

---

## 🚀 Setup

### 1. Instalar Dependências

Já instalado:
```bash
npm install groq-sdk
```

### 2. Configurar Variáveis de Ambiente

Adicione no `.env.local`:

```env
# Groq API
GROQ_API_KEY=sua_groq_api_key_aqui
```

**Como obter a chave:**
1. Acesse: https://console.groq.com
2. Crie uma conta (gratuita)
3. Vá em API Keys
4. Crie uma nova chave
5. Copie e cole no `.env.local`

### 3. Executar SQL no Supabase

1. Acesse: https://supabase.com/dashboard
2. Vá em SQL Editor
3. Cole o conteúdo de `supabase-chatbot-leads.sql`
4. Execute (Run)

Isso criará:
- Tabela `chatbot_leads`
- 4 views de analytics
- Índices otimizados
- Políticas RLS

### 4. Reiniciar Servidor

```bash
npm run dev
```

---

## 💬 Como Funciona

### Fluxo da Conversa

```
1. Usuário clica no botão 💬
   ↓
2. Chatbot cumprimenta
   ↓
3. Usuário descreve necessidade
   ↓
4. Chatbot detecta intenção
   ↓
5. Chatbot faz perguntas de qualificação
   ↓
6. Chatbot recomenda soluções
   ↓
7. Chatbot captura email/telefone
   ↓
8. Lead salvo no Supabase
   ↓
9. Chatbot oferece próximo passo
```

### Detecção de Intenções

O chatbot detecta automaticamente:
- Comprar relógio de ponto
- Controlar funcionários
- Solicitar orçamento
- Problema com ponto
- Conformidade legal
- Controle de acesso
- Home office
- Integração com sistema

### Qualificação Automática

Perguntas estratégicas:
1. Tamanho da empresa
2. Modelo de trabalho
3. Sistema atual
4. Principal problema
5. Urgência
6. Budget
7. Decisor

**Score:** 0-100 (baseado em pesos)

### Captura de Lead

**Momento ideal:**
- Após 3-4 interações
- Quando score > 70
- Quando cliente demonstra interesse

**Abordagem:**
```
"Para te enviar uma proposta personalizada, 
qual seu e-mail ou WhatsApp?"
```

**Extração automática:**
- Email: `usuario@empresa.com`
- Telefone: `(11) 98765-4321`
- Nome: "Meu nome é João"

---

## 🔧 Integração com Groq

### Modelo Usado

```typescript
model: 'llama-3.3-70b-versatile'
temperature: 0.7
max_tokens: 500
```

### System Prompt

O chatbot tem um prompt detalhado que define:
- Papel: SDR Digital
- Personalidade: Profissional e consultivo
- Regras: Nunca inventar, sempre qualificar
- Soluções disponíveis
- Fluxo de conversa
- Estratégia de captura

### Contexto Dinâmico

A cada mensagem, o chatbot recebe:
- Intenção detectada
- Dados de qualificação coletados
- Soluções relevantes
- Score de qualificação
- Status de captura de lead

---

## 📊 Dados Salvos no Supabase

### Estrutura do Lead

```typescript
{
  // Dados pessoais
  name: "João Silva"
  email: "joao@empresa.com"
  phone: "11987654321"
  company: "Empresa XYZ"
  
  // Qualificação
  company_size: "51-100"
  work_model: "Híbrido"
  main_problem: "Fraudes no ponto"
  urgency: "Imediato (até 1 mês)"
  budget: "R$ 2.000 - R$ 5.000"
  
  // Interesse
  interested_solutions: ["rep-p-facial", "ponto-web"]
  qualification_score: 85
  
  // Conversa
  conversation_summary: "Cliente demonstrou alto interesse..."
  conversation_id: "chat_1234567890_abc123"
  
  // Status
  status: "new"
  created_at: "2024-01-20T10:30:00Z"
}
```

### Views Disponíveis

**1. chatbot_leads_by_status**
- Leads por status
- Média de score
- Últimos 7 e 30 dias

**2. chatbot_hot_leads**
- Leads com score > 70
- Status: new ou contacted
- Ordenados por score

**3. chatbot_popular_solutions**
- Soluções mais procuradas
- Taxa de conversão
- Total de leads

**4. chatbot_daily_performance**
- Performance diária
- Leads capturados
- Score médio
- Leads fechados

---

## 🎨 Interface do Chatbot

### Botão Flutuante

- Posição: Canto inferior direito
- Ícone: 💬
- Cor: Roxo (#7C3AED)
- Hover: Aumenta 10%

### Janela de Chat

- Tamanho: 384px x 600px
- Header: Gradiente roxo
- Mensagens: Bolhas de chat
- Input: Campo com botão

### Exibição de Soluções

Quando o chatbot recomenda soluções, mostra:
- Nome da solução
- Descrição
- Faixa de preço
- Tempo de implementação

---

## 📈 Analytics do Chatbot

### Métricas Disponíveis

**No Supabase:**
1. Total de conversas
2. Taxa de captura de lead
3. Score médio de qualificação
4. Soluções mais procuradas
5. Taxa de conversão por solução
6. Performance diária

**Queries úteis:**

```sql
-- Total de leads hoje
SELECT COUNT(*) FROM chatbot_leads 
WHERE created_at >= CURRENT_DATE;

-- Leads quentes
SELECT * FROM chatbot_hot_leads;

-- Performance dos últimos 7 dias
SELECT * FROM chatbot_daily_performance
WHERE date >= CURRENT_DATE - INTERVAL '7 days';

-- Soluções mais populares
SELECT * FROM chatbot_popular_solutions;
```

---

## 🔍 Testando o Chatbot

### Teste Manual

1. Acesse: http://localhost:3001
2. Clique no botão 💬
3. Digite: "Preciso de um relógio de ponto"
4. Responda as perguntas
5. Forneça email quando solicitado
6. Verifique no Supabase se o lead foi salvo

### Teste de Captura

```
Você: "Preciso controlar meus funcionários"
Bot: [Faz perguntas de qualificação]
Você: "Somos 80 funcionários, trabalho híbrido"
Bot: [Recomenda soluções]
Bot: "Para te enviar uma proposta, qual seu e-mail?"
Você: "joao@empresa.com"
Bot: [Salva lead no Supabase]
```

### Verificar no Supabase

```sql
SELECT * FROM chatbot_leads 
ORDER BY created_at DESC 
LIMIT 1;
```

---

## 🎯 Exemplos de Conversas

### Exemplo 1: Lead Quente

```
Usuário: Preciso de relógio de ponto urgente
Bot: Entendo a urgência! Quantos funcionários vocês têm?
Usuário: 120 funcionários
Bot: E eles trabalham presencialmente ou remotamente?
Usuário: Presencial
Bot: Qual o principal problema que você quer resolver?
Usuário: Fraudes no ponto
Bot: Perfeito! Recomendo o REP-P Facial Topdata...
Bot: Para te enviar uma proposta, qual seu e-mail?
Usuário: gerente@empresa.com
Bot: Ótimo! Vou te enviar a proposta. Um especialista...
```

**Resultado:**
- Score: 90/100
- Status: new
- Soluções: rep-p-facial, ponto-web

### Exemplo 2: Lead Morno

```
Usuário: Quanto custa um relógio de ponto?
Bot: Para te passar um orçamento preciso, preciso entender...
Usuário: Somos uma empresa pequena
Bot: Quantos funcionários aproximadamente?
Usuário: Uns 15
Bot: Trabalham presencialmente?
Usuário: Sim
Bot: Baseado no seu perfil, recomendo...
Bot: Posso te enviar um orçamento detalhado?
Usuário: Ainda estou pesquisando
Bot: Sem problemas! Me passa seu e-mail para...
```

**Resultado:**
- Score: 55/100
- Status: new
- Soluções: rep-p-facial

---

## 🔧 Customização

### Alterar Personalidade

Edite o `SYSTEM_PROMPT` em `chatbotService.ts`:

```typescript
const SYSTEM_PROMPT = `
Você é um SDR mais casual e descontraído...
`
```

### Adicionar Novas Intenções

Edite `knowledgeBase.ts`:

```typescript
{
  intent: 'nova_intencao',
  keywords: ['palavra1', 'palavra2'],
  response: 'Resposta inicial',
  nextQuestion: 'Próxima pergunta?',
  suggestedSolution: ['solucao-id']
}
```

### Alterar Modelo Groq

Em `chatbotService.ts`:

```typescript
model: 'mixtral-8x7b-32768', // Mais rápido
// ou
model: 'llama-3.3-70b-versatile', // Mais inteligente
```

---

## 🚨 Troubleshooting

### Erro: "Groq API key not found"
✅ Adicione `GROQ_API_KEY` no `.env.local`
✅ Reinicie o servidor

### Erro: "relation 'chatbot_leads' does not exist"
✅ Execute o SQL: `supabase-chatbot-leads.sql`

### Chatbot não responde
✅ Verifique o console do navegador (F12)
✅ Verifique logs do servidor
✅ Teste o endpoint: `POST /api/chatbot`

### Lead não é salvo
✅ Verifique se o email/telefone foi extraído
✅ Verifique RLS policies no Supabase
✅ Verifique logs do servidor

---

## 📊 Próximos Passos

- [ ] Dashboard de leads no admin
- [ ] Notificações para equipe comercial
- [ ] Integração com WhatsApp Business
- [ ] Respostas com áudio
- [ ] Suporte a múltiplos idiomas
- [ ] A/B testing de prompts
- [ ] Analytics avançado

---

## 🎉 Chatbot Pronto!

O chatbot está 100% funcional e pronto para capturar leads!

**Recursos implementados:**
✅ Integração com Groq AI
✅ Base de conhecimento estruturada
✅ Detecção de intenções
✅ Qualificação automática
✅ Captura de email/telefone
✅ Salvamento no Supabase
✅ Interface moderna
✅ Contexto de conversa
✅ Recomendação de soluções
✅ Analytics completo

**Basta configurar a chave do Groq e começar a usar! 🚀**
