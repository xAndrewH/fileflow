import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "JavaScript Beautifier | FileSpark",
  description: "Format JavaScript and TypeScript following Airbnb / ESLint standards.",
  alternates: { canonical: "/tools/js-beautifier" },
  openGraph: {
    title: "JavaScript Beautifier | FileSpark",
    description: "Format JavaScript and TypeScript following Airbnb / ESLint standards.",
    url: "/tools/js-beautifier",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JavaScript Beautifier | FileSpark",
    description: "Format JavaScript and TypeScript following Airbnb / ESLint standards.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="JavaScript Beautifier"
        description="Format JavaScript and TypeScript following Airbnb / ESLint standards."
        path="/tools/js-beautifier"
      />
      {children}
    </>
  );
}
