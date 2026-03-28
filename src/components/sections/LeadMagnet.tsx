'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ShieldAlert, CheckCircle2, ChevronRight, FileText } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { useRouter } from 'next/navigation'

export function LeadMagnet() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Usando a API de contato existente, com a flag de que veio da Isca Digital
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: 'Solicitação do Checklist: Adequação Portaria 671 MTP (Isca Digital)',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redireciona para a página secreta com o Checklist
        router.push('/materiais/checklist-portaria-671')
      } else {
        setError(data.message || 'Ocorreu um erro. Verifique seus dados de contato.')
      }
    } catch (err) {
      setError('Ocorreu um erro no servidor. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section variant="light" className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 p-8 opacity-10 blur-2xl pointer-events-none">
        <div className="w-96 h-96 bg-indigo-500 rounded-full"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-6">
              <FileText className="w-4 h-4" />
              Download Gratuito
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              O Guia Definitivo da <span className="text-indigo-600">Portaria 671 MTP</span> para Gestores de RH
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 font-medium">
              Sua folha de pagamento está juridicamente correta? Baixe nosso <strong>Checklist prático</strong> e evite multas de até R$ 6 mil por funcionário devido a erros ou equipamentos não homologados.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Quais Relógios (REP) são válidos?</h4>
                  <p className="text-sm text-slate-600">Entenda os certificados exigidos pelo Inmetro e REP-P.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Validando Softwares de Ponto em Nuvem</h4>
                  <p className="text-sm text-slate-600">Geração do AFDT e as regras para o comprovante eletrônico do colaborador.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Regras do Home Office</h4>
                  <p className="text-sm text-slate-600">Legislação para ponto via aplicativo móvel ou geolocalização (REP-A).</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Exclusivo para empresas que buscam 100% de adequação legal.
            </div>
          </motion.div>

          {/* Form Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 p-8 border border-slate-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Acesse o Material</h3>
                <p className="text-slate-500 text-sm font-medium">Insira seus dados para receber acesso imediato ao Checklist da Portaria 671.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Nome Completo <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-slate-900"
                    placeholder="Ex: João da Silva"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">E-mail Profissional <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-slate-900"
                      placeholder="joao@suaempresa.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">Telefone / WhatsApp <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-slate-900"
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-slate-700 mb-1">Nome da Empresa</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-slate-900"
                    placeholder="Sua Empresa Ltda"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-100 flex items-center justify-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:hover:scale-100 mt-2"
                >
                  {loading ? 'Acessando...' : 'Liberar meu Checklist'}
                  {!loading && <Download className="w-5 h-5" />}
                </button>
                <p className="text-center text-xs text-slate-400 font-medium mt-4">
                  Seus dados estão seguros conosco e nunca serão compartilhados.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
