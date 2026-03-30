/**
 * 4Core Service Worker
 * Strategy: Stale-while-revalidate for static assets + Network-first for API
 */

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `4core-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `4core-dynamic-${CACHE_VERSION}`;
const API_CACHE = `4core-api-${CACHE_VERSION}`;

// Assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/images/logo-white.png',
  '/images/logo-purple.png',
  '/images/products/facial-reader.png',
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Precaching critical assets');
        return cache.addAll(PRECACHE_ASSETS).catch(() => {
          // Silently fail if offline during install
          console.log('[SW] Some assets could not be precached (offline)');
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== API_CACHE &&
            cacheName.startsWith('4core-')
          ) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - main caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API routes: network-first with API cache fallback
  if (url.pathname.startsWith('/api/')) {
    return event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response.status === 200) {
            const cache = caches.open(API_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          // Return cached response if offline
          return caches.match(request).then((cached) => {
            return cached || new Response('Offline', { status: 503 });
          });
        })
    );
  }

  // Static assets: stale-while-revalidate
  if (
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/fonts/')
  ) {
    return event.respondWith(
      caches.match(request).then((cached) => {
        // Return cached immediately
        const fetchPromise = fetch(request).then((response) => {
          // Update cache in background if response is fresh
          if (response.status === 200) {
            const cache = caches.open(STATIC_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        });

        // Return cached or fetch if not cached
        return cached || fetchPromise;
      })
    );
  }

  // HTML pages: network-first with fallback to cache
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    return event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const cache = caches.open(DYNAMIC_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches
            .match(request)
            .then((cached) => cached || caches.match('/'))
            .catch(() => new Response('Offline page not available', { status: 503 }));
        })
    );
  }

  // Default: network-first
  return event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Background sync for contact forms
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-contacts') {
    event.waitUntil(syncPendingContacts());
  }
});

async function syncPendingContacts() {
  // Sync pending contact submissions when back online
  // Implementation depends on your contact form storage strategy
  console.log('[SW] Syncing pending contacts...');
}

// Push notifications (future)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
});
