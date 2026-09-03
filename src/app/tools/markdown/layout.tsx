import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Markdown Editor | FileSpark",
  description: "Split-pane editor with live HTML preview.",
  alternates: { canonical: "/tools/markdown" },
  openGraph: {
    title: "Markdown Editor | FileSpark",
    description: "Split-pane editor with live HTML preview.",
    url: "/tools/markdown",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Markdown Editor | FileSpark",
    description: "Split-pane editor with live HTML preview.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Markdown Editor"
        description="Split-pane editor with live HTML preview."
        path="/tools/markdown"
      />
      {children}
    </>
  );
}
