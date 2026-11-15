import type { Metadata } from "next";
import "./globals.css";
import { Store } from "@/components/store";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://luneo.example",
  ),
  title: { default: "LUNEO — Мистецтво бути собою", template: "%s · LUNEO" },
  description:
    "Сумки та аксесуари з характером. Незалежний демонстраційний проєкт NULLEXWEB.",
  openGraph: {
    title: "LUNEO — Тиха виразність",
    description: "Демонстраційна колекція сумок та аксесуарів",
    images: ["/images/hero.webp"],
    locale: "uk_UA",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Store>{children}</Store>
      </body>
    </html>
  );
}
