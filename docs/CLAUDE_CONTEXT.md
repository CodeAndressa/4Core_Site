# CLAUDE_CONTEXT.md — Contexto Persistente do Projeto 4Core

> **Última atualização:** 2026-03-23
> **Versão:** 2.1 — Revisado e validado por Antigravity (Senior AI Engineer)

---

## 1. VISÃO GERAL DO PROJETO

### O que é
Site institucional da **4Core**, empresa de consultoria especializada em **controle de ponto, acesso e conformidade trabalhista**, sediada em Curitiba/PR. Fundada por Camila, Danielle, Larissa e Thayane.

### Objetivo do sistema
- **Geração de leads qualificados** — canal principal de aquisição
- **Vitrine de soluções** — apresentação consultiva de produtos Topdata
- **CRM** — persistência e gestão de leads via Supabase
- **BI / Analytics** — dashboard interno com métricas de tráfego e conversão
- **Chatbot SDR** — pré-vendas automatizada com IA (Groq/Llama)
- **Base para automações futuras** — preparado para integrar n8n, webhooks e CRM externo

### Público-alvo
- RH e Departamento Pessoal
- Gestores operacionais
- Empresas que precisam de controle de jornada confiável e conforme à Portaria 671

### Posicionamento
A 4Core **NÃO é uma empresa de tecnologia**. É uma consultoria que entrega:
- Implementação correta de soluções de controle de jornada
- Conformidade trabalhista (Portaria 671)
- Redução de risco jurídico
- Integração limpa e suporte especializado

> **Proposta de valor:** "O relógio é o meio. A conformidade é o fim."

---

## 2. STACK TECNOLÓGICA

| Camada | Tecnologia | Versão/Detalhe |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.0 |
| **Linguagem** | TypeScript | ^5 |
| **React** | React + React DOM | 19.2.4 |
| **Estilização** | Tailwind CSS v4 | com `@tailwindcss/postcss` |
| **Banco + Auth** | Supabase | `@supabase/supabase-js` ^2.100.0 + `@supabase/ssr` ^0.6.1 |
| **Chatbot IA** | Groq SDK | ^1.1.1 (modelo `llama-3.3-70b-versatile`) |
| **E-mail** | Nodemailer | ^8.0.3 (SMTP Hostinger) |
| **Formulários** | React Hook Form + Zod | ^7.71.2 / ^4.3.6 |
| **Animações** | Framer Motion | ^12.38.0 |
| **Gráficos** | Recharts | ^2.15.0 |
| **Ícones** | Lucide React | ^0.577.0 |
| **Utilitários** | clsx, tailwind-merge | merge de classes CSS |
| **Fonte** | Inter (Google Fonts) | via `next/font/google` |

### Variáveis de Ambiente (`.env.local`)

```
# SMTP (Hostinger)
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
CONTACT_EMAIL

# Frontend (públicas)
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_WHATSAPP_MESSAGE
NEXT_PUBLIC_SITE_URL

# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY

# Groq (Chatbot)
GROQ_API_KEY
```

---

## 3. ARQUITETURA

### Estrutura de Pastas

