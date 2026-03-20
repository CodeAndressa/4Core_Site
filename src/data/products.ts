import { Product, Category } from '@/types/product'

export const categories: Category[] = [
  {
    slug: 'controle-de-jornada',
    name: 'Controle de Jornada',
    description: 'Soluções completas para gestão de ponto, conformidade com a Portaria 671 e integração com folha.'
  },
  {
    slug: 'controle-de-acesso',
    name: 'Controle de Acesso',
    description: 'Gestão de fluxo de pessoas e veículos para empresas, condomínios e indústrias.'
  },
  {
    slug: 'seguranca-operacional',
    name: 'Segurança Operacional',
    description: 'Monitoramento e auditoria de rondas para garantir a integridade do patrimônio.'
  }
]

export const products: Product[] = [
  // Controle de Jornada
  {
    slug: 'relogio-de-ponto',
    categories: ['controle-de-jornada', 'controle-de-acesso'],
    name: 'REP-P facial: registro sem contato',
    shortDescription: 'Hardware Topdata com IA e reconhecimento facial ultra-rápido para conformidade 671.',
    description: 'Relógio de ponto com reconhecimento facial seguro, leitura precisa e total aderência às normas da Portaria 671. Equipado com IA para detecção de rosto vivo, eliminando fraudes e garantindo agilidade na entrada e saída.',
    image: '/images/topdata-facial-hero.png',
    problem: 'Fraudes no registro de ponto (marcação por terceiros), filas lentas e riscos de contaminação por contato físico.',
    solution: 'Implementação do REP-P Facial Topdata com tecnologia "Liveness Detection" e capacidade para milhares de usuários com reconhecimento em milissegundos.',
    benefits: [
      'Eliminação total de marcação por terceiros',
      'Registro sem contato físico (Higiene total)',
      'Detecção de rosto vivo (Impede fotos e vídeos)',
      'Funciona perfeitamente mesmo com máscaras',
      'Agilidade extrema na entrada e saída',
      'Conformidade técnica absoluta com a Portaria 671'
    ],
    specs: {
      tipo: 'REP-P (Hardware Certificado Topdata)',
      tecnologia: 'Reconhecimento Facial com IA (Deep Learning)',
      conectividade: 'Ethernet (TCP/IP) nativo',
      conformidade: 'Portaria 671 MTP / Auditoria Fiscal'
    },
    applications: ['Empresas com Grande Fluxo', 'Indústrias', 'Varejo', 'Escritórios B2B'],
    ctaText: 'Solicitar Proposta Especial'
  },
  {
    slug: 'ponto-web',
    categories: ['controle-de-jornada'],
    name: 'Ponto web / cloud (TopPonto)',
    shortDescription: 'Software de gestão em nuvem para administração de jornadas e tratamento de ponto.',
    description: 'Plataforma 100% em nuvem que centraliza todas as marcações de ponto, automatiza o cálculo de horas extras e simplifica o fechamento da folha.',
    image: '/images/products/software-web.png',
    problem: 'Processos manuais de fechamento de folha, erros de cálculo e falta de visibilidade em tempo real sobre a jornada dos colaboradores.',
    solution: 'Sistema centralizado em nuvem que sincroniza dados de diversos coletores (Hardware ou App) e gera relatórios automáticos de espelho de ponto.',
    benefits: [
      'Cálculo automático de DSR, Adicional Noturno e HE',
      'Acesso de qualquer lugar via navegador',
      'Alertas de inconsistências e faltos',
      'Integração nativa com os principais ERPs do mercado'
    ],
    specs: {
      tipo: 'Software as a Service (SaaS)',
      tecnologia: 'Computação em Nuvem / Web Responsive',
      conectividade: 'HTTPS / API de Integração',
      conformidade: 'Portaria 671 MTP'
    },
    applications: ['Equipes de RH/DP', 'Gestores de Unidades', 'Contabilidades'],
    ctaText: 'Testar Demonstração'
  },
  {
    slug: 'sistema-de-ponto',
    categories: ['controle-de-jornada'],
    name: 'Aplicativo mobile TopPonto',
    shortDescription: 'Registro de jornada para equipes externas ou home office com geolocalização.',
    description: 'Aplicativo mobile seguro que permite o registro de ponto de qualquer lugar, utilizando cerca geográfica (Geofence) e reconhecimento facial para garantir a autenticidade.',
    image: '/images/products/app-mobile.png',
    problem: 'Dificuldade em monitorar e controlar a jornada de funcionários em campo, representantes ou em regime de home office.',
    solution: 'App com prova de vida (reconhecimento facial) e marcação vinculada à coordenada GPS exata no momento do registro.',
    benefits: [
      'Geofencing (Cerca geográfica inteligente)',
      'Funcionamento Offline with sincronização posterior',
      'Reconhecimento Facial (Bio-prova de vida)',
      'Redução de custos com infraestrutura física'
    ],
    specs: {
      tipo: 'Aplicativo Mobile (Android/iOS)',
      tecnologia: 'GPS / Reconhecimento Facial AI',
      conectividade: 'Mobile Data / WiFi / Offline sync',
      conformidade: 'Portaria 671 MTP'
    },
    applications: ['Times Externos', 'Home Office', 'Logística e Entregas'],
    ctaText: 'Experimentar App'
  },

  // Controle de Acesso
  {
    slug: 'catracas',
    categories: ['controle-de-acesso'],
    name: 'Catracas e bloqueios físicos',
    shortDescription: 'Segurança e controle de fluxo em portarias corporativas e industriais.',
    description: 'Equipamentos de controle de acesso físico robustos, com designs modernos e diversos tipos de leitores integrados para gerir o fluxo de pessoas.',
    image: '/images/products/catracas.png',
    problem: 'Acesso não autorizado de pessoas no recinto da empresa e falta de registro de entrada/saída de visitantes.',
    solution: 'Catracas de braço fixo ou móvel integradas a sistemas de controle que permitem acesso apenas a pessoas cadastradas.',
    benefits: [
      'Controle rigoroso de entradas e saídas',
      'Integração com sistemas de recepção',
      'Braços antipânico (Segurança contra incêndio)',
      'Alta durabilidade e baixo índice de manutenção'
    ],
    specs: {
      tipo: 'Bloqueio Físico Unidirecional/Bidirecional',
      tecnologia: 'Biometria / QR Code / Cartão RFID',
      conectividade: 'TCP/IP / Serial',
      conformidade: 'Normas de Acessibilidade e Segurança'
    },
    applications: ['Portarias Industriais', 'Prédios Comerciais', 'Academias', 'Escolas'],
    ctaText: 'Ver Modelos'
  },
  {
    slug: 'controle-de-acesso',
    categories: ['controle-de-acesso'],
    name: 'Terminais de acesso facial',
    shortDescription: 'Gestão de acesso por biometria sem contato para áreas sensíveis.',
    description: 'Leitores biométricos faciais de alta precisão que restringem o acesso apenas a pessoal autorizado, garantindo higiene e velocidade.',
    image: '/images/products/facial-term.png',
    problem: 'Uso de chaves físicas ou cartões que podem ser compartilhados ou perdidos entre colaboradores.',
    solution: 'Sistemas de reconhecimento facial Topdata com trilha de auditoria digital e abertura automática de fechaduras.',
    benefits: [
      'Relatório completo de quem acessou cada sala',
      'Higiene total (Sem contato físico)',
      'Redução de perdas em estoques e áreas de TI',
      'Bloqueio remoto imediato via software'
    ],
    specs: {
      tipo: 'Terminais Autônomos ou em Rede',
      tecnologia: 'Reconhecimento Facial Deep Learning',
      conectividade: 'WiFi / TCP/IP / Bluetooth',
      conformidade: 'Certificações de Segurança Eletrônica'
    },
    applications: ['Salas de Servidores', 'Estoques', 'Escritórios Compartilhados'],
    ctaText: 'Saber Mais'
  },

  // Segurança
  {
    slug: 'bastao-de-ronda',
    categories: ['seguranca-operacional'],
    name: 'Bastão de ronda Viggia',
    shortDescription: 'Soluções completa para controle de rondas, garantindo que vigilantes sigam a rota planejada.',
    description: 'O kit Viggia é formado por três componentes (Bastão Viggia, iButtons e Software TopRonda). Desenvolvido pela Topdata, permite monitorar de perto a equipe de vigilância para assegurar execução correta de roteiros e horários, sendo robusto, confiável e com excelente custo-benefício.',
    image: '/images/products/bastao-de-ronda.png',
    problem: 'Falta de controle efetivo sobre o percurso e os horários das rondas noturnas e de segurança patrimonial.',
    solution: 'Bastão de leitura de botões inteligentes (iButtons) fixados nos postos de verificação, descarregando logs invioláveis no software TopRonda.',
    benefits: [
      'Garantia de eficiência e proteção do patrimônio',
      'Leitura de iButtons inteligente e ultra-rápida',
      'Relatórios detalhados via Software TopRonda',
      'Design emborrachado para alta durabilidade'
    ],
    specs: {
      tipo: 'Kit Viggia (Hardware + Software)',
      tecnologia: 'Leitura de Contato (iButton)',
      conectividade: 'Comunicação Nativa via USB',
      conformidade: 'Indicado para Auditoria Patrimonial'
    },
    applications: ['Empresas de Segurança', 'Condomínios Residenciais', 'Indústrias', 'Shoppings'],
    ctaText: 'Solicitar Proposta'
  }
]

export function getProductsByCategory(categorySlug: string) {
  return products.filter(p => p.categories.includes(categorySlug as any))
}

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug)
}

export function getCategoryBySlug(slug: string) {
  return categories.find(c => c.slug === slug)
}
