import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Percentage Calculator | FileSpark",
  description: "Calculate percentages, increases, decreases, and differences.",
  alternates: { canonical: "/tools/percentage-calculator" },
  openGraph: {
    title: "Percentage Calculator | FileSpark",
    description: "Calculate percentages, increases, decreases, and differences.",
    url: "/tools/percentage-calculator",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Percentage Calculator | FileSpark",
    description: "Calculate percentages, increases, decreases, and differences.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Percentage Calculator"
        description="Calculate percentages, increases, decreases, and differences."
        path="/tools/percentage-calculator"
      />
      {children}
    </>
  );
}
