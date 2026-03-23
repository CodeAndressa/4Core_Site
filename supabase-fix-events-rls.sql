-- ====================================
-- FIX: Políticas RLS para tabela events
-- ====================================
-- Execute este script no SQL Editor do Supabase

-- Remover políticas antigas que podem estar causando conflito
DROP POLICY IF EXISTS "Allow public insert events" ON events;
DROP POLICY IF EXISTS "Allow authenticated read events" ON events;
DROP POLICY IF EXISTS "Allow service_role insert events" ON events;

-- Criar política correta para inserção pública (tracking via API)
CREATE POLICY "Enable insert for anon and service_role"
  ON events
  FOR INSERT
  TO anon, service_role
  WITH CHECK (true);

-- Criar política para leitura autenticada (dashboard admin)
CREATE POLICY "Enable read for authenticated users"
  ON events
  FOR SELECT
  TO authenticated, service_role
  USING (true);

-- Verificar se RLS está habilitado
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Testar inserção (deve funcionar)
-- Descomente para testar:
/*
INSERT INTO events (type, page, device, session_id)
VALUES ('page_view', '/test', 'desktop', 'test-' || NOW()::text);

SELECT * FROM events ORDER BY created_at DESC LIMIT 1;
*/
