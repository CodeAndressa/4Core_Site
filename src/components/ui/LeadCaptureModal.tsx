'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from './Button'
import { FormField, TextField } from '@/components/ui/form'
import { leadCaptureSchema } from '@/lib/validators'
import { trackFormSubmit } from '@/lib/tracking/trackEvent'

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  pagePath: string
  diagnosticProfile: {
    title: string
    description: string
    risk: string
  }
  onSuccess?: () => void
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  pagePath,
  diagnosticProfile,
  onSuccess,
}: LeadCaptureModalProps) {
  const [step, setStep] = useState<'form' | 'success' | 'error'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const validation = leadCaptureSchema.safeParse({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      source_page: pagePath,
      source_channel: 'form',
      interest: diagnosticProfile.title,
    })

    if (!validation.success) {
      const [firstError] = validation.error.issues
      setError(firstError?.message || 'Verifique os campos e tente novamente.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar dados')
      }

      trackFormSubmit(pagePath, 'diagnostico_modal')
      setStep('success')
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar dados')
      setStep('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[90]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-gradient-to-r from-brand-vibrant to-brand-deep p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <h3 className="text-xl font-bold text-white pr-8">Receba sua recomendação completa</h3>
              </div>

              <div className="p-8">
                {step === 'form' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                      <p className="text-sm font-semibold text-blue-900 mb-2">Seu perfil:</p>
                      <p className="text-sm text-blue-800 font-medium">{diagnosticProfile.title}</p>
                    </div>

                    <p className="text-sm text-text-secondary mb-4">
                      Preencha seu nome e pelo menos um contato: e-mail ou WhatsApp.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <FormField label="Nome" id="lead-name" required>
                        <TextField
                          id="lead-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome"
                        />
                      </FormField>

                      <FormField label="E-mail" id="lead-email">
                        <TextField
                          id="lead-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@email.com"
                        />
                      </FormField>

                      <FormField label="WhatsApp" id="lead-phone">
                        <TextField
                          id="lead-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                        />
                      </FormField>

                      <FormField label="Empresa" id="lead-company" hint="Opcional">
                        <TextField
                          id="lead-company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Nome da sua empresa"
                        />
                      </FormField>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}

                      <Button type="submit" disabled={loading} className="w-full py-3 font-bold">
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          'Receber recomendação'
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Seus dados são protegidos e nunca serão compartilhados.
                      </p>
                    </form>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-deep mb-2">Perfeito!</h4>
                    <p className="text-gray-600 mb-4">
                      Sua recomendação foi enviada. Entraremos em contato em breve via WhatsApp ou e-mail.
                    </p>
                    <p className="text-sm text-gray-500">Redirecionando...</p>
                  </motion.div>
                )}

                {step === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-deep mb-2">Ops!</h4>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Button onClick={() => setStep('form')} className="w-full py-3 font-bold">
                      Tentar novamente
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
