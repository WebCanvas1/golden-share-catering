/**
 * Data store for editable website content.
 *
 * CURRENT BEHAVIOR (preview / development):
 *   All data is persisted in the browser's localStorage so the admin panel
 *   works immediately without backend setup.
 *
 * PRODUCTION (Cloudflare Pages/Workers with KV):
 *   1. Create a KV namespace: `wrangler kv:namespace create SITE_DATA`
 *   2. Bind it in wrangler.toml:
 *        [[kv_namespaces]]
 *        binding = "SITE_DATA"
 *        id = "<your-namespace-id>"
 *   3. Switch fetchSiteData / saveSiteData below to call the
 *      `/api/data` server route (see src/routes/api/data.ts), which is
 *      already wired with a Cloudflare KV adapter stub.
 *
 * The single key used in both backends is "site_data".
 */

import { DEFAULT_DATA, type SiteData } from "./defaults";

const STORAGE_KEY = "site_data";

/** True once the user is in the browser (avoid SSR window access). */
function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/** Load site data. Falls back to DEFAULT_DATA when nothing is stored yet. */
export function loadSiteData(): SiteData {
  if (!isBrowser()) return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw) as Partial<SiteData>;
    // Merge so newly added default fields appear even on old stored data.
    return {
      ...DEFAULT_DATA,
      ...parsed,
      hero: { ...DEFAULT_DATA.hero, ...(parsed.hero ?? {}) },
      business: { ...DEFAULT_DATA.business, ...(parsed.business ?? {}) },
      delivery: { ...DEFAULT_DATA.delivery, ...(parsed.delivery ?? {}) },
      menuItems: parsed.menuItems ?? DEFAULT_DATA.menuItems,
      packages: parsed.packages ?? DEFAULT_DATA.packages,
      addOns: parsed.addOns ?? DEFAULT_DATA.addOns,
      gallery: parsed.gallery ?? DEFAULT_DATA.gallery,
    };
  } catch {
    return DEFAULT_DATA;
  }
}

/** Persist site data. */
export function saveSiteData(data: SiteData): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Notify other tabs / listeners that data changed.
  window.dispatchEvent(new CustomEvent("site-data-changed"));
}

/** Reset everything back to defaults (handy in admin). */
export function resetSiteData(): SiteData {
  if (isBrowser()) {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("site-data-changed"));
  }
  return DEFAULT_DATA;
}

/** Random id helper for new menu items / packages / etc. */
export function uid(prefix = "x"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
