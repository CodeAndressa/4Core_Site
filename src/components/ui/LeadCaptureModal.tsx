'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from './Button'
import { FormField, TextField } from '@/components/ui/form'
import { leadCaptureSchema } from '@/lib/validators'
import { trackDiagnosticoComplete, trackLeadCaptured } from '@/lib/tracking/trackEvent'
import { fireGoogleAdsConversion } from '@/lib/tracking/gtagConversion'

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
      message: [diagnosticProfile.description, diagnosticProfile.risk]
        .filter(Boolean)
        .join(' | '),
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

      trackDiagnosticoComplete(pagePath)
      trackLeadCaptured(pagePath, 'diagnostico')
      fireGoogleAdsConversion()
      setStep('success')
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 3000)
    } catch {
      setError('Tivemos um problema ao registrar seus dados. Pode tentar novamente?')
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
                <h3 className="text-xl font-bold text-white pr-8">Fale com um especialista 4Core</h3>
              </div>

              <div className="p-8">
                {step === 'form' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                      <p className="text-sm font-semibold text-blue-900 mb-2">Seu perfil:</p>
                      <p className="text-sm text-blue-800 font-medium">{diagnosticProfile.title}</p>
                    </div>

                    <p className="text-sm text-text-secondary mb-4">
                      Com base nas suas respostas, já identificamos a melhor solução para sua empresa.
                      Nosso time comercial vai entrar em contato para te orientar na implementação.
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
                          'Quero ser contatado'
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
                    <p className="text-gray-600 mb-6">
                      Nosso time comercial vai entrar em contato com você em breve para apresentar a melhor solução para o seu cenário.
                    </p>
                    <a
                      href="https://wa.me/5541988476431"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Prefiro falar agora no WhatsApp
                    </a>
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
                    <p className="text-gray-600 mb-6">
                      Tivemos um problema ao registrar seus dados. Pode tentar novamente?
                    </p>
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
