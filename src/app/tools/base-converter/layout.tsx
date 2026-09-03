import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Number Base Converter | FileSpark",
  description: "Convert numbers between binary, octal, decimal, and hex.",
  alternates: { canonical: "/tools/base-converter" },
  openGraph: {
    title: "Number Base Converter | FileSpark",
    description: "Convert numbers between binary, octal, decimal, and hex.",
    url: "/tools/base-converter",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Number Base Converter | FileSpark",
    description: "Convert numbers between binary, octal, decimal, and hex.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Number Base Converter"
        description="Convert numbers between binary, octal, decimal, and hex."
        path="/tools/base-converter"
      />
      {children}
    </>
  );
}
