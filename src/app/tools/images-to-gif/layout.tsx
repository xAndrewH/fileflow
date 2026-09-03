import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "GIF Maker — Images to Animated GIF | FileSpark",
  description: "Combine a sequence of images into an animated GIF. Control frame delay, size, and color quality, entirely in your browser.",
  alternates: { canonical: "/tools/images-to-gif" },
  openGraph: {
    title: "GIF Maker — Images to Animated GIF | FileSpark",
    description: "Combine a sequence of images into an animated GIF. Control frame delay, size, and color quality, entirely in your browser.",
    url: "/tools/images-to-gif",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GIF Maker — Images to Animated GIF | FileSpark",
    description: "Combine a sequence of images into an animated GIF. Control frame delay, size, and color quality, entirely in your browser.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="GIF Maker — Images to Animated GIF"
        description="Combine a sequence of images into an animated GIF. Control frame delay, size, and color quality, entirely in your browser."
        path="/tools/images-to-gif"
      />
      {children}
    </>
  );
}
