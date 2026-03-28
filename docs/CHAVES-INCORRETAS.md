# 🔑 URGENTE: Suas chaves do Supabase estão INCORRETAS!

## ❌ Problema Identificado:

As chaves no seu `.env.local` terminam com `...Ks0Ks0Ks0` 
Isso é um PLACEHOLDER/EXEMPLO, não são as chaves reais!

## ✅ Como Pegar as Chaves CORRETAS:

### Passo 1: Acesse o Supabase
```
https://supabase.com/dashboard/project/uesqdbaxhnblefrtjtae/settings/api
```

### Passo 2: Na página de API Settings, você verá:

**Project URL:**
```
https://uesqdbaxhnblefrtjtae.supabase.co
```
✅ Esta está correta!

**Project API keys:**

1. **anon public** (clique em "Reveal" para ver)
   - Começa com: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...`
   - Tem mais de 200 caracteres
   - Termina com algo como: `...xyz123abc` (não com Ks0Ks0)

2. **service_role secret** (clique em "Reveal" para ver)
   - Também começa com: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...`
   - Tem mais de 200 caracteres
   - É DIFERENTE da anon key

### Passo 3: Copie as chaves COMPLETAS

⚠️ **IMPORTANTE:**
- Clique no botão "Reveal" ou no ícone de olho para ver a chave completa
- Clique no ícone de copiar (📋) ao lado da chave
- NÃO digite manualmente, SEMPRE copie!

### Passo 4: Cole no .env.local

Abra o arquivo `.env.local` e substitua:

```env
# Supabase — Banco de dados e CRM
NEXT_PUBLIC_SUPABASE_URL=https://uesqdbaxhnblefrtjtae.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=COLE_AQUI_A_ANON_KEY_COMPLETA_QUE_VOCE_COPIOU
SUPABASE_URL=https://uesqdbaxhnblefrtjtae.supabase.co
SUPABASE_SERVICE_ROLE_KEY=COLE_AQUI_A_SERVICE_ROLE_KEY_COMPLETA_QUE_VOCE_COPIOU
```

### Passo 5: Salve e reinicie o servidor

```bash
# Pare o servidor (Ctrl+C no terminal)
# Inicie novamente:
npm run dev
```

---

## 🎯 Como saber se está correto:

✅ A chave `anon` deve ter mais de 200 caracteres
✅ A chave `service_role` deve ter mais de 200 caracteres  
✅ As duas chaves são DIFERENTES entre si
✅ Ambas começam com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS`
✅ NÃO terminam com `Ks0Ks0Ks0`

---

## 📸 Onde encontrar no Supabase:

```
Dashboard do Supabase
  └─ Seu Projeto (uesqdbaxhnblefrtjtae)
      └─ Settings (⚙️ no menu lateral)
          └─ API
              └─ Project API keys
                  ├─ anon public [Reveal] [Copy]
                  └─ service_role secret [Reveal] [Copy]
```

---

**Depois de colar as chaves corretas, me avise para continuarmos!**
