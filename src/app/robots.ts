import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * Configuração automática de robots.txt.
 * Indica aos crawlers quais páginas indexar e onde encontrar o sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