```
4Core/
├── src/
│   ├── app/                          # App Router (rotas e páginas)
│   │   ├── layout.tsx                # Layout raiz (Header, Footer, WhatsApp, Chatbot, Tracker)
│   │   ├── page.tsx                  # Home (Hero → Diagnóstico → Soluções → Risco → CTA)
│   │   ├── globals.css               # Design tokens Tailwind v4 (@theme)
│   │   ├── robots.ts                 # SEO: robots.txt
│   │   ├── sitemap.ts                # SEO: sitemap.xml
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Layout admin (sem Header/Footer público)
│   │   │   ├── login/page.tsx        # Tela de login (Supabase Auth)
│   │   │   └── dashboard/page.tsx    # Dashboard de analytics (protegido)
│   │   ├── api/
│   │   │   ├── analytics/route.ts    # GET - Dashboard BI (autenticado)
│   │   │   ├── auth/callback/route.ts # Auth callback Supabase
│   │   │   ├── chatbot/route.ts      # POST - Processar mensagem chatbot
│   │   │   ├── contact/route.ts      # POST - Formulário de contato (validação + lead + email)
│   │   │   ├── events/route.ts       # POST/GET - Tracking de eventos
│   │   │   └── lead/route.ts         # POST/GET - CRUD de leads
│   │   ├── compliance/              # Página de conformidade
│   │   ├── contato/                 # Página de contato
│   │   ├── privacidade/             # Política de privacidade
│   │   ├── sobre/                   # Página sobre
│   │   └── solucoes/
│   │       ├── page.tsx              # Listagem de soluções por categoria
│   │       └── [category]/
│   │           ├── page.tsx          # Produtos por categoria
│   │           └── [slug]/page.tsx   # Detalhe do produto (rota dinâmica)
│   │
│   ├── components/
│   │   ├── admin/Dashboard/          # Componentes do dashboard BI
│   │   │   ├── ConversionChart.tsx
│   │   │   ├── DateFilter.tsx
│   │   │   ├── DeviceStats.tsx
│   │   │   ├── KPICards.tsx
│   │   │   ├── PagesTable.tsx
│   │   │   ├── SourcesTable.tsx
│   │   │   └── TrafficChart.tsx
│   │   ├── forms/
│   │   │   └── ContactForm.tsx       # Formulário principal de captura
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Navegação principal
│   │   │   ├── Footer.tsx            # Rodapé com links e contatos
│   │   │   ├── WhatsAppButton.tsx    # Botão WhatsApp no layout
│   │   │   └── WhatsAppFloat.tsx     # FloatingAction WhatsApp
│   │   ├── sections/                 # Seções da home e páginas
│   │   │   ├── Hero.tsx
│   │   │   ├── DiagnosticSection.tsx  # Diagnóstico interativo
│   │   │   ├── Solutions.tsx
│   │   │   ├── RiskSection.tsx
│   │   │   ├── Contrast.tsx
│   │   │   ├── TrustIndicators.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── CTA.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── Benefits.tsx
│   │   │   ├── Compliance.tsx
│   │   │   ├── Differentials.tsx
│   │   │   ├── Problems.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── SolutionDetailContent.tsx
│   │   │   └── product/              # Componentes de página de produto
│   │   │       ├── ProductHero.tsx
│   │   │       ├── ProblemSolution.tsx
│   │   │       ├── ProductBenefits.tsx
│   │   │       ├── ProductSpecs.tsx
│   │   │       ├── ProductContextSection.tsx
│   │   │       ├── ImplementationSection.tsx
│   │   │       └── ImplementationBlock.tsx
│   │   ├── tracking/
│   │   │   └── PageViewTracker.tsx    # Auto-track de pageview
│   │   └── ui/                        # Componentes reutilizáveis
│   │       ├── AdminButton.tsx
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Chatbot.tsx            # Widget de chat (17KB — complexo)
│   │       ├── Container.tsx
│   │       ├── LeadCaptureModal.tsx   # Modal de captura de lead
│   │       ├── ProductCard.tsx
│   │       ├── Section.tsx
│   │       └── SectionHeading.tsx
│   │
│   ├── data/                          # Dados estáticos (SSG-friendly)
│   │   ├── company.ts                 # Dados da empresa (nome, contato, redes)
│   │   ├── navigation.ts             # Itens de navegação
│   │   └── products.ts               # Catálogo de 6 produtos + helpers
│   │
│   ├── hooks/
│   │   └── useContactForm.ts         # Hook: validação client + submit API + tracking
│   │
│   ├── lib/
│   │   ├── constants.ts              # WhatsApp, ROUTES, EMPLOYEE_RANGES
│   │   ├── constants/contacts.ts     # Contatos comerciais e suporte
│   │   ├── email.ts                  # Nodemailer — envio SMTP
│   │   ├── knowledgeBase.ts          # Base de conhecimento do chatbot (749 linhas)
│   │   ├── supabase.ts              # Client admin (service_role, bypass RLS)
│   │   ├── supabase/
│   │   │   ├── client.ts            # Browser client (Auth)
│   │   │   ├── server.ts            # Server client (cookies)
│   │   │   └── middleware.ts        # Proteção de rotas /admin
│   │   ├── services/
│   │   │   ├── analyticsService.ts   # Queries BI (KPIs, traffic, conversões)
│   │   │   ├── chatbotService.ts     # Lógica do chatbot SDR (Groq API)
│   │   │   ├── eventService.ts       # CRUD de eventos (tracking)
│   │   │   └── leadService.ts        # CRUD de leads (CRM)
│   │   ├── tracking/
│   │   │   └── trackEvent.ts        # Client-side event tracking
│   │   ├── utils.ts                 # Utilitários (cn para merge de classes)
│   │   └── validators.ts           # Schema Zod compartilhado (client/server)
│   │
│   └── types/                        # Tipos TypeScript centralizados
│       ├── analytics.ts              # Event, KPI, Traffic, Conversion, Dashboard
│       ├── contact.ts                # ContactFormData, ContactApiResponse
│       ├── lead.ts                   # Lead, CreateLeadInput, LeadStatus
│       ├── navigation.ts            # NavItem
│       ├── product.ts               # Product, Category, ProductSpecs
│       └── solution.ts              # Solution (tipo da UI, diferente do chatbot)
│
├── public/
│   └── images/                       # Assets estáticos
│
├── middleware.ts                      # Middleware raiz (proteção /admin + Supabase session)
├── next.config.ts
├── tsconfig.json                     # Paths: @/* → ./src/*
├── package.json
└── .env.local                        # Variáveis de ambiente (NÃO commitado)
```

