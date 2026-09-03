import * as XLSX from "xlsx";

export type SpreadsheetFormat = "csv" | "json" | "xlsx";

function detectType(name: string): "xlsx" | "xls" | "csv" | "json" | "unknown" {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "xlsx" || ext === "xls" || ext === "csv" || ext === "json") return ext;
  return "unknown";
}

/** Converts a spreadsheet file (XLSX/XLS/CSV/JSON) to CSV, JSON, or XLSX, client-side. */
export async function convertSpreadsheetClient(file: File, target: SpreadsheetFormat): Promise<Blob> {
  const type = detectType(file.name);
  let workbook: XLSX.WorkBook;

  if (type === "xlsx" || type === "xls") {
    const buf = await file.arrayBuffer();
    workbook = XLSX.read(buf, { type: "array" });
  } else if (type === "csv") {
    const text = await file.text();
    workbook = XLSX.read(text, { type: "string" });
  } else if (type === "json") {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error("JSON must be an array of objects.");
    const sheet = XLSX.utils.json_to_sheet(data);
    workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
  } else {
    throw new Error("Unsupported file type. Use XLSX, XLS, CSV, or JSON.");
  }

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) throw new Error("The workbook has no sheets.");

  if (target === "csv") {
    return new Blob([XLSX.utils.sheet_to_csv(sheet)], { type: "text/csv" });
  }
  if (target === "json") {
    const json = XLSX.utils.sheet_to_json(sheet);
    return new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
  }
  const out = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
