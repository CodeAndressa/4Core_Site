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
  MapPin
} from 'lucide-react'
import { company } from '@/data/company'
import { Container } from '@/components/ui/Container'
import { ROUTES } from '@/lib/constants'
import { categories } from '@/data/products'
import { CONTACTS } from '@/lib/constants/contacts'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-24 lg:pt-32 pb-12 bg-brand-deep text-white overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-vibrant/10 blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-20 lg:mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8 lg:space-y-10">
            <Link href="/" className="inline-block group">
              <Image 
                src="/images/logo-white.png" 
                alt="4Core Logo" 
                width={160} 
                height={50} 
                className="w-44 lg:w-56 h-auto transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-sm font-medium">
              Consultoria técnica especializada em controle de ponto, acesso e segurança jurídica operativa.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: <Linkedin size={20} />, href: company.social.linkedin, label: 'LinkedIn' },
                { icon: <Instagram size={20} />, href: company.social.instagram, label: 'Instagram' },
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/60 hover:bg-brand-vibrant hover:text-white hover:border-brand-vibrant transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-vibrant">
              Navegação
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Início', href: ROUTES.home },
                { label: 'Sobre', href: ROUTES.about },
                { label: 'Soluções', href: '/solucoes' },
                { label: 'Contato', href: ROUTES.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-base text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-vibrant">
              Principais Áreas
            </h4>
            <ul className="flex flex-col gap-4">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/solucoes/${cat.slug}`}
                    className="text-base text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                     <span>{cat.name}</span>
                     <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-vibrant">
              Contato Direto
            </h4>
            <div className="flex flex-col gap-6">
              {/* Email + Sede */}
              {[
                { icon: <Mail size={18} />, text: company.email, label: 'E-mail', href: `mailto:${company.email}` },
                { icon: <MapPin size={18} />, text: `${company.address.city}, ${company.address.state}`, label: 'Sede', href: undefined },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-vibrant shrink-0 group-hover:bg-brand-vibrant group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">{item.label}</span>
                    {item.href
                      ? <a href={item.href} className="text-white/80 font-medium text-sm lg:text-base hover:text-white transition-colors">{item.text}</a>
                      : <span className="text-white/80 font-medium text-sm lg:text-base">{item.text}</span>
                    }
                  </div>
                </div>
              ))}

              {/* Comercial */}
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#25D366] shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Comercial</span>
                  <div className="flex flex-col gap-1">
                    {CONTACTS.comercial.map((c) => (
                      <a key={c.tel} href={c.tel} className="text-white/80 font-medium text-sm hover:text-white transition-colors">
                        {c.phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suporte */}
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-vibrant shrink-0 group-hover:bg-brand-vibrant group-hover:text-white transition-colors duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Suporte</span>
                  <a href={CONTACTS.suporte.tel} className="text-white/80 font-medium text-sm hover:text-white transition-colors">
                    {CONTACTS.suporte.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
              <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
              <Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">© {currentYear} {company.name}. Todos os direitos reservados.</p>
              <p className="text-[10px] font-medium text-white/15">
                Desenvolvido por{' '}
                <a 
                  href="https://www.linkedin.com/in/andressasoaresvalesko/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-vibrant hover:text-white transition-colors"
                >
                  Andressa Soares
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

