import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { solutions } from '@/data/solutions'

/**
 * Geração dinâmica de sitemap para o Next.js.
 * Melhora a indexação pelos motores de busca (Google, Bing).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Rotas estáticas principais
  const staticRoutes = [
    { url: `${SITE_URL}`, priority: 1 },
    { url: `${SITE_URL}/solucoes`, priority: 0.9 },
    { url: `${SITE_URL}/sobre`, priority: 0.8 },
    { url: `${SITE_URL}/contato`, priority: 0.8 },
    { url: `${SITE_URL}/compliance`, priority: 0.6 },
    { url: `${SITE_URL}/privacidade`, priority: 0.5 },
  ].map((route) => ({
    ...route,
    lastModified,
    changeFrequency: 'monthly' as const,
  }))

  // Rotas das soluções principais
  const solutionRoutes = solutions.map((solution) => ({
    url: `${SITE_URL}/solucoes/${solution.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Rotas das variantes (subpáginas)
  const variantRoutes = solutions
    .filter((solution) => solution.variants && solution.variants.length > 0)
    .flatMap((solution) =>
      solution.variants!.map((variant) => ({
        url: `${SITE_URL}/solucoes/${solution.slug}/${variant.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      }))
    )

  return [...staticRoutes, ...solutionRoutes, ...variantRoutes]
}
