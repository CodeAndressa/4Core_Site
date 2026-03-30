'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingContactMenu } from '@/components/layout/FloatingContactMenu'
import { Chatbot } from '@/components/ui/Chatbot'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isHomeRoute = pathname === '/'
  const [chatbotOpen, setChatbotOpen] = useState(false)

  // Abrir chatbot automaticamente após 8 segundos na primeira visita
  useEffect(() => {
    if (isAdminRoute) return
    
    const hasSeenChatbot = sessionStorage.getItem('hasSeenChatbot')
    if (!hasSeenChatbot) {
      const timer = setTimeout(() => {
        setChatbotOpen(true)
        sessionStorage.setItem('hasSeenChatbot', 'true')
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [isAdminRoute])

  if (isAdminRoute) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <Header />
      <main className={cn('flex-1', isHomeRoute ? 'pt-0' : 'pt-[86px]')}>{children}</main>
      <Footer />
      <FloatingContactMenu 
        onOpenChatbot={() => setChatbotOpen(true)} 
      />
      <Chatbot 
        isOpen={chatbotOpen} 
        onClose={() => setChatbotOpen(false)} 
      />
    </>
  )
}
