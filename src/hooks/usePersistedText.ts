"use client";
import { useState, useEffect, useRef } from "react";

const MAX_LENGTH = 100_000;

/** Like useState, but debounced-persists the value to localStorage and restores it on mount. */
export function usePersistedText(key: string, initial = "") {
  const [value, setValue] = useState(initial);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) setValue(saved);
    } catch { /* storage unavailable */ }
    loaded.current = true;
  }, [key]);

  useEffect(() => {
    if (!loaded.current) return;
    const id = setTimeout(() => {
      try {
        if (value.length <= MAX_LENGTH) window.localStorage.setItem(key, value);
      } catch { /* storage unavailable */ }
    }, 500);
    return () => clearTimeout(id);
  }, [key, value]);

  return [value, setValue] as const;
}
