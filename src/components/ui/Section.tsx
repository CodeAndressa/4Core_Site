import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  variant?: 'white' | 'gray' | 'deep' | 'gradient'
}

/**
 * Componente Section padronizado com paddings e temas consistentes.
 */
export function Section({
  as: Component = 'section',
  variant = 'white',
  className,
  children,
  ...props
}: SectionProps) {
  const variants = {
    white: 'bg-surface-white',
    gray: 'bg-surface-gray',
    deep: 'bg-brand-deep text-white',
    gradient: 'bg-gradient-to-b from-surface-white to-brand-light/30',
  }

  return (
    <Component
      className={cn(
        'section-padding relative overflow-hidden',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
