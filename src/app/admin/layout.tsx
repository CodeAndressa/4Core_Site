import { ReactNode } from 'react'

// Forçar renderização dinâmica para todas as páginas admin
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
