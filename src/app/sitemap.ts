import type { MetadataRoute } from 'next'
import { SITE_URL, ROUTES } from '@/lib/constants'
import { products } from '@/data/products'

/**
 * Geração dinâmica de sitemap para o Next.js.
 * Melhora a indexação pelos motores de busca (Google, Bing).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Rotas estáticas
  const staticRoutes = [
    '',
    ROUTES.solutions,
    ROUTES.about,
    ROUTES.contact,
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Rotas dinâmicas das soluções
  const dynamicRoutes = products.map((prod) => ({
    url: `${SITE_URL}${ROUTES.solution(prod.category, prod.slug)}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...dynamicRoutes]
}
