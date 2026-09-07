import type { Metadata } from "next";
import { Baskervville, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const baskervville = Baskervville({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Variant Studio - Anime Streetwear & Apparel",
  description: "Editorial anime-inspired apparel, heavyweight silhouettes, and limited capsule collections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        baskervville.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
