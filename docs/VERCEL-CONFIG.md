# 🚀 Configuração da Vercel - URGENTE

## ❌ Erro Atual:
```
500: INTERNAL_SERVER_ERROR
Code: MIDDLEWARE_INVOCATION_FAILED
```

**Causa:** Variáveis de ambiente do Supabase não configuradas na Vercel.

---

## ✅ SOLUÇÃO: Configurar Variáveis de Ambiente

### 1️⃣ Acesse o Dashboard da Vercel

```
https://vercel.com/seu-usuario/4core/settings/environment-variables
```

Ou:
1. Acesse: https://vercel.com
2. Selecione o projeto **4Core**
3. Vá em **Settings** (menu lateral)
4. Clique em **Environment Variables**

---

### 2️⃣ Adicione TODAS as Variáveis

Clique em **Add New** para cada variável abaixo:

#### 🔑 Supabase (OBRIGATÓRIO)

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://uesqdbaxhnblefrtjtae.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sua_anon_key_completa_aqui` | Production, Preview, Development |
| `SUPABASE_URL` | `https://uesqdbaxhnblefrtjtae.supabase.co` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `sua_service_role_key_completa_aqui` | Production, Preview, Development |

⚠️ **IMPORTANTE:** 
- As chaves são MUITO LONGAS (200+ caracteres)
- Copie do Supabase Dashboard > Settings > API
- Marque os 3 ambientes: Production, Preview, Development

#### 📧 SMTP (Email)

| Name | Value | Environment |
|------|-------|-------------|
| `SMTP_HOST` | `smtp.hostinger.com` | Production, Preview, Development |
| `SMTP_PORT` | `587` | Production, Preview, Development |
| `SMTP_USER` | `comercial@4core.site` | Production, Preview, Development |
| `SMTP_PASS` | `4C0R3@senha2026` | Production, Preview, Development |
| `CONTACT_EMAIL` | `comercial@4core.site` | Production, Preview, Development |

#### 📱 WhatsApp

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5541988035657` | Production, Preview, Development |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | `Olá! Gostaria de falar com um especialista da 4Core.` | Production, Preview, Development |

ℹ️ Ver `src/data/contacts.ts` para todos os números comerciais centralizados.

#### 🌐 Site URL

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://seu-dominio.vercel.app` | Production, Preview, Development |

⚠️ Substitua `seu-dominio.vercel.app` pela URL real do seu projeto na Vercel.

---

### 3️⃣ Salvar e Redeploy

Após adicionar TODAS as variáveis:

1. Clique em **Save** em cada variável
2. Vá em **Deployments** (menu lateral)
3. Clique nos **3 pontinhos** do último deployment
4. Clique em **Redeploy**
5. Marque **Use existing Build Cache** (opcional)
6. Clique em **Redeploy**

---

### 4️⃣ Aguarde o Deploy

- O deploy leva 1-2 minutos
- Aguarde a mensagem: **Ready**
- Acesse seu site: `https://seu-dominio.vercel.app`

---

## 🧪 Testar Após Deploy

### 1. Testar Site Público
```
https://seu-dominio.vercel.app
```
✅ Deve carregar normalmente

### 2. Testar Tracking
- Navegue pelas páginas
- Clique no WhatsApp
- Envie o formulário
- Verifique no Supabase se os eventos foram salvos

### 3. Testar Admin
```
https://seu-dominio.vercel.app/admin/login
```
- Faça login com: `admin@4core.com.br`
- Deve redirecionar para: `/admin/dashboard`
- Veja as métricas em tempo real

---

## 🔧 Atualizar Callback URL no Supabase

Após o deploy funcionar:

1. Acesse: https://supabase.com/dashboard/project/uesqdbaxhnblefrtjtae/auth/url-configuration
2. Em **Redirect URLs**, adicione:
   ```
   https://seu-dominio.vercel.app/api/auth/callback
   ```
3. Clique em **Save**

---

## 🐛 Troubleshooting

### Erro 500 persiste após adicionar variáveis
✅ Verifique se fez o **Redeploy**
✅ Verifique se as chaves do Supabase estão corretas
✅ Verifique se marcou os 3 ambientes (Production, Preview, Development)

### Erro: "Invalid login credentials"
✅ Verifique se o usuário admin foi criado no Supabase
✅ Verifique se as chaves do Supabase estão corretas

### Site carrega mas admin não funciona
✅ Adicione a URL de callback no Supabase
✅ Verifique se as variáveis `NEXT_PUBLIC_SUPABASE_*` estão configuradas

---

## 📋 Checklist Final

- [ ] Todas as variáveis de ambiente adicionadas na Vercel
- [ ] Redeploy realizado
- [ ] Site público carregando
- [ ] Tracking funcionando
- [ ] Login admin funcionando
- [ ] Dashboard mostrando dados
- [ ] URL de callback adicionada no Supabase

---

**Após configurar as variáveis, o erro 500 será resolvido! 🎉**
