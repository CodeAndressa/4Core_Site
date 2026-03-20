'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getWhatsAppUrl } from '@/lib/constants'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ opacity: 0, scale: 0.5, y: 50 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.5, y: 50 }}
           className="fixed bottom-8 right-8 z-40 group"
        >
          {/* Tag flutuante */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white rounded-xl shadow-xl border border-border-light whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 pointer-events-none">
             <span className="text-sm font-bold text-brand-deep flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-vibrant" />
                Dúvida jurídica? Fale conosco!
             </span>
          </div>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 hover:-rotate-12 transition-all duration-300 relative group"
            aria-label="Falar no WhatsApp"
          >
            {/* Efeito de Ping */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            <MessageCircle size={32} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
