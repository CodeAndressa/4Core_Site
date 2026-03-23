'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const WhatsAppButton = dynamic(
  () => import('@/components/layout/WhatsAppButton').then((mod) => mod.WhatsAppButton),
  { ssr: false }
)
const AdminButton = dynamic(
  () => import('@/components/ui/AdminButton').then((mod) => mod.AdminButton),
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
  const [showFloatingUi, setShowFloatingUi] = useState(false)

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
      const idleId = win.requestIdleCallback(loadFloatingUi, { timeout: 1500 })
      return () => win.cancelIdleCallback?.(idleId)
    }

    const timeoutId = setTimeout(loadFloatingUi, 800)
    return () => clearTimeout(timeoutId)
  }, [isAdminRoute])

  if (isAdminRoute) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      {showFloatingUi && <WhatsAppButton />}
      {showFloatingUi && <AdminButton />}
      {showFloatingUi && <Chatbot />}
    </>
  )
}
