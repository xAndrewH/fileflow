import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "XLSX Converter | FileSpark",
  description: "Convert spreadsheets between XLSX, CSV, and JSON in bulk.",
  alternates: { canonical: "/tools/xlsx-converter" },
  openGraph: {
    title: "XLSX Converter | FileSpark",
    description: "Convert spreadsheets between XLSX, CSV, and JSON in bulk.",
    url: "/tools/xlsx-converter",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "XLSX Converter | FileSpark",
    description: "Convert spreadsheets between XLSX, CSV, and JSON in bulk.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="XLSX Converter"
        description="Convert spreadsheets between XLSX, CSV, and JSON in bulk."
        path="/tools/xlsx-converter"
      />
      {children}
    </>
  );
}
