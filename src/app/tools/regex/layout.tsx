import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Regex Tester | FileSpark",
  description: "Test regular expressions with live match highlighting.",
  alternates: { canonical: "/tools/regex" },
  openGraph: {
    title: "Regex Tester | FileSpark",
    description: "Test regular expressions with live match highlighting.",
    url: "/tools/regex",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Regex Tester | FileSpark",
    description: "Test regular expressions with live match highlighting.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Regex Tester"
        description="Test regular expressions with live match highlighting."
        path="/tools/regex"
      />
      {children}
    </>
  );
}
