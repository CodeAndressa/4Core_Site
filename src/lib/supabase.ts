import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Client Configuration
 * 
 * Dois clients:
 * 1. supabaseClient (anon key) — uso geral, RLS habilitado
 * 2. supabaseAdmin (service role) — operações privilegiadas, bypass RLS
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client público (frontend-safe)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Client admin (backend-only, bypass RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
