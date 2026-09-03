import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Age Calculator | FileSpark",
  description: "Calculate exact age in years, months, and days from a birthdate.",
  alternates: { canonical: "/tools/age-calculator" },
  openGraph: {
    title: "Age Calculator | FileSpark",
    description: "Calculate exact age in years, months, and days from a birthdate.",
    url: "/tools/age-calculator",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Age Calculator | FileSpark",
    description: "Calculate exact age in years, months, and days from a birthdate.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Age Calculator"
        description="Calculate exact age in years, months, and days from a birthdate."
        path="/tools/age-calculator"
      />
      {children}
    </>
  );
}
