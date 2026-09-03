"use client";
import { Undo2, Redo2 } from "lucide-react";
import type { HistoryApi } from "@/hooks/useHistoryState";

export function UndoRedoButtons({ undo, redo, canUndo, canRedo }: HistoryApi) {
  return (
    <div className="flex items-center gap-1.5">
      <button onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
        <Undo2 className="w-3.5 h-3.5" />
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
        <Redo2 className="w-3.5 h-3.5" />
        Redo
      </button>
    </div>
  );
}
