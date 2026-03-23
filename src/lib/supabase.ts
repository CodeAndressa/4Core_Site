import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Client Configuration
 * 
 * Usa apenas variáveis server-side (sem NEXT_PUBLIC_) para evitar alertas do Vercel.
 * Como estamos usando apenas no backend (API routes), não precisamos expor no frontend.
 * 
 * Se as variáveis não estiverem configuradas, retorna null (graceful degradation)
 */

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Debug logs
if (typeof window === 'undefined') {
  console.log('[supabase] SUPABASE_URL:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'AUSENTE')
  console.log('[supabase] SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? `${supabaseServiceKey.substring(0, 20)}...` : 'AUSENTE')
}

// Client admin (backend-only, bypass RLS)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

// Client público removido - não precisamos no frontend
export const supabaseClient = null
