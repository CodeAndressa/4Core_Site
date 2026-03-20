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
  { label: 'Sobre', href: ROUTES.about },
  { label: 'Soluções', href: ROUTES.solutions },
  { label: 'Contato', href: ROUTES.contact },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-border-light shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/" className="relative z-10 group">
            <Image 
              src={isScrolled ? "/images/logo-purple.png" : "/images/logo-purple.png"} 
              alt="4Core" 
              width={180} 
              height={55} 
              className="h-10 lg:h-14 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-brand-vibrant ${
                  isScrolled ? 'text-brand-deep' : 'text-brand-deep'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href={ROUTES.contact} size="sm" className="rounded-full px-6">
              Fale Conosco <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-brand-deep"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
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
            className="md:hidden bg-white border-b border-border-light overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-brand-deep uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
              <Button href={ROUTES.contact} onClick={() => setMobileMenuOpen(false)}>
                Fale Conosco
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
