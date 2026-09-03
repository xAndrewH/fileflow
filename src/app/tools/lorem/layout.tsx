import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator | FileSpark",
  description: "Generate paragraphs, sentences, or words of placeholder text.",
  alternates: { canonical: "/tools/lorem" },
  openGraph: {
    title: "Lorem Ipsum Generator | FileSpark",
    description: "Generate paragraphs, sentences, or words of placeholder text.",
    url: "/tools/lorem",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lorem Ipsum Generator | FileSpark",
    description: "Generate paragraphs, sentences, or words of placeholder text.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Lorem Ipsum Generator"
        description="Generate paragraphs, sentences, or words of placeholder text."
        path="/tools/lorem"
      />
      {children}
    </>
  );
}
