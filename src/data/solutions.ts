/**
 * Dados completos do portfólio de soluções 4Core
 * Base: catálogo TopData + posicionamento consultivo 4Core
 */

export interface SolutionVariant {
  slug: string
  name: string
  shortDescription: string
  image: string
  highlights: string[]
}

export interface Solution {
  slug: string
  category: 'controle-de-jornada' | 'controle-de-acesso' | 'seguranca-operacional'
  categoryLabel: string
  name: string
  tagline: string
  description: string
  image: string
  problem: string
  solution: string
  forWho: string[]
  whenToUse: string[]
  problemsSolved: string[]
  benefits: string[]
  specs: { label: string; value: string }[]
  variants?: SolutionVariant[]
  applications: string[]
  risk: string
}

// ─── SOLUÇÕES ───────────────────────────────────────────────────────────────────

export const solutions: Solution[] = [
  // ━━━ PONTO WEB ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    slug: 'ponto-web',
    category: 'controle-de-jornada',
    categoryLabel: 'Controle de Jornada',
    name: 'Ponto Web – TopPonto',
    tagline: 'Gestão de jornada 100% em nuvem, de qualquer lugar.',
    description: 'Plataforma de tratamento de ponto em nuvem que centraliza marcações de todos os coletores (relógio, app, tablet), automatiza cálculos de horas extras, banco de horas, DSR e adicional noturno, e simplifica o fechamento de folha com integração nativa aos principais ERPs do mercado.',
    image: '/images/products/software-web.png',
    problem: 'Fechamento manual de folha com planilhas gera erros de cálculo, retrabalho e inconsistências que resultam em pagamentos indevidos e vulnerabilidade em auditorias trabalhistas. Dados não integrados aumentam em até 300% o risco de erros.',
    solution: 'Sistema centralizado em nuvem que sincroniza dados de diversos coletores (hardware ou app) e gera relatórios automáticos de espelho de ponto, cálculos completos e arquivos de exportação para qualquer ERP.',
    forWho: [
      'Departamento Pessoal e equipes de RH',
      'Empresas com múltiplas unidades ou filiais',
      'Gestores que precisam de relatórios em tempo real',
      'Contabilidades que atendem múltiplas empresas',
    ],
    whenToUse: [
      'Quando o fechamento de folha é manual e demorado',
      'Quando há erros frequentes na importação de dados para o ERP',
      'Quando você precisa de visão consolidada de todas as unidades',
      'Quando a equipe de DP perde tempo com retrabalho e conferências',
    ],
    problemsSolved: [
      'Elimina erros de cálculo de horas extras e banco de horas',
      'Automatiza o fechamento de folha de ponto',
      'Centraliza dados de múltiplos coletores em uma única plataforma',
      'Gera arquivos AFDT/ACJEF válidos para fiscalização',
      'Reduz em até 80% o tempo gasto no fechamento da folha',
      'Alertas automáticos de inconsistências e faltas',
    ],
    benefits: [
      'Cálculo automático de DSR, adicional noturno e horas extras',
      'Acesso de qualquer lugar via navegador web',
      'Multiempresa: gerencie todas as filiais em um só lugar',
      'Integração nativa com os principais ERPs do mercado',
      'Relatórios completos prontos para fiscalização',
      'Interface simples, pensada para o usuário de RH',
    ],
    specs: [
      { label: 'Tipo', value: 'Software as a Service (SaaS)' },
      { label: 'Tecnologia', value: 'Computação em nuvem / Web Responsive' },
      { label: 'Conectividade', value: 'HTTPS / API de Integração com ERP' },
      { label: 'Conformidade', value: 'Portaria 671 MTP' },
    ],
    applications: ['Equipes de RH/DP', 'Gestores de unidades', 'Contabilidades', 'Empresas com múltiplas filiais'],
    risk: 'Gestão manual de ponto gera inconsistências que resultam em pagamentos indevidos, retrabalho no fechamento da folha e vulnerabilidade em auditorias trabalhistas.',
  },

  // ━━━ RELÓGIO DE PONTO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    slug: 'relogio-de-ponto',
    category: 'controle-de-jornada',
    categoryLabel: 'Controle de Jornada',
    name: 'Relógio de Ponto Eletrônico',
    tagline: 'Registro seguro e em conformidade com a Portaria 671.',
    description: 'Linha completa de relógios de ponto eletrônicos (REP-P e REP-C) com tecnologias de identificação que vão do reconhecimento facial com IA à biometria digital, cartão RFID e QR Code. Todos certificados e em conformidade total com a Portaria 671 do MTP.',
    image: '/images/topdata-facial-hero.png',
    problem: 'Registro de ponto manual ou com cartão está sujeito a fraudes (ponto "de colega"), filas na entrada, riscos de contaminação por contato e contestação judicial por falta de evidência biométrica.',
    solution: 'Implementação de relógio de ponto certificado com tecnologia de identificação adequada ao perfil de cada empresa, garantindo conformidade regulatória e eliminação de fraudes.',
    forWho: [
      'Empresas com equipes 100% presenciais',
      'Negócios que precisam de registro biométrico certificado',
      'Empresas de 20 a 500+ funcionários',
      'Organizações que buscam conformidade total com a Portaria 671',
    ],
    whenToUse: [
      'Quando você precisa substituir cartão de ponto ou relógio analógico',
      'Quando há suspeita de fraudes no registro de ponto',
      'Quando a fiscalização exige conformidade com a Portaria 671',
      'Quando o fechamento da folha é manual e demorado',
    ],
    problemsSolved: [
      'Elimina fraudes de ponto (marcação por terceiros)',
      'Garante conformidade total com Portaria 671',
      'Reduz tempo de fechamento da folha',
      'Gera arquivos AFDT/ACJEF válidos para fiscalização',
      'Elimina filas na entrada com identificação ultra-rápida',
      'Elimina riscos de contaminação (modelos sem contato)',
    ],
    benefits: [
      'Identificação segura e inviolável',
      'Conformidade técnica absoluta com a Portaria 671',
      'Integração nativa com TopPonto Web',
      'Alta capacidade de armazenamento de usuários',
      'Design robusto para ambientes industriais e corporativos',
      'Suporte e garantia com assistência técnica 4Core',
    ],
    specs: [
      { label: 'Tipo', value: 'REP-P / REP-C certificado' },
      { label: 'Tecnologia', value: 'Facial IA / Biometria / RFID / QR Code' },
      { label: 'Conectividade', value: 'Ethernet TCP/IP / Wi-Fi / USB' },
      { label: 'Conformidade', value: 'Portaria 671 MTP / Inmetro' },
    ],
    variants: [
      {
        slug: 'facial',
        name: 'Reconhecimento Facial',
        shortDescription: 'Identificação por reconhecimento facial com IA e detecção de rosto vivo. Sem contato, higiênico e ultra-rápido.',
        image: '/images/topdata-facial-hero.png',
        highlights: [
          'IA com Deep Learning para reconhecimento preciso',
          'Detecção de rosto vivo (impede fraudes com fotos)',
          'Funciona com uso de máscara de proteção',
          'Registro em milissegundos, sem filas',
        ],
      },
      {
        slug: 'biometrico',
        name: 'Biometria Digital',
        shortDescription: 'Leitura de impressão digital com sensor óptico de alta precisão. Ideal para ambientes industriais e corporativos.',
        image: '/images/products/rep-hardware.png',
        highlights: [
          'Sensor óptico de alta resolução',
          'Capacidade para milhares de digitais',
          'Robusto para ambientes industriais',
          'Tecnologia antifraude (detecção de dedo vivo)',
        ],
      },
      {
        slug: 'cartao',
        name: 'Cartão de Proximidade (RFID)',
        shortDescription: 'Leitura por aproximação de cartões, crachás ou pulseiras RFID (Mifare / 125kHz). Rápido e prático.',
        image: '/images/products/rep-hardware.png',
        highlights: [
          'Compatível com Mifare e RFID 125kHz',
          'Funciona com cartões, crachás, pulseiras e chaveiros',
          'Ideal para ambientes com uso obrigatório de luvas',
          'Registro instantâneo por aproximação',
        ],
      },
      {
        slug: 'qr-code',
        name: 'QR Code',
        shortDescription: 'Identificação por leitura de QR Code ou código de barras. Solução prática e econômica.',
        image: '/images/products/rep-hardware.png',
        highlights: [
          'Leitura rápida de QR Code e código de barras',
          'Compatível com crachás impressos e celular',
          'Custo reduzido de implantação',
          'Ideal para visitantes e funcionários temporários',
        ],
      },
    ],
    applications: ['Indústrias', 'Escritórios corporativos', 'Varejo', 'Hospitais e clínicas', 'Escolas e universidades'],
    risk: 'Sem relógio de ponto certificado, sua empresa está exposta a multas de até R$ 6 mil por funcionário e processos trabalhistas. Registros manuais são facilmente contestados na justiça.',
  },

  // ━━━ CATRACAS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    slug: 'catracas',
    category: 'controle-de-acesso',
    categoryLabel: 'Controle de Acesso',
    name: 'Catracas Eletrônicas',
    tagline: 'Controle de fluxo inteligente para qualquer ambiente.',
    description: 'Linha completa de catracas eletrônicas com designs modernos e diversas tecnologias de identificação. Controle rigoroso de entrada e saída com braços antipânico, integração com sistemas de recepção e acessibilidade (PNE).',
    image: '/images/products/catracas.png',
    problem: 'Acesso não autorizado de pessoas, falta de registro de entrada/saída de visitantes e funcionários e impossibilidade de auditar quem esteve nas dependências em caso de incidentes.',
    solution: 'Catracas eletrônicas com tecnologia de identificação adequada ao perfil do local, integradas a software de controle que registra todos os acessos em tempo real.',
    forWho: [
      'Empresas com portarias de alto fluxo',
      'Condomínios residenciais e empresariais',
      'Escolas e universidades',
      'Academias e clubes',
      'Hospitais e clínicas',
      'Indústrias e centros logísticos',
    ],
    whenToUse: [
      'Quando é preciso controlar o fluxo de pessoas na portaria',
      'Quando você precisa saber quem entrou e saiu em tempo real',
      'Quando visitantes e prestadores acessam as dependências',
      'Quando a segurança patrimonial é prioridade',
    ],
    problemsSolved: [
      'Elimina acesso não autorizado às dependências',
      'Registra todos os acessos com hora, data e identificação',
      'Reduz risco de invasões e incidentes de segurança',
      'Controla acesso de visitantes e prestadores',
      'Impede "carona" (duas pessoas com um único acesso)',
      'Garante acessibilidade com modelo PNE',
    ],
    benefits: [
      'Controle rigoroso de entradas e saídas',
      'Integração com sistemas de recepção e portaria',
      'Braços antipânico para segurança contra incêndio',
      'Alta durabilidade e baixo índice de manutenção',
      'Múltiplas tecnologias de identificação no mesmo equipamento',
      'Relatórios gerenciais em tempo real',
    ],
    specs: [
      { label: 'Tipo', value: 'Bloqueio físico uni/bidirecional' },
      { label: 'Tecnologia', value: 'Facial / Biometria / RFID / QR Code' },
      { label: 'Conectividade', value: 'TCP/IP / Serial' },
      { label: 'Conformidade', value: 'Normas de acessibilidade e segurança' },
    ],
    variants: [
      {
        slug: 'revolution',
        name: 'Revolution',
        shortDescription: 'Catraca que alia design sofisticado e tecnologia avançada. Ideal para ambientes de alto padrão.',
        image: '/images/products/catraca-revolution.webp',
        highlights: [
          'Design premium para lobbies corporativos',
          'Múltiplos leitores integrados',
          'Acabamento em aço inox',
          'Braço antipânico de série',
        ],
      },
      {
        slug: 'fit',
        name: 'Fit',
        shortDescription: 'Design compacto e moderno que se adapta a qualquer ambiente. Versátil e eficiente.',
        image: '/images/products/catraca-fit.webp',
        highlights: [
          'Compacta: ocupa menos espaço na portaria',
          'Design atual e discreto',
          'Ideal para academias e escolas',
          'Fácil instalação e manutenção',
        ],
      },
      {
        slug: 'box',
        name: 'Box',
        shortDescription: 'Catraca em aço inox que une elegância e confiabilidade para ambientes diferenciados.',
        image: '/images/products/catraca-box.webp',
        highlights: [
          'Gabinete 100% em aço inox',
          'Alta resistência a vandalismo',
          'Ideal para indústrias e grandes empresas',
          'Braço antipânico de série',
        ],
      },
      {
        slug: 'pne',
        name: 'Catraca PNE',
        shortDescription: 'Desenvolvida para pessoas com deficiência ou mobilidade reduzida. Acessibilidade garantida.',
        image: '/images/products/catraca-pne.webp',
        highlights: [
          'Passagem ampla para cadeiras de rodas',
          'Conformidade com normas de acessibilidade',
          'Integrada com os mesmos leitores das demais catracas',
          'Obrigatória para conformidade legal',
        ],
      },
    ],
    applications: ['Portarias industriais', 'Prédios comerciais', 'Academias e clubes', 'Escolas e universidades', 'Hospitais', 'Estádios e eventos'],
    risk: 'Sem controle de acesso automatizado, sua empresa não consegue auditar quem entrou ou saiu das dependências, ficando exposta a furtos, invasões e responsabilidades legais.',
  },

  // ━━━ CONTROLE DE ACESSO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    slug: 'controle-de-acesso',
    category: 'controle-de-acesso',
    categoryLabel: 'Controle de Acesso',
    name: 'Controle de Acesso',
    tagline: 'Gestão inteligente de quem entra e sai da sua empresa.',
    description: 'Soluções completas de controle de acesso com coletores biométricos, faciais, RFID e QR Code para portas, portões e cancelas. Software de gerenciamento em tempo real com trilha de auditoria completa.',
    image: '/images/products/facial-term.png',
    problem: 'Uso de chaves físicas e cartões que podem ser compartilhados ou perdidos, impossibilidade de saber quem acessou áreas restritas e falta de controle sobre visitantes e prestadores.',
    solution: 'Sistema de controle de acesso com coletores de identificação adequados a cada ponto, integrados a software que registra, autoriza e audita todos os acessos em tempo real.',
    forWho: [
      'Empresas com áreas restritas (TI, estoque, laboratórios)',
      'Condomínios que precisam controlar visitantes',
      'Hospitais com áreas críticas (UTI, farmácia)',
      'Indústrias com zonas de segurança',
      'Prédios comerciais com múltiplos inquilinos',
    ],
    whenToUse: [
      'Quando chaves e cartões são compartilhados entre funcionários',
      'Quando você precisa saber quem acessou cada área e quando',
      'Quando visitantes e prestadores precisam de acesso controlado',
      'Quando há perdas em estoques e áreas de valor',
    ],
    problemsSolved: [
      'Elimina compartilhamento de chaves e cartões',
      'Registra quem acessou cada área com hora e data',
      'Permite bloqueio remoto imediato de acessos',
      'Controla visitantes com cadastro e autorização prévia',
      'Reduz perdas em estoques e áreas de TI',
      'Integra ponto eletrônico com controle de acesso',
    ],
    benefits: [
      'Relatório completo de quem acessou cada área',
      'Higiene total com identificação sem contato (facial)',
      'Bloqueio remoto imediato via software',
      'Integração com catracas, portas e cancelas',
      'Múltiplas tecnologias de identificação',
      'Software on-line com monitoramento em tempo real',
    ],
    specs: [
      { label: 'Tipo', value: 'Coletores autônomos ou em rede' },
      { label: 'Tecnologia', value: 'Facial / Biometria / RFID / QR Code' },
      { label: 'Conectividade', value: 'WiFi / TCP/IP / Bluetooth' },
      { label: 'Conformidade', value: 'Certificações de segurança eletrônica' },
    ],
    variants: [
      {
        slug: 'biometrico',
        name: 'Biométrico (Digital)',
        shortDescription: 'Controle de acesso por impressão digital. Dispensa cartões e chaves.',
        image: '/images/products/facial-term.png',
        highlights: [
          'Sensor óptico de alta resolução',
          'Impossível de compartilhar (biometria única)',
          'Ideal para áreas restritas e laboratórios',
          'Funciona online ou offline',
        ],
      },
      {
        slug: 'facial',
        name: 'Reconhecimento Facial',
        shortDescription: 'Identificação sem contato por reconhecimento facial com IA. Higiênico e seguro.',
        image: '/images/products/facial-term.png',
        highlights: [
          'Sem contato físico (higiênico)',
          'IA com detecção de rosto vivo',
          'Funciona com máscara de proteção',
          'Ideal para hospitais e ambientes limpos',
        ],
      },
      {
        slug: 'rfid',
        name: 'Cartão RFID',
        shortDescription: 'Leitura por aproximação de cartões de proximidade padrão Mifare ou RFID 125kHz.',
        image: '/images/products/facial-term.png',
        highlights: [
          'Compatível com Mifare e RFID 125kHz',
          'Ideal para visitantes e prestadores',
          'Custo reduzido por ponto de acesso',
          'Fácil de integrar com crachás existentes',
        ],
      },
      {
        slug: 'qr-code',
        name: 'QR Code',
        shortDescription: 'Identificação por leitura de QR Code. Prático para visitantes e acessos temporários.',
        image: '/images/products/facial-term.png',
        highlights: [
          'Ideal para visitantes e acessos temporários',
          'QR Code pode ser enviado por e-mail/WhatsApp',
          'Sem custo com cartões ou crachás',
          'Integração com portarias e recepções',
        ],
      },
    ],
    applications: ['Salas de servidores e TI', 'Estoques e almoxarifados', 'Hospitais e UTIs', 'Condomínios', 'Portarias industriais'],
    risk: 'Sem controle de acesso automatizado, não há como provar quem acessou áreas restritas em caso de furtos, perdas ou incidentes. Chaves compartilhadas eliminam qualquer possibilidade de auditoria.',
  },

  // ━━━ BASTÃO DE RONDA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    slug: 'bastao-de-ronda',
    category: 'seguranca-operacional',
    categoryLabel: 'Segurança Operacional',
    name: 'Bastão de Ronda – Kit Viggia',
    tagline: 'Controle total de rondas e rotas de segurança.',
    description: 'O Kit Viggia é formado por três componentes (Bastão Viggia, iButtons e Software TopRonda) que juntos formam uma solução completa para controle de rondas. Permite monitorar a equipe de vigilância para assegurar execução correta de roteiros e horários, sendo robusto, confiável e com excelente custo-benefício.',
    image: '/images/products/bastao-de-ronda.png',
    problem: 'Falta de controle efetivo sobre o percurso e os horários das rondas noturnas e de segurança patrimonial. Impossibilidade de comprovar que o vigilante realmente passou por todos os pontos no horário previsto.',
    solution: 'Bastão de leitura de botões inteligentes (iButtons) fixados nos postos de verificação, descarregando logs invioláveis no software TopRonda para relatórios detalhados e auditoria completa.',
    forWho: [
      'Empresas de segurança patrimonial e vigilância',
      'Condomínios residenciais e empresariais',
      'Indústrias com áreas de risco',
      'Shoppings e centros comerciais',
      'Hospitais e instituições',
    ],
    whenToUse: [
      'Quando você precisa garantir que as rondas estão sendo feitas',
      'Quando há suspeita de que vigias não estão cumprindo a rota',
      'Quando precisa de relatórios para auditoria de segurança',
      'Quando rotas de manutenção ou inspeção precisam ser controladas',
    ],
    problemsSolved: [
      'Comprova que a ronda foi realizada na rota e horário previstos',
      'Elimina a possibilidade de rondas falsificadas',
      'Gera relatórios automáticos para auditoria',
      'Monitora rotas de manutenção e inspeção',
      'Aumenta a responsabilidade da equipe de segurança',
      'Reduz riscos patrimoniais por negligência na vigilância',
    ],
    benefits: [
      'Kit completo: bastão + iButtons + software TopRonda',
      'Leitura de iButtons inteligente e ultra-rápida',
      'Relatórios detalhados com horário de cada ponto',
      'Design emborrachado para alta durabilidade',
      'Sinalização sonora e luminosa para orientar o vigia',
      'Comunicação nativa via USB – simples e confiável',
    ],
    specs: [
      { label: 'Tipo', value: 'Kit Viggia (Hardware + Software)' },
      { label: 'Tecnologia', value: 'Leitura de contato iButton' },
      { label: 'Conectividade', value: 'Comunicação nativa via USB' },
      { label: 'Conformidade', value: 'Auditoria patrimonial e segurança' },
    ],
    applications: ['Empresas de segurança', 'Condomínios', 'Indústrias', 'Shoppings', 'Hospitais', 'Rotas de manutenção'],
    risk: 'Sem controle de rondas, sua empresa não consegue comprovar que a vigilância foi executada corretamente. Em caso de incidentes (furto, vandalismo, incêndio), a responsabilidade recai sobre a gestão que não monitorou.',
  },
]

// ─── HELPERS ────────────────────────────────────────────────────────────────────

export function getSolutionBySlug(slug: string) {
  return solutions.find(s => s.slug === slug)
}

export function getSolutionsByCategory(category: string) {
  return solutions.filter(s => s.category === category)
}

export function getVariantBySlug(solutionSlug: string, variantSlug: string) {
  const solution = getSolutionBySlug(solutionSlug)
  return solution?.variants?.find(v => v.slug === variantSlug)
}
