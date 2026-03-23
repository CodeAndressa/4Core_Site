'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ROUTES } from '@/lib/constants'

const navLinks = [
  { label: 'Solucoes', href: '/solucoes' },
  { label: 'Sobre', href: ROUTES.about },
  { label: 'Contato', href: ROUTES.contact },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const useLightHeader = pathname === '/' && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-black/[0.06] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-[72px]">
          <Link
            href="/"
            className={`flex items-center shrink-0 group rounded-xl px-2 py-1.5 transition-all ${
              useLightHeader
                ? 'bg-white/12 border border-white/20 shadow-[0_14px_34px_-22px_rgba(223,204,255,0.8)] backdrop-blur-sm'
                : 'bg-white/65 border border-black/[0.06] shadow-sm'
            }`}
          >
            <Image
              src={useLightHeader ? '/images/logo-white.png' : isScrolled ? '/images/logo-purple.png' : '/images/logo-black.png'}
              alt="4Core"
              width={170}
              height={52}
              className={`h-11 lg:h-12 w-auto ${useLightHeader ? 'drop-shadow-[0_6px_14px_rgba(223,204,255,0.45)]' : ''}`}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                  useLightHeader ? 'text-white/85 hover:text-white' : 'text-text-secondary hover:text-brand-deep'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left ${
                    useLightHeader ? 'bg-brand-lilac' : 'bg-brand-vibrant'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-vibrant text-white text-sm font-semibold hover:bg-brand-vibrant/90 transition-colors duration-200 shadow-sm"
            >
              Falar com especialista
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            className={`md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
              useLightHeader ? 'text-white hover:bg-white/10' : 'text-brand-deep hover:bg-brand-vibrant/8'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-black/[0.06] shadow-lg"
          >
            <div className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-3 text-sm font-medium text-text-secondary hover:text-brand-deep hover:bg-surface-gray rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Link
                  href={ROUTES.contact}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-brand-vibrant text-white text-sm font-semibold"
                >
                  Falar com especialista <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
