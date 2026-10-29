import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Tipografías originales de la marca: Cormorant Garamond (titulares) + DM Sans (texto)
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "El Prado Senior Club | Cuidado de adultos mayores en Hialeah", template: "%s | El Prado Senior Club" },
  description: "El Prado Senior Club, centro de cuidado diurno para adultos mayores en Hialeah, Florida. Compañía, convivencia y trato familiar. Agenda una visita o llama al (305) 967-8776.",
  applicationName: site.name,
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/",
    locale: "es_US",
    title: "El Prado Senior Club — Más compañía. Más vida.",
    description: "Cuidado diurno para adultos mayores en Hialeah, Florida. Agenda una visita y conócenos.",
    images: [{ url: "/images/centro-sala.webp", width: 1600, height: 1200, alt: "El Prado Senior Club en Hialeah" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdfbf7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca temprana: las animaciones de revelado solo ocultan contenido si hay JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
