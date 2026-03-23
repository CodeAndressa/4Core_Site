# 🔧 FIX: Erro RLS na Tabela Events

## ❌ Erro:
```
new row violates row-level security policy for table "events"
code: '42501'
```

## 🔍 Causa:
As políticas RLS (Row Level Security) da tabela `events` não estão permitindo inserção via `service_role`.

---

## ✅ SOLUÇÃO:

### 1️⃣ Executar SQL de Correção

Acesse o Supabase SQL Editor:
```
https://supabase.com/dashboard/project/uesqdbaxhnblefrtjtae/sql/new
```

Cole e execute o conteúdo do arquivo: **`supabase-fix-events-rls.sql`**

Ou cole diretamente:

```sql
-- Remover políticas antigas
DROP POLICY IF EXISTS "Allow public insert events" ON events;
DROP POLICY IF EXISTS "Allow authenticated read events" ON events;
DROP POLICY IF EXISTS "Allow service_role insert events" ON events;

-- Criar política correta para inserção
CREATE POLICY "Enable insert for anon and service_role"
  ON events
  FOR INSERT
  TO anon, service_role
  WITH CHECK (true);

-- Criar política para leitura
CREATE POLICY "Enable read for authenticated users"
  ON events
  FOR SELECT
  TO authenticated, service_role
  USING (true);

-- Garantir que RLS está habilitado
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

---

### 2️⃣ Verificar Variáveis de Ambiente na Vercel

Certifique-se de que estas variáveis estão configuradas:

```
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
SUPABASE_URL=https://uesqdbaxhnblefrtjtae.supabase.co
```

⚠️ **IMPORTANTE:** A `SUPABASE_SERVICE_ROLE_KEY` deve ser a chave **service_role** (não a anon key).

**Como verificar:**
1. Acesse: https://vercel.com/seu-usuario/4core/settings/environment-variables
2. Procure por `SUPABASE_SERVICE_ROLE_KEY`
3. Verifique se está preenchida corretamente
4. Se necessário, atualize e faça redeploy

---

### 3️⃣ Testar Localmente

Após executar o SQL, teste localmente:

```bash
npm run dev
```

Navegue pelo site e verifique se os eventos estão sendo salvos:

```sql
-- No Supabase SQL Editor
SELECT * FROM events 
ORDER BY created_at DESC 
LIMIT 10;
```

---

### 4️⃣ Redeploy na Vercel

Após confirmar que funciona localmente:

1. Vá em: https://vercel.com/seu-usuario/4core/deployments
2. Clique nos **3 pontinhos** do último deployment
3. Clique em **Redeploy**
4. Aguarde o deploy terminar
5. Teste o site em produção

---

## 🔍 Verificação das Políticas

Para verificar se as políticas estão corretas, execute no SQL Editor:

```sql
-- Ver políticas da tabela events
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'events';
```

**Resultado esperado:**
- 1 política para INSERT (anon, service_role)
- 1 política para SELECT (authenticated, service_role)

---

## 🧪 Testar Inserção Manual

Para testar se a política está funcionando:

```sql
-- Testar inserção
INSERT INTO events (type, page, device, session_id)
VALUES ('page_view', '/test-rls', 'desktop', 'test-' || NOW()::text);

-- Verificar
SELECT * FROM events WHERE page = '/test-rls';

-- Limpar teste
DELETE FROM events WHERE page = '/test-rls';
```

Se a inserção funcionar, a política está correta! ✅

---

## 🚨 Troubleshooting

### Erro persiste após executar SQL
✅ Verifique se executou o SQL no projeto correto do Supabase
✅ Verifique se a `SUPABASE_SERVICE_ROLE_KEY` está correta na Vercel
✅ Faça redeploy na Vercel após atualizar variáveis

### Erro: "permission denied for table events"
✅ Execute: `GRANT ALL ON events TO service_role;`

### Erro: "relation 'events' does not exist"
✅ Execute o SQL completo: `supabase-events-analytics.sql`

---

## 📋 Checklist de Correção

- [ ] Executar `supabase-fix-events-rls.sql` no Supabase
- [ ] Verificar políticas com query de verificação
- [ ] Testar inserção manual no SQL Editor
- [ ] Verificar `SUPABASE_SERVICE_ROLE_KEY` na Vercel
- [ ] Testar localmente (npm run dev)
- [ ] Redeploy na Vercel
- [ ] Testar em produção

---

**Após seguir estes passos, o erro RLS será resolvido! 🎉**
