import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Schema Markup Generator | FileSpark",
  description: "Choose a Schema.org type and get the JSON-LD snippet for your site.",
  alternates: { canonical: "/tools/schema-generator" },
  openGraph: {
    title: "Schema Markup Generator | FileSpark",
    description: "Choose a Schema.org type and get the JSON-LD snippet for your site.",
    url: "/tools/schema-generator",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Schema Markup Generator | FileSpark",
    description: "Choose a Schema.org type and get the JSON-LD snippet for your site.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Schema Markup Generator"
        description="Choose a Schema.org type and get the JSON-LD snippet for your site."
        path="/tools/schema-generator"
      />
      {children}
    </>
  );
}
