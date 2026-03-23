'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormValues } from '@/lib/validators'
import { useContactForm } from '@/hooks/useContactForm'
import { EMPLOYEE_RANGES } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FormField, SelectField, TextAreaField, TextField } from '@/components/ui/form'

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

  const onSubmit = async (data: ContactFormValues) => {
    await handleSubmit(data)
  }

  const handleNewContact = () => {
    reset()
    resetForm()
  }

  const getFieldError = (key: keyof ContactFormValues) => {
    const formError = errors[key]?.message
    const apiError = fieldErrors[key]
    return (formError || apiError) as string | undefined
  }

  if (status === 'success') {
    return (
      <Card className="text-center border-brand-light max-w-2xl mx-auto rounded-[40px]" padding="lg">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-8">
          ✓
        </div>
        <h3 className="text-3xl font-semibold text-brand-deep mb-4">Solicitacao Enviada!</h3>
        <p className="text-text-secondary text-lg mb-10 leading-relaxed">
          Recebemos sua mensagem! Em breve entraremos em contato para darmos o proximo passo.
        </p>
        <Button onClick={handleNewContact} variant="outline" size="lg">
          Enviar outra mensagem
        </Button>
      </Card>
    )
  }

  return (
    <Card className="rounded-[40px] relative overflow-hidden" padding="lg">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/20 rounded-bl-full -z-0 pointer-events-none" />

      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField id="name" label="Nome Completo" required error={getFieldError('name')}>
            <TextField id="name" placeholder="Ex: Joao da Silva" hasError={Boolean(getFieldError('name'))} {...register('name')} />
          </FormField>

          <FormField id="email" label="E-mail Corporativo" required error={getFieldError('email')}>
            <TextField
              id="email"
              type="email"
              placeholder="exemplo@empresa.com.br"
              hasError={Boolean(getFieldError('email'))}
              {...register('email')}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField id="phone" label="Telefone / WhatsApp" required error={getFieldError('phone')}>
            <TextField
              id="phone"
              placeholder="11987654321 ou (11) 98765-4321"
              hasError={Boolean(getFieldError('phone'))}
              {...register('phone')}
            />
          </FormField>

          <FormField id="company" label="Empresa" error={getFieldError('company')}>
            <TextField
              id="company"
              placeholder="Nome da sua organizacao"
              hasError={Boolean(getFieldError('company'))}
              {...register('company')}
            />
          </FormField>
        </div>

        <FormField id="employees" label="Numero de Funcionarios" error={getFieldError('employees')}>
          <SelectField id="employees" hasError={Boolean(getFieldError('employees'))} {...register('employees')}>
            <option value="">Selecione uma faixa...</option>
            {EMPLOYEE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </SelectField>
        </FormField>

        <FormField id="message" label="Como podemos ajudar?" error={getFieldError('message')}>
          <TextAreaField
            id="message"
            rows={4}
            placeholder="Conte-nos brevemente sobre o seu cenario de controle de ponto."
            hasError={Boolean(getFieldError('message'))}
            {...register('message')}
          />
        </FormField>

        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl">
            {serverMessage}
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" size="lg" fullWidth isLoading={status === 'submitting'}>
            Fale com um especialista 4Core agora mesmo
          </Button>
          <p className="mt-4 text-center text-xs text-text-muted">
            Ao clicar em solicitar, voce concorda com nossa politica de processamento de dados para fins comerciais.
          </p>
        </div>
      </form>
    </Card>
  )
}
