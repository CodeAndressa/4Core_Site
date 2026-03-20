import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types/product'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  icon?: React.ReactNode
  badgeText?: string
}

export function ProductCard({ product, icon, badgeText }: ProductCardProps) {
  return (
    <Link 
      href={`/solucoes/${product.categories[0]}/${product.slug}`}
      className="group block h-full focus-visible:outline-none"
    >
      <article className="h-full bg-white rounded-[32px] border border-black/[0.03] hover:shadow-premium hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col shadow-sm">
        {/* Visual Image Header */}
        <div className="relative h-64 w-full overflow-hidden bg-brand-deep/5">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-brand-vibrant/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply pointer-events-none" />
          
          {badgeText && (
             <div className="absolute top-6 right-6 z-10">
               <Badge variant="primary" className="shadow-premium py-1 px-3">
                 {badgeText}
               </Badge>
             </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-8 lg:p-10 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-8">
            {icon && (
               <div className="w-14 h-14 bg-brand-vibrant/5 rounded-2xl flex items-center justify-center text-brand-vibrant group-hover:bg-brand-vibrant group-hover:text-white transition-all duration-500">
                 {icon}
               </div>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-brand-deep mb-4 tracking-tight group-hover:text-brand-vibrant transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-text-secondary text-base leading-relaxed font-medium line-clamp-2 mb-8">
             {product.shortDescription}
          </p>
          
          <div className="mt-auto pt-6 border-t border-black/[0.03] flex items-center justify-between">
             <span className="text-brand-vibrant font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
               Ver Detalhes <ArrowRight className="w-4 h-4" />
             </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

