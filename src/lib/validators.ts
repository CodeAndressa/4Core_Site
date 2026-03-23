import { z } from 'zod'

/**
 * Schema de validação do formulário de contato.
 * Usado tanto no client (validação instantânea) quanto no server (API Route).
 * Compartilhar o schema garante que as regras sejam idênticas em ambos os lados.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres.')
    .max(100, 'Nome deve ter no máximo 100 caracteres.'),

  email: z
    .string()
    .email('Informe um e-mail válido.'),

  phone: z
    .string()
    .min(1, 'Telefone é obrigatório.')
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, '')
        return digits.length === 11 && /^\d{2}9\d{8}$/.test(digits)
      },
      'Informe um telefone válido com DDD e 9 dígitos (ex: 11987654321).'
    ),

  company: z
    .string()
    .max(100, 'Nome da empresa deve ter no máximo 100 caracteres.')
    .optional()
    .or(z.literal('')),

  employees: z
    .string()
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres.')
    .optional()
    .or(z.literal('')),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
