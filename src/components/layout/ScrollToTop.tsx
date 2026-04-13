import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** Resets window scroll on client-side navigation (SPA default keeps previous scroll). */
export function ScrollToTop() {
  const { key, pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  const getStorageKey = (locationKey: string) => `scroll-position:${locationKey}`;

  useEffect(() => {
    const saveScrollPosition = () => {
      try {
        sessionStorage.setItem(getStorageKey(key), String(window.scrollY));
      } catch {
        // Ignore storage errors (private mode/quota).
      }
    };

    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return saveScrollPosition;
      }
    }

    if (navigationType === "POP") {
      try {
        const stored = sessionStorage.getItem(getStorageKey(key));
        if (stored !== null) {
          const y = Number(stored);
          if (!Number.isNaN(y)) {
            window.scrollTo(0, y);
            return saveScrollPosition;
          }
        }
      } catch {
        // Ignore storage errors and fallback to top.
      }
    }

    window.scrollTo(0, 0);

    return saveScrollPosition;
  }, [key, pathname, hash, navigationType]);

  return null;
}
