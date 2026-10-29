import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "El Prado Senior Club | Cuidado diurno para adultos en Hialeah", template: "%s | El Prado Senior Club" },
  description: "Conoce El Prado Senior Club, centro de cuidado diurno para adultos en Hialeah, Florida. Compañía, convivencia y un ambiente familiar. Llámanos al (305) 967-8776.",
  applicationName: site.name,
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: { type: "website", siteName: site.name, url: "/", locale: "es_US", title: "El Prado Senior Club — Más compañía. Más alegría. Más vida.", description: "Un lugar para compartir y sentirse acompañado. Cuidado diurno para adultos en Hialeah, Florida.", images: [{ url: "/images/centro-sala.webp", width: 1600, height: 1200, alt: "El Prado Senior Club en Hialeah" }] },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" data-scroll-behavior="smooth"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