### Separação Frontend / Backend

| Camada | Localização | Responsabilidade |
|---|---|---|
| **Frontend** | `src/components/`, `src/app/page.tsx`, etc. | UI, interação, tracking client-side |
| **Backend** | `src/app/api/`, `src/lib/services/` | API Routes, lógica de negócio, Supabase queries |
| **Shared** | `src/types/`, `src/lib/validators.ts` | Tipos e validação compartilhados |
| **Data** | `src/data/` | Dados estáticos (produtos, empresa, navegação) |

### Padrão de Supabase

O projeto usa **dois padrões** de client Supabase:

1. **`supabaseAdmin`** (`lib/supabase.ts`) — Backend-only, usa `SUPABASE_SERVICE_ROLE_KEY`, bypassa RLS. Usado por todos os services (`leadService`, `eventService`, `analyticsService`).

2. **`@supabase/ssr`** (`lib/supabase/client.ts`, `server.ts`, `middleware.ts`) — Para Auth (login admin), gerenciamento de sessão via cookies.

---

## 4. FUNCIONALIDADES PRINCIPAIS

### 4.1 Site Institucional
- **Home** — Funil de conversão: Hero → Diagnóstico → Soluções → Risco → Contraste → Trust → FAQ → CTA
- **Soluções** — Listagem por 3 categorias com rotas dinâmicas `[category]/[slug]`
- **Sobre** — Página institucional
- **Contato** — Formulário principal de captura de lead
- **Compliance** — Informações sobre Portaria 671
- **Privacidade** — Política de privacidade

### 4.2 Diagnóstico Interativo (`DiagnosticSection.tsx`)
- Questionário multistep sobre a situação do controle de ponto
- Gera resultado personalizado
- Captura lead ao final do diagnóstico
- Integra com tracking de eventos

