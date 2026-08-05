/**
 * lib/api.js
 * Central fetch helpers for all FitX Health API calls.
 * These work in both Server Components (SSR/SSG) and Client Components.
 *
 * API URL is controlled via environment variables:
 *   - Local dev:  NEXT_PUBLIC_API_URL=http://localhost:5000/api  (in .env.local)
 *   - Production: Railway / Render backend URL
 */

import { FALLBACK_PRODUCTS, FALLBACK_COMBOS, FALLBACK_SETTINGS } from './fallbackData.js';

export const API_BASE =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) ||
  'https://backend-production-2f402.up.railway.app/api';

/**
 * Fetch wrapper with built-in timeout to avoid long SSR/client hanging.
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/**
 * Helper to process product metadata (inline flags in description, sizes sorting, etc.)
 */
function processProduct(p) {
  if (!p) return p;
  const product = { ...p };
  // Sort sizes by price ascending
  if (product.sizes && Array.isArray(product.sizes)) {
    product.sizes = [...product.sizes].sort((a, b) => (a.price || 0) - (b.price || 0));
  }

  // Parse inline flags from description string
  if (product.description?.includes('<!--[GF]-->')) {
    product.glutenFree = true;
    product.description = product.description.replace(/ ?<!--\[GF\]-->/g, '');
  }
  if (product.description?.includes('<!--[IMAGES:')) {
    const match = product.description.match(/ ?<!--\[IMAGES:(.*?)\]-->/);
    if (match?.[1]) {
      try { product.images = JSON.parse(match[1]); } catch (_) {}
      product.description = product.description.replace(match[0], '');
    }
  }
  if (product.description?.includes('<!--[SUBCAT:')) {
    const match = product.description.match(/ ?<!--\[SUBCAT:(.*?)\]-->/);
    if (match?.[1]) {
      product.subCategory = match[1];
      product.description = product.description.replace(match[0], '');
    }
  }
  if (product.description?.includes('<!--[STACK:')) {
    const match = product.description.match(/ ?<!--\[STACK:(.*?)\]-->/);
    if (match?.[1]) {
      product.stackGroup = match[1];
      product.description = product.description.replace(match[0], '');
    }
  }
  if (product.description?.includes('<!--[STACK_PRIORITY:')) {
    const match = product.description.match(/ ?<!--\[STACK_PRIORITY:(.*?)\]-->/);
    if (match?.[1]) {
      product.stackPriority = parseInt(match[1], 10);
      product.description = product.description.replace(match[0], '');
    }
  }
  return product;
}

// ─── Products ────────────────────────────────────────────────────────────────

/**
 * Fetch all products. Falls back to bundled catalog data if backend is offline/slow.
 */
export async function getProducts() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/products`, { cache: 'no-store' }, 4000);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data.map(processProduct);
    }
  } catch (err) {
    console.warn('[api] getProducts fetch failed or timed out, using fallback catalog:', err.message);
  }

  // Graceful fallback to bundled catalog
  return FALLBACK_PRODUCTS.map(processProduct);
}

/**
 * Fetch a single product by slug. Falls back to bundled catalog data if needed.
 */
export async function getProductBySlug(slug) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/products/${slug}`, { cache: 'no-store' }, 4000);
    const data = await res.json();
    if (data.success && data.data) {
      return processProduct(data.data);
    }
  } catch (err) {
    console.warn(`[api] getProductBySlug(${slug}) failed or timed out:`, err.message);
  }

  // Graceful fallback lookup
  const found = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
  return found ? processProduct(found) : null;
}

// ─── Combos ──────────────────────────────────────────────────────────────────

/** Fetch all combo packs. */
export async function getCombos() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/combos`, { cache: 'no-store' }, 4000);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
  } catch (err) {
    console.warn('[api] getCombos fetch failed or timed out, using fallback combos:', err.message);
  }
  return FALLBACK_COMBOS;
}

/** Fetch a single combo by its slug. */
export async function getComboBySlug(slug) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/combos/slug/${slug}`, { cache: 'no-store' }, 4000);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (err) {
    console.warn(`[api] getComboBySlug(${slug}) failed or timed out:`, err.message);
  }

  const found = FALLBACK_COMBOS.find((c) => c.comboSlug === slug || c.slug === slug);
  return found || null;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

