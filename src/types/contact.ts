export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  employees?: string
  message?: string
}

export interface ContactApiResponse {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
