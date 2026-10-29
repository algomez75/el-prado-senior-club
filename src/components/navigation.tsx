"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe2, Menu, Phone, X } from "lucide-react";
import type { Content } from "@/lib/content";
import { site, type Locale } from "@/lib/site";
import { buttonStyles } from "./ui/button-styles";
import { cn } from "./ui/cn";
import { Magnetic } from "./ui/magnetic";

export function Navigation({ locale, t, scheduleHref }: { locale: Locale; t: Content["nav"]; scheduleHref: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const external = scheduleHref.startsWith("http");
  const pathname = usePathname();
  const homeHref = locale === "es" ? "/" : "/en/";

  /** Logo y nombre: en la portada suben al inicio; desde otra página llevan a la portada. */
  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const strip = (path: string) => path.replace(/\/+$/, "") || "/";
    if (strip(pathname ?? "") !== strip(homeHref)) return;
    event.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    if (window.location.hash) window.history.replaceState(null, "", homeHref);
    document.getElementById("contenido")?.focus({ preventScroll: true });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ease-out-soft",
        scrolled || open ? "border-ink/10 bg-paper/95 shadow-soft backdrop-blur-md" : "border-transparent bg-paper/80 backdrop-blur-sm",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
        <Link href={homeHref} onClick={goHome} className="group/brand flex shrink-0 cursor-pointer items-center gap-3 rounded-lg" aria-label={t.home}>
          <span
            className="relative block h-9 w-14 shrink-0 overflow-hidden mix-blend-multiply transition-transform duration-500 ease-spring group-hover/brand:-rotate-3 group-hover/brand:scale-110"
            aria-hidden="true"
          >
            <Image src="/images/logo-original.jpg" width={176} height={133} alt="" priority className="absolute -top-[44px] -left-[59px] h-auto w-[176px] max-w-none" />
          </span>
          <span className="hidden font-display text-2xl leading-[0.9] font-semibold tracking-[-0.04em] text-ink transition-colors duration-300 group-hover/brand:text-brick min-[340px]:block sm:text-[1.75rem]">
            El Prado
            <span className="mt-1 block font-sans text-[0.62rem] font-medium tracking-[0.3em] text-muted uppercase">Senior Club</span>
          </span>
        </Link>

        <nav aria-label={t.main} className="hidden items-center gap-1 xl:flex">
          {t.items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:bg-mist hover:text-sage-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href={locale === "es" ? "/en/" : "/"}
            hrefLang={locale === "es" ? "en" : "es"}
            aria-label={t.language}
            className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-ink transition-colors hover:bg-mist md:inline-flex"
          >
            <Globe2 size={18} aria-hidden="true" />
            {t.languageShort}
          </Link>

          {/* Teléfono persistente: siempre visible, en cualquier ancho de pantalla */}
          <Magnetic strength={0.2}>
            <a href={site.phoneHref} className={buttonStyles("quiet", "md", "gap-2.5 px-3 sm:px-4")} aria-label={`${t.callShort}: ${site.phone}`}>
              <span className="pulse-ring grid size-7 place-items-center rounded-full bg-terra text-paper" aria-hidden="true">
                <Phone size={14} />
              </span>
              <span className="hidden font-bold tabular-nums sm:inline">{site.phone}</span>
              <span className="hidden min-[400px]:inline sm:hidden">{t.callShort}</span>
            </a>
          </Magnetic>

          <div className="hidden lg:block">
            <Magnetic>
            <a
              href={scheduleHref}
              className={buttonStyles("primary", "md")}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {t.schedule}
              <ArrowUpRight size={17} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
            </a>
            </Magnetic>
          </div>

          <button
            ref={toggle}
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-mist xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t.close : t.open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <span className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-terra via-gold to-sage" aria-hidden="true" />

      {open ? (
        <nav id="mobile-navigation" aria-label={t.mobile} className="container-page animate-rise border-t border-ink/10 pt-3 pb-6 xl:hidden">
          <ul className="flex flex-col">
            {t.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-ink/10 font-display text-xl font-semibold text-ink"
                >
                  {item.label}
                  <ArrowUpRight size={20} className="text-terra" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={scheduleHref}
                onClick={() => setOpen(false)}
                className={buttonStyles("primary", "lg", "w-full sm:w-auto")}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {t.schedule}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <Link
                href={locale === "es" ? "/en/" : "/"}
                hrefLang={locale === "es" ? "en" : "es"}
                className={buttonStyles("quiet", "lg", "w-full sm:w-auto")}
              >
                <Globe2 size={20} aria-hidden="true" />
                {t.language}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
