"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { ALL_TOOLS } from "@/lib/tool-registry";
import { useToolHistory } from "@/hooks/useToolHistory";

const MAX_RESULTS = 12;
export const OPEN_COMMAND_PALETTE_EVENT = "open-command-palette";

const TOOLS = ALL_TOOLS.map(t => ({
  href: t.href,
  title: t.title,
  desc: t.description,
  cat: t.category,
}));

const TOOLS_BY_HREF = new Map(TOOLS.map(t => [t.href, t]));

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { favorites, recents, toggleFavorite } = useToolHistory();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
        setQuery("");
        setIdx(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpenEvent = () => { setOpen(true); setQuery(""); setIdx(0); };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  // With no query, lead with favorites and recents (deduped) before filling out with the rest.
  const defaultList = useMemo(() => {
    const seen = new Set<string>();
    const pinned = [
      ...favorites.map(h => TOOLS_BY_HREF.get(h)).filter((t): t is typeof TOOLS[number] => !!t),
      ...recents.map(r => TOOLS_BY_HREF.get(r.href)).filter((t): t is typeof TOOLS[number] => !!t),
    ].filter(t => (seen.has(t.href) ? false : (seen.add(t.href), true)));
    const rest = TOOLS.filter(t => !seen.has(t.href));
    return [...pinned, ...rest].slice(0, MAX_RESULTS);
  }, [favorites, recents]);

  const filtered = query.trim()
    ? TOOLS.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.desc.toLowerCase().includes(query.toLowerCase()) ||
        t.cat.toLowerCase().includes(query.toLowerCase())
      ).slice(0, MAX_RESULTS)
    : defaultList;

  useEffect(() => {
    itemRefs.current[idx]?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    router.push(href);
  }, [router]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-white dark:bg-slate-950/80 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div className="w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800/60">
            <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setIdx(0); }}
              onKeyDown={e => {
                if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)); }
                if (e.key === "ArrowUp")   { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
                if (e.key === "Enter" && filtered[idx]) navigate(filtered[idx].href);
              }}
              placeholder="Search tools…"
              className="flex-1 bg-transparent text-slate-900 dark:text-white text-sm focus:outline-none placeholder:text-slate-600"
            />
            <kbd className="text-slate-400 dark:text-slate-600 text-xs bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono shrink-0">esc</kbd>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8">No tools found</p>
            ) : (
              filtered.map((tool, i) => {
                const isFav = favorites.includes(tool.href);
                return (
                <button
                  key={tool.href}
                  ref={el => { itemRefs.current[i] = el; }}
                  onClick={() => navigate(tool.href)}
                  onMouseEnter={() => setIdx(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === idx ? "bg-blue-600/20" : "hover:bg-slate-100 dark:hover:bg-slate-800/40"}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${i === idx ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>{tool.title}</p>
                    <p className="text-slate-500 text-xs truncate">{tool.desc}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 shrink-0 hidden sm:block">{tool.cat}</span>
                  <span
                    role="button"
                    tabIndex={-1}
                    onClick={e => { e.stopPropagation(); toggleFavorite(tool.href); }}
                    className={`shrink-0 p-1 rounded transition-colors ${isFav ? "text-amber-400" : "text-slate-400 dark:text-slate-700 hover:text-slate-600 dark:hover:text-slate-400"}`}
                    aria-label={isFav ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
                  >
                    <Star className="w-3.5 h-3.5" fill={isFav ? "currentColor" : "none"} />
                  </span>
                </button>
                );
              })
            )}
          </div>
          <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center gap-4 text-xs text-slate-400 dark:text-slate-600">
            <span><kbd className="font-mono bg-slate-100 dark:bg-slate-800/80 px-1 rounded text-[10px]">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono bg-slate-100 dark:bg-slate-800/80 px-1 rounded text-[10px]">↵</kbd> open</span>
            <span className="ml-auto"><kbd className="font-mono bg-slate-100 dark:bg-slate-800/80 px-1 rounded text-[10px]">⌘K</kbd> toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
