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
    'form_view',
    'cta_click'
  )),
  
  -- Contexto do evento
  page TEXT NOT NULL,
  source TEXT,
  referrer TEXT,
  
  -- Device info
  device TEXT CHECK (device IN ('mobile', 'desktop', 'tablet')),
  user_agent TEXT,
  
  -- Session tracking (sem cookies)
  session_id TEXT,
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_page ON events(page);
CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_type_date ON events(type, created_at DESC);

-- Habilitar RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: permitir inserção pública (tracking)
CREATE POLICY "Allow public insert events"
  ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: permitir leitura apenas para authenticated users (admin)
CREATE POLICY "Allow authenticated read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Comentários
COMMENT ON TABLE events IS 'Eventos de analytics capturados do site';
COMMENT ON COLUMN events.type IS 'Tipo: page_view, whatsapp_click, form_submit, form_view, cta_click';
COMMENT ON COLUMN events.session_id IS 'ID de sessão gerado no client (sem cookies)';

-- ====================================
-- Views para Analytics
-- ====================================

-- View: Métricas diárias
CREATE OR REPLACE VIEW daily_metrics AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) FILTER (WHERE type = 'page_view') as pageviews,
  COUNT(DISTINCT session_id) FILTER (WHERE type = 'page_view') as unique_visitors,
  COUNT(*) FILTER (WHERE type = 'whatsapp_click') as whatsapp_clicks,
  COUNT(*) FILTER (WHERE type = 'form_submit') as form_submits,
  COUNT(*) FILTER (WHERE type = 'form_view') as form_views
FROM events
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- View: Top páginas
CREATE OR REPLACE VIEW top_pages AS
SELECT 
  page,
  COUNT(*) as views,
  COUNT(DISTINCT session_id) as unique_views,
  COUNT(*) FILTER (WHERE type = 'whatsapp_click') as conversions
FROM events
WHERE type = 'page_view'
GROUP BY page
ORDER BY views DESC;

-- View: Dispositivos
CREATE OR REPLACE VIEW device_stats AS
SELECT 
  device,
  COUNT(*) as total,
  COUNT(DISTINCT session_id) as unique_users,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM events
WHERE device IS NOT NULL
GROUP BY device
ORDER BY total DESC;

-- View: Taxa de conversão por página
CREATE OR REPLACE VIEW conversion_by_page AS
SELECT 
  page,
  COUNT(*) FILTER (WHERE type = 'page_view') as views,
  COUNT(*) FILTER (WHERE type IN ('whatsapp_click', 'form_submit')) as conversions,
  CASE 
    WHEN COUNT(*) FILTER (WHERE type = 'page_view') > 0 
    THEN ROUND(
      COUNT(*) FILTER (WHERE type IN ('whatsapp_click', 'form_submit')) * 100.0 / 
      COUNT(*) FILTER (WHERE type = 'page_view'), 
      2
    )
    ELSE 0 
  END as conversion_rate
FROM events
GROUP BY page
ORDER BY conversions DESC;

-- Grant access to views
GRANT SELECT ON daily_metrics TO authenticated;
GRANT SELECT ON top_pages TO authenticated;
GRANT SELECT ON device_stats TO authenticated;
GRANT SELECT ON conversion_by_page TO authenticated;

-- ====================================
-- Função para limpar eventos antigos (opcional)
-- ====================================
CREATE OR REPLACE FUNCTION cleanup_old_events()
RETURNS void AS $$
BEGIN
  DELETE FROM events 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION cleanup_old_events IS 'Remove eventos com mais de 90 dias (executar manualmente ou via cron)';
