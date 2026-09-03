import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Find & Replace | FileSpark",
  description: "Find and replace text with plain-text or regex patterns.",
  alternates: { canonical: "/tools/find-replace" },
  openGraph: {
    title: "Find & Replace | FileSpark",
    description: "Find and replace text with plain-text or regex patterns.",
    url: "/tools/find-replace",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Find & Replace | FileSpark",
    description: "Find and replace text with plain-text or regex patterns.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Find & Replace"
        description="Find and replace text with plain-text or regex patterns."
        path="/tools/find-replace"
      />
      {children}
    </>
  );
}
