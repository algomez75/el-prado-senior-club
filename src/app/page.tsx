import type { Metadata } from "next";
import { Website } from "@/components/website";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { "es-US": "/", "en-US": "/en/", "x-default": "/" } },
};

export default function Home() { return <Website locale="es"/>; }
