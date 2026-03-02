/**
 * Google Analytics utility
 * Set VITE_GA_MEASUREMENT_ID in .env to enable tracking
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

export function initAnalytics() {
  if (!GA_ID || initialized) return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: false, // We'll send manually on route change
  });

  initialized = true;
}

export function trackPageView(path, title) {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
}

export function trackEvent(eventName, params = {}) {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', eventName, params);
}
