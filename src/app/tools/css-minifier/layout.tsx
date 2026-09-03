import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "CSS Minifier | FileSpark",
  description: "Strip whitespace and comments from CSS to reduce file size.",
  alternates: { canonical: "/tools/css-minifier" },
  openGraph: {
    title: "CSS Minifier | FileSpark",
    description: "Strip whitespace and comments from CSS to reduce file size.",
    url: "/tools/css-minifier",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CSS Minifier | FileSpark",
    description: "Strip whitespace and comments from CSS to reduce file size.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="CSS Minifier"
        description="Strip whitespace and comments from CSS to reduce file size."
        path="/tools/css-minifier"
      />
      {children}
    </>
  );
}
