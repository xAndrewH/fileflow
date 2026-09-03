import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "DOCX Converter | FileSpark",
  description: "Convert Word documents to HTML or plain text in bulk.",
  alternates: { canonical: "/tools/docx-converter" },
  openGraph: {
    title: "DOCX Converter | FileSpark",
    description: "Convert Word documents to HTML or plain text in bulk.",
    url: "/tools/docx-converter",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DOCX Converter | FileSpark",
    description: "Convert Word documents to HTML or plain text in bulk.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="DOCX Converter"
        description="Convert Word documents to HTML or plain text in bulk."
        path="/tools/docx-converter"
      />
      {children}
    </>
  );
}
