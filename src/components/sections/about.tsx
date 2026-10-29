import Image from "next/image";
import { ArrowUpRight, Home, Languages, MapPin } from "lucide-react";
import type { Content } from "@/lib/content";
import { SectionTitle } from "../ui/section-title";
import { stagger } from "../ui/stagger";

const factIcons = [Home, Languages, MapPin];

export function About({ t, scheduleHref }: { t: Content["about"]; scheduleHref: string }) {
  return (
    <section id="club" aria-labelledby="club-title" className="section-y">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none" data-reveal="clip">
          <div className="absolute -top-4 -left-4 h-full w-full rounded-organic border-2 border-sage-soft" aria-hidden="true" />
          <figure className="reveal-zoom relative aspect-[16/11] overflow-hidden rounded-organic bg-linen shadow-soft">
            <Image src="/images/centro-sala.webp" alt={t.photoAlt} fill sizes="(max-width: 1024px) 92vw, 44vw" className="object-cover object-[40%_center]" />
            <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-sm font-medium text-paper">
              <MapPin size={14} aria-hidden="true" />
              {t.photoLabel}
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-5 lg:col-start-8" data-reveal style={stagger(1)}>
          <SectionTitle id="club-title" strong={t.titleStrong} soft={t.titleSoft} />
          <p className="mt-5 text-lg leading-relaxed text-ink">{t.lead}</p>
          <p className="mt-3 text-base leading-relaxed text-muted">{t.body}</p>

          <dl className="mt-7 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {t.facts.map((fact, i) => {
              const Icon = factIcons[i];
              return (
                <div
                  key={fact.title}
                  className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-0.5 xl:grid-cols-1"
                  data-reveal
                  style={stagger(i + 2)}
                >
                  <span
                    className="row-span-2 grid size-10 place-items-center rounded-full bg-mist text-sage transition-transform duration-500 ease-spring group-hover:-rotate-12 group-hover:scale-110 xl:row-span-1 xl:mb-1.5"
                    aria-hidden="true"
                  >
                    <Icon size={18} />
                  </span>
                  <dt className="font-display text-xl font-semibold text-ink">{fact.title}</dt>
                  <dd className="text-[0.95rem] leading-snug text-muted">{fact.text}</dd>
                </div>
              );
            })}
          </dl>

          <a
            href={scheduleHref}
            className="group mt-7 inline-flex min-h-11 items-center gap-2 border-b-2 border-terra/30 pb-0.5 text-base font-semibold text-terra transition-colors hover:border-terra"
          >
            {t.link}
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
