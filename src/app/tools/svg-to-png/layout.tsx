import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "SVG to PNG | FileSpark",
  description: "Convert SVG files or pasted code to PNG at up to 4× scale.",
  alternates: { canonical: "/tools/svg-to-png" },
  openGraph: {
    title: "SVG to PNG | FileSpark",
    description: "Convert SVG files or pasted code to PNG at up to 4× scale.",
    url: "/tools/svg-to-png",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SVG to PNG | FileSpark",
    description: "Convert SVG files or pasted code to PNG at up to 4× scale.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="SVG to PNG"
        description="Convert SVG files or pasted code to PNG at up to 4× scale."
        path="/tools/svg-to-png"
      />
      {children}
    </>
  );
}
