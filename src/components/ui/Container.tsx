import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  clean?: boolean
}

/**
 * Componente de container padronizado para manter a consistência
 * de largura máxima e preenchimento lateral em todo o site.
 */
export function Container({
  as: Component = 'div',
  className,
  clean = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        !clean && 'max-w-7xl mx-auto px-6 md:px-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
