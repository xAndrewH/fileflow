"use client";

import Link from "next/link";
import { Search, Sun, Moon, Monitor } from "lucide-react";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/components/CommandPalette";
import { useTheme, type Theme } from "@/contexts/ThemeContext";

interface Props {
  historyCount: number;
  onHistoryClick: () => void;
  onKeyClick?: () => void;
}

const THEME_ORDER: Theme[] = ["light", "dark", "system"];
const THEME_LABEL: Record<Theme, string> = { light: "Light theme", dark: "Dark theme", system: "System theme" };

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    const next = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length];
    setTheme(next);
  };

  const Icon = theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  return (
    <button
      onClick={cycleTheme}
      title={`Theme: ${THEME_LABEL[theme]} (click to change)`}
      aria-label="Toggle color theme"
      className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-150"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

export default function Navbar({ historyCount, onHistoryClick, onKeyClick }: Props) {
  return (
    <nav className="border-b border-slate-200 dark:border-slate-800/70 bg-white dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 8h4M10 8h4M8 2v4M8 10v4" />
              <circle cx="8" cy="8" r="2" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-[17px] tracking-tight">FileSpark</span>
          <span className="hidden md:flex items-center gap-1 text-slate-400 dark:text-slate-600 text-sm font-normal">
            <span className="mx-1">·</span>
            Free File Converter
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT))}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-all duration-150"
            aria-label="Search tools"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="text-[10px] text-slate-500 dark:text-slate-600 bg-slate-200 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono">⌘K</kbd>
          </button>
          <a
            href="https://buymeacoffee.com/Huppa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/15 hover:bg-yellow-500/25 border border-yellow-500/30 hover:border-yellow-500/50 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 text-sm font-medium transition-all duration-150"
          >
            <span className="text-base leading-none">☕</span>
            <span className="hidden sm:block">Buy me a coffee</span>
          </a>
          <Link
            href="/tools"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.654-4.654m5.654-4.654l3.029-2.498a4.25 4.25 0 011.244 4.753l-1.272 3.186" />
            </svg>
            <span>Tools</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            <span>80+ formats</span>
          </div>

          {onKeyClick && (
            <button
              onClick={onKeyClick}
              title="CloudConvert API Key (for document & eBook conversion)"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-150"
              aria-label="CloudConvert API key settings"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </button>
          )}

          <ThemeToggle />

          <button
            onClick={onHistoryClick}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-all duration-150"
            aria-label="Conversion history"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:block font-medium">History</span>
            {historyCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {historyCount > 99 ? "99+" : historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
