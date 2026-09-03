import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "CSS Grid Builder | FileSpark",
  description: "Visual grid builder: set rows, columns, and gaps, then copy the CSS.",
  alternates: { canonical: "/tools/css-grid" },
  openGraph: {
    title: "CSS Grid Builder | FileSpark",
    description: "Visual grid builder: set rows, columns, and gaps, then copy the CSS.",
    url: "/tools/css-grid",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CSS Grid Builder | FileSpark",
    description: "Visual grid builder: set rows, columns, and gaps, then copy the CSS.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="CSS Grid Builder"
        description="Visual grid builder: set rows, columns, and gaps, then copy the CSS."
        path="/tools/css-grid"
      />
      {children}
    </>
  );
}
