import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Time Calculator | FileSpark",
  description: "Calculate durations, add/subtract time, combine intervals.",
  alternates: { canonical: "/tools/time-calculator" },
  openGraph: {
    title: "Time Calculator | FileSpark",
    description: "Calculate durations, add/subtract time, combine intervals.",
    url: "/tools/time-calculator",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Time Calculator | FileSpark",
    description: "Calculate durations, add/subtract time, combine intervals.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Time Calculator"
        description="Calculate durations, add/subtract time, combine intervals."
        path="/tools/time-calculator"
      />
      {children}
    </>
  );
}
