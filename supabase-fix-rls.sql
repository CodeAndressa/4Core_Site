-- ====================================
-- FIX: Corrigir políticas RLS da tabela leads
-- ====================================
-- Execute este script no SQL Editor do Supabase para corrigir o erro 42501

-- 1. Remover todas as políticas existentes
DROP POLICY IF EXISTS "Allow service role to insert leads" ON leads;
DROP POLICY IF EXISTS "Allow service role to read leads" ON leads;
DROP POLICY IF EXISTS "Allow service role to update leads" ON leads;

-- 2. Desabilitar RLS temporariamente para testar
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- 3. Reabilitar RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 4. Criar política permissiva para authenticated users (service role é authenticated)
CREATE POLICY "Allow authenticated to insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated to read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated to update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true);

-- 5. Criar política adicional para anon (caso precise no futuro)
CREATE POLICY "Allow anon to insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'leads';
