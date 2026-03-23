import { z } from 'zod'
import { TRACKABLE_EVENT_TYPES } from '@/types/analytics'
import { LEAD_SOURCE_CHANNELS } from '@/types/lead'

const phonePattern = /^\d{2}9\d{8}$/

function normalizeOptionalString(value: unknown) {
  if (typeof value !== 'string') return value
  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

function normalizeEventType(value: unknown) {
  if (typeof value !== 'string') return value

  const aliases: Record<string, typeof TRACKABLE_EVENT_TYPES[number]> = {
    diagnostic_completed: 'diagnostico_complete',
    diagnostico_complete: 'diagnostico_complete',
    diagnostico_start: 'diagnostico_start',
    diagnostic_answer: 'diagnostic_answer',
    lead_captured: 'lead_captured',
  }

  return aliases[value] || value
}

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Nome deve ter pelo menos 2 caracteres.')
  .max(100, 'Nome deve ter no máximo 100 caracteres.')

const emailSchema = z
  .string()
  .trim()
  .email('Informe um e-mail válido.')

const phoneSchema = z
  .string()
  .trim()
  .refine((value) => phonePattern.test(value.replace(/\D/g, '')), {
    message: 'Informe um telefone válido com DDD e 9 dígitos (ex: 11987654321).',
  })

const optionalEmailSchema = z.preprocess(normalizeOptionalString, emailSchema.optional())
const optionalPhoneSchema = z.preprocess(normalizeOptionalString, phoneSchema.optional())

const optionalCompanySchema = z.preprocess(
  normalizeOptionalString,
  z.string().max(100, 'Nome da empresa deve ter no máximo 100 caracteres.').optional()
)

const optionalEmployeesSchema = z.preprocess(
  normalizeOptionalString,
  z.string().max(50, 'Faixa de funcionários inválida.').optional()
)

const optionalMessageSchema = z.preprocess(
  normalizeOptionalString,
  z.string().max(1000, 'Mensagem deve ter no máximo 1000 caracteres.').optional()
)

const optionalInterestSchema = z.preprocess(
  normalizeOptionalString,
  z.string().max(200, 'Interesse deve ter no máximo 200 caracteres.').optional()
)

const optionalSourceSchema = z.preprocess(
  normalizeOptionalString,
  z.string().max(120, 'Origem deve ter no máximo 120 caracteres.').optional()
)

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().max(100, 'Nome da empresa deve ter no máximo 100 caracteres.').optional().or(z.literal('')),
  employees: z.string().max(50, 'Faixa de funcionários inválida.').optional().or(z.literal('')),
  message: z.string().max(1000, 'Mensagem deve ter no máximo 1000 caracteres.').optional().or(z.literal('')),
})

export const leadCaptureSchema = z
  .object({
    name: nameSchema,
    email: optionalEmailSchema,
    phone: optionalPhoneSchema,
    company: optionalCompanySchema,
    employees: optionalEmployeesSchema,
    message: optionalMessageSchema,
    source_page: z
      .string()
      .trim()
      .min(1, 'Página de origem é obrigatória.')
      .max(200, 'Página de origem inválida.'),
    source_channel: z.enum(LEAD_SOURCE_CHANNELS).default('form'),
    utm_source: optionalSourceSchema,
    utm_medium: optionalSourceSchema,
    utm_campaign: optionalSourceSchema,
    interest: optionalInterestSchema,
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: 'custom',
        message: 'Informe pelo menos um e-mail ou WhatsApp.',
        path: ['email'],
      })
      ctx.addIssue({
        code: 'custom',
        message: 'Informe pelo menos um e-mail ou WhatsApp.',
        path: ['phone'],
      })
    }
  })

export const trackEventSchema = z.object({
  type: z.preprocess(
    normalizeEventType,
    z.enum(TRACKABLE_EVENT_TYPES, 'Tipo de evento inválido')
  ),
  page: z
    .string()
    .trim()
    .min(1, 'Página é obrigatória.')
    .max(200, 'Página inválida.')
    .refine((value) => value.startsWith('/'), {
      message: 'Página inválida.',
    }),
  source: optionalSourceSchema,
  referrer: z.preprocess(
    normalizeOptionalString,
    z.string().max(500, 'Referrer inválido.').optional()
  ),
  device: z.enum(['mobile', 'desktop', 'tablet']).optional(),
  session_id: z.preprocess(
    normalizeOptionalString,
    z.string().max(120, 'Sessão inválida.').optional()
  ),
  user_agent: z.preprocess(
    normalizeOptionalString,
    z.string().max(500, 'User agent inválido.').optional()
  ),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
export type LeadCaptureValues = z.infer<typeof leadCaptureSchema>
export type TrackEventValues = z.infer<typeof trackEventSchema>
