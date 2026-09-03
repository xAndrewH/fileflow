"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { formatBytes } from "@/lib/utils";
import { ErrorAlert } from "@/components/ErrorAlert";
import { RelatedTools } from "@/components/RelatedTools";
import type { EpubOutputFormat } from "@/lib/epub-client";

const FORMATS: { id: EpubOutputFormat; label: string }[] = [
  { id: "html", label: "HTML" },
  { id: "text", label: "Text" },
];

const EPUB_EXT_RE = /\.epub$/i;

interface EpubFile {
  id: string;
  file: File;
  status: "pending" | "done" | "error";
  resultUrl?: string;
  resultSize?: number;
  error?: string;
}

function baseName(name: string) {
  return name.replace(/\.[^.]+$/, "");
}

export default function EpubConverterPage() {
  const [books, setBooks]       = useState<EpubFile[]>([]);
  const [format, setFormat]     = useState<EpubOutputFormat>("html");
  const [processing, setProcessing] = useState(false);
  const [error, setError]       = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fmt = FORMATS.find((f) => f.id === format)!;
  const ext = fmt.id === "html" ? "html" : "txt";

  const addFiles = useCallback((files: File[]) => {
    const valid = files.filter((f) => EPUB_EXT_RE.test(f.name));
    if (valid.length === 0) { setError("Please select .epub files."); return; }
    setError("");
    setBooks((prev) => [
      ...prev,
      ...valid.map((f) => ({ id: crypto.randomUUID(), file: f, status: "pending" as const })),
    ]);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const remove = (id: string) => setBooks((prev) => {
    const target = prev.find((i) => i.id === id);
    if (target?.resultUrl) URL.revokeObjectURL(target.resultUrl);
    return prev.filter((i) => i.id !== id);
  });

  const clearAll = () => {
    books.forEach((i) => { if (i.resultUrl) URL.revokeObjectURL(i.resultUrl); });
    setBooks([]);
    setError("");
  };

  const convertAll = async () => {
    if (books.length === 0) return;
    setProcessing(true);
    setError("");

    books.forEach((i) => { if (i.resultUrl) URL.revokeObjectURL(i.resultUrl); });
    setBooks((prev) => prev.map((i) => ({ ...i, status: "pending", resultUrl: undefined, resultSize: undefined, error: undefined })));

    const { convertEpubClient } = await import("@/lib/epub-client");
    for (const item of books) {
      try {
        const blob = await convertEpubClient(item.file, fmt.id);
        const url = URL.createObjectURL(blob);
        setBooks((prev) => prev.map((i) => i.id === item.id ? { ...i, status: "done", resultUrl: url, resultSize: blob.size } : i));
      } catch (e) {
        setBooks((prev) => prev.map((i) => i.id === item.id ? { ...i, status: "error", error: (e as Error).message } : i));
      }
    }
    setProcessing(false);
  };

  const downloadOne = (item: EpubFile) => {
    if (!item.resultUrl) return;
    const a = document.createElement("a");
    a.href = item.resultUrl;
    a.download = `${baseName(item.file.name)}.${ext}`;
    a.click();
  };

  const downloadAll = async () => {
    const done = books.filter((i) => i.status === "done" && i.resultUrl);
    if (done.length === 0) return;
    if (done.length === 1) { downloadOne(done[0]); return; }
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const item of done) {
      const blob = await fetch(item.resultUrl!).then((r) => r.blob());
      zip.file(`${baseName(item.file.name)}.${ext}`, blob);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `converted-${ext}.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const doneCount = books.filter((i) => i.status === "done").length;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 text-sm mb-8 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">EPUB Converter</h1>
          <p className="text-slate-500 text-sm">Convert EPUB ebooks to HTML or plain text, in bulk, entirely in your browser.</p>
        </div>

        {/* Drop zone */}
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false); }}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border border-dashed cursor-pointer transition-all mb-5 ${
            isDragging
              ? "border-blue-500/70 bg-blue-500/8 text-blue-600 dark:text-blue-400"
              : "border-slate-300 dark:border-slate-700/60 text-slate-500 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5m-18 0V6A2.25 2.25 0 015.25 3.75h13.5A2.25 2.25 0 0121 6v10.5m-18 0h18" />
          </svg>
          <div className="text-center">
            <p className="font-medium text-sm">Drop EPUB files here</p>
            <p className="text-xs opacity-60 mt-0.5">or click to browse — .epub files</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".epub"
            multiple
            className="hidden"
            onChange={(e) => { addFiles(Array.from(e.target.files ?? [])); e.currentTarget.value = ""; }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Options */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-xl p-4 space-y-4 mb-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-slate-500 dark:text-slate-400 text-sm w-24 shrink-0">Convert to</span>
            <div className="flex gap-2">
              {FORMATS.map(({ id, label }) => (
                <button key={id} onClick={() => setFormat(id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${format === id ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ErrorAlert message={error} className="mb-4" />

        {/* File list */}
        {books.length > 0 && (
          <div className="space-y-2 mb-5">
            {books.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-xl px-3 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 dark:text-white text-sm truncate">{item.file.name}</p>
                  <p className="text-slate-500 text-xs">
                    {formatBytes(item.file.size)}
                    {item.status === "done" && item.resultSize !== undefined && (
                      <> → <span className="text-green-600 dark:text-green-400">{formatBytes(item.resultSize)}</span></>
                    )}
                    {item.status === "error" && <span className="text-red-600 dark:text-red-400"> · {item.error}</span>}
                  </p>
                </div>
                {item.status === "done" ? (
                  <button onClick={() => downloadOne(item)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-colors shrink-0">
                    Download
                  </button>
                ) : item.status === "pending" && processing ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : null}
                <button onClick={() => remove(item.id)} className="p-1 text-slate-400 dark:text-slate-600 hover:text-red-600 dark:hover:text-red-400 transition-colors shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {books.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={convertAll}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              {processing ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Converting…
                </>
              ) : (
                `Convert ${books.length} file${books.length !== 1 ? "s" : ""} to ${fmt.label}`
              )}
            </button>
            {doneCount > 0 && (
              <button onClick={downloadAll}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 text-sm font-medium rounded-xl transition-colors">
                {doneCount === 1 ? "Download" : "Download all (ZIP)"}
              </button>
            )}
            <button onClick={clearAll}
              className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium rounded-xl transition-colors">
              Clear
            </button>
          </div>
        )}

        <RelatedTools current="/tools/epub-converter" />
      </div>
    </div>
  );
}
