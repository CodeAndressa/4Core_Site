/**
 * Core Web Vitals Tracking for 4Core
 * Monitors: LCP, FID, CLS, FCP, TTFB
 * 
 * Documentation:
 * - https://web.dev/vitals/
 * - https://github.com/GoogleChrome/web-vitals
 */

interface VitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

interface VitalsPayload {
  timestamp: string;
  url: string;
  vitals: {
    lcp?: VitalMetric;
    fid?: VitalMetric;
    cls?: VitalMetric;
    fcp?: VitalMetric;
    ttfb?: VitalMetric;
  };
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
}

// Thresholds (https://web.dev/vitals/)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 600, poor: 1800 }, // Time to First Byte
};

function getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metric as keyof typeof THRESHOLDS];
  if (!threshold) return 'needs-improvement';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Send vitals to analytics endpoint
 */
async function sendVitals(payload: VitalsPayload) {
  try {
    // Use sendBeacon if available (doesn't block page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', JSON.stringify(payload));
    } else {
      // Fallback to fetch with keepalive
      await fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(payload),
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('[Vitals] Failed to send metrics:', error);
  }
}

/**
 * Observe Web Vitals using PerformanceObserver API
 */
export function observeWebVitals() {
  if (typeof window === 'undefined') return;

  const vitals: VitalsPayload = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    vitals: {},
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };

  // Observe Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      const value = lastEntry.renderTime || lastEntry.loadTime || 0;

      vitals.vitals.lcp = {
        name: 'LCP',
        value: value,
        rating: getRating('LCP', value),
        delta: 0,
      };

      console.log(
        `[Vitals] LCP: ${value.toFixed(0)}ms (${vitals.vitals.lcp?.rating})`
      );
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.debug('[Vitals] LCP observer not supported');
  }

  // Observe First Input Delay (legacy, replaced by INP)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const value = (entry as any).processingDuration || 0;
        vitals.vitals.fid = {
          name: 'FID',
          value: value,
          rating: getRating('FID', value),
          delta: 0,
        };

        console.log(
          `[Vitals] FID: ${value.toFixed(0)}ms (${vitals.vitals.fid?.rating})`
        );
      });
    });

    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    console.debug('[Vitals] FID observer not supported (INP replaces it)');
  }

  // Observe Cumulative Layout Shift
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value || 0;
          vitals.vitals.cls = {
            name: 'CLS',
            value: parseFloat(clsValue.toFixed(3)),
            rating: getRating('CLS', clsValue),
            delta: 0,
          };

          console.log(
            `[Vitals] CLS: ${clsValue.toFixed(3)} (${vitals.vitals.cls?.rating})`
          );
        }
      });
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.debug('[Vitals] CLS observer not supported');
  }

  // Observe First Contentful Paint
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find((entry) => entry.name === 'first-contentful-paint');
      if (fcp) {
        vitals.vitals.fcp = {
          name: 'FCP',
          value: fcp.startTime,
          rating: getRating('FCP', fcp.startTime),
          delta: 0,
        };

        console.log(
          `[Vitals] FCP: ${fcp.startTime.toFixed(0)}ms (${vitals.vitals.fcp?.rating})`
        );
      }
    });

    fcpObserver.observe({ entryTypes: ['paint'] });
  } catch (e) {
    console.debug('[Vitals] FCP observer not supported');
  }

  // TTFB (from navigation timing)
  if (window.performance && window.performance.timing) {
    const ttfb =
      window.performance.timing.responseStart -
      window.performance.timing.fetchStart;
    vitals.vitals.ttfb = {
      name: 'TTFB',
      value: ttfb,
      rating: getRating('TTFB', ttfb),
      delta: 0,
    };

    console.log(`[Vitals] TTFB: ${ttfb.toFixed(0)}ms (${vitals.vitals.ttfb?.rating})`);
  }

  // Send metrics after page visibility changes or on unload
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendVitals(vitals);
    }
  });

  // Also send on unload (last chance)
  window.addEventListener('beforeunload', () => {
    sendVitals(vitals);
  });

  // Send initial metrics after 5 seconds
  setTimeout(() => {
    sendVitals(vitals);
  }, 5000);
}

/**
 * Get current vitals from performance API
 */
export function getCurrentVitals() {
  if (typeof window === 'undefined') return null;

  const metrics = {
    lcp: 0,
    fcp: 0,
    cls: 0,
    ttfb: 0,
  };

  if (window.performance) {
    // FCP
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
    if (fcp) metrics.fcp = fcp.startTime;

    // TTFB
    const navTiming = performance.getEntriesByType('navigation')[0] as any;
    if (navTiming) {
      metrics.ttfb = navTiming.responseStart - navTiming.fetchStart;
    }

    // LCP
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      const lastLcp = lcpEntries[lcpEntries.length - 1] as any;
      metrics.lcp = (lastLcp.renderTime || lastLcp.loadTime || 0);
    }

    // CLS
    const layoutShifts = performance.getEntriesByType('layout-shift');
    let clsValue = 0;
    layoutShifts.forEach((entry) => {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value || 0;
      }
    });
    metrics.cls = parseFloat(clsValue.toFixed(3));
  }

  return metrics;
}

/**
 * Log vitals to console (debug mode)
 */
export function logVitals() {
  const vitals = getCurrentVitals();
  if (!vitals) return;

  console.group('[Vitals] Current Metrics');
  console.log(`LCP (Largest Contentful Paint): ${vitals.lcp.toFixed(0)}ms`);
  console.log(`FCP (First Contentful Paint): ${vitals.fcp.toFixed(0)}ms`);
  console.log(`CLS (Cumulative Layout Shift): ${vitals.cls.toFixed(3)}`);
  console.log(`TTFB (Time to First Byte): ${vitals.ttfb.toFixed(0)}ms`);
  console.groupEnd();
}
