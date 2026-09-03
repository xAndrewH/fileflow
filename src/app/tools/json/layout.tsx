import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "JSON Formatter | FileSpark",
  description: "Validate, format with configurable indentation, and minify JSON.",
  alternates: { canonical: "/tools/json" },
  openGraph: {
    title: "JSON Formatter | FileSpark",
    description: "Validate, format with configurable indentation, and minify JSON.",
    url: "/tools/json",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JSON Formatter | FileSpark",
    description: "Validate, format with configurable indentation, and minify JSON.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="JSON Formatter"
        description="Validate, format with configurable indentation, and minify JSON."
        path="/tools/json"
      />
      {children}
    </>
  );
}
