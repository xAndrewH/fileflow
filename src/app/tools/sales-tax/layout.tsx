import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Sales Tax Calculator | FileSpark",
  description: "Calculate tax amount and total price for any rate.",
  alternates: { canonical: "/tools/sales-tax" },
  openGraph: {
    title: "Sales Tax Calculator | FileSpark",
    description: "Calculate tax amount and total price for any rate.",
    url: "/tools/sales-tax",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sales Tax Calculator | FileSpark",
    description: "Calculate tax amount and total price for any rate.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Sales Tax Calculator"
        description="Calculate tax amount and total price for any rate."
        path="/tools/sales-tax"
      />
      {children}
    </>
  );
}
