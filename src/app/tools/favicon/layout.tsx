import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Favicon Generator | FileSpark",
  description: "Upload any image and get favicon PNGs at all standard sizes.",
  alternates: { canonical: "/tools/favicon" },
  openGraph: {
    title: "Favicon Generator | FileSpark",
    description: "Upload any image and get favicon PNGs at all standard sizes.",
    url: "/tools/favicon",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Favicon Generator | FileSpark",
    description: "Upload any image and get favicon PNGs at all standard sizes.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Favicon Generator"
        description="Upload any image and get favicon PNGs at all standard sizes."
        path="/tools/favicon"
      />
      {children}
    </>
  );
}
