"use client";
import { useEffect } from "react";
import type { HistoryApi } from "@/hooks/useHistoryState";

/** Wires Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z to undo/redo, ignored while typing in an input/textarea. */
export function useUndoRedoShortcut({ undo, redo }: Pick<HistoryApi, "undo" | "redo">) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "z") return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      e.preventDefault();
      if (e.shiftKey) redo(); else undo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);
}
