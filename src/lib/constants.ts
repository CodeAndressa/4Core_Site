/**
 * Constantes globais do projeto.
 * Valores com prefixo NEXT_PUBLIC_ são acessíveis no client.
 */

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'

export const WHATSAPP_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
  'Olá! Gostaria de falar com um especialista da 4Core.'

export function getWhatsAppUrl(customMessage?: string): string {
  const msg = customMessage || WHATSAPP_MESSAGE
  const encodedMessage = encodeURIComponent(msg)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://4core.com.br'

export const EMPLOYEE_RANGES = [
  { value: '1-50', label: '1 a 50 funcionários' },
  { value: '51-200', label: '51 a 200 funcionários' },
  { value: '201-500', label: '201 a 500 funcionários' },
  { value: '500+', label: 'Mais de 500 funcionários' },
] as const

export const ROUTES = {
  home: '/',
  solutions: '/solucoes',
  solution: (category: string, slug: string) => `/solucoes/${category}/${slug}`,
  about: '/sobre',
  contact: '/contato',
} as const
