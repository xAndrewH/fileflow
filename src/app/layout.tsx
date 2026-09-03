import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { BackToTop } from "@/components/BackToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("filespark-theme");var t=s==="light"||s==="dark"?s:"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export const metadata: Metadata = {
  title: "FileSpark | File Converter & Browser Tools",
  description:
    "Convert and compress 80+ file formats. Use 85+ free browser tools for developers, designers, and marketers. No account, no installs, nothing stored.",
  metadataBase: new URL("https://filespark.app"),
  manifest: "/manifest.json",
  openGraph: {
    siteName: "FileSpark",
    title: "FileSpark | File Converter & Browser Tools",
    description:
      "Convert and compress 80+ file formats. Use 85+ free browser tools for developers, designers, and marketers. No account, no installs, nothing stored.",
    url: "https://filespark.app",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FileSpark | File Converter & Browser Tools",
    description:
      "Convert and compress 80+ file formats. Use 85+ free browser tools for developers, designers, and marketers. No account, no installs, nothing stored.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased">
        <ThemeProvider>
          {children}
          <Footer />
          <CommandPalette />
          <BackToTop />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
