import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "EPUB Converter | FileSpark",
  description: "Convert EPUB ebooks to HTML or plain text in bulk.",
  alternates: { canonical: "/tools/epub-converter" },
  openGraph: {
    title: "EPUB Converter | FileSpark",
    description: "Convert EPUB ebooks to HTML or plain text in bulk.",
    url: "/tools/epub-converter",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "EPUB Converter | FileSpark",
    description: "Convert EPUB ebooks to HTML or plain text in bulk.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="EPUB Converter"
        description="Convert EPUB ebooks to HTML or plain text in bulk."
        path="/tools/epub-converter"
      />
      {children}
    </>
  );
}
