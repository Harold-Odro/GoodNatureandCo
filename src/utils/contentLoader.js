/**
 * Content Loader - Abstraction layer for content management
 *
 * Currently loads from local static data files.
 * To integrate a CMS (Sanity, Contentful, Strapi, etc.):
 *   1. Replace the fetch functions below with API calls
 *   2. Keep the same return shape so components don't need to change
 *   3. Optionally add caching with stale-while-revalidate pattern
 *
 * Environment variable: VITE_CMS_API_URL (optional)
 */

import { portfolioItems as localPortfolio } from '../data/portfolio';
import { products as localProducts } from '../data/products';
import { services as localServices } from '../data/services';

const CMS_URL = import.meta.env.VITE_CMS_API_URL;

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

async function fetchFromCMS(endpoint) {
  if (!CMS_URL) return null;

  const cached = getCached(endpoint);
  if (cached) return cached;

  try {
    const response = await fetch(`${CMS_URL}${endpoint}`);
    if (!response.ok) throw new Error(`CMS fetch failed: ${response.status}`);
    const data = await response.json();
    setCache(endpoint, data);
    return data;
  } catch (err) {
    console.warn(`CMS fetch failed for ${endpoint}, using local data:`, err.message);
    return null;
  }
}

export async function getPortfolioItems() {
  const cmsData = await fetchFromCMS('/portfolio');
  return cmsData || localPortfolio;
}

export async function getProducts() {
  const cmsData = await fetchFromCMS('/products');
  return cmsData || localProducts;
}

export async function getServices() {
  const cmsData = await fetchFromCMS('/services');
  return cmsData || localServices;
}

export async function getPortfolioByCategory(category) {
  const items = await getPortfolioItems();
  if (category === 'all') return items;
  return items.filter((item) => item.category === category);
}

/**
 * Hook-friendly content loader
 * Returns { data, loading, error } pattern
 */
export function createContentHook(fetcher) {
  return function useContent(...args) {
    const { useState, useEffect } = require('react');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let cancelled = false;
      setLoading(true);

      fetcher(...args)
        .then((result) => {
          if (!cancelled) {
            setData(result);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            setError(err.message);
            setLoading(false);
          }
        });

      return () => { cancelled = true; };
    }, [JSON.stringify(args)]);

    return { data, loading, error };
  };
}
