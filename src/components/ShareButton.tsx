"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Check, Share2 } from "lucide-react";
import { encodeShareState } from "@/lib/shareState";

/** Copies a link that encodes the current tool config into a query param, so the exact state can be reopened. */
export function ShareButton({
  state,
  paramName = "s",
  className = "",
}: {
  state: unknown;
  paramName?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  const share = useCallback(async () => {
    const encoded = encodeShareState(state);
    const url = new URL(window.location.href);
    url.searchParams.set(paramName, encoded);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — nothing useful to show.
    }
  }, [state, paramName]);

  return (
    <button
      onClick={share}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
        copied
          ? "bg-green-600/20 border-green-500/40 text-green-600 dark:text-green-400"
          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
      } ${className}`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
