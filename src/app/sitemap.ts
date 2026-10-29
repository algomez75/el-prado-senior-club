import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1, alternates: { languages: { "es-US": `${site.url}/`, "en-US": `${site.url}/en/` } } },
    { url: `${site.url}/en/`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { "es-US": `${site.url}/`, "en-US": `${site.url}/en/` } } },
    { url: `${site.url}/privacidad/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
