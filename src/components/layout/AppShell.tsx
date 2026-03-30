'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

const FloatingContactMenu = dynamic(
  () => import('@/components/layout/FloatingContactMenu').then((mod) => mod.FloatingContactMenu),
  { ssr: false }
)
const Chatbot = dynamic(() => import('@/components/ui/Chatbot').then((mod) => mod.Chatbot), {
  ssr: false,
})

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isHomeRoute = pathname === '/'
  const [showFloatingUi, setShowFloatingUi] = useState(!isAdminRoute)
  const [chatbotOpen, setChatbotOpen] = useState(false)

  useEffect(() => {
    if (isAdminRoute) {
      setShowFloatingUi(false)
      return
    }
    
    setShowFloatingUi(true)
    
    // Abrir chatbot automaticamente após 8 segundos na primeira visita
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
      {showFloatingUi && (
        <FloatingContactMenu 
          onOpenChatbot={() => setChatbotOpen(true)} 
        />
      )}
      {showFloatingUi && (
        <Chatbot 
          isOpen={chatbotOpen} 
          onClose={() => setChatbotOpen(false)} 
        />
      )}
    </>
  )
}
