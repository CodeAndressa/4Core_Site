'use client'

import { useState, useCallback } from 'react'
import { contactFormSchema } from '@/lib/validators'
import type { ContactFormValues } from '@/lib/validators'
import type { ContactApiResponse } from '@/types/contact'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface UseContactFormReturn {
  status: FormStatus
  serverMessage: string
  fieldErrors: Partial<Record<keyof ContactFormValues, string>>
  handleSubmit: (formData: ContactFormValues) => Promise<void>
  reset: () => void
}

/**
 * Hook customizado para lógica do formulário de contato.
 * Separa completamente a lógica de estado/submit da UI do formulário.
 *
 * Responsabilidades:
 * - Validação client-side via Zod
 * - Envio para a API Route
 * - Gerenciamento de estados (idle, submitting, success, error)
 * - Tratamento de erros (field-level e server-level)
 */
export function useContactForm(): UseContactFormReturn {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({})

  const reset = useCallback(() => {
    setStatus('idle')
    setServerMessage('')
    setFieldErrors({})
  }, [])

  const handleSubmit = useCallback(async (formData: ContactFormValues) => {
    // Limpar erros anteriores
    setFieldErrors({})
    setServerMessage('')

    // Validação client-side
    const validation = contactFormSchema.safeParse(formData)

    if (!validation.success) {
      const errors: Partial<Record<keyof ContactFormValues, string>> = {}
      const flatErrors = validation.error.flatten().fieldErrors

      for (const [key, messages] of Object.entries(flatErrors)) {
        if (messages && messages.length > 0) {
          errors[key as keyof ContactFormValues] = messages[0]
        }
      }

      setFieldErrors(errors)
      setStatus('error')
      setServerMessage('Corrija os campos destacados e tente novamente.')
      return
    }

    // Envio para a API
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      })

      const result: ContactApiResponse = await response.json()

      if (result.success) {
        setStatus('success')
        setServerMessage(result.message)
      } else {
        setStatus('error')
        setServerMessage(result.message)

        // Se a API retornou erros de campo, exibir
        if (result.errors) {
          const apiErrors: Partial<Record<keyof ContactFormValues, string>> = {}
          for (const [key, messages] of Object.entries(result.errors)) {
            if (messages && messages.length > 0) {
              apiErrors[key as keyof ContactFormValues] = messages[0]
            }
          }
          setFieldErrors(apiErrors)
        }
      }
    } catch {
      setStatus('error')
      setServerMessage(
        'Erro de conexão. Verifique sua internet e tente novamente.'
      )
    }
  }, [])

  return {
    status,
    serverMessage,
    fieldErrors,
    handleSubmit,
    reset,
  }
}
