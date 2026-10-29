import { ArrowUpRight, Phone, Plus } from "lucide-react";
import type { Content } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionTitle } from "../ui/section-title";
import { stagger } from "../ui/stagger";

export function Steps({ t }: { t: Content["steps"] }) {
  return (
    <section aria-labelledby="steps-title" className="section-y">
      <div className="container-page">
        <div data-reveal>
          <SectionTitle id="steps-title" strong={t.titleStrong} soft={t.titleSoft} className="max-w-3xl" />
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {t.items.map((step, i) => (
            <li key={step.title} className="group relative pt-6" data-reveal style={stagger(i)}>
              <span className="draw-x absolute top-0 left-0 h-0.5 w-full bg-ink/10" aria-hidden="true" />
              <span className="draw-x absolute top-0 left-0 h-0.5 w-14 bg-terra transition-[width] duration-500 group-hover:w-24" aria-hidden="true" />
              <span
                className="inline-block font-display text-6xl font-normal text-terra italic transition-transform duration-500 ease-spring group-hover:-translate-y-1"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq({ t }: { t: Content["faq"] }) {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="section-y">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-28">
            <SectionTitle id="faq-title" strong={t.titleStrong} soft={t.titleSoft} />
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.lead}</p>
            <a href={site.phoneHref} className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-full text-lg font-bold text-ink tabular-nums">
              <span className="pulse-ring grid size-11 place-items-center rounded-full bg-terra text-paper" aria-hidden="true">
                <Phone size={18} />
              </span>
              {site.phone}
              <ArrowUpRight size={18} className="text-terra transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-7 lg:col-start-6">
          {t.items.map((faq, i) => (
            <details
              key={faq.q}
              name="preguntas-frecuentes"
              open={i === 0}
              className="group rounded-2xl bg-sand ring-1 ring-ink/5 transition-[background-color,box-shadow] duration-300 open:bg-paper open:shadow-lift hover:ring-sage/30"
              data-reveal
              style={stagger(i)}
            >
              <summary className="flex min-h-14 items-center justify-between gap-5 rounded-2xl px-5 py-3.5 sm:px-6">
                <span className="font-display text-xl font-semibold text-ink sm:text-[1.4rem]">{faq.q}</span>
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-mist text-sage transition-[rotate,background-color,color] duration-300 ease-out-soft group-open:rotate-45 group-open:bg-sage group-open:text-paper"
                  aria-hidden="true"
                >
                  <Plus size={18} />
                </span>
              </summary>
              <p className="px-5 pb-5 text-base leading-relaxed text-muted sm:px-6">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
