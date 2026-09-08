/** Compact, URL-safe encode/decode for sharing a tool's config via a query param. */

export function encodeShareState(value: unknown): string {
  try {
    const json = JSON.stringify(value);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch {
    return "";
  }
}

export function decodeShareState<T>(encoded: string): T | null {
  try {
    let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    if (pad) b64 += "=".repeat(4 - pad);
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
