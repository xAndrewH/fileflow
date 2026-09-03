import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Calculator | FileSpark",
  description: "Basic and advanced scientific calculator with history.",
  alternates: { canonical: "/tools/calculator" },
  openGraph: {
    title: "Calculator | FileSpark",
    description: "Basic and advanced scientific calculator with history.",
    url: "/tools/calculator",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculator | FileSpark",
    description: "Basic and advanced scientific calculator with history.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Calculator"
        description="Basic and advanced scientific calculator with history."
        path="/tools/calculator"
      />
      {children}
    </>
  );
}
