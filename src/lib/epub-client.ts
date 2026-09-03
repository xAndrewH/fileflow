export type EpubOutputFormat = "html" | "text";

async function readEntryText(zip: import("jszip"), path: string): Promise<string> {
  const entry = zip.file(path);
  if (!entry) throw new Error(`Missing file in EPUB: ${path}`);
  return entry.async("text");
}

function resolvePath(basePath: string, rel: string): string {
  const baseDir = basePath.includes("/") ? basePath.slice(0, basePath.lastIndexOf("/") + 1) : "";
  const parts = (baseDir + rel).split("/");
  const out: string[] = [];
  for (const p of parts) {
    if (p === "." || p === "") continue;
    if (p === "..") out.pop();
    else out.push(p);
  }
  return out.join("/");
}

/** Converts an EPUB file to a single HTML or plain-text document, client-side. */
export async function convertEpubClient(file: File, target: EpubOutputFormat): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(file);

  const containerXml = await readEntryText(zip, "META-INF/container.xml");
  const containerDoc = new DOMParser().parseFromString(containerXml, "application/xml");
  const opfPath = containerDoc.querySelector("rootfile")?.getAttribute("full-path");
  if (!opfPath) throw new Error("Could not find the EPUB's content file (container.xml has no rootfile).");

  const opfXml = await readEntryText(zip, opfPath);
  const opfDoc = new DOMParser().parseFromString(opfXml, "application/xml");

  const manifest = new Map<string, string>();
  opfDoc.querySelectorAll("manifest > item").forEach((el) => {
    const id = el.getAttribute("id");
    const href = el.getAttribute("href");
    if (id && href) manifest.set(id, href);
  });

  const spineIds = Array.from(opfDoc.querySelectorAll("spine > itemref"))
    .map((el) => el.getAttribute("idref"))
    .filter((id): id is string => !!id);
  if (spineIds.length === 0) throw new Error("This EPUB has no readable chapters (empty spine).");

  const bodies: string[] = [];
  for (const id of spineIds) {
    const href = manifest.get(id);
    if (!href) continue;
    const xhtml = await readEntryText(zip, resolvePath(opfPath, href));
    const doc = new DOMParser().parseFromString(xhtml, "application/xhtml+xml");
    const body = doc.querySelector("body");
    if (body) bodies.push(body.innerHTML);
  }

  const title = opfDoc.querySelector("metadata > title")?.textContent?.trim() || file.name.replace(/\.[^.]+$/, "");

  if (target === "text") {
    const container = document.createElement("div");
    const text = bodies.map((html) => {
      container.innerHTML = html;
      return container.textContent ?? "";
    }).join("\n\n");
    return new Blob([text], { type: "text/plain" });
  }

  const htmlOut = `<!DOCTYPE html>\n<html><head><meta charset="utf-8"><title>${title}</title></head><body>\n${bodies.join("\n<hr/>\n")}\n</body></html>`;
  return new Blob([htmlOut], { type: "text/html" });
}
