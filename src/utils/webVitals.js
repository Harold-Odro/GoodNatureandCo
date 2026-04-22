/**
 * Web Vitals monitoring
 * Reports Core Web Vitals metrics (LCP, INP, CLS, FCP, TTFB)
 *
 * Metrics are sent to Google Analytics if configured,
 * otherwise logged to console in development.
 */

import { trackEvent } from './analytics';

function sendToAnalytics(metric) {
  const { name, value, rating, id } = metric;

  // Send to Google Analytics
  trackEvent('web_vitals', {
    metric_name: name,
    metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_rating: rating,
    metric_id: id,
  });

  // Log in development
  if (import.meta.env.DEV) {
    const color = rating === 'good' ? '#0cce6b' : rating === 'needs-improvement' ? '#ffa400' : '#ff4e42';
    console.log(
      `%c[Web Vitals] ${name}: ${value.toFixed(name === 'CLS' ? 3 : 0)} (${rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }
}

export function reportWebVitals() {
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  });
}
