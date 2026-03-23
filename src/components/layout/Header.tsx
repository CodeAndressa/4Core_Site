'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ROUTES } from '@/lib/constants'

const navLinks = [
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Sobre', href: ROUTES.about },
  { label: 'Contato', href: ROUTES.contact },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname() || '/'

  const isHomeTop = pathname === '/' && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shellClass = isHomeTop
    ? 'bg-[linear-gradient(135deg,rgba(22,3,44,0.68),rgba(12,2,25,0.55))] border-white/14 shadow-[0_22px_40px_-26px_rgba(123,0,255,0.72)]'
    : 'bg-white/84 border-black/[0.08] shadow-[0_16px_34px_-24px_rgba(15,0,34,0.35)]'

  const navTextClass = isHomeTop ? 'text-white/82 hover:text-white' : 'text-text-secondary hover:text-brand-deep'
  const navHoverSurfaceClass = isHomeTop ? 'hover:bg-white/8' : 'hover:bg-brand-vibrant/8'
  const navUnderlineClass = isHomeTop
    ? 'from-brand-lilac/0 via-brand-lilac to-brand-lilac/0'
    : 'from-brand-vibrant/0 via-brand-vibrant to-brand-vibrant/0'

  return (
    <motion.header
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <Container className="pt-3 lg:pt-4">
        <nav
          className={`relative h-[66px] lg:h-[68px] rounded-2xl border backdrop-blur-xl px-2.5 lg:px-3.5 grid grid-cols-[auto_1fr_auto] items-center gap-2 transition-all duration-300 ${shellClass}`}
        >
          <span className="pointer-events-none absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

          <Link
            href="/"
            className={`group inline-flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-colors ${
              isHomeTop ? 'hover:bg-white/10' : 'hover:bg-white/72'
            }`}
            aria-label="Ir para a página inicial"
          >
            <Image
              src={isHomeTop ? '/images/logo-white.png' : '/images/logo-purple.png'}
              alt="4Core"
              width={144}
              height={42}
              className={`h-9 lg:h-10 w-auto ${isHomeTop ? 'drop-shadow-[0_6px_16px_rgba(223,204,255,0.42)]' : ''}`}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center justify-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative rounded-lg px-3.5 py-2 text-[15px] font-medium tracking-[0.01em] transition-all duration-200 ${navTextClass} ${navHoverSurfaceClass} ${active ? (isHomeTop ? 'text-white' : 'text-brand-deep') : ''}`}
                >
                  {link.label}
                  <span
                    className={`absolute left-3.5 right-3.5 bottom-1 h-px bg-gradient-to-r ${navUnderlineClass} origin-left transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </Link>
              )
            })}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Link
              href={ROUTES.contact}
              className="hidden md:inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-vibrant to-[#9933FF] hover:from-[#8912FF] hover:to-[#AA4EFF] transition-all duration-200 shadow-[0_16px_30px_-18px_rgba(123,0,255,0.88)]"
            >
              Falar com especialista
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                isHomeTop ? 'text-white hover:bg-white/12' : 'text-brand-deep hover:bg-brand-vibrant/10'
              }`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-4 pt-2"
          >
            <div
              className={`rounded-2xl border backdrop-blur-xl p-3 shadow-lg ${
                isHomeTop
                  ? 'bg-[linear-gradient(135deg,rgba(22,3,44,0.86),rgba(12,2,25,0.82))] border-white/15'
                  : 'bg-white/94 border-black/[0.08]'
              }`}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(pathname, link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                        isHomeTop
                          ? active
                            ? 'text-white bg-white/12'
                            : 'text-white/82 hover:text-white hover:bg-white/8'
                          : active
                            ? 'text-brand-deep bg-brand-vibrant/10'
                            : 'text-text-secondary hover:text-brand-deep hover:bg-brand-vibrant/8'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}

                <div className="pt-2">
                  <Link
                    href={ROUTES.contact}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-vibrant to-[#9933FF]"
                  >
                    Falar com especialista
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
