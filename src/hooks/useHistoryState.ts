"use client";
import { useState, useCallback, useRef } from "react";

export interface HistoryApi {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

/** Like useState, but keeps an undo/redo stack of every distinct value it's set to. */
export function useHistoryState<T>(initial: T, limit = 50) {
  const [state, setStateInternal] = useState(initial);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const stateRef = useRef(initial);
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);

  const setState = useCallback((updater: T | ((prev: T) => T)) => {
    const prev = stateRef.current;
    const next = typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
    if (Object.is(next, prev)) return;
    past.current = [...past.current, prev].slice(-limit);
    future.current = [];
    stateRef.current = next;
    setStateInternal(next);
    setCanUndo(true);
    setCanRedo(false);
  }, [limit]);

  const undo = useCallback(() => {
    const last = past.current[past.current.length - 1];
    if (last === undefined) return;
    past.current = past.current.slice(0, -1);
    future.current = [stateRef.current, ...future.current];
    stateRef.current = last;
    setStateInternal(last);
    setCanUndo(past.current.length > 0);
    setCanRedo(true);
  }, []);

  const redo = useCallback(() => {
    const next = future.current[0];
    if (next === undefined) return;
    future.current = future.current.slice(1);
    past.current = [...past.current, stateRef.current];
    stateRef.current = next;
    setStateInternal(next);
    setCanUndo(true);
    setCanRedo(future.current.length > 0);
  }, []);

  const history: HistoryApi = { undo, redo, canUndo, canRedo };

  return [state, setState, history] as const;
}
