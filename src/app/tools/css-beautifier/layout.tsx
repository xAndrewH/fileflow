import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "CSS Beautifier | FileSpark",
  description: "Format CSS, SCSS, and Sass with proper spacing and rule separation.",
  alternates: { canonical: "/tools/css-beautifier" },
  openGraph: {
    title: "CSS Beautifier | FileSpark",
    description: "Format CSS, SCSS, and Sass with proper spacing and rule separation.",
    url: "/tools/css-beautifier",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CSS Beautifier | FileSpark",
    description: "Format CSS, SCSS, and Sass with proper spacing and rule separation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="CSS Beautifier"
        description="Format CSS, SCSS, and Sass with proper spacing and rule separation."
        path="/tools/css-beautifier"
      />
      {children}
    </>
  );
}
