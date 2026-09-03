import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Framework Reference | FileSpark",
  description: "Snippets for Tailwind, Bootstrap, Sass, React, and Next.js.",
  alternates: { canonical: "/tools/framework-reference" },
  openGraph: {
    title: "Framework Reference | FileSpark",
    description: "Snippets for Tailwind, Bootstrap, Sass, React, and Next.js.",
    url: "/tools/framework-reference",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Framework Reference | FileSpark",
    description: "Snippets for Tailwind, Bootstrap, Sass, React, and Next.js.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Framework Reference"
        description="Snippets for Tailwind, Bootstrap, Sass, React, and Next.js."
        path="/tools/framework-reference"
      />
      {children}
    </>
  );
}
