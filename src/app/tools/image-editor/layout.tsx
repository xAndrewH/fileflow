import type { Metadata } from "next";
import { ToolJsonLd } from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Image Editor | FileSpark",
  description: "Resize, rotate, flip, and adjust quality for any image.",
  alternates: { canonical: "/tools/image-editor" },
  openGraph: {
    title: "Image Editor | FileSpark",
    description: "Resize, rotate, flip, and adjust quality for any image.",
    url: "/tools/image-editor",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Image Editor | FileSpark",
    description: "Resize, rotate, flip, and adjust quality for any image.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Image Editor"
        description="Resize, rotate, flip, and adjust quality for any image."
        path="/tools/image-editor"
      />
      {children}
    </>
  );
}
