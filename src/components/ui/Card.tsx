import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  tone?: 'default' | 'muted' | 'deep'
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({
  as: Component = 'div',
  tone = 'default',
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  const tones = {
    default: 'bg-white border border-border-light shadow-sm',
    muted: 'bg-surface-gray border border-border-light shadow-sm',
    deep: 'bg-brand-deep text-white border border-brand-vibrant/20 shadow-lg',
  }

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 md:p-10',
  }

  return (
    <Component
      className={cn('rounded-2xl', tones[tone], paddings[padding], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
