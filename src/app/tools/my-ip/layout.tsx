import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "What's My IP | FileSpark",
  description: "See your public IP address, location, and network info.",
  alternates: { canonical: "/tools/my-ip" },
  openGraph: {
    title: "What's My IP | FileSpark",
    description: "See your public IP address, location, and network info.",
    url: "/tools/my-ip",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "What's My IP | FileSpark",
    description: "See your public IP address, location, and network info.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="What's My IP"
        description="See your public IP address, location, and network info."
        path="/tools/my-ip"
      />
      {children}
    </>
  );
}
