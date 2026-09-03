import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "PNG / JPG → SVG | FileSpark",
  description: "Vectorize raster images to scalable SVG.",
  alternates: { canonical: "/tools/raster-to-svg" },
  openGraph: {
    title: "PNG / JPG → SVG | FileSpark",
    description: "Vectorize raster images to scalable SVG.",
    url: "/tools/raster-to-svg",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "PNG / JPG → SVG | FileSpark",
    description: "Vectorize raster images to scalable SVG.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="PNG / JPG → SVG"
        description="Vectorize raster images to scalable SVG."
        path="/tools/raster-to-svg"
      />
      {children}
    </>
  );
}
