-- ====================================
-- 4Core CRM - Tabela de Leads
-- ====================================
-- Execute este script no SQL Editor do Supabase
-- Dashboard > SQL Editor > New Query

-- Criar tabela leads
CREATE TABLE IF NOT EXISTS leads (
  -- Identificação
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Dados do lead (do formulário)
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  employees TEXT,
  message TEXT,
  
  -- Metadados de origem
  source_page TEXT NOT NULL,
  source_channel TEXT DEFAULT 'form' CHECK (source_channel IN ('form', 'whatsapp', 'phone', 'email')),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Gestão do lead (CRM)
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contatado', 'qualificado', 'convertido', 'perdido')),
  interest TEXT,
  assigned_to TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_contact_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  
  -- Constraint para evitar duplicatas no mesmo dia
  CONSTRAINT leads_email_created_unique UNIQUE (email, created_at)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source_page ON leads(source_page);

-- Habilitar Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: permitir inserção via service role (backend)
CREATE POLICY "Allow service role to insert leads"
  ON leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: permitir leitura via service role (backend)
CREATE POLICY "Allow service role to read leads"
  ON leads
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: permitir atualização via service role (backend)
CREATE POLICY "Allow service role to update leads"
  ON leads
  FOR UPDATE
  TO service_role
  USING (true);

-- Comentários na tabela
COMMENT ON TABLE leads IS 'Tabela de leads capturados do site 4Core';
COMMENT ON COLUMN leads.source_page IS 'Página de origem: home, contato, solucoes, etc.';
COMMENT ON COLUMN leads.source_channel IS 'Canal de origem: form, whatsapp, phone, email';
COMMENT ON COLUMN leads.status IS 'Status do lead no funil: novo, contatado, qualificado, convertido, perdido';

-- ====================================
-- Trigger para atualizar last_contact_at automaticamente
-- ====================================
CREATE OR REPLACE FUNCTION update_last_contact_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status AND NEW.status IN ('contatado', 'qualificado') THEN
    NEW.last_contact_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_last_contact_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_last_contact_at();

-- ====================================
-- View para dashboard (opcional)
-- ====================================
CREATE OR REPLACE VIEW leads_summary AS
SELECT 
  status,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7_days,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30_days
FROM leads
GROUP BY status;

COMMENT ON VIEW leads_summary IS 'Resumo de leads por status para dashboard';
