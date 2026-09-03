import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "OG Meta Tag Generator | FileSpark",
  description: "Fill in title, description, and image, then get the full Open Graph head block.",
  alternates: { canonical: "/tools/og-meta" },
  openGraph: {
    title: "OG Meta Tag Generator | FileSpark",
    description: "Fill in title, description, and image, then get the full Open Graph head block.",
    url: "/tools/og-meta",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "OG Meta Tag Generator | FileSpark",
    description: "Fill in title, description, and image, then get the full Open Graph head block.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="OG Meta Tag Generator"
        description="Fill in title, description, and image, then get the full Open Graph head block."
        path="/tools/og-meta"
      />
      {children}
    </>
  );
}