/**
 * Fetch global site settings (FOMO toggles, notice strip, maintenance mode).
 */
export async function getSettings() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/settings/public`, { cache: 'no-store' }, 3000);
    const data = await res.json();
    if (data.success && data.data) return data.data;
  } catch (err) {
    console.warn('[api] getSettings failed or timed out, using default settings:', err.message);
  }
  return FALLBACK_SETTINGS;
}

/**
 * Fetch the current site version number (used for polling-based auto-refresh).
 */
export async function getSiteVersion() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/settings/version`, { cache: 'no-store' }, 2000);
    const data = await res.json();
    return data.success ? data.version : null;
  } catch (_) {
    return null;
  }
}

// ─── Orders ───────────────────────────────────────────────────────────────────

/**
 * Fetch recent confirmed orders for the Social Proof Popup.
 */
export async function getRecentOrders() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/orders/recent`, { cache: 'no-store' }, 3000);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (_) {
    return [];
  }
}

/**
 * Create a new pending order on the backend.
 */
export async function createOrder(payload) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

/**
 * Submit a product review.
 */
export async function submitReview(productId, payload) {
  const res = await fetch(`${API_BASE}/products/${productId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ─── Analytics ────────────────────────────────────────────────────────────────

/**
 * Fire a product view event (analytics only, fire-and-forget).
 */
export function trackProductView(productId, source = 'unknown') {
  if (!productId) return;
  fetch(`${API_BASE}/products/${productId}/view`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({ source, ts: Date.now() }),
  }).catch(() => {});
}

// ─── Auth ────────────────────────────────────────────────────────────────────

/**
 * Authenticate admin user.
 */
export async function adminLogin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// ─── Notifications ────────────────────────────────────────────────────────────

export async function subscribeToRestock(payload) {
  const data = {
    ...payload,
    phoneNumber: payload.phone || payload.phoneNumber
  };
  const res = await fetch(`${API_BASE}/notifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getNotifications(token) {
  const res = await fetch(`${API_BASE}/notifications`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function updateNotificationStatus(id, status, token) {
  const res = await fetch(`${API_BASE}/notifications/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function deleteNotification(id, token) {
  const res = await fetch(`${API_BASE}/notifications/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function getProductPerformance(token) {
  const res = await fetch(`${API_BASE}/products/analytics/performance`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function getOrders(token) {
  const res = await fetch(`${API_BASE}/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

// ─── AI Stack Builder ────────────────────────────────────────────────────────

export async function recommendAiStack(query) {
  const res = await fetch(`${API_BASE}/ai/recommend-stack`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

export async function chatRecommend(query) {
  const res = await fetch(`${API_BASE}/ai/chat-recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

export async function syncGoogleSheets(googleWebAppUrl, payload, token) {
  const res = await fetch(`${API_BASE}/settings/sync-sheets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ googleWebAppUrl, payload })
  });
  return res.json();
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export async function getUserProfile() {
  const res = await fetch(`${API_BASE}/user/profile`, { credentials: 'include', cache: 'no-store' });
  return res.json();
}

export async function updateUserProfile(payload) {
  const res = await fetch(`${API_BASE}/user/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateAiProfile(payload) {
  const res = await fetch(`${API_BASE}/user/ai-profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ─── User Orders ──────────────────────────────────────────────────────────────

export async function getUserOrders() {
  const res = await fetch(`${API_BASE}/user/orders`, { credentials: 'include', cache: 'no-store' });
  return res.json();
}

// ─── Addresses ────────────────────────────────────────────────────────────────

export async function getAddresses() {
  const res = await fetch(`${API_BASE}/user/addresses`, { credentials: 'include', cache: 'no-store' });
  return res.json();
}

export async function addAddress(payload) {
  const res = await fetch(`${API_BASE}/user/address`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateAddress(id, payload) {
  const res = await fetch(`${API_BASE}/user/address/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteAddress(id) {
  const res = await fetch(`${API_BASE}/user/address/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
}

export async function setDefaultAddress(id) {
  const res = await fetch(`${API_BASE}/user/address/${id}/default`, {
    method: 'PUT',
    credentials: 'include',
  });
  return res.json();
}
