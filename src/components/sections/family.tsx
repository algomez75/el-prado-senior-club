import Image from "next/image";
import { ArrowUpRight, Check, Sun } from "lucide-react";
import type { Content } from "@/lib/content";
import { buttonStyles } from "../ui/button-styles";
import { Magnetic } from "../ui/magnetic";
import { SectionTitle } from "../ui/section-title";
import { stagger } from "../ui/stagger";

export function Family({ t, scheduleHref, photoAlt }: { t: Content["family"]; scheduleHref: string; photoAlt: string }) {
  return (
    <section aria-labelledby="family-title" className="grain-light section-y overflow-hidden bg-sage-deep text-paper">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6" data-reveal>
          <SectionTitle id="family-title" strong={t.titleStrong} soft={t.titleSoft} tone="dark" />
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-sage-soft">{t.text}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {t.points.map((point, i) => (
              <li key={point} className="flex items-center gap-3 text-base font-medium text-paper" data-reveal="left" style={stagger(i + 2)}>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold-light text-sage-deep" aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Magnetic className="mt-8">
            <a href={scheduleHref} className={buttonStyles("light", "lg")}>
              {t.cta}
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
            </a>
          </Magnetic>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8 lg:max-w-none" data-reveal="clip" style={stagger(1)}>
          <figure className="reveal-zoom relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-arch bg-sage shadow-lift lg:aspect-[5/6]">
            <Image src="/images/centro-bienvenida.webp" alt={photoAlt} fill sizes="(max-width: 1024px) 70vw, 32vw" className="object-cover" />
          </figure>
          <div className="animate-float relative -mt-20 mr-auto w-[76%] rounded-[1.25rem_1.25rem_1.25rem_0.5rem] bg-paper p-5 text-ink shadow-lift sm:p-6">
            <Sun size={24} className="animate-spin-slow text-terra" aria-hidden="true" />
            <p className="mt-2 font-display text-xl leading-snug font-normal italic sm:text-2xl">{t.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
