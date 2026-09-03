import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Word Counter | FileSpark",
  description: "Count words, characters, sentences, and reading time.",
  alternates: { canonical: "/tools/word-counter" },
  openGraph: {
    title: "Word Counter | FileSpark",
    description: "Count words, characters, sentences, and reading time.",
    url: "/tools/word-counter",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Word Counter | FileSpark",
    description: "Count words, characters, sentences, and reading time.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Word Counter"
        description="Count words, characters, sentences, and reading time."
        path="/tools/word-counter"
      />
      {children}
    </>
  );
}
