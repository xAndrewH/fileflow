/**
 * In-memory, single-use handoff for passing a produced file from one tool
 * page to another via "Send to..." — e.g. background-remover's cutout
 * straight into image-to-pdf. Everything on this site runs client-side with
 * no uploads, so there's no server-side session to stash a file in; a
 * module-scoped value survives a Next.js client-side <Link>/router
 * navigation (same JS runtime, no reload) but is lost on a hard refresh,
 * which is an acceptable fallback — the destination tool just starts empty.
 */

export interface ToolHandoffPayload {
  file: File;
  sourceTool: string;
}

let pending: ToolHandoffPayload | null = null;

export function setToolHandoff(payload: ToolHandoffPayload) {
  pending = payload;
}

/** Consumes (and clears) the pending handoff, if any. */
export function takeToolHandoff(): ToolHandoffPayload | null {
  const p = pending;
  pending = null;
  return p;
}

export async function urlToFile(url: string, fileName: string, fallbackType = "image/png"): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type || fallbackType });
}
