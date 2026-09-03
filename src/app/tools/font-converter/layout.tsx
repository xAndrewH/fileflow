import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Font Converter | FileSpark",
  description: "Convert fonts between TTF, OTF, and WOFF in bulk.",
  alternates: { canonical: "/tools/font-converter" },
  openGraph: {
    title: "Font Converter | FileSpark",
    description: "Convert fonts between TTF, OTF, and WOFF in bulk.",
    url: "/tools/font-converter",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Font Converter | FileSpark",
    description: "Convert fonts between TTF, OTF, and WOFF in bulk.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Font Converter"
        description="Convert fonts between TTF, OTF, and WOFF in bulk."
        path="/tools/font-converter"
      />
      {children}
    </>
  );
}
