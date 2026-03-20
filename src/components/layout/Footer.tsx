'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink
} from 'lucide-react'
import { company } from '@/data/company'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'
import { categories } from '@/data/products'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-32 pb-16 bg-brand-deep text-white overflow-hidden relative border-t border-white/5">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-vibrant/20 blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-12 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-10">
            <Link href="/" className="inline-block group">
              <Image 
                src="/images/logo-white.png" 
                alt="4Core" 
                width={200} 
                height={60} 
                className="h-12 lg:h-16 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-xl text-brand-light/70 leading-relaxed max-w-md font-medium">
              Consultoria técnica especializada em controle de ponto, acesso e conformidade operativa.
            </p>
            
            <div className="flex gap-5">
              {[
                { icon: <Linkedin size={24} />, href: company.social.linkedin, label: 'LinkedIn' },
                { icon: <Instagram size={24} />, href: company.social.instagram, label: 'Instagram' },
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-light hover:bg-brand-vibrant hover:text-white transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-vibrant">
              Navegação
            </h4>
            <ul className="flex flex-col gap-6">
              {[
                { label: 'Início', href: ROUTES.home },
                { label: 'Sobre', href: ROUTES.about },
                { label: 'Soluções', href: ROUTES.solutions },
                { label: 'Contato', href: ROUTES.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-lg text-brand-light/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category Column */}
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-vibrant">
              Categorias
            </h4>
            <ul className="flex flex-col gap-6">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/solucoes/${cat.slug}`}
                    className="text-lg text-brand-light/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                     <span>{cat.name}</span>
                     <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-vibrant">
              Contato Direto
            </h4>
            <div className="flex flex-col gap-8">
              {[
                { icon: <Mail size={20} />, text: company.email, label: 'E-mail' },
                { icon: <Phone size={20} />, text: company.phone, label: 'Telefone' },
                { icon: <MapPin size={20} />, text: `${company.address.city}, ${company.address.state}`, label: 'Local' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-vibrant group-hover:bg-brand-vibrant group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-light/40 uppercase tracking-widest mb-1">{item.label}</span>
                    <span className="text-white font-medium">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-brand-light/40 font-bold uppercase tracking-widest">
          <p>© {currentYear} {company.name} Consultoria Técnica.</p>
          <div className="flex gap-10">
             <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
             <Link href="#" className="hover:text-white transition-colors">Termos</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
