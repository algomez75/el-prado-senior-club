import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Clock3, Phone, Star, Trees } from "lucide-react";
import type { Content } from "@/lib/content";
import { site } from "@/lib/site";
import { buttonStyles } from "../ui/button-styles";
import { Magnetic } from "../ui/magnetic";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const line = (n: number) => ({ "--line": n }) as CSSProperties;

/* El Paseo del Prado se funde con el papel: visible arriba a la derecha, desaparece bajo el texto. */
const paseoMask: CSSProperties = {
  maskImage: "linear-gradient(to bottom, #000 0%, #000 30%, transparent 92%), linear-gradient(to left, #000 25%, rgb(0 0 0 / 0.25) 70%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 30%, transparent 92%), linear-gradient(to left, #000 25%, rgb(0 0 0 / 0.25) 70%, transparent 100%)",
  WebkitMaskComposite: "source-in",
};

export function Hero({ t, scheduleHref }: { t: Content["hero"]; scheduleHref: string }) {
  const external = scheduleHref.startsWith("http");

  return (
    <section id="inicio" aria-labelledby="hero-title" className="grain relative overflow-hidden pt-6 pb-12 sm:pt-10 lg:pt-12 lg:pb-16">
      {/* Fondo: el paseo que inspiró el nombre, en clave minimalista */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0" style={paseoMask}>
          <Image
            src="/images/paseo-prado.webp"
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="animate-drift object-cover object-[center_35%] opacity-40 saturate-[0.75] sepia-[0.12]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="animate-rise flex items-center gap-3 text-[0.95rem] font-semibold text-sage-deep" style={delay(0)}>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            {t.kicker}
          </p>

          <h1
            id="hero-title"
            className="animate-lines mt-4 font-display text-[clamp(2.8rem,6.6vw,5.4rem)] leading-[0.98] tracking-[-0.045em] text-ink"
            style={delay(120)}
          >
            <span className="line-mask" style={line(0)}>
              <span className="font-medium">{t.titleStrong}</span>
            </span>
            <span className="line-mask" style={line(1)}>
              <span className="pr-2 font-normal text-terra italic">{t.titleSoft}</span>
            </span>
          </h1>

          <p className="animate-rise mt-5 max-w-lg text-lg leading-relaxed text-muted" style={delay(420)}>
            {t.lead}
          </p>

          {/* Doble propósito: agendar (principal) + llamar (secundario) */}
          <div className="animate-rise mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6" style={delay(560)}>
            <div className="flex flex-col gap-1.5">
              <Magnetic>
                <a
                  href={scheduleHref}
                  className={buttonStyles("primary", "lg", "w-full px-7 sm:w-auto")}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {t.primary}
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                </a>
              </Magnetic>
              <span className="pl-2 text-[0.95rem] text-muted">{t.primaryHint}</span>
            </div>

            <a href={site.phoneHref} className="group flex items-center gap-3 self-start rounded-2xl py-1 pr-3 sm:-mt-6">
              <span className="pulse-ring grid size-12 place-items-center rounded-full border-2 border-terra/30 bg-paper text-terra transition-colors duration-300 group-hover:border-terra group-hover:bg-terra group-hover:text-paper">
                <Phone size={20} aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-12" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.95rem] text-muted">{t.secondary}</span>
                <span className="text-xl font-bold tabular-nums text-ink underline decoration-terra/30 decoration-2 underline-offset-4 transition-colors group-hover:decoration-terra">
                  {site.phone}
                </span>
              </span>
            </a>
          </div>

          <div className="animate-rise mt-8 flex flex-col gap-5 border-t border-ink/10 pt-6 md:flex-row md:items-center md:gap-8" style={delay(700)}>
            <a href={site.maps} target="_blank" rel="noopener noreferrer" aria-label={t.ratingAria} className="group flex shrink-0 items-center gap-3 rounded-xl">
              <span className="font-display text-5xl font-semibold text-ink">{site.rating.value}</span>
              <span className="flex flex-col gap-0.5">
                <span className="flex items-center gap-2 text-[0.95rem] font-semibold whitespace-nowrap text-ink">
                  <span className="star-pop flex text-gold" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                  {t.ratingLabel}
                  <ArrowUpRight size={15} className="text-terra transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
                <span className="text-[0.95rem] text-muted">{t.ratingCaption}</span>
              </span>
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {t.proof.map((item, i) => (
                <li key={item} className="animate-rise flex items-center gap-2 text-[0.95rem] font-medium text-ink" style={delay(820 + i * 90)}>
                  <span className="grid size-5 place-items-center rounded-full bg-mist text-sage" aria-hidden="true">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Composición asimétrica: arco de foto + bloque salvia desplazado + tarjeta flotante */}
        <div className="animate-rise relative mx-auto w-full max-w-[21rem] sm:max-w-sm lg:col-span-5 lg:max-w-none" style={delay(250)}>
          <div className="animate-float absolute -right-3 -bottom-5 h-[78%] w-[82%] rounded-organic bg-sage-soft [animation-delay:-2s] sm:-right-6" aria-hidden="true" />
          <div className="animate-spin-slow absolute top-8 -left-4 size-20 rounded-full border-2 border-dashed border-gold/70" aria-hidden="true" />
          <figure className="parallax relative aspect-[4/5] overflow-hidden rounded-arch bg-linen shadow-lift lg:aspect-[5/6]">
            <Image
              src="/images/hero-compartir.webp"
              alt={t.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 36vw"
              className="object-cover object-[57%_center]"
            />
          </figure>
          <div className="animate-float absolute -bottom-6 left-0 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 shadow-lift sm:-left-8 lg:-left-12">
            <span className="grid size-10 place-items-center rounded-full bg-terra text-paper" aria-hidden="true">
              <Clock3 size={19} />
            </span>
            <span className="flex flex-col leading-snug">
              <span className="font-display text-xl font-semibold text-ink">{t.cardTitle}</span>
              <span className="text-[0.95rem] text-muted">{t.cardText}</span>
            </span>
          </div>
        </div>
      </div>

      {/* El origen del nombre */}
      <p className="animate-rise container-page mt-14 flex items-center gap-3 text-[0.95rem] text-muted lg:mt-12" style={delay(1000)}>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist text-sage" aria-hidden="true">
          <Trees size={18} />
        </span>
        <span className="font-display text-lg italic">{t.heritage}</span>
      </p>
    </section>
  );
}
