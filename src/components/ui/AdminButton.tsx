'use client'

import Link from 'next/link'

export function AdminButton() {
  return (
    <Link
      href="/admin/login"
      className="fixed top-20 left-4 rounded-full border border-brand-deep/20 bg-white/80 px-3 py-1 text-[11px] font-semibold text-brand-deep shadow-sm backdrop-blur transition hover:bg-white z-40"
      title="Acesso administrativo"
      aria-label="Acesso administrativo"
    >
      Admin
    </Link>
  )
}
