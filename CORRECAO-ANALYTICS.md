# ✅ Checklist de Correção - Sistema Analytics

## 🔴 PROBLEMA IDENTIFICADO:
As chaves do Supabase no `.env.local` estão INCORRETAS!

---

## 📋 PASSOS PARA CORRIGIR:

### 1️⃣ PEGAR AS CHAVES CORRETAS DO SUPABASE

Siga o arquivo: `GET-SUPABASE-KEYS.md`

Ou acesse direto:
1. https://supabase.com/dashboard
2. Selecione o projeto
3. Settings > API
4. Copie:
   - **Project URL**
   - **anon public key** (começa com `eyJ...`)
   - **service_role secret key** (começa com `eyJ...`)

### 2️⃣ ATUALIZAR O .env.local

Abra o arquivo `.env.local` e substitua:

```env
# Supabase — Banco de dados e CRM
NEXT_PUBLIC_SUPABASE_URL=https://uesqdbaxhnblefrtjtae.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_aqui_a_anon_key_COMPLETA_do_supabase
SUPABASE_URL=https://uesqdbaxhnblefrtjtae.supabase.co
SUPABASE_SERVICE_ROLE_KEY=cole_aqui_a_service_role_key_COMPLETA_do_supabase
```

⚠️ **IMPORTANTE:** As chaves são MUITO LONGAS (200+ caracteres)

### 3️⃣ EXECUTAR O SQL NO SUPABASE

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New query**
5. Cole TODO o conteúdo do arquivo: `supabase-events-analytics.sql`
6. Clique em **Run** (ou pressione Ctrl+Enter)
7. Aguarde a mensagem: "Success. No rows returned"

### 4️⃣ CRIAR USUÁRIO ADMIN

**Opção A - Via Dashboard (RECOMENDADO):**
1. No Supabase, vá em **Authentication** > **Users**
2. Clique em **Add user** > **Create new user**
3. Preencha:
   - Email: `admin@4core.com.br`
   - Password: `4Core@2025!` (ou outra senha forte)
   - ✅ Marque: **Auto Confirm User**
4. Clique em **Create user**

**Opção B - Via SQL:**
```sql
-- Execute no SQL Editor
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@4core.com.br',
  crypt('4Core@2025!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  ''
);
```

### 5️⃣ REINICIAR O SERVIDOR

```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente:
npm run dev
```

### 6️⃣ TESTAR O SISTEMA

**A) Testar Tracking:**
1. Acesse: http://localhost:3001
2. Navegue pelas páginas
3. Clique no botão WhatsApp
4. Envie o formulário de contato

**B) Verificar Eventos no Supabase:**
1. Vá em **Table Editor** > **events**
2. Deve aparecer os eventos capturados

**C) Testar Login Admin:**
1. Clique no botão 🔒 no canto inferior ESQUERDO
2. Ou acesse: http://localhost:3001/admin/login
3. Login:
   - Email: `admin@4core.com.br`
   - Senha: (a que você definiu)
4. Deve redirecionar para: `/admin/dashboard`

---

## 🐛 TROUBLESHOOTING:

### Erro: "Missing Supabase environment variables"
✅ Verifique se as chaves estão no `.env.local`
✅ Reinicie o servidor após alterar `.env.local`

### Erro: "Invalid login credentials"
✅ Verifique se o usuário foi criado no Supabase Auth
✅ Tente resetar a senha no dashboard do Supabase

### Erro: "relation 'events' does not exist"
✅ Execute o SQL: `supabase-events-analytics.sql`

### Dashboard não mostra dados
✅ Verifique se há eventos na tabela `events`
✅ Gere eventos navegando pelo site
✅ Verifique o console do navegador (F12)

### Eventos não estão sendo salvos
✅ Verifique as chaves do Supabase
✅ Abra o console do navegador (F12) e veja se há erros
✅ Teste o endpoint: `POST http://localhost:3001/api/events`

---

## 📊 APÓS TUDO FUNCIONAR:

Você terá:
- ✅ Botão admin no canto inferior ESQUERDO
- ✅ Tracking automático de page views
- ✅ Tracking de cliques no WhatsApp
- ✅ Tracking de submissões de formulário
- ✅ Dashboard com métricas em tempo real
- ✅ Login seguro com Supabase Auth

---

## 🎯 PRÓXIMOS PASSOS:

1. Testar tudo localmente
2. Fazer deploy na Vercel
3. Configurar as mesmas variáveis de ambiente na Vercel
4. Atualizar a URL de callback no Supabase para incluir o domínio de produção

---

**Dúvidas? Me avise qual erro está aparecendo!**
