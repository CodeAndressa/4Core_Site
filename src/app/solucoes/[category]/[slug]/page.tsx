import { notFound } from 'next/navigation'
import { getProductBySlug, getCategoryBySlug } from '@/data/products'
import { ProductHero } from '@/components/sections/product/ProductHero'
import { ProductContextSection } from '@/components/sections/product/ProductContextSection'
import { ProblemSolution } from '@/components/sections/product/ProblemSolution'
import { ProductSpecs } from '@/components/sections/product/ProductSpecs'
import { ProductBenefits } from '@/components/sections/product/ProductBenefits'
import { ImplementationSection } from '@/components/sections/product/ImplementationSection'
import { CTA } from '@/components/sections/CTA'

// Contexto de uso por produto
const productContextData: Record<string, any> = {
  'relogio-de-ponto': {
    forWho: [
      'Empresas com equipes 100% presenciais',
      'Negócios que precisam de registro biométrico',
      'Empresas de 20 a 500+ funcionários',
      'Organizações que buscam conformidade total'
    ],
    solves: [
      'Elimina fraudes de ponto (ponto de colega)',
      'Garante conformidade com Portaria 671',
      'Reduz tempo de fechamento da folha',
      'Gera arquivos AFDT/ACJEF válidos para fiscalização'
    ],
    when: [
      'Quando você precisa substituir cartão de ponto',
      'Quando há suspeita de fraudes no registro',
      'Quando a fiscalização exige conformidade',
      'Quando o fechamento da folha é manual e demorado'
    ],
    risk: 'Sem relógio de ponto certificado, sua empresa está exposta a multas de até R$ 6 mil por funcionário e processos trabalhistas por horas extras não registradas. Além disso, registros manuais ou cartões são facilmente contestados na justiça.'
  },
  'ponto-web': {
    forWho: [
      'Departamento Pessoal e RH',
      'Empresas com múltiplas unidades',
      'Gestão que precisa de relatórios em tempo real',
      'Negócios que buscam automatização'
    ],
    solves: [
      'Centraliza gestão de todos os pontos',
      'Automatiza cálculo de horas extras e banco de horas',
      'Integra com sistemas de folha (ERP)',
      'Gera relatórios para auditoria e fiscalização'
    ],
    when: [
      'Quando o fechamento da folha é manual e demorado',
      'Quando há erros frequentes na importação de dados',
      'Quando você precisa de visão consolidada',
      'Quando a equipe de DP perde tempo com retrabalho'
    ],
    risk: 'Gestão manual de ponto gera inconsistências que resultam em pagamentos indevidos, retrabalho no fechamento da folha e vulnerabilidade em auditorias trabalhistas. Dados não integrados aumentam em 300% o risco de erros.'
  },
  'sistema-de-ponto': {
    forWho: [
      'Empresas com equipes externas (vendas, manutenção)',
      'Negócios com trabalho remoto ou híbrido',
      'Empresas de serviços em campo',
      'Organizações com múltiplos locais de trabalho'
    ],
    solves: [
      'Controla jornada com geolocalização e foto',
      'Registra ponto de qualquer lugar',
      'Valida presença em campo',
      'Integra com sistema web para gestão centralizada'
    ],
    when: [
      'Quando funcionários trabalham fora da empresa',
      'Quando você precisa comprovar presença em campo',
      'Quando há trabalho remoto ou híbrido',
      'Quando é necessário rastrear localização'
    ],
    risk: 'Equipes externas sem controle adequado geram passivos trabalhistas por horas extras não registradas e impossibilidade de comprovar jornada. Sem geolocalização, você não consegue validar se o funcionário estava no local de trabalho.'
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await params
  
  const product = getProductBySlug(slug)
  const category = getCategoryBySlug(categorySlug)

  if (!product || !category || !product.categories.includes(categorySlug as any)) {
    notFound()
  }

  const context = productContextData[slug] || {
    forWho: ['Empresas que buscam conformidade'],
    solves: ['Resolve problemas de controle e gestão'],
    when: ['Quando você precisa de uma solução profissional'],
    risk: 'Sem controle adequado, sua empresa está exposta a riscos trabalhistas.'
  }

  return (
    <main className="flex-1 bg-white">
      {/* 1. Hero: Impacto e Proposta de Valor do Produto */}
      <ProductHero 
        name={product.name}
        categoryName={category.name}
        description={product.description}
        image={product.image}
      />
      
      {/* 2. NOVO: Contexto de Uso - Para quem é, O que resolve, Quando usar, Risco */}
      <ProductContextSection
        forWho={context.forWho}
        solves={context.solves}
        when={context.when}
        risk={context.risk}
      />
      
      {/* 3. O Cenário: Qual dor resolve e qual solução a 4Core traz */}
      <ProblemSolution 
        problem={product.problem}
        solution={product.solution}
      />
      
      {/* 4. Base Técnica: Robustez e Engenharia */}
      <ProductSpecs 
        specs={product.specs}
      />
      
      {/* 5. Valor Operacional: Onde aplicar e o que ganha */}
      <ProductBenefits 
        benefits={product.benefits}
        applications={product.applications}
      />
      
      {/* 6. NOVO: Diferencial Crítico - Implementação 4Core */}
      <ImplementationSection />
      
      {/* 7. Conversão Final: Especialista e Orçamento Orientado */}
      <CTA />
    </main>
  )
}

