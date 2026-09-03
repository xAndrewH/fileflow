import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "ROAS Calculator | FileSpark",
  description: "Enter ad spend and revenue to calculate return on ad spend.",
  alternates: { canonical: "/tools/roas-calculator" },
  openGraph: {
    title: "ROAS Calculator | FileSpark",
    description: "Enter ad spend and revenue to calculate return on ad spend.",
    url: "/tools/roas-calculator",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ROAS Calculator | FileSpark",
    description: "Enter ad spend and revenue to calculate return on ad spend.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="ROAS Calculator"
        description="Enter ad spend and revenue to calculate return on ad spend."
        path="/tools/roas-calculator"
      />
      {children}
    </>
  );
}
