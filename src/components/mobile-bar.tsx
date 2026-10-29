"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import type { Content } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "./ui/cn";

/**
 * Barra de contacto rápido en móvil. Aparece deslizándose al dejar atrás el Hero,
 * así la primera pantalla aprovecha todo el espacio. Mientras está oculta es `inert`.
 */
export function MobileBar({ t, scheduleHref }: { t: Content["mobileBar"]; scheduleHref: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label={t.label}
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2.5 border-t border-ink/10 bg-paper/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(20_36_58/0.2)] backdrop-blur-md transition-[translate,opacity] duration-500 ease-out-soft lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <a href={site.phoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/40 text-[0.95rem] font-medium whitespace-nowrap text-ink active:scale-[0.98]">
        <Phone size={18} aria-hidden="true" />
        {t.call}
      </a>
      <a
        href={scheduleHref}
        className="btn-shine flex min-h-12 items-center justify-center gap-2 rounded-md bg-brick px-2 text-[0.95rem] font-medium whitespace-nowrap text-paper active:scale-[0.98]"
      >
        <CalendarDays size={18} className="hidden min-[360px]:block" aria-hidden="true" />
        {t.schedule}
      </a>
    </nav>
  );
}
