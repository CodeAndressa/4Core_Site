import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'success'
  className?: string
}

/**
 * Pequena tag para indicar categorias ou destaques.
 */
export function Badge({
  children,
  variant = 'primary',
  className,
}: BadgeProps) {
  const variants = {
    primary: 'bg-brand-light/40 text-brand-vibrant',
    secondary: 'bg-brand-deep text-white',
    outline: 'border border-brand-light text-brand-deep',
    success: 'bg-green-100 text-green-800',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
