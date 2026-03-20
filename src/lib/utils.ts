import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utilitário para combinar classes do Tailwind de forma eficiente,
 * resolvendo conflitos de especificidade.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
