'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'

const navLinks = [
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Sobre', href: ROUTES.about },
  { label: 'Contato', href: ROUTES.contact },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-1 bg-white/70 backdrop-blur-xl border-b border-black/[0.03] shadow-premium' 
          : 'py-2 bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/" className="relative z-10 group">
            <Image 
              src="/images/logo-purple.png" 
              alt="4Core Logo" 
              width={160} 
              height={50} 
              className="w-36 lg:w-48 h-auto transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-[0.15em] text-brand-deep hover:text-brand-vibrant transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button href={ROUTES.contact} size="sm" className="px-6 py-5 text-sm shadow-premium">
              Especialista <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-brand-deep hover:bg-brand-vibrant/10 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-black/[0.03] overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-brand-deep uppercase tracking-widest border-b border-black/5 pb-4"
                >
                  {link.label}
                </Link>
              ))}
              <Button href={ROUTES.contact} onClick={() => setMobileMenuOpen(false)} className="py-6">
                Falar com especialista
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