### 4.3 Captura de Leads
- **ContactForm** — Formulário com validação Zod (client + server)
- **LeadCaptureModal** — Modal que aparece em momentos estratégicos
- **Chatbot** — Captura via conversa
- Todos os caminhos salvam no Supabase via `leadService`

### 4.4 CRM (Supabase)
- Tabela `leads` — dados do lead + UTM + status de gestão
- Tabela `events` — tracking comportamental
- Tabela `chatbot_leads` — leads capturados via chatbot com dados de qualificação
- Status workflow: `novo → contatado → qualificado → convertido | perdido`

### 4.5 BI / Analytics
- Dashboard protegido por autenticação (`/admin/dashboard`)
- KPIs: visitantes únicos, pageviews, bounce rate, tempo médio, live visitors
- Gráficos: tráfego ao longo do tempo, conversões
- Tabelas: páginas mais visitadas, fontes de tráfego, dispositivos
- Todas as métricas são calculadas em tempo real do Supabase

### 4.6 Chatbot SDR
- Widget de chat embarcado no layout principal
- Usa Groq API (modelo `llama-3.3-70b-versatile`)
- Base de conhecimento estruturada com 6 soluções, 8 intenções e regras de decisão
- Fluxo: saudação → qualificação → recomendação → captura de lead → fechamento
- Extrai automaticamente email, telefone e nome da conversa
- Calcula score de qualificação (0-100)
- Salva lead qualificado no Supabase

---

## 5. FLUXOS IMPORTANTES

### Fluxo 1: Formulário → Lead → Email
```
ContactForm (client)
  → useContactForm hook (validação Zod)
  → POST /api/contact
  → contactFormSchema.safeParse (validação server)
  → createLead() → Supabase (tabela leads)
  → sendContactEmail() → SMTP Hostinger
  → trackFormSubmit() → POST /api/events → Supabase (tabela events)
```

### Fluxo 2: Diagnóstico → Captura → Lead
```
DiagnosticSection (multistep)
  → trackEvent('diagnostico_start')
  → Respostas do usuário
  → trackEvent('diagnostico_complete')
  → LeadCaptureModal (aparece com resultado)
  → POST /api/lead → Supabase
```

### Fluxo 3: Chatbot → Qualificação → Lead
```
Chatbot widget (client)
  → POST /api/chatbot (mensagem + conversationState)
  → ChatbotService.processMessage()
    → findMatchingIntent() — detecção de intenção
    → extractLeadInfo() — regex para email/telefone
    → buildContext() — contexto para Groq
    → callGroq() — API Groq (llama-3.3-70b)
    → updateConversationState() — atualiza qualificação
  → Se leadCaptured → saveLead() → Supabase (chatbot_leads)
  → Resposta para o usuário
```

### Fluxo 4: Evento → Tracking → Analytics
```
Ação do usuário (page_view, whatsapp_click, form_submit, etc.)
  → trackEvent() (client — src/lib/tracking/trackEvent.ts)
  → getSessionId() — sessionStorage (sem cookies)
  → getDeviceType() — user-agent parser
  → POST /api/events (fire-and-forget, keepalive)
  → EventService.createEvent() → Supabase (tabela events)
  
Admin acessa /admin/dashboard
  → GET /api/analytics (autenticado)
  → AnalyticsService.getDashboard()
  → Queries paralelas: KPIs + Traffic + Conversions + Sources + Pages + Devices
  → Componentes: KPICards, TrafficChart, ConversionChart, etc.
```

---

## 6. PADRÕES DE DESENVOLVIMENTO

### Componentização
- **Sections** — componentes de seção com lógica própria (Hero, CTA, FAQ, etc.)
- **UI** — componentes básicos reutilizáveis (Button, Badge, Container, Section, SectionHeading)
- **Product** — componentes específicos para páginas de produto (ProductHero, ProductSpecs, etc.)
- **Layout** — Header, Footer, WhatsApp

