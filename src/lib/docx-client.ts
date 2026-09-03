export type DocxOutputFormat = "html" | "text";

/** Converts a DOCX file to HTML or plain text, client-side via mammoth. */
export async function convertDocxClient(file: File, target: DocxOutputFormat): Promise<Blob> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();

  if (target === "text") {
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    return new Blob([value], { type: "text/plain" });
  }

  const { value } = await mammoth.convertToHtml({ arrayBuffer });
  const html = `<!DOCTYPE html>\n<html><head><meta charset="utf-8"><title>${file.name.replace(/\.[^.]+$/, "")}</title></head><body>\n${value}\n</body></html>`;
  return new Blob([html], { type: "text/html" });
}
