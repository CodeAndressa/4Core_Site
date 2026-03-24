'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown, Clock, Shield, Lock } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ROUTES } from '@/lib/constants'

const solutionsMenu = [
  {
    category: 'Controle de Jornada',
    icon: <Clock className="w-4 h-4" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    items: [
      { label: 'Ponto Web – TopPonto', href: '/solucoes/ponto-web', desc: 'Gestão de jornada 100% em nuvem' },
      { label: 'Relógio de Ponto', href: '/solucoes/relogio-de-ponto', desc: 'Facial, biométrico, cartão e QR Code' },
    ],
  },
  {
    category: 'Controle de Acesso',
    icon: <Lock className="w-4 h-4" />,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    items: [
      { label: 'Catracas Eletrônicas', href: '/solucoes/catracas', desc: 'Revolution, Fit, Box e PNE' },
      { label: 'Controle de Acesso', href: '/solucoes/controle-de-acesso', desc: 'Portas, portões e cancelas' },
    ],
  },
  {
    category: 'Segurança Operacional',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-green-600',
    bg: 'bg-green-50',
    items: [
      { label: 'Bastão de Ronda', href: '/solucoes/bastao-de-ronda', desc: 'Kit Viggia para controle de rondas' },
    ],
  },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const solutionsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() || '/'

  const isHomeTop = pathname === '/' && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setSolutionsOpen(false)
    setMobileMenuOpen(false)
  }, [pathname])

  const shellClass = isHomeTop
    ? 'bg-[linear-gradient(135deg,rgba(22,3,44,0.68),rgba(12,2,25,0.55))] border-white/14 shadow-[0_22px_40px_-26px_rgba(123,0,255,0.72)]'
    : 'bg-white/84 border-black/[0.08] shadow-[0_16px_34px_-24px_rgba(15,0,34,0.35)]'

  const navTextClass = isHomeTop ? 'text-white/82 hover:text-white' : 'text-text-secondary hover:text-brand-deep'
  const navHoverSurfaceClass = isHomeTop ? 'hover:bg-white/8' : 'hover:bg-brand-vibrant/8'
  const navUnderlineClass = isHomeTop
    ? 'from-brand-lilac/0 via-brand-lilac to-brand-lilac/0'
    : 'from-brand-vibrant/0 via-brand-vibrant to-brand-vibrant/0'

  const solutionsActive = isActive(pathname, '/solucoes')

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
            {/* Soluções com dropdown */}
            <div ref={solutionsRef} className="relative">
              <button
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
                onClick={() => setSolutionsOpen((v) => !v)}
                aria-expanded={solutionsOpen}
                className={`group relative rounded-lg px-3.5 py-2 text-[15px] font-medium tracking-[0.01em] transition-all duration-200 inline-flex items-center gap-1.5 ${navTextClass} ${navHoverSurfaceClass} ${solutionsActive ? (isHomeTop ? 'text-white' : 'text-brand-deep') : ''}`}
              >
                Soluções
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
                <span
                  className={`absolute left-3.5 right-3.5 bottom-1 h-px bg-gradient-to-r ${navUnderlineClass} origin-left transition-transform duration-300 ${solutionsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                />
              </button>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] bg-white rounded-2xl border border-black/[0.06] shadow-[0_20px_60px_-20px_rgba(15,0,34,0.25)] p-5 z-50"
                  >
                    {/* Triangle pointer */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-black/[0.06] rotate-45" />

                    <div className="grid grid-cols-3 gap-4">
                      {solutionsMenu.map((group) => (
                        <div key={group.category}>
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${group.bg} ${group.color} text-[11px] font-bold uppercase tracking-wider mb-3`}>
                            {group.icon}
                            {group.category}
                          </div>
                          <ul className="space-y-1">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="group/item block px-3 py-2.5 rounded-xl hover:bg-brand-vibrant/5 transition-colors"
                                >
                                  <span className="block text-sm font-semibold text-brand-deep group-hover/item:text-brand-vibrant transition-colors leading-tight">
                                    {item.label}
                                  </span>
                                  <span className="block text-xs text-text-muted mt-0.5">{item.desc}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href="/solucoes"
                        className="text-xs font-semibold text-brand-vibrant hover:text-brand-deep transition-colors flex items-center gap-1"
                      >
                        Ver todas as soluções <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        href="/contato"
                        className="text-xs font-semibold text-white bg-brand-vibrant hover:bg-brand-deep px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Solicitar proposta
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Outros links */}
            {[{ label: 'Sobre', href: ROUTES.about }, { label: 'Contato', href: ROUTES.contact }].map((link) => {
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
                {/* Soluções accordion mobile */}
                <button
                  onClick={() => setMobileSolutionsOpen((v) => !v)}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors text-left flex items-center justify-between w-full ${
                    isHomeTop
                      ? solutionsActive ? 'text-white bg-white/12' : 'text-white/82 hover:text-white hover:bg-white/8'
                      : solutionsActive ? 'text-brand-deep bg-brand-vibrant/10' : 'text-text-secondary hover:text-brand-deep hover:bg-brand-vibrant/8'
                  }`}
                >
                  Soluções
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileSolutionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-3 pb-2 space-y-3">
                        {solutionsMenu.map((group) => (
                          <div key={group.category}>
                            <p className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 ${isHomeTop ? 'text-white/40' : 'text-text-muted'}`}>
                              {group.category}
                            </p>
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                  isHomeTop ? 'text-white/70 hover:text-white hover:bg-white/8' : 'text-text-secondary hover:text-brand-deep hover:bg-brand-vibrant/8'
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                        <Link
                          href="/solucoes"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                            isHomeTop ? 'text-brand-lilac hover:bg-white/8' : 'text-brand-vibrant hover:bg-brand-vibrant/8'
                          }`}
                        >
                          Ver todas as soluções →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {[{ label: 'Sobre', href: ROUTES.about }, { label: 'Contato', href: ROUTES.contact }].map((link) => {
                  const active = isActive(pathname, link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                        isHomeTop
                          ? active ? 'text-white bg-white/12' : 'text-white/82 hover:text-white hover:bg-white/8'
                          : active ? 'text-brand-deep bg-brand-vibrant/10' : 'text-text-secondary hover:text-brand-deep hover:bg-brand-vibrant/8'
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