### Services (`/lib/services`)
- Camada de serviço entre API routes e Supabase
- Cada service é responsável por um domínio: `leadService`, `eventService`, `analyticsService`, `chatbotService`
- Padrão: validação → normalização → persistência → resposta tipada

### API Routes
- `POST /api/contact` — Formulário de contato (validação + lead + email)
- `POST /api/lead` — Criação direta de lead
- `GET /api/lead?email=xxx` — Busca de lead por email
- `POST /api/events` — Captura de eventos (público)
- `GET /api/events` — Lista eventos (admin)
- `POST /api/chatbot` — Processamento de mensagens
- `GET /api/analytics` — Dashboard BI (autenticado)
- `GET /api/auth/callback` — Callback do Supabase Auth

### Validação
- Schema Zod compartilhado (`validators.ts`) — mesmas regras no client e server
- Validação de telefone: DDD + 9 dígitos (formato brasileiro)
- Validação de email padrão

### Tipagem
- Todos os tipos centralizados em `src/types/`
- Interface `Lead` com status workflow
- Interface `Event` com tipos de evento enumerados
- Interface `Product` com specs e categorias tipadas
- Interface `AnalyticsDashboard` com todas as métricas

---

## 7. REGRAS DE NEGÓCIO (CRÍTICO)

### Sobre a empresa
- A 4Core vende **equipamentos Topdata + software TopPonto + implementação profissional**
- Foco total em **conformidade trabalhista** (Portaria 671)
- Comunicação **consultiva** — diagnóstico antes de venda
- **NUNCA** usar linguagem de startup, marketing exagerado ou buzzwords

### Sobre conversão
- **SEMPRE** priorizar a conversão em qualquer interação
- **SEMPRE** capturar dados de lead quando possível
- Todos os CTAs devem ser claros e orientados a ação
- Funil: risco → diagnóstico → solução → captura

### Tom de voz
- Claro, técnico, direto, consultivo
- **Usar:** conformidade, segurança jurídica, eficiência operacional
- **NÃO usar:** inovador, revolucionário, líder de mercado, o melhor

### Produtos disponíveis (6)
1. **REP-P Facial** — Relógio de ponto com reconhecimento facial (produto flagship)
2. **TopPonto Web** — Software cloud para gestão de jornada
3. **TopPonto Mobile** — App para equipes externas/home office
4. **Catracas** — Controle de acesso físico
5. **Terminais Faciais** — Controle de áreas restritas
6. **Bastão de Ronda Viggia** — Controle de rondas de segurança

### Categorias de produto
- `controle-de-jornada` — REP-P Facial, TopPonto Web, TopPonto Mobile
- `controle-de-acesso` — Catracas, Terminais Faciais, REP-P Facial
- `seguranca-operacional` — Bastão de Ronda

---

## 8. SISTEMA DE EVENTOS

### Tipos de evento rastreados

| Tipo | Quando dispara | Onde é chamado |
|---|---|---|
| `page_view` | Navegação entre páginas | `PageViewTracker.tsx` |
| `whatsapp_click` | Clique no botão WhatsApp | `WhatsAppFloat.tsx`, `WhatsAppButton.tsx` |
| `form_submit` | Envio de formulário de contato | `useContactForm.ts` |
| `form_view` | Visualização do formulário | `ContactForm.tsx` |
| `cta_click` | Clique em CTA genérico | Vários componentes |

### Dados capturados por evento
- `type` — Tipo do evento
- `page` — URL da página
- `source` — Origem (utm_source ou referrer)
- `device` — Tipo de dispositivo (mobile, desktop, tablet)
- `user_agent` — Navegador do usuário
- `session_id` — ID de sessão (sessionStorage, sem cookies)
- `referrer` — Referrer HTTP
- `created_at` — Timestamp automático (Supabase)

---

## 9. CRM (SUPABASE)

