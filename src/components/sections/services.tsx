import { HeartHandshake, MessageCircleHeart, ShieldCheck, Sun, UsersRound } from "lucide-react";
import type { Content } from "@/lib/content";
import { cn } from "../ui/cn";
import { SectionTitle } from "../ui/section-title";
import { stagger } from "../ui/stagger";

const icons = [HeartHandshake, UsersRound, Sun, MessageCircleHeart];

/* Rejilla asimétrica 7/5 · 5/7 — evita la fila de cuatro tarjetas idénticas */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const surfaces = ["bg-sage text-paper", "bg-paper text-ink", "bg-linen text-ink", "bg-paper text-ink"];

export function Services({ t }: { t: Content["services"] }) {
  return (
    <section id="servicios" aria-labelledby="services-title" className="grain section-y bg-sand">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end" data-reveal>
          <SectionTitle id="services-title" strong={t.titleStrong} soft={t.titleSoft} className="lg:col-span-7" />
          <p className="max-w-md text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">{t.lead}</p>
        </div>

        <ul className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12" role="list">
          {t.items.map((service, i) => {
            const Icon = icons[i];
            const dark = i === 0;
            return (
              <li key={service.title} data-reveal="scale" style={stagger(i)} className={spans[i]}>
                {/* La tarjeta interna se eleva al pasar el ratón; el <li> solo se encarga del revelado */}
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 shadow-soft transition-[translate,box-shadow] duration-500 ease-out-soft hover:-translate-y-1.5 hover:shadow-lift sm:p-7",
                    i % 2 === 1 && "md:rounded-tr-[0.75rem] lg:rounded-tl-[0.75rem] lg:rounded-tr-[1.75rem]",
                    surfaces[i],
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-0 transition-[opacity,scale] duration-700 ease-out-soft group-hover:scale-125 group-hover:opacity-100",
                      dark ? "bg-paper/5" : "bg-mist",
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "relative grid size-12 place-items-center rounded-full transition-transform duration-500 ease-spring group-hover:-rotate-12 group-hover:scale-110",
                      dark ? "bg-paper/10 text-gold-light" : "bg-mist text-sage",
                    )}
                    aria-hidden="true"
                  >
                    <Icon size={24} strokeWidth={1.6} />
                  </span>
                  <h3 className={cn("relative mt-5 font-display text-[1.75rem] leading-tight font-semibold", dark ? "text-paper" : "text-ink")}>{service.title}</h3>
                  <p className={cn("relative mt-2.5 max-w-prose flex-1 text-base leading-relaxed", dark ? "text-sage-soft" : "text-muted")}>{service.text}</p>
                  <p
                    className={cn(
                      "relative mt-5 flex items-center gap-3 border-t pt-4 text-[0.95rem] font-semibold",
                      dark ? "border-paper/20 text-gold-light" : i === 2 ? "border-ink/10 text-terra-deep" : "border-ink/10 text-terra",
                    )}
                  >
                    <span className="h-px w-5 bg-current transition-[width] duration-500 ease-out-soft group-hover:w-9" aria-hidden="true" />
                    {service.tag}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-2.5 text-center text-[0.95rem] text-muted" data-reveal>
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-sage" aria-hidden="true" />
          {t.note}
        </p>
      </div>
    </section>
  );
}
