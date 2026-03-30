/**
 * Service Worker Registration & Lifecycle Management
 * Registers SW and handles updates
 */

export function registerServiceWorker() {
  if (typeof window === 'undefined') return;

  // Service Workers only work over HTTPS (except localhost)
  if (!navigator.serviceWorker) {
    console.log('Service Workers not supported');
    return;
  }

  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
  
  const isSecure = window.location.protocol === 'https:' || isLocalhost;

  if (!isSecure) {
    console.log('Service Worker requires HTTPS');
    return;
  }

  // Register service worker
  navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then((registration) => {
      console.log('✓ Service Worker registered', registration.scope);

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // New SW available but not active
              // Notify user (implementation depends on your UI)
              console.log('✓ New version available. Refresh to update.');

              // Dispatch custom event for app to show update notification
              window.dispatchEvent(
                new CustomEvent('sw-update-available', {
                  detail: { registration },
                })
              );
            }
          });
        }
      });
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });

  // Handle controller change (when new SW activates)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('✓ Service Worker controller changed (page updated)');
  });
}

/**
 * Skip waiting - activates new service worker immediately
 * Useful for update notifications
 */
export function skipWaiting() {
  if (!navigator.serviceWorker?.controller) return;

  const registration = navigator.serviceWorker.controller;
  
  // Find waiting worker
  let waitingWorker = null;
  if ('getRegistrations' in navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => {
        if (reg.waiting) {
          waitingWorker = reg.waiting;
          waitingWorker.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    });
  }
}

/**
 * Unregister service worker
 */
export function unregisterServiceWorker() {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
}

/**
 * Get cache stats for debugging
 */
export async function getCacheStats() {
  if (!caches) return null;

  const cacheNames = await caches.keys();
  const stats: Record<string, number> = {};

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    stats[name] = keys.length;
  }

  return stats;
}

/**
 * Clear all caches
 */
export async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(cacheNames.map((name) => caches.delete(name)));
}
