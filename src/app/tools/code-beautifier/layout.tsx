import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Code Beautifier | FileSpark",
  description: "Format and indent HTML, CSS, JavaScript, and more in one place.",
  alternates: { canonical: "/tools/code-beautifier" },
  openGraph: {
    title: "Code Beautifier | FileSpark",
    description: "Format and indent HTML, CSS, JavaScript, and more in one place.",
    url: "/tools/code-beautifier",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Code Beautifier | FileSpark",
    description: "Format and indent HTML, CSS, JavaScript, and more in one place.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Code Beautifier"
        description="Format and indent HTML, CSS, JavaScript, and more in one place."
        path="/tools/code-beautifier"
      />
      {children}
    </>
  );
}
