import Link from "next/link";
import { ArrowUp, ArrowUpRight, Heart, MapPin, Phone } from "lucide-react";
import type { Content } from "@/lib/content";
import { site, type Locale } from "@/lib/site";
import { SectionTitle } from "../ui/section-title";
import { stagger } from "../ui/stagger";

export function Contact({ t }: { t: Content["contact"] }) {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="grain section-y bg-mist">
      <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5" data-reveal>
          <SectionTitle id="contact-title" strong={t.titleStrong} soft={t.titleSoft} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          <div data-reveal="scale" style={stagger(0)}>
            <div className="group h-full rounded-[1.75rem_0.75rem_1.75rem_0.75rem] bg-sage p-6 text-paper shadow-soft transition-[translate,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift">
              <Phone size={22} className="text-gold-light transition-transform duration-500 ease-spring group-hover:rotate-12" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-semibold text-gold-light">{t.phoneLabel}</h3>
              <a href={site.phoneHref} className="mt-1 block font-display text-3xl font-semibold tabular-nums underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
                {site.phone}
              </a>
              <p className="mt-4 text-[0.95rem] text-sage-soft">
                {t.alternate}:{" "}
                <a href={site.alternatePhoneHref} className="inline-flex min-h-11 items-center font-semibold text-paper underline underline-offset-4 tabular-nums">
                  {site.alternatePhone}
                </a>
              </p>
              <p className="text-[0.95rem] text-sage-soft">{t.hours}</p>
            </div>
          </div>

          <div data-reveal="scale" style={stagger(1)}>
            <div className="group h-full rounded-[0.75rem_1.75rem_0.75rem_1.75rem] bg-paper p-6 shadow-soft ring-1 ring-ink/10 transition-[translate,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift">
              <MapPin size={22} className="text-terra transition-transform duration-500 ease-spring group-hover:-translate-y-1" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-semibold text-terra">{t.addressLabel}</h3>
              <address className="mt-1 text-lg leading-relaxed font-semibold text-ink">
                {site.address}
                <br />
                {site.city}
              </address>
              <a
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-3 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-terra underline underline-offset-4"
              >
                {t.directions}
                <ArrowUpRight size={17} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
              </a>
              <p className="mt-3 border-t border-ink/10 pt-3 text-[0.95rem] [overflow-wrap:anywhere] text-muted">
                {site.email} · {t.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ locale, t }: { locale: Locale; t: Content["footer"] }) {
  return (
    <footer className="grain-light bg-ink pt-14 pb-28 text-paper lg:pb-10">
      <div className="container-page">
        <div className="flex flex-col gap-8 border-b border-paper/15 pb-10 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <Link href={locale === "es" ? "/" : "/en/"} className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              El Prado
              <span className="block font-normal text-gold-light italic">Senior Club</span>
            </Link>
            <p className="mt-4 max-w-sm text-base text-sage-soft">{t.line}</p>
          </div>
          <div className="flex flex-col gap-1 text-base md:items-end">
            <p className="text-sage-soft">{t.category}</p>
            <a href={site.phoneHref} className="inline-flex min-h-11 items-center gap-2 font-semibold tabular-nums underline-offset-4 hover:underline">
              <Phone size={17} aria-hidden="true" />
              {site.phone}
            </a>
            <a href="#inicio" className="group inline-flex min-h-11 items-center gap-3 font-semibold underline-offset-4 hover:underline">
              {t.top}
              <span className="grid size-9 place-items-center rounded-full bg-paper/10 transition-transform duration-500 ease-spring group-hover:-translate-y-1" aria-hidden="true">
                <ArrowUp size={17} />
              </span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-[0.95rem] text-sage-soft md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getUTCFullYear()} {site.legalName} {t.rights}
          </span>
          <Link href="/privacidad/" className="inline-flex min-h-11 items-center font-semibold text-paper underline underline-offset-4">
            {t.privacy}
          </Link>
          <span className="flex items-center gap-2">
            {t.made}
            <Heart size={13} className="text-gold-light" aria-hidden="true" />
          </span>
        </div>
      </div>
    </footer>
  );
}
