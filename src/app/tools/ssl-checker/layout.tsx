import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "SSL Certificate Checker | FileSpark",
  description: "Enter a domain and see cert expiry, issuer, SANs, and fingerprint.",
  alternates: { canonical: "/tools/ssl-checker" },
  openGraph: {
    title: "SSL Certificate Checker | FileSpark",
    description: "Enter a domain and see cert expiry, issuer, SANs, and fingerprint.",
    url: "/tools/ssl-checker",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SSL Certificate Checker | FileSpark",
    description: "Enter a domain and see cert expiry, issuer, SANs, and fingerprint.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="SSL Certificate Checker"
        description="Enter a domain and see cert expiry, issuer, SANs, and fingerprint."
        path="/tools/ssl-checker"
      />
      {children}
    </>
  );
}
