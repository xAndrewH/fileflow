import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "JWT Decoder | FileSpark",
  description: "Decode and inspect JWT headers, payloads, claims, and expiry.",
  alternates: { canonical: "/tools/jwt-decoder" },
  openGraph: {
    title: "JWT Decoder | FileSpark",
    description: "Decode and inspect JWT headers, payloads, claims, and expiry.",
    url: "/tools/jwt-decoder",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JWT Decoder | FileSpark",
    description: "Decode and inspect JWT headers, payloads, claims, and expiry.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="JWT Decoder"
        description="Decode and inspect JWT headers, payloads, claims, and expiry."
        path="/tools/jwt-decoder"
      />
      {children}
    </>
  );
}
