-- ====================================
-- SOLUÇÃO ALTERNATIVA: Desabilitar RLS completamente
-- ====================================
-- Use este script se o anterior não funcionou

-- Opção 1: Desabilitar RLS completamente (mais simples para testar)
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Verificar se RLS está desabilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'leads';
-- Se rowsecurity = false, está desabilitado

-- ====================================
-- Se quiser reabilitar depois com políticas corretas:
-- ====================================

-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- -- Política que permite TUDO (sem restrições)
-- CREATE POLICY "Allow all operations"
--   ON leads
--   FOR ALL
--   USING (true)
--   WITH CHECK (true);
