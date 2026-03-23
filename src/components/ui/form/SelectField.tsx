import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean
}

const baseSelectStyles =
  'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 text-brand-deep transition-all focus:outline-none focus:ring-2 focus:ring-brand-vibrant appearance-none'

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(baseSelectStyles, hasError && 'border-red-500 bg-red-50', className)}
        {...props}
      />
    )
  }
)

SelectField.displayName = 'SelectField'
