import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Color Palette Generator | FileSpark",
  description: "Generate complementary, triadic, and analogous palettes.",
  alternates: { canonical: "/tools/palette" },
  openGraph: {
    title: "Color Palette Generator | FileSpark",
    description: "Generate complementary, triadic, and analogous palettes.",
    url: "/tools/palette",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Color Palette Generator | FileSpark",
    description: "Generate complementary, triadic, and analogous palettes.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Color Palette Generator"
        description="Generate complementary, triadic, and analogous palettes."
        path="/tools/palette"
      />
      {children}
    </>
  );
}
