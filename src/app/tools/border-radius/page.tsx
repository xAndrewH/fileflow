"use client";

import { useCallback } from "react";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { RelatedTools } from "@/components/RelatedTools";
import { useHistoryState } from "@/hooks/useHistoryState";
import { useUndoRedoShortcut } from "@/hooks/useUndoRedoShortcut";
import { UndoRedoButtons } from "@/components/UndoRedoButtons";

interface Corners { tl: number; tr: number; br: number; bl: number }
interface BorderRadiusConfig { linked: boolean; corners: Corners; unit: "px" | "%" }

const DEFAULT_CONFIG: BorderRadiusConfig = {
  linked: true,
  corners: { tl: 16, tr: 16, br: 16, bl: 16 },
  unit: "px",
};

export default function BorderRadiusPage() {
  const [config, setConfig, configHistory] = useHistoryState<BorderRadiusConfig>(DEFAULT_CONFIG);
  const { linked, corners, unit } = config;
  const patch = useCallback((p: Partial<BorderRadiusConfig>) => setConfig(c => ({ ...c, ...p })), [setConfig]);
  useUndoRedoShortcut(configHistory);

  const update = useCallback((key: keyof Corners, val: number) => {
    if (linked) {
      patch({ corners: { tl: val, tr: val, br: val, bl: val } });
    } else {
      setConfig(c => ({ ...c, corners: { ...c.corners, [key]: val } }));
    }
  }, [linked, patch, setConfig]);

  const { tl, tr, br, bl } = corners;
  const isUniform = tl === tr && tr === br && br === bl;
  const value = isUniform
    ? `${tl}${unit}`
    : `${tl}${unit} ${tr}${unit} ${br}${unit} ${bl}${unit}`;
  const css = `border-radius: ${value};`;

  const max = unit === "%" ? 50 : 120;

  const PRESETS: { label: string; corners: Corners }[] = [
    { label: "None",    corners: { tl: 0,  tr: 0,  br: 0,  bl: 0  } },
    { label: "Small",   corners: { tl: 4,  tr: 4,  br: 4,  bl: 4  } },
    { label: "Medium",  corners: { tl: 12, tr: 12, br: 12, bl: 12 } },
    { label: "Large",   corners: { tl: 24, tr: 24, br: 24, bl: 24 } },
    { label: "Pill",    corners: { tl: 50, tr: 50, br: 50, bl: 50 } },
    { label: "Leaf",    corners: { tl: 0,  tr: 50, br: 0,  bl: 50 } },
    { label: "Squircle",corners: { tl: 30, tr: 30, br: 30, bl: 30 } },
    { label: "Badge",   corners: { tl: 4,  tr: 4,  br: 0,  bl: 0  } },
  ];

  const CORNER_LABELS: { key: keyof Corners; label: string }[] = [
    { key: "tl", label: "Top Left" },
    { key: "tr", label: "Top Right" },
    { key: "br", label: "Bottom Right" },
    { key: "bl", label: "Bottom Left" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 text-sm mb-8 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Tools
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Border Radius Builder</h1>
        <p className="text-slate-500 text-sm mb-8">Shape rounded corners visually and copy the CSS.</p>

        <div className="space-y-5">
          {/* Preview */}
          <div className="flex items-center justify-center h-52 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-2xl">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-indigo-600 transition-all duration-200"
              style={{ borderRadius: value }} />
          </div>

          {/* CSS output */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
            <code className="flex-1 min-w-0 text-blue-700 dark:text-blue-300 text-sm font-mono">{css}</code>
            <UndoRedoButtons {...configHistory} />
            <CopyButton text={css} label="Copy CSS" className="shrink-0" />
          </div>

          {/* Unit + link */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-xl p-1">
              {(["px", "%"] as const).map(u => (
                <button key={u} onClick={() => {
                  const newMax = u === "%" ? 50 : 120;
                  patch({
                    unit: u,
                    corners: {
                      tl: Math.min(corners.tl, newMax),
                      tr: Math.min(corners.tr, newMax),
                      br: Math.min(corners.br, newMax),
                      bl: Math.min(corners.bl, newMax),
                    },
                  });
                }}
                  className={`px-4 py-1 rounded-lg text-sm transition-colors ${unit === u ? "bg-blue-600 text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                  {u}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={linked} onChange={e => patch({ linked: e.target.checked })} className="accent-blue-500" />
              <span className="text-slate-500 dark:text-slate-400 text-sm">Link all corners</span>
            </label>
          </div>

          {/* Sliders */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-xl p-4 space-y-4">
            {CORNER_LABELS.map(({ key, label }) => (
              <div key={key}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">{label}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{corners[key]}{unit}</span>
                </div>
                <input type="range" min={0} max={max} value={corners[key]}
                  onChange={e => update(key, +e.target.value)} className="w-full accent-blue-500" />
              </div>
            ))}
          </div>

          {/* Presets */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-xl p-4">
            <p className="text-slate-900 dark:text-white text-sm font-medium mb-3">Presets</p>
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map(p => {
                const pVal = p.corners.tl === p.corners.tr && p.corners.tr === p.corners.br && p.corners.br === p.corners.bl
                  ? `${p.corners.tl}px`
                  : `${p.corners.tl}px ${p.corners.tr}px ${p.corners.br}px ${p.corners.bl}px`;
                return (
                  <button key={p.label}
                    onClick={() => patch({
                      corners: p.corners,
                      linked: p.corners.tl === p.corners.tr && p.corners.tr === p.corners.br && p.corners.br === p.corners.bl,
                    })}
                    className="flex flex-col items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-blue-500/30 border border-blue-500/40" style={{ borderRadius: pVal }} />
                    <span className="text-slate-500 dark:text-slate-400 text-xs">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <RelatedTools current="/tools/border-radius" />
      </div>
    </div>
  );
}
