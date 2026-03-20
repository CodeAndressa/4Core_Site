import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  inverse?: boolean
  className?: string
  noMargin?: boolean
}

/**
 * Componente padronizado para cabeçalhos de seções.
 * Mantém a hierarquia tipográfica consistente – h2 para títulos de seção.
 */
export function SectionHeading({
  subtitle,
  title,
  description,
  centered = false,
  inverse = false,
  className = '',
  noMargin = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(
      'max-w-3xl',
      centered ? 'mx-auto text-center' : '',
      noMargin ? '' : 'mb-12 lg:mb-20',
      className
    )}>
      {subtitle && (
        <span
          className={cn(
            'inline-block px-3 py-1 mb-4 text-sm font-bold tracking-wider uppercase rounded-full',
            inverse ? 'bg-brand-vibrant/20 text-brand-light' : 'bg-brand-light/30 text-brand-vibrant'
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6',
          inverse ? 'text-white' : 'text-brand-deep'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-lg md:text-xl font-normal leading-relaxed',
            inverse ? 'text-brand-light/80' : 'text-text-secondary'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
