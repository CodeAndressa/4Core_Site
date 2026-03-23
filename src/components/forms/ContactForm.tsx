'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormValues } from '@/lib/validators'
import { useContactForm } from '@/hooks/useContactForm'
import { Button } from '@/components/ui/Button'
import { EMPLOYEE_RANGES } from '@/lib/constants'
import { cn } from '@/lib/utils'

/**
 * Componente de Formulário de Contato.
 * Integra React Hook Form para inputs, Zod para validação 
 * e o hook customizado useContactForm para lógica de envio.
 */
export function ContactForm() {
  const { status, serverMessage, fieldErrors, handleSubmit, reset } = useContactForm()

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      employees: '',
      message: '',
    },
  })

  // Envolve o submit do hook form no submit da API
  const onSubmit = async (data: ContactFormValues) => {
    await handleSubmit(data)
  }

  // Novo contato pós-sucesso
  const handleNewContact = () => {
    reset()
    resetForm()
  }

  if (status === 'success') {
    return (
      <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl text-center border border-brand-light max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-8">
          ✓
        </div>
        <h3 className="text-3xl font-semibold text-brand-deep mb-4">
          Solicitação Enviada!
        </h3>
        <p className="text-text-secondary text-lg mb-10 leading-relaxed">
          Obrigado pelo seu contato. Em breve, um de nossos especialistas entrará em contato com você para darmos o próximo passo.
        </p>
        <Button onClick={handleNewContact} variant="outline" size="lg">
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-border-light relative overflow-hidden">
       {/* Visual detail */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/20 rounded-bl-full -z-0 pointer-events-none" />
      
      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-bold text-brand-deep uppercase tracking-wider">
              Nome Completo *
            </label>
            <input
              id="name"
              {...register('name')}
              className={cn(
                'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-vibrant transition-all text-brand-deep',
                (errors.name || fieldErrors.name) && 'border-red-500 bg-red-50'
              )}
              placeholder="Ex: João da Silva"
            />
            {(errors.name || fieldErrors.name) && (
              <span className="text-red-500 text-xs font-medium">
                {errors.name?.message || fieldErrors.name}
              </span>
            )}
          </div>

          {/* E-mail */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-bold text-brand-deep uppercase tracking-wider">
              E-mail Corporativo *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={cn(
                'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-vibrant transition-all text-brand-deep',
                (errors.email || fieldErrors.email) && 'border-red-500 bg-red-50'
              )}
              placeholder="exemplo@empresa.com.br"
            />
            {(errors.email || fieldErrors.email) && (
              <span className="text-red-500 text-xs font-medium">
                {errors.email?.message || fieldErrors.email}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telefone */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-bold text-brand-deep uppercase tracking-wider">
              Telefone / WhatsApp *
            </label>
            <input
              id="phone"
              {...register('phone')}
              className={cn(
                'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-vibrant transition-all text-brand-deep',
                (errors.phone || fieldErrors.phone) && 'border-red-500 bg-red-50'
              )}
              placeholder="11987654321 ou (11) 98765-4321"
            />
            {(errors.phone || fieldErrors.phone) && (
              <span className="text-red-500 text-xs font-medium">
                {errors.phone?.message || fieldErrors.phone}
              </span>
            )}
          </div>

          {/* Nome da Empresa */}
          <div className="space-y-1.5">
            <label htmlFor="company" className="text-sm font-bold text-brand-deep uppercase tracking-wider">
              Empresa
            </label>
            <input
              id="company"
              {...register('company')}
              className={cn(
                'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-vibrant transition-all text-brand-deep',
                (errors.company || fieldErrors.company) && 'border-red-500 bg-red-50'
              )}
              placeholder="Nome da sua organização"
            />
            {(errors.company || fieldErrors.company) && (
              <span className="text-red-500 text-xs font-medium">
                {errors.company?.message || fieldErrors.company}
              </span>
            )}
          </div>
        </div>

        {/* Funcionários Select */}
        <div className="space-y-1.5">
          <label htmlFor="employees" className="text-sm font-bold text-brand-deep uppercase tracking-wider">
            Número de Funcionários
          </label>
          <select
            id="employees"
            {...register('employees')}
            className={cn(
               'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-vibrant transition-all text-brand-deep appearance-none',
               (errors.employees || fieldErrors.employees) && 'border-red-500 bg-red-50'
            )}
          >
            <option value="">Selecione uma faixa...</option>
            {EMPLOYEE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          {(errors.employees || fieldErrors.employees) && (
            <span className="text-red-500 text-xs font-medium">
              {errors.employees?.message || fieldErrors.employees}
            </span>
          )}
        </div>

        {/* Mensagem */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-bold text-brand-deep uppercase tracking-wider">
            Como podemos ajudar?
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className={cn(
              'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-vibrant transition-all text-brand-deep resize-none',
              (errors.message || fieldErrors.message) && 'border-red-500 bg-red-50'
            )}
            placeholder="Conte-nos brevemente sobre o seu cenário de controle de ponto."
          ></textarea>
          {(errors.message || fieldErrors.message) && (
            <span className="text-red-500 text-xs font-medium">
              {errors.message?.message || fieldErrors.message}
            </span>
          )}
        </div>

        {/* Server Response Errors */}
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl">
            {serverMessage}
          </div>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={status === 'submitting'}
          >
            Solicitar Diagnose com um Especialista
          </Button>
          <p className="mt-4 text-center text-xs text-text-muted">
            Ao clicar em solicitar, você concorda com nossa política de processamento de dados para fins comerciais.
          </p>
        </div>
      </form>
    </div>
  )
}
