import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase Client - Browser
 * 
 * Cliente para uso no frontend (componentes React)
 * Gerencia autenticação e sessão do usuário
 */

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
