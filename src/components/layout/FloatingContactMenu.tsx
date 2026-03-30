'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, HelpCircle, Bot, User } from 'lucide-react'
import { CONTACTS } from '@/lib/constants/contacts'
import { WhatsAppFloat } from './WhatsAppFloat'

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
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: (menuItems.length - index) * 0.05 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-2xl shadow-xl border border-gray-100 min-w-[220px] group transition-all"
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
                    className="flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-2xl shadow-xl border border-gray-100 min-w-[220px] group transition-all"
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
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-brand-vibrant text-white shadow-[0_8px_30px_rgba(123,0,255,0.4)] flex items-center justify-center border-2 border-white/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageCircle size={28} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-brand-vibrant animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
