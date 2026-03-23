import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const baseInputStyles =
  'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 text-brand-deep transition-all focus:outline-none focus:ring-2 focus:ring-brand-vibrant'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(baseInputStyles, hasError && 'border-red-500 bg-red-50', className)}
        {...props}
      />
    )
  }
)

TextField.displayName = 'TextField'