### Tabela `leads`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK |
| `name` | text | Nome do lead |
| `email` | text | Email (validado) |
| `phone` | text | Telefone com DDD |
| `company` | text? | Nome da empresa |
| `employees` | text? | Faixa de funcionários |
| `message` | text? | Mensagem livre |
| `source_page` | text | Página de origem |
| `source_channel` | text | Canal: form, whatsapp, phone, email |
| `utm_source` | text? | UTM source |
| `utm_medium` | text? | UTM medium |
| `utm_campaign` | text? | UTM campaign |
| `status` | text | novo → contatado → qualificado → convertido/perdido |
| `interest` | text? | Interesse declarado |
| `assigned_to` | text? | Responsável |
| `created_at` | timestamp | Data de criação |
| `last_contact_at` | timestamp? | Último contato |
| `converted_at` | timestamp? | Data de conversão |

### Tabela `events`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK |
| `type` | text | Tipo do evento |
| `page` | text | URL da página |
| `source` | text? | Origem |
| `referrer` | text? | Referrer |
| `device` | text? | mobile/desktop/tablet |
| `user_agent` | text? | User-Agent |
| `session_id` | text? | ID de sessão |
| `created_at` | timestamp | Timestamp |

### Tabela `chatbot_leads`

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | text? | Nome extraído da conversa |
| `email` | text? | Email capturado |
| `phone` | text? | Telefone capturado |
| `company` | text? | Empresa |
| `company_size` | text? | Tamanho |
| `work_model` | text? | Modelo de trabalho |
| `current_system` | text? | Sistema atual |
| `main_problem` | text? | Principal problema |
| `urgency` | text? | Urgência |
| `budget` | text? | Orçamento |
| `decision_maker` | text? | Nível de decisão |
| `interested_solutions` | text[] | IDs das soluções |
| `conversation_summary` | text | Log da conversa |
| `qualification_score` | int | Score 0-100 |
| `source` | text | 'chatbot' |
| `conversation_id` | text | ID único da conversa |
| `status` | text | new → contacted → qualified → proposal_sent → closed |

---

## 10. CHATBOT (IMPORTANTE)

### Papel
- Atua como **SDR (Sales Development Representative)** digital
- Pré-vendas consultiva — diagnóstico antes de venda
- Objetivo: **qualificar lead** e **capturar contato**

### Stack técnica
- **Frontend:** `components/ui/Chatbot.tsx` (widget flutuante)
- **Backend:** `api/chatbot/route.ts` + `services/chatbotService.ts`
- **IA:** Groq API com modelo `llama-3.3-70b-versatile`
- **Base de conhecimento:** `lib/knowledgeBase.ts` (749 linhas)

### Base de conhecimento (`knowledgeBase.ts`)
- 6 soluções com detalhes completos (preço, prazo, público, benefícios)
- 8 intenções de usuário com keywords e respostas sugeridas
- 7 perguntas de qualificação com pesos para scoring
- 9 regras de decisão (mapa de recomendação)
- 7 gatilhos de conversão
- System prompt detalhado para o LLM

### Fluxo do chatbot
1. Cumprimentar amigavelmente
2. Perguntar necessidade (UMA pergunta por vez)
3. Qualificar com perguntas estratégicas
4. Após 3-4 respostas, sugerir solução
5. Capturar email ou telefone
6. Oferecer próximo passo (WhatsApp, especialista, material)

### Regras do bot
- **NUNCA** inventar informações sobre produtos ou preços
- **SEMPRE** fazer UMA pergunta por vez
- Respostas CURTAS (máximo 2-3 linhas)
- Conduzir conversa de forma natural
- Capturar lead ANTES de encerrar
- Se recusar email → pedir WhatsApp

