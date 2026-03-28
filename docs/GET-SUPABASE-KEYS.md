# 🔑 Como Pegar as Chaves do Supabase

## Passo a Passo:

1. **Acesse o Supabase Dashboard**
   - Vá em: https://supabase.com/dashboard
   - Faça login na sua conta

2. **Selecione seu projeto**
   - Clique no projeto: `uesqdbaxhnblefrtjtae`

3. **Vá em Settings > API**
   - No menu lateral, clique em **Settings** (ícone de engrenagem)
   - Clique em **API**

4. **Copie as chaves:**

   **Project URL:**
   ```
   https://uesqdbaxhnblefrtjtae.supabase.co
   ```

   **anon public (Project API keys > anon > public):**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
   ```
   ⚠️ Começa com `eyJ` e é BEM LONGA

   **service_role secret (Project API keys > service_role > secret):**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
   ```
   ⚠️ Também começa com `eyJ` e é BEM LONGA

5. **Cole as chaves no .env.local**

   Substitua no arquivo `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://uesqdbaxhnblefrtjtae.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_aqui_a_anon_key_completa
   SUPABASE_URL=https://uesqdbaxhnblefrtjtae.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=cole_aqui_a_service_role_key_completa
   ```

## ⚠️ IMPORTANTE:

- As chaves são MUITO LONGAS (mais de 200 caracteres)
- Copie TODA a chave, sem espaços no início ou fim
- A `anon key` é pública (pode expor no frontend)
- A `service_role key` é SECRETA (nunca exponha no frontend)

## Depois de colar as chaves:

1. Salve o arquivo `.env.local`
2. Reinicie o servidor: `npm run dev`
3. Teste o login em: http://localhost:3001/admin/login
