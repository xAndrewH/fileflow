import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Cron Expression Builder | FileSpark",
  description: "Build and validate cron schedules with next-run preview.",
  alternates: { canonical: "/tools/cron" },
  openGraph: {
    title: "Cron Expression Builder | FileSpark",
    description: "Build and validate cron schedules with next-run preview.",
    url: "/tools/cron",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cron Expression Builder | FileSpark",
    description: "Build and validate cron schedules with next-run preview.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Cron Expression Builder"
        description="Build and validate cron schedules with next-run preview."
        path="/tools/cron"
      />
      {children}
    </>
  );
}
