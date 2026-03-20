import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  icon?: React.ReactNode
  badgeText?: string
}

export function ProductCard({ product, icon, badgeText }: ProductCardProps) {
  return (
    <Link 
      href={`/solucoes/${product.category}/${product.slug}`}
      className="group block h-full focus-visible:outline-none"
    >
      <article className="h-full bg-surface-gray rounded-[48px] border border-border-light hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col focus-visible:ring-2 focus-visible:ring-brand-vibrant">
        {/* Visual Image Header */}
        <div className="relative h-64 w-full overflow-hidden bg-brand-deep/10">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-brand-vibrant/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply pointer-events-none" />
        </div>

        {/* Content Body */}
        <div className="p-10 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-8">
            {icon && (
               <div className="w-16 h-16 bg-white rounded-2xl border border-border-light flex items-center justify-center text-brand-vibrant shadow-sm group-hover:bg-brand-vibrant group-hover:text-white transition-all">
                 {icon}
               </div>
            )}
            {badgeText && (
               <span className="text-[10px] font-bold uppercase tracking-widest border border-brand-vibrant/20 px-3 py-1 rounded-full bg-brand-vibrant/5 text-brand-vibrant">
                 {badgeText}
               </span>
            )}
          </div>
          
          <h3 className="text-2xl font-semibold text-brand-deep mb-4 group-hover:text-brand-vibrant transition-colors ">
            {product.name}
          </h3>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed font-medium line-clamp-2">
             {product.shortDescription}
          </p>
          
          <div className="mt-auto pt-8 border-t border-border-light flex items-center justify-between">
             <span className="text-brand-vibrant font-bold text-sm uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
               Detalhes Técnicos <ArrowRight size={16} />
             </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
