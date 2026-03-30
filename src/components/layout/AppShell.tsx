'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingContactMenu } from '@/components/layout/FloatingContactMenu'
import { Chatbot } from '@/components/ui/Chatbot'
import { cn } from '@/lib/utils'
import { registerServiceWorker } from '@/lib/sw-registration'
import { observeWebVitals } from '@/lib/web-vitals'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isHomeRoute = pathname === '/'
  const [chatbotOpen, setChatbotOpen] = useState(isHomeRoute)
  const [hasMounted, setHasMounted] = useState(false)

  // Register Service Worker + Start Web Vitals tracking + Abrir chatbot automaticamente após 3 segundos na HOME
  useEffect(() => {
    setHasMounted(true)
    
    // Register Service Worker for offline support & caching
    registerServiceWorker()
    
    // Start observing Web Vitals (LCP, FCP, CLS, FID, TTFB)
    observeWebVitals()
    
    if (isAdminRoute || !isHomeRoute) {
      setChatbotOpen(false)
      return
    }
    
    // Na home, abrir após 3 segundos
    const timer = setTimeout(() => {
      setChatbotOpen(true)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [isAdminRoute, isHomeRoute])

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
