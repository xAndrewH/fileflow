import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Code to Image | FileSpark",
  description: "Turn a code snippet into a shareable, styled PNG.",
  alternates: { canonical: "/tools/code-to-image" },
  openGraph: {
    title: "Code to Image | FileSpark",
    description: "Turn a code snippet into a shareable, styled PNG.",
    url: "/tools/code-to-image",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Code to Image | FileSpark",
    description: "Turn a code snippet into a shareable, styled PNG.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Code to Image"
        description="Turn a code snippet into a shareable, styled PNG."
        path="/tools/code-to-image"
      />
      {children}
    </>
  );
}
