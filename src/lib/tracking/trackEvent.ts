import type { TrackEventInput, DeviceType } from '@/types/analytics'

/**
 * Track Event - Client-side
 * 
 * Função global para rastrear eventos do usuário
 * Envia para API que salva no Supabase
 */

// Gerar session_id único (sem cookies)
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('4core_session_id')
  
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('4core_session_id', sessionId)
  }
  
  return sessionId
}

// Detectar tipo de device
function getDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  
  const ua = navigator.userAgent
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  
  return 'desktop'
}

// Função principal de tracking
export async function trackEvent(input: TrackEventInput): Promise<void> {
  try {
    const sessionId = getSessionId()
    const device = input.device || getDeviceType()
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    const referrer = typeof document !== 'undefined' ? document.referrer : undefined

    const payload = {
      ...input,
      device,
      user_agent: userAgent,
      referrer: referrer || input.referrer,
      session_id: sessionId,
    }

    // Enviar para API (não aguardar resposta para não bloquear UI)
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true, // Garante envio mesmo se página fechar
    }).catch(() => {
      // Silenciosamente falhar - analytics não deve quebrar a aplicação
    })
  } catch (error) {
    // Silenciosamente falhar
  }
}

// Helper: Track page view
export function trackPageView(page: string, source?: string) {
  trackEvent({
    type: 'page_view',
    page,
    source,
  })
}

// Helper: Track WhatsApp click
export function trackWhatsAppClick(page: string) {
  trackEvent({
    type: 'whatsapp_click',
    page,
  })
}

// Helper: Track form submit
export function trackFormSubmit(page: string, source?: string) {
  trackEvent({
    type: 'form_submit',
    page,
    source,
  })
}

// Helper: Track form view
export function trackFormView(page: string, source?: string) {
  trackEvent({
    type: 'form_view',
    page,
    source,
  })
}

// Helper: Track CTA click
export function trackCTAClick(page: string, source?: string) {
  trackEvent({
    type: 'cta_click',
    page,
    source,
  })
}

// Helpers: Diagnóstico
export function trackDiagnosticoStart(page: string) {
  trackEvent({
    type: 'diagnostico_start',
    page,
    source: 'diagnostico',
  })
}

export function trackDiagnosticoAnswer(page: string, source: string) {
  trackEvent({
    type: 'diagnostic_answer',
    page,
    source,
  })
}

export function trackDiagnosticoComplete(page: string) {
  trackEvent({
    type: 'diagnostico_complete',
    page,
    source: 'diagnostico',
  })
}
