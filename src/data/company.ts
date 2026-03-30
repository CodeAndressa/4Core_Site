/**
 * Dados centrais da empresa 4Core fundamentados no site 4core.site
 * O 'as const' garante inferência de tipos literais (ex. company.name é '4Core' e não string)
 * 
 * NÚMEROS DE CONTATO:
 * - Números comerciais (WhatsApp): ver src/data/contacts.ts
 * - Phone: número de suporte/geral da empresa (diferente dos comerciais)
 */
import { getCommercialNumber } from './contacts'

export const company = {
  name: '4Core',
  tagline: 'Especialista em controle de ponto e acesso.',
  description: 
    'Consultoria técnica especializada em controle de ponto, acesso e conformidade trabalhista. Entregamos relógio de ponto + software com implementação correta, integração limpa e suporte que realmente resolve.',
  email: 'contato@4core.site',
  phone: '+55 41 98847-6431', // Suporte técnico
  whatsapp: getCommercialNumber(), // Números comerciais alternados
  address: {
    city: 'Curitiba',
    state: 'PR',
    country: 'Brasil',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/4core-consultoria',
    instagram: 'https://www.instagram.com/4coreconsultoria/',
  },
  founders: [
    'Camila',
    'Danielle',
    'Larissa',
    'Thayane'
  ]
} as const
