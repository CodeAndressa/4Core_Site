import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Building2, Shield } from 'lucide-react'
import { Product } from '@/types/product'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  icon?: React.ReactNode
  badgeText?: string
}

// Contexto de uso para cada produto
const productContext: Record<string, { forWho: string; solves: string; when: string }> = {
  'relogio-de-ponto': {
    forWho: 'Empresas com equipes presenciais',
    solves: 'Elimina fraudes e garante conformidade com Portaria 671',
    when: 'Quando você precisa de registro biométrico certificado'
  },
  'ponto-web': {
    forWho: 'Departamento Pessoal e RH',
    solves: 'Automatiza fechamento de folha e reduz retrabalho',
    when: 'Quando você precisa de gestão centralizada e relatórios'
  },
  'sistema-de-ponto': {
    forWho: 'Equipes remotas e externas',
    solves: 'Controla jornada com geolocalização e foto',
    when: 'Quando seus funcionários trabalham fora da empresa'
  },
  'controle-de-acesso': {
    forWho: 'Empresas com áreas restritas',
    solves: 'Controla entrada/saída e garante segurança',
    when: 'Quando você precisa restringir acesso a áreas sensíveis'
  },
  'catraca': {
    forWho: 'Empresas com alto fluxo de pessoas',
    solves: 'Automatiza controle de acesso físico',
    when: 'Quando você precisa de controle de fluxo automatizado'
  },
  'bastao-de-ronda': {
    forWho: 'Empresas com equipe de segurança',
    solves: 'Monitora rondas e garante cumprimento de rotas',
    when: 'Quando você precisa comprovar rondas de segurança'
  }
}

export function ProductCard({ product, icon, badgeText }: ProductCardProps) {
  const context = productContext[product.slug] || {
    forWho: 'Empresas que buscam conformidade',
    solves: 'Resolve problemas de controle e gestão',
    when: 'Quando você precisa de uma solução profissional'
  }

  return (
    <Link 
      href={`/solucoes/${product.categories[0]}/${product.slug}`}
      className="group block h-full focus-visible:outline-none"
    >
      <article className="h-full card-glow rounded-3xl overflow-hidden flex flex-col shadow-lg">
        {/* Visual Image Header */}
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {badgeText && (
             <div className="absolute top-4 right-4 z-10">
               <Badge variant="primary" className="shadow-lg py-1.5 px-3 bg-brand-vibrant text-white">
                 {badgeText}
               </Badge>
             </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col flex-1">
          {/* Icon */}
          {icon && (
            <div className="w-12 h-12 bg-gradient-to-br from-brand-vibrant/15 to-brand-vibrant/5 rounded-xl flex items-center justify-center text-brand-vibrant group-hover:from-brand-vibrant group-hover:to-brand-vibrant/90 group-hover:text-white transition-all duration-200 mb-4">
              {icon}
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-xl font-bold text-brand-deep mb-3 group-hover:text-brand-vibrant transition-colors duration-200">
            {product.name}
          </h3>

          {/* Para quem é */}
          <div className="mb-4 pb-4 border-b border-gray-100 group-hover:border-brand-vibrant/20 transition-colors duration-200">
            <div className="flex items-start gap-2 text-sm">
              <Users className="w-4 h-4 text-brand-vibrant shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Para quem é:</p>
                <p className="text-gray-600">{context.forWho}</p>
              </div>
            </div>
          </div>

          {/* O que resolve */}
          <div className="mb-4">
            <div className="flex items-start gap-2 text-sm">
              <Shield className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">O que resolve:</p>
                <p className="text-gray-600">{context.solves}</p>
              </div>
            </div>
          </div>

          {/* Quando usar */}
          <div className="mb-6">
            <div className="flex items-start gap-2 text-sm">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Quando usar:</p>
                <p className="text-gray-600">{context.when}</p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <span className="text-brand-vibrant font-bold text-sm uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all">
              Ver solução completa <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

