'use client'

import { useState } from 'react'
import { MessageCircle, X, HelpCircle, Bot, User } from 'lucide-react'
import { CONTACTS } from '@/lib/constants/contacts'

interface FloatingContactMenuProps {
  onOpenChatbot: () => void
}

export function FloatingContactMenu({ onOpenChatbot }: FloatingContactMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      id: 'comercial',
      href: CONTACTS.comercial[0].whatsapp,
      label: 'Consultar Especialista',
      description: 'Vendas e orçamentos',
      icon: <User className="w-5 h-5" />,
      color: '#25D366'
    },
    {
      id: 'suporte',
      href: CONTACTS.suporte.whatsapp,
      label: 'Suporte Técnico',
      description: 'Dúvidas e chamados',
      icon: <HelpCircle className="w-5 h-5" />,
      color: '#7B00FF'
    },
    {
      id: 'chatbot',
      onClick: () => {
        onOpenChatbot()
        setIsOpen(false)
      },
      label: 'Assistente 4Core',
      description: 'Dúvidas rápidas (IA)',
      icon: <Bot className="w-5 h-5" />,
      color: '#4F46E5'
    }
  ]

  return (
    <div className="fixed bottom-4 right-4 z-[999] flex flex-col items-end gap-2">
      {/* Menu Items - Sempre renderizados, apenas ocultos quando fechado */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2">
          {menuItems.map((item) => (
            <div key={item.id} className="opacity-100 transition-opacity duration-200">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-2xl shadow-xl border border-gray-100 min-w-[220px] group transition-all hover:-translate-y-1"
                  onClick={() => {
                    // Track click
                    console.log('WhatsApp comercial clicked')
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-brand-vibrant transition-colors">{item.label}</p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{item.description}</p>
                  </div>
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className="flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-2xl shadow-xl border border-gray-100 min-w-[220px] group transition-all hover:-translate-y-1"
                  type="button"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-brand-vibrant transition-colors">{item.label}</p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{item.description}</p>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-brand-vibrant text-white shadow-[0_8px_30px_rgba(123,0,255,0.4)] flex items-center justify-center border-2 border-white/20 hover:shadow-[0_12px_40px_rgba(123,0,255,0.6)] transition-all hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-vibrant focus-visible:ring-offset-2"
        type="button"
        aria-label="Menu de contatos"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center">
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageCircle size={28} className="text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-brand-vibrant animate-pulse" />
            </div>
          )}
        </div>
      </button>
    </div>
  )
}
