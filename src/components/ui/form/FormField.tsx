import { cn } from '@/lib/utils'

interface FormFieldProps {
  id?: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}

export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="text-sm font-bold text-brand-deep uppercase tracking-wider">
        {label}
        {required ? ' *' : ''}
      </label>
      {children}
      {error ? (
        <span className="text-red-600 text-xs font-medium">{error}</span>
      ) : (
        hint && <span className="text-text-muted text-xs">{hint}</span>
      )}
    </div>
  )
}
