/**
 * Dados centrais da empresa 4Core fundamentados no site 4core.site
 * O 'as const' garante inferência de tipos literais (ex. company.name é '4Core' e não string)
 */
export const company = {
  name: '4Core',
  tagline: 'Blindagem jurídica e eficiência operacional em controle de ponto.',
  description: 
    'Consultoria técnica especializada em Portaria 671, controle de ponto e conformidade. Nascemos da percepção de que o mercado não entrega o básico: implementação correta, integração limpa e suporte que realmente resolve.',
  email: 'contato@4core.site',
  phone: '(11) 9999-0000', // Placeholder se não houver um real ou use o do site
  whatsapp: '5511999990000',
  address: {
    city: 'São Paulo',
    state: 'SP',
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
