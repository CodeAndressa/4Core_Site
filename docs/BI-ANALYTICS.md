# 🚀 Sistema de BI e Analytics - 4Core

Sistema completo de Business Intelligence com autenticação segura, tracking de eventos e dashboard em tempo real.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Setup Inicial](#setup-inicial)
4. [Configuração do Supabase](#configuração-do-supabase)
5. [Criar Usuário Admin](#criar-usuário-admin)
6. [Estrutura de Dados](#estrutura-de-dados)
7. [Event Tracking](#event-tracking)
8. [Dashboard](#dashboard)
9. [Segurança](#segurança)
10. [Deploy](#deploy)

---

## 🎯 Visão Geral

### Funcionalidades

✅ **Autenticação Segura**
- Login com Supabase Auth (email + senha)
- Proteção de rotas via middleware
- Sessão gerenciada por cookies seguros

✅ **Event Tracking**
- Page views automáticos
- Cliques em WhatsApp
- Submissões de formulário
- Sem cookies de terceiros
- Session ID gerado no client

✅ **Dashboard Analytics**
- KPIs em tempo real
- Gráficos de tráfego e conversão
- Análise de fontes e páginas
- Estatísticas de dispositivos
- Filtros de data (7d, 30d, 90d)

✅ **Privacidade**
- Dados agregados
- Sem PII nos eventos
- Conformidade com LGPD

---

## 🏗️ Arquitetura

```
Frontend (Public)
├─ PageViewTracker → trackPageView()
├─ WhatsAppButton → trackWhatsAppClick()
└─ ContactForm → trackFormSubmit()
         ↓
    POST /api/events
         ↓
    EventService
         ↓
    Supabase (events table)

Frontend (Admin)
├─ /admin/login → Supabase Auth
└─ /admin/dashboard → GET /api/analytics
         ↓
    AnalyticsService
         ↓
    Supabase (queries agregadas)
```

---

## ⚙️ Setup Inicial

### 1. Instalar Dependências

```bash
npm install
```

Novas dependências adicionadas:
- `@supabase/ssr` - Supabase com SSR
- `recharts` - Gráficos do dashboard

### 2. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Preencha as variáveis:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# SMTP (já configurado)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=comercial@4core.site
SMTP_PASS=sua-senha
CONTACT_EMAIL=comercial@4core.site
```

---

## 🗄️ Configuração do Supabase

### 1. Executar SQL de Setup

Acesse: https://supabase.com/dashboard

1. Selecione seu projeto
2. Vá em **SQL Editor**
3. Cole o conteúdo de `supabase-events-analytics.sql`
4. Execute (Run)

Isso criará:
- Tabela `events`
- Índices otimizados
- Views para analytics
- Políticas RLS

### 2. Habilitar Email Auth

1. Vá em **Authentication** > **Providers**
2. Habilite **Email**
3. Desabilite **Confirm email** (opcional para admin)

### 3. Configurar URL de Callback

1. Vá em **Authentication** > **URL Configuration**
2. Adicione em **Redirect URLs**:
   ```
   http://localhost:3000/api/auth/callback
   https://seu-dominio.com/api/auth/callback
   ```

---

## 👤 Criar Usuário Admin

### Via Dashboard do Supabase

1. Vá em **Authentication** > **Users**
2. Clique em **Add user** > **Create new user**
3. Preencha:
   - Email: `admin@4core.com.br`
   - Password: `senha-segura-aqui`
   - Auto Confirm User: ✅ (marcar)
4. Clique em **Create user**

### Via SQL (alternativa)

```sql
-- Criar usuário admin
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@4core.com.br',
  crypt('sua-senha-aqui', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

---

## 📊 Estrutura de Dados

### Tabela: `events`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único |
| `type` | TEXT | page_view, whatsapp_click, form_submit, form_view, cta_click |
| `page` | TEXT | Pathname da página |
| `source` | TEXT | Fonte de tráfego (UTM, referrer) |
| `referrer` | TEXT | URL de origem |
| `device` | TEXT | mobile, desktop, tablet |
| `user_agent` | TEXT | User agent do navegador |
| `session_id` | TEXT | ID de sessão (gerado no client) |
| `created_at` | TIMESTAMPTZ | Data/hora do evento |

### Views Criadas

- `daily_metrics` - Métricas agregadas por dia
- `top_pages` - Páginas mais acessadas
- `device_stats` - Estatísticas por dispositivo
- `conversion_by_page` - Taxa de conversão por página

---

## 📡 Event Tracking

### Tracking Automático

**Page Views** - Rastreado automaticamente em todas as páginas públicas:
```tsx
// Já implementado no layout.tsx
<PageViewTracker />
```

**WhatsApp Clicks** - Rastreado automaticamente nos botões:
```tsx
// Já implementado no WhatsAppFloat.tsx
onClick={() => trackWhatsAppClick(pathname)}
```

**Form Submits** - Rastreado automaticamente no hook:
```tsx
// Já implementado no useContactForm.ts
trackFormSubmit(pathname)
```

### Tracking Manual (se necessário)

```tsx
import { trackEvent } from '@/lib/tracking/trackEvent'

// Exemplo: rastrear clique em CTA
trackEvent({
  type: 'cta_click',
  page: '/solucoes',
  source: 'hero-button'
})
```

---

## 📈 Dashboard

### Acessar Dashboard

1. **Botão Discreto**: Canto inferior direito (🔒)
2. **URL Direta**: `/admin/login`

### Login

- Email: `admin@4core.com.br`
- Senha: (definida no setup)

### Métricas Disponíveis

**KPIs**
- Live Visitors (últimos 5 min)
- Unique Visitors
- Total Pageviews
- Bounce Rate
- Average Session Time

**Gráficos**
- Tráfego ao longo do tempo
- Conversões (WhatsApp + Formulário)

**Tabelas**
- Fontes de tráfego
- Páginas mais acessadas
- Dispositivos (mobile/desktop/tablet)

**Filtros**
- Últimos 7 dias
- Últimos 30 dias
- Últimos 90 dias

---

## 🔒 Segurança

### Proteção de Rotas

Middleware protege automaticamente todas as rotas `/admin/*`:

```typescript
// middleware.ts
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

### RLS (Row Level Security)

**Tabela `events`**:
- ✅ INSERT público (anon) - para tracking
- ✅ SELECT apenas authenticated - para dashboard
- ❌ UPDATE/DELETE bloqueados

**Tabela `leads`**:
- ✅ INSERT via service_role - formulário
- ✅ SELECT via service_role - CRM
- ❌ Acesso público bloqueado

### Boas Práticas

- ✅ Service Role Key apenas no backend
- ✅ Anon Key exposta apenas para tracking
- ✅ Sessão gerenciada por cookies httpOnly
- ✅ Middleware valida auth em toda requisição
- ✅ Sem dados sensíveis nos eventos

---

## 🚀 Deploy

### Vercel (Recomendado)

1. **Push para GitHub**
   ```bash
   git add .
   git commit -m "feat: sistema de BI e analytics"
   git push
   ```

2. **Conectar no Vercel**
   - Acesse: https://vercel.com
   - Import repository
   - Configure variáveis de ambiente

3. **Variáveis de Ambiente no Vercel**

   Adicione em **Settings** > **Environment Variables**:

   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_URL
   SUPABASE_SERVICE_ROLE_KEY
   SMTP_HOST
   SMTP_PORT
   SMTP_USER
   SMTP_PASS
   CONTACT_EMAIL
   ```

4. **Deploy**
   - Vercel fará deploy automático
   - Aguarde build finalizar
   - Acesse: `https://seu-dominio.vercel.app/admin/login`

### Atualizar Callback URL

Após deploy, adicione no Supabase:
```
https://seu-dominio.vercel.app/api/auth/callback
```

---

## 🧪 Testar Localmente

```bash
# Rodar servidor
npm run dev

# Testar tracking
# 1. Acesse: http://localhost:3000
# 2. Navegue pelas páginas
# 3. Clique no WhatsApp
# 4. Envie o formulário

# Verificar eventos no Supabase
# Dashboard > Table Editor > events

# Testar dashboard
# 1. Acesse: http://localhost:3000/admin/login
# 2. Faça login
# 3. Veja os dados em tempo real
```

---

## 📝 Queries Úteis

### Ver eventos recentes

```sql
SELECT * FROM events
ORDER BY created_at DESC
LIMIT 50;
```

### Eventos por tipo (hoje)

```sql
SELECT type, COUNT(*) as total
FROM events
WHERE created_at >= CURRENT_DATE
GROUP BY type;
```

### Taxa de conversão (últimos 7 dias)

```sql
SELECT 
  COUNT(*) FILTER (WHERE type = 'page_view') as views,
  COUNT(*) FILTER (WHERE type IN ('whatsapp_click', 'form_submit')) as conversions,
  ROUND(
    COUNT(*) FILTER (WHERE type IN ('whatsapp_click', 'form_submit')) * 100.0 / 
    NULLIF(COUNT(*) FILTER (WHERE type = 'page_view'), 0),
    2
  ) as conversion_rate
FROM events
WHERE created_at >= NOW() - INTERVAL '7 days';
```

### Limpar eventos antigos (manual)

```sql
SELECT cleanup_old_events();
```

---

## 🎯 Próximos Passos

- [ ] Integrar com n8n para automações
- [ ] Adicionar geolocalização (via IP)
- [ ] Implementar A/B testing
- [ ] Criar alertas de conversão
- [ ] Exportar relatórios em PDF
- [ ] Dashboard mobile responsivo
- [ ] Integração com Google Analytics (opcional)

---

## 🆘 Troubleshooting

### Erro: "Missing Supabase environment variables"

Verifique se `.env.local` existe e está preenchido corretamente.

### Erro: "relation 'events' does not exist"

Execute o SQL de setup: `supabase-events-analytics.sql`

### Erro: "Invalid login credentials"

Verifique se o usuário admin foi criado no Supabase Auth.

### Dashboard não carrega dados

1. Verifique se há eventos na tabela `events`
2. Teste o endpoint: `GET /api/analytics?startDate=2024-01-01&endDate=2024-12-31`
3. Verifique logs do servidor

### Eventos não estão sendo salvos

1. Verifique RLS policies na tabela `events`
2. Teste o endpoint: `POST /api/events`
3. Verifique console do navegador

---

## 📞 Suporte

Dúvidas: contato@4core.com.br

---

**Desenvolvido com ❤️ por 4Core**
