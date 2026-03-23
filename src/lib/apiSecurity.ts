import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type RateLimitOptions = {
  limit: number
  windowMs: number
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

const globalStore = globalThis as typeof globalThis & {
  __4coreRateLimitStore?: Map<string, RateLimitEntry>
}

const rateLimitStore = globalStore.__4coreRateLimitStore ?? new Map<string, RateLimitEntry>()
globalStore.__4coreRateLimitStore = rateLimitStore

function getTrustedHosts(request: Request) {
  const hosts = new Set<string>()
  const requestHost = new URL(request.url).host
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  hosts.add(requestHost)
  hosts.add('localhost:3000')
  hosts.add('127.0.0.1:3000')

  if (siteUrl) {
    try {
      hosts.add(new URL(siteUrl).host)
    } catch {
      // Ignora valores inválidos de configuração.
    }
  }

  return hosts
}

function extractOriginHost(request: Request) {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  for (const value of [origin, referer]) {
    if (!value) continue

    try {
      return new URL(value).host
    } catch {
      return null
    }
  }

  return null
}

function getRateLimitKey(request: Request, scope: string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')
  const userAgent = request.headers.get('user-agent') || 'unknown-agent'
  const identity = forwardedFor || realIp || userAgent

  return `${scope}:${identity}`
}

export function validateTrustedOrigin(request: Request) {
  const originHost = extractOriginHost(request)

  if (!originHost) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { success: false, error: 'Origem da requisição não permitida' },
        { status: 403 }
      ),
    }
  }

  if (!getTrustedHosts(request).has(originHost)) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { success: false, error: 'Origem da requisição não permitida' },
        { status: 403 }
      ),
    }
  }

  return { ok: true as const }
}

export function enforceRateLimit(
  request: Request,
  scope: string,
  { limit, windowMs }: RateLimitOptions
) {
  const now = Date.now()
  const key = getRateLimitKey(request, scope)
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true as const }
  }

  if (current.count >= limit) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { success: false, error: 'Muitas requisições. Tente novamente em instantes.' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((current.resetAt - now) / 1000).toString(),
          },
        }
      ),
    }
  }

  current.count += 1
  rateLimitStore.set(key, current)

  return { ok: true as const }
}

export async function requireAuthenticatedUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { success: false, error: 'Não autorizado' },
        { status: 401 }
      ),
    }
  }

  return {
    ok: true as const,
    user,
  }
}
