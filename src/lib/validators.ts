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
    .min(14, 'Informe um telefone válido com DDD.')
    .max(15, 'Telefone inválido.')
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Formato esperado: (11) 99999-9999'
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
