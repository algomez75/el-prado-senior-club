import type { Metadata } from "next";
import { Website } from "@/components/website";

export const metadata: Metadata = {
  title: "Adult Day Care in Hialeah, FL",
  description: "Meet El Prado Senior Club, an adult day care center in Hialeah, Florida. Companionship and a family atmosphere. Call (305) 967-8776 to arrange a visit.",
  alternates: { canonical: "/en/", languages: { "es-US": "/", "en-US": "/en/", "x-default": "/" } },
  openGraph: { type: "website", siteName: "El Prado Senior Club", url: "/en/", locale: "en_US", title: "El Prado Senior Club — More care. More joy. More life.", description: "Adult day care and a family atmosphere in Hialeah, Florida.", images: ["/images/centro-sala.webp"] },
};

export default function EnglishHome() { return <div lang="en"><Website locale="en"/></div>; }