### Captura inteligente
- Regex para email: `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
- Regex para telefone: formatos brasileiros variados
- Regex para nome: "Meu nome é X", "Sou o/a X"
- Extração automática de dados de qualificação (tamanho, modelo, urgência)

---

## 11. DIRETRIZES DE UX/UI

### Design System (globals.css)

```css
/* Cores da marca */
--color-brand-deep: #0F0022    /* Roxo profundo — base institucional */
--color-brand-vibrant: #7B00FF /* Roxo vibrante — CTAs e destaques */
--color-brand-light: #F8F4FF   /* Lilás claro — backgrounds suaves */

/* Superfícies */
--color-surface-white: #FFFFFF
--color-surface-gray: #F9FAFB
--color-surface-muted: #F3F4F6

/* Texto */
--color-text-primary: #111827
--color-text-secondary: #4B5563
--color-text-muted: #6B7280

/* Bordas */
--color-border-default: #E5E7EB
--color-border-light: #F3F4F6

/* Sombras premiums */
--shadow-premium: 0 20px 25px -5px rgba(0,0,0,0.1)
--shadow-glow: 0 0 50px -12px rgba(123,0,255,0.25)
```

### Princípios de UI
- **Clareza > estética** — o design comunica, não impressiona
- Layout baseado em grid com espaçamento consistente
- Mobile-first com `section-padding` responsiva
- Classe `glass` para efeitos de glassmorphism sutil

### Princípios de UX
- Estrutura orientada à conversão
- CTAs fortes e claros em cada seção
- Foco em problema → risco → solução
- Hierarquia de informação bem definida
- O site deve parecer: **confiável, técnico, corporativo**
- O site NÃO deve parecer: startup genérica, landing page exagerada

---

## 12. REGRAS PARA O AGENTE (MUITO IMPORTANTE)

### SEMPRE fazer:
- ✅ Seguir este arquivo como fonte de verdade do projeto
- ✅ Usar os services existentes (`leadService`, `eventService`, `chatbotService`, `analyticsService`)
- ✅ Validar com Zod (schema compartilhado client/server)
- ✅ Manter tipagem forte com TypeScript
- ✅ Rastrear eventos importantes (`trackEvent`)
- ✅ Priorizar escalabilidade e clareza no código
- ✅ Manter consistência com o design system existente (cores, sombras, tipografia)
- ✅ Respeitar o posicionamento da marca (consultiva, não vendedora)
- ✅ Persistir leads no Supabase sempre que possível

### NUNCA fazer:
- ❌ Reinventar a arquitetura — seguir os padrões existentes
- ❌ Ignorar o contexto deste arquivo
- ❌ Usar soluções genéricas fora do padrão do projeto
- ❌ Criar componentes duplicados — verificar se já existe
- ❌ Instalar dependências sem necessidade clara
- ❌ Alterar o design system sem solicitação explícita
- ❌ Gerar código sem planejamento prévio
- ❌ Ignorar o sistema de tracking e eventos
- ❌ Fazer chamadas diretas ao Supabase fora dos services

---

## 13. COMO UTILIZAR ESTE ARQUIVO

1. **Em todas as tarefas futuras** — Este arquivo deve ser a primeira referência consultada
2. **Evitar reanálise completa** — As informações aqui já mapeiam toda a estrutura
3. **Decisões técnicas** — Seguir os padrões documentados acima
4. **Novos componentes** — Seguir a organização de pastas existente
5. **Novas API routes** — Seguir o padrão de services + tipos + validação
6. **Novas funcionalidades** — Sempre considerar tracking, captura de lead e persistência

### Checklist para qualquer alteração:
- [ ] Segue os padrões de código documentados?
- [ ] Mantém a consistência visual?
- [ ] Rastreia eventos relevantes?
- [ ] Captura lead quando possível?
- [ ] Usa os services existentes?
- [ ] Está tipado com TypeScript?
- [ ] Valida dados com Zod quando aplicável?

---

> **Este arquivo foi gerado com base na análise completa do código real do projeto em 2026-03-23.**
> **Arquivos analisados:** ~80+ arquivos em `src/`, configurações, API routes, services, types, data e componentes.
