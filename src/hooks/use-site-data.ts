import { useEffect, useState } from "react";
import { loadSiteData, saveSiteData } from "@/lib/data-store";
import { DEFAULT_DATA, type SiteData } from "@/lib/defaults";

/**
 * React hook to read the live site data, with cross-tab / cross-component
 * reactivity. Updates whenever localStorage or another component dispatches
 * the "site-data-changed" event.
 */
export function useSiteData(): [SiteData, (next: SiteData) => void] {
  const [data, setData] = useState<SiteData>(DEFAULT_DATA);

  useEffect(() => {
    setData(loadSiteData());
    const refresh = () => setData(loadSiteData());
    window.addEventListener("site-data-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("site-data-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const update = (next: SiteData) => {
    setData(next);
    saveSiteData(next);
  };

  return [data, update];
}
