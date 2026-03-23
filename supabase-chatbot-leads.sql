-- ====================================
-- 4Core Chatbot - Tabela de Leads
-- ====================================
-- Execute este script no SQL Editor do Supabase

-- Criar tabela chatbot_leads
CREATE TABLE IF NOT EXISTS chatbot_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Dados pessoais
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  
  -- Qualificação
  company_size TEXT,
  work_model TEXT,
  current_system TEXT,
  main_problem TEXT,
  urgency TEXT,
  budget TEXT,
  decision_maker TEXT,
  
  -- Interesse
  interested_solutions TEXT[],
  conversation_summary TEXT,
  qualification_score INTEGER CHECK (qualification_score >= 0 AND qualification_score <= 100),
  
  -- Metadados
  source TEXT DEFAULT 'chatbot',
  conversation_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'closed', 'lost'))
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_email ON chatbot_leads(email);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_phone ON chatbot_leads(phone);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_status ON chatbot_leads(status);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_score ON chatbot_leads(qualification_score DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_created ON chatbot_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_conversation ON chatbot_leads(conversation_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_chatbot_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_chatbot_leads_updated_at
  BEFORE UPDATE ON chatbot_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_chatbot_leads_updated_at();

-- Habilitar RLS
ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;

-- Policy: permitir inserção via service_role (API)
CREATE POLICY "Allow service_role insert chatbot_leads"
  ON chatbot_leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: permitir leitura para authenticated users (admin)
CREATE POLICY "Allow authenticated read chatbot_leads"
  ON chatbot_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: permitir update para authenticated users (admin)
CREATE POLICY "Allow authenticated update chatbot_leads"
  ON chatbot_leads
  FOR UPDATE
  TO authenticated
  USING (true);

-- Comentários
COMMENT ON TABLE chatbot_leads IS 'Leads capturados pelo chatbot SDR';
COMMENT ON COLUMN chatbot_leads.qualification_score IS 'Score de qualificação de 0 a 100';
COMMENT ON COLUMN chatbot_leads.interested_solutions IS 'Array de IDs das soluções de interesse';
COMMENT ON COLUMN chatbot_leads.conversation_summary IS 'Resumo completo da conversa';
COMMENT ON COLUMN chatbot_leads.status IS 'Status do lead: new, contacted, qualified, proposal_sent, closed, lost';

-- ====================================
-- Views para Dashboard de Leads
-- ====================================

-- View: Leads por status
CREATE OR REPLACE VIEW chatbot_leads_by_status AS
SELECT 
  status,
  COUNT(*) as total,
  AVG(qualification_score) as avg_score,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7_days,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30_days
FROM chatbot_leads
GROUP BY status
ORDER BY 
  CASE status
    WHEN 'new' THEN 1
    WHEN 'contacted' THEN 2
    WHEN 'qualified' THEN 3
    WHEN 'proposal_sent' THEN 4
    WHEN 'closed' THEN 5
    WHEN 'lost' THEN 6
  END;

-- View: Leads quentes (score > 70)
CREATE OR REPLACE VIEW chatbot_hot_leads AS
SELECT 
  id,
  name,
  email,
  phone,
  company,
  qualification_score,
  interested_solutions,
  urgency,
  status,
  created_at
FROM chatbot_leads
WHERE qualification_score > 70
  AND status IN ('new', 'contacted')
ORDER BY qualification_score DESC, created_at DESC;

-- View: Soluções mais procuradas
CREATE OR REPLACE VIEW chatbot_popular_solutions AS
SELECT 
  unnest(interested_solutions) as solution_id,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'closed') as closed_leads,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'closed') * 100.0 / COUNT(*),
    2
  ) as conversion_rate
FROM chatbot_leads
WHERE interested_solutions IS NOT NULL
GROUP BY solution_id
ORDER BY total_leads DESC;

-- View: Performance diária do chatbot
CREATE OR REPLACE VIEW chatbot_daily_performance AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE email IS NOT NULL OR phone IS NOT NULL) as captured_contacts,
  AVG(qualification_score) as avg_score,
  COUNT(*) FILTER (WHERE qualification_score > 70) as hot_leads,
  COUNT(*) FILTER (WHERE status = 'closed') as closed_leads
FROM chatbot_leads
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Grant access to views
GRANT SELECT ON chatbot_leads_by_status TO authenticated;
GRANT SELECT ON chatbot_hot_leads TO authenticated;
GRANT SELECT ON chatbot_popular_solutions TO authenticated;
GRANT SELECT ON chatbot_daily_performance TO authenticated;

-- ====================================
-- Função para buscar leads similares
-- ====================================
CREATE OR REPLACE FUNCTION find_similar_leads(
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    l.id,
    l.name,
    l.email,
    l.phone,
    l.company,
    l.status,
    l.created_at
  FROM chatbot_leads l
  WHERE 
    (p_email IS NOT NULL AND l.email = p_email)
    OR (p_phone IS NOT NULL AND l.phone = p_phone)
  ORDER BY l.created_at DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION find_similar_leads IS 'Busca leads duplicados por email ou telefone';

-- ====================================
-- Dados de exemplo (opcional)
-- ====================================
-- Descomente para inserir dados de teste

/*
INSERT INTO chatbot_leads (
  name, email, phone, company,
  company_size, work_model, main_problem, urgency,
  interested_solutions, qualification_score,
  conversation_id, status, conversation_summary
) VALUES 
(
  'João Silva',
  'joao@empresa.com',
  '11987654321',
  'Empresa Teste Ltda',
  '51-100',
  'Híbrido',
  'Fraudes no ponto',
  'Imediato (até 1 mês)',
  ARRAY['rep-p-facial', 'ponto-web'],
  85,
  'chat_test_001',
  'new',
  'Cliente demonstrou alto interesse em solução de ponto facial. Urgência alta devido a auditoria próxima.'
),
(
  'Maria Santos',
  'maria@startup.com',
  '11976543210',
  'Startup Tech',
  '21-50',
  '100% remoto',
  'Controlar equipes externas',
  'Curto prazo (1-3 meses)',
  ARRAY['app-mobile', 'ponto-web'],
  72,
  'chat_test_002',
  'contacted',
  'Equipe 100% remota. Precisa de app com geolocalização. Budget aprovado.'
);
*/
