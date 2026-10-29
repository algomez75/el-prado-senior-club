import { ArrowUpRight, Clock3, Phone } from "lucide-react";
import type { Content } from "@/lib/content";
import { site, type Locale } from "@/lib/site";
import { buttonStyles } from "../ui/button-styles";
import { SectionTitle } from "../ui/section-title";
import { stagger } from "../ui/stagger";
import { VisitScheduler } from "../visit-scheduler";

export function Visit({ locale, t, hours }: { locale: Locale; t: Content["scheduler"]; hours: string }) {
  return (
    <section id="agendar" aria-labelledby="visit-title" className="grain section-y bg-sand">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-28">
            <SectionTitle id="visit-title" strong={t.titleStrong} soft={t.titleSoft} />
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.lead}</p>

            {site.bookingUrl ? (
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles("outline", "lg", "mt-6")}>
                {t.online}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ) : null}

            <div className="mt-7 flex flex-col gap-3 border-t border-ink/10 pt-6">
              <a href={site.phoneHref} className="group flex items-center gap-3 rounded-xl">
                <span className="pulse-ring grid size-11 place-items-center rounded-full bg-terra text-paper" aria-hidden="true">
                  <Phone size={18} />
                </span>
                <span className="text-xl font-bold text-ink tabular-nums underline decoration-terra/30 decoration-2 underline-offset-4 group-hover:decoration-terra">
                  {site.phone}
                </span>
              </a>
              <p className="flex items-center gap-3 text-[0.95rem] text-muted">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mist text-sage" aria-hidden="true">
                  <Clock3 size={18} />
                </span>
                {hours}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8" data-reveal="scale" style={stagger(1)}>
          <VisitScheduler locale={locale} t={t} />
        </div>
      </div>
    </section>
  );
}
