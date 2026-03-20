import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Props para o componente Button.
 * Suporta estados normais de botão e links internos ou externos.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  fullWidth?: boolean
  isLoading?: boolean
  target?: string
  rel?: string
}

/**
 * Componente de botão padronizado com as cores da 4Core.
 * Renderiza um <button> ou un componente <Link> conforme necessário.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  href,
  fullWidth = false,
  isLoading = false,
  children,
  disabled,
  target,
  rel,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
  
  const variants = {
    primary: 'bg-brand-vibrant text-white hover:bg-brand-vibrant/90 focus:ring-brand-vibrant shadow-sm',
    secondary: 'bg-brand-deep text-white hover:bg-brand-deep/90 focus:ring-brand-deep shadow-sm',
    outline: 'border-2 border-brand-vibrant text-brand-vibrant hover:bg-brand-light/20 focus:ring-brand-vibrant',
    ghost: 'text-brand-deep hover:bg-brand-light/20 focus:ring-brand-light',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  }

  const combinedStyles = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full flex',
    className
  )

  const content = (
    <>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={combinedStyles}
      disabled={isLoading || disabled}
      {...props}
    >
      {content}
    </button>
  )
}
