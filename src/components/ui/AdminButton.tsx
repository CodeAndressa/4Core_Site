'use client'

import Link from 'next/link'

export function AdminButton() {
  return (
    <Link
      href="/admin/login"
      className="fixed bottom-4 left-4 w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white text-xs opacity-20 hover:opacity-100 transition-opacity duration-300 z-50"
      title="Admin"
    >
      🔒
    </Link>
  )
}
