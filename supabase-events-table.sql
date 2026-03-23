-- ====================================
-- 4Core Analytics - Tabela de Eventos
-- ====================================
-- Execute este script no SQL Editor do Supabase

-- Criar tabela events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Tipo de evento
  type TEXT NOT NULL CHECK (type IN (
    'page_view',
    'whatsapp_click',
    'form_submit',
    'phone_click',
    'email_click',
    'product_view',
    'solution_view'
  )),
  
  -- Contexto do evento
  page TEXT NOT NULL,
  source TEXT,
  referrer TEXT,
  
  -- Device info (não identificável)
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  browser TEXT,
  os TEXT,
  
  -- Metadata adicional (JSON)
  metadata JSONB,
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_page ON events(page);
CREATE INDEX IF NOT EXISTS idx_events_device_type ON events(device_type);
CREATE INDEX IF NOT EXISTS idx_events_type_created ON events(type, created_at DESC);

-- Desabilitar RLS (dados agregados, sem info pessoal)
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Comentários
COMMENT ON TABLE events IS 'Eventos de analytics do site 4Core (dados agregados, sem PII)';
COMMENT ON COLUMN events.type IS 'Tipo de evento rastreado';
COMMENT ON COLUMN events.page IS 'Página onde o evento ocorreu';
COMMENT ON COLUMN events.device_type IS 'Tipo de dispositivo (mobile/tablet/desktop)';
COMMENT ON COLUMN events.metadata IS 'Dados adicionais em formato JSON';

-- ====================================
-- Views para Analytics
-- ====================================

-- View: Eventos por dia
CREATE OR REPLACE VIEW events_by_day AS
SELECT 
  DATE(created_at) as date,
  type,
  COUNT(*) as count
FROM events
GROUP BY DATE(created_at), type
ORDER BY date DESC;

-- View: Eventos por página
CREATE OR REPLACE VIEW events_by_page AS
SELECT 
  page,
  type,
  COUNT(*) as count
FROM events
GROUP BY page, type
ORDER BY count DESC;

-- View: Eventos por device
CREATE OR REPLACE VIEW events_by_device AS
SELECT 
  device_type,
  COUNT(*) as count
FROM events
WHERE device_type IS NOT NULL
GROUP BY device_type;

-- View: Conversões (últimos 30 dias)
CREATE OR REPLACE VIEW conversions_summary AS
SELECT 
  COUNT(*) FILTER (WHERE type = 'page_view') as page_views,
  COUNT(*) FILTER (WHERE type = 'whatsapp_click') as whatsapp_clicks,
  COUNT(*) FILTER (WHERE type = 'form_submit') as form_submits,
  COUNT(DISTINCT DATE(created_at)) as days_tracked
FROM events
WHERE created_at >= NOW() - INTERVAL '30 days';

-- ====================================
-- Função para limpar eventos antigos (opcional)
-- ====================================
CREATE OR REPLACE FUNCTION cleanup_old_events()
RETURNS void AS $$
BEGIN
  DELETE FROM events 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Agendar limpeza (executar manualmente quando necessário)
-- SELECT cleanup_old_events();
