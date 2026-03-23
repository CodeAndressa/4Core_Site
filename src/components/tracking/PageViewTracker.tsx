'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/tracking/trackEvent'

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Não trackear páginas admin
    if (pathname?.startsWith('/admin')) return

    // Track page view
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  return null
}
