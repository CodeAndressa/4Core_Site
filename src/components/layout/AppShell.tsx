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
  const [showFloatingUi, setShowFloatingUi] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)

  useEffect(() => {
    if (isAdminRoute || !showFloatingUi) return
    const hasSeenChatbot = sessionStorage.getItem('hasSeenChatbot')
    if (!hasSeenChatbot) {
      const timer = setTimeout(() => {
        setChatbotOpen(true)
        sessionStorage.setItem('hasSeenChatbot', 'true')
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [isAdminRoute, showFloatingUi])

  useEffect(() => {
    if (isAdminRoute) {
      return
    }

    const loadFloatingUi = () => setShowFloatingUi(true)

    const win = globalThis as Window & typeof globalThis & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (win.requestIdleCallback) {
      const idleId = win.requestIdleCallback(loadFloatingUi, { timeout: 500 })
      return () => win.cancelIdleCallback?.(idleId)
    }

    const timeoutId = setTimeout(loadFloatingUi, 200)
    return () => clearTimeout(timeoutId)
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
