/**
 * Fires a Google Ads conversion event (lead form submission).
 * The global `gtag_report_conversion` function is injected via <Script> in layout.tsx.
 */
export function fireGoogleAdsConversion() {
  if (typeof window !== 'undefined' && typeof (window as any).gtag_report_conversion === 'function') {
    ;(window as any).gtag_report_conversion()
  }
}
