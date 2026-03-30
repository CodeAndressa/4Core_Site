/**
 * Contatos comerciais centralizados
 * Estes são os ÚNICOS números que devem ser usados no projeto
 * Todos os outros telefones devem ser removidos
 */

export const commercialContacts = {
  /**
   * Contato comercial primário
   * Usado como padrão em CTAs e formulários
   */
  primary: '5541988035657',

  /**
   * Contato comercial secundário
   * Usado para variar os pontos de contato do site
   */
  secondary: '5541988476431',

  /**
   * Suporte técnico
   * Número para problemas técnicos (se aplicável)
   */
  support: '', // Deixar vazio se não houver um diferente
} as const

/**
 * Obtém um número comercial de forma variada (alternando entre primary e secondary)
 * Útil para distribuir cliques entre múltiplos contatos
 * @param useSecondary - Se true, retorna o secondary. Se false ou undefined, alterna baseado em hash
 */
export function getCommercialNumber(useSecondary?: boolean): string {
  if (useSecondary === true) return commercialContacts.secondary
  if (useSecondary === false) return commercialContacts.primary

  // Alterna dinamicamente baseado no pathname ou timestamp
  // Garante distribuição variada sem necessidade de estado
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    const hash = pathname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return hash % 2 === 0 ? commercialContacts.primary : commercialContacts.secondary
  }

  // Server-side: usa timestamp para variar
  return Date.now() % 2 === 0 ? commercialContacts.primary : commercialContacts.secondary
}

/**
 * Retorna ambos os números (útil para testes ou documentação)
 */
export function getAllCommercialNumbers(): string[] {
  return [commercialContacts.primary, commercialContacts.secondary]
}
