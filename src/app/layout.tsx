import type { Metadata } from "next";
import "./globals.css";
import { Store } from "@/components/store";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://luneo.example",
  ),
  title: {
    default: "LUNEO — The art of being yourself",
    template: "%s · LUNEO",
  },
  description:
    "Bags and accessories with character. An independent demo project by NULLEXWEB.",
  openGraph: {
    title: "LUNEO — Quiet expression",
    description: "A concept collection of bags and accessories",
    images: ["/images/hero.webp"],
    locale: "en_GB",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Store>{children}</Store>
      </body>
    </html>
  );
}
