'use client'

import { useState } from 'react'
import { Hero } from '@/components/sections/Hero'
import { DiagnosticSection } from '@/components/sections/DiagnosticSection'

export function HomeHeroDiagnostic() {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false)

  return (
    <>
      <Hero onOpenDiagnostic={() => setDiagnosticOpen(true)} />
      <DiagnosticSection isOpen={diagnosticOpen} onClose={() => setDiagnosticOpen(false)} />
    </>
  )
}
