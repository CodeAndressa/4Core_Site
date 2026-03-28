'use client'

import { Lead } from '@/types/lead'
import {
  MessageSquare,
  Phone,
  Mail,
  Copy,
  X,
  ExternalLink,
  Building,
  Users,
  MessageCircle,
  Calendar,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface LeadDetailProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
}

export function LeadDetail({ lead, isOpen, onClose }: LeadDetailProps) {
  if (!lead || !isOpen) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copiado com sucesso!')
  }

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    const url = `https://wa.me/${cleanPhone}`
    window.open(url, '_blank')
  }

  const formattedDate = format(new Date(lead.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  })

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shadow-sm shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{lead.name}</h2>
            <p className="text-xs text-indigo-600 font-medium">DETALHES DO LEAD</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Quick Actions */}
          <section className="grid grid-cols-2 gap-3 shrink-0">
            <button
              onClick={() => openWhatsApp(lead.phone || '')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md transition-all active:scale-95 text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all active:scale-95 text-sm font-semibold"
            >
              <Mail className="w-4 h-4" />
              Enviar Email
            </a>
          </section>

          {/* Contact Info */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              Informações de Contato
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group/item">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">EMAIL</p>
                    <p className="text-sm font-semibold text-slate-700 leading-tight">{lead.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(lead.email || '')}
                  className="opacity-0 group-hover/item:opacity-100 p-2 hover:bg-slate-200 rounded-lg transition-all"
                >
                  <Copy className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group/item">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">WHATSAPP / CELULAR</p>
                    <p className="text-sm font-semibold text-slate-700 leading-tight">{lead.phone}</p>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(lead.phone || '')}
                  className="opacity-0 group-hover/item:opacity-100 p-2 hover:bg-slate-200 rounded-lg transition-all"
                >
                  <Copy className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </section>

          {/* Company details */}
          <section className="space-y-4">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              Dados da Empresa
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50/30 border border-indigo-100/50 rounded-xl">
                <Building className="w-4 h-4 text-indigo-400 mb-2" />
                <p className="text-[10px] text-indigo-400 font-bold uppercase">Empresa</p>
                <p className="text-sm font-bold text-indigo-900 truncate">{lead.company || 'Não informado'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <Users className="w-4 h-4 text-slate-400 mb-2" />
                <p className="text-[10px] text-slate-400 font-bold uppercase">Equipe</p>
                <p className="text-sm font-bold text-slate-700">{lead.employees || 'Não informado'}</p>
              </div>
            </div>
          </section>

          {/* Lead Details */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              Mensagem e Contexto
            </h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
              <MessageSquare className="w-4 h-4 text-slate-400 mb-2" />
              <p className="text-sm italic text-slate-600 leading-relaxed">
                "{lead.message || 'Sem mensagem cadastrada.'}"
              </p>
            </div>
          </section>

          <section className="space-y-3">
             <div className="flex items-center gap-2 text-xs text-slate-400">
               <Calendar className="w-3.5 h-3.5" />
               Capturado em: {formattedDate}
             </div>
             {lead.source_page && (
               <div className="flex items-center gap-2 text-xs text-slate-400">
                 <ExternalLink className="w-3.5 h-3.5" />
                 Página de Origem: <span className="underline">{lead.source_page}</span>
               </div>
             )}
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-3 border-2 border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-sm"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  )
}
