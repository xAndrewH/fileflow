import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Regex Cheat Sheet | FileSpark",
  description: "Searchable reference for regex syntax, anchors, quantifiers, and groups.",
  alternates: { canonical: "/tools/regex-cheatsheet" },
  openGraph: {
    title: "Regex Cheat Sheet | FileSpark",
    description: "Searchable reference for regex syntax, anchors, quantifiers, and groups.",
    url: "/tools/regex-cheatsheet",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Regex Cheat Sheet | FileSpark",
    description: "Searchable reference for regex syntax, anchors, quantifiers, and groups.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Regex Cheat Sheet"
        description="Searchable reference for regex syntax, anchors, quantifiers, and groups."
        path="/tools/regex-cheatsheet"
      />
      {children}
    </>
  );
}
