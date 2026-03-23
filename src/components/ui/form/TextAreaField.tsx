import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

const baseTextAreaStyles =
  'w-full bg-surface-gray border border-border-light rounded-xl px-4 py-3 text-brand-deep transition-all focus:outline-none focus:ring-2 focus:ring-brand-vibrant resize-none'

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(baseTextAreaStyles, hasError && 'border-red-500 bg-red-50', className)}
        {...props}
      />
    )
  }
)

TextAreaField.displayName = 'TextAreaField'
