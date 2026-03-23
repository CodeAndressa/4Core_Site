'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { contactFormSchema } from '@/lib/validators'
import type { ContactFormValues } from '@/lib/validators'
import type { ContactApiResponse } from '@/types/contact'
import { trackFormSubmit, trackFormView } from '@/lib/tracking/trackEvent'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface UseContactFormReturn {
  status: FormStatus
  serverMessage: string
  fieldErrors: Partial<Record<keyof ContactFormValues, string>>
  handleSubmit: (formData: ContactFormValues) => Promise<void>
  reset: () => void
}

export function useContactForm(): UseContactFormReturn {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      trackFormView(pathname, 'contact_form')
    }
  }, [pathname])

  const reset = () => {
    setStatus('idle')
    setServerMessage('')
    setFieldErrors({})
  }

  const handleSubmit = async (formData: ContactFormValues) => {
    setFieldErrors({})
    setServerMessage('')

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

        if (pathname) {
          await trackFormSubmit(pathname, 'contact_form')
        }
      } else {
        setStatus('error')
        setServerMessage(result.message)

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
      setServerMessage('Erro de conexão. Verifique sua internet e tente novamente.')
    }
  }

  return {
    status,
    serverMessage,
    fieldErrors,
    handleSubmit,
    reset,
  }
}
