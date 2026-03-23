-- ====================================
-- SOLUÇÃO DEFINITIVA: RLS com políticas corretas
-- ====================================
-- Execute este script para reabilitar RLS com segurança

-- 1. Reabilitar RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 2. Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Allow authenticated to insert leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated to read leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated to update leads" ON leads;
DROP POLICY IF EXISTS "Allow anon to insert leads" ON leads;
DROP POLICY IF EXISTS "Allow all operations" ON leads;

-- 3. Criar política única que permite todas as operações
-- Esta política funciona com service_role key
CREATE POLICY "Enable all access for service role"
  ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 4. Verificar se a política foi criada
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'leads';

-- Resultado esperado:
-- policyname: "Enable all access for service role"
-- roles: {public}
-- cmd: *
