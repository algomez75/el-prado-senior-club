"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { Content } from "@/lib/content";
import { photos, type Locale } from "@/lib/site";
import { cn } from "./ui/cn";
import { stagger } from "./ui/stagger";

/* Mosaico asimétrico: una foto protagonista y tres de apoyo */
const tiles = [
  "sm:col-span-2 lg:col-span-6 lg:row-span-2 aspect-[4/3] lg:aspect-auto rounded-[2rem_0.75rem_2rem_0.75rem]",
  "sm:col-span-2 lg:col-span-6 aspect-[16/9] lg:aspect-auto rounded-[0.75rem_2rem_0.75rem_0.75rem]",
  "lg:col-span-3 aspect-[4/3] lg:aspect-auto rounded-[0.75rem]",
  "lg:col-span-3 aspect-[4/3] lg:aspect-auto rounded-[0.75rem_0.75rem_2rem_0.75rem]",
];

export function Gallery({ locale, t }: { locale: Locale; t: Content["gallery"] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const es = locale === "es";

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (active !== null && !node.open) {
      node.showModal();
      document.body.style.overflow = "hidden";
    }
    if (active === null && node.open) {
      node.close();
      document.body.style.overflow = "";
      trigger.current?.focus();
    }
  }, [active]);

  useEffect(() => () => void (document.body.style.overflow = ""), []);

  const go = (step: number) => setActive((value) => (value === null ? value : (value + step + photos.length) % photos.length));
  const current = active === null ? null : photos[active];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,12.5rem))]" role="list">
        {photos.map((photo, i) => (
          <li key={photo.src} className={cn("relative overflow-hidden bg-linen shadow-soft", tiles[i])} data-reveal="clip" style={stagger(i)}>
            <button
              type="button"
              className="group absolute inset-0 block size-full text-left focus-visible:outline-offset-[-6px]"
              aria-label={`${t.expand}: ${es ? photo.es : photo.en}`}
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setActive(i);
              }}
            >
              <Image
                src={photo.src}
                alt={es ? photo.altEs : photo.altEn}
                fill
                sizes={i === 0 ? "(max-width: 1024px) 92vw, 50vw" : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 50vw"}
                className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 to-transparent transition-[height] duration-500 group-hover:h-full" aria-hidden="true" />
              <span className={cn("absolute right-16 bottom-5 left-5 font-display font-semibold text-paper", i === 0 ? "text-2xl" : "text-lg")}>
                {es ? photo.es : photo.en}
              </span>
              <span
                className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full border border-paper/40 bg-ink/40 text-paper transition-colors group-hover:bg-ink/70"
                aria-hidden="true"
              >
                <Expand size={18} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={t.label}
        className="m-auto max-h-[94dvh] w-[min(92vw,68rem)] overflow-visible bg-transparent p-0 text-paper backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
        onCancel={(event) => {
          event.preventDefault();
          setActive(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          if (event.key === "ArrowLeft") go(-1);
        }}
      >
        {current ? (
          <div className="relative overflow-hidden rounded-2xl bg-ink">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label={t.close}
              className="absolute top-3 right-3 z-10 grid size-12 place-items-center rounded-full bg-ink/80 text-paper hover:bg-ink"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <Image
              src={current.src}
              width={1600}
              height={1200}
              alt={es ? current.altEs : current.altEn}
              className="max-h-[76dvh] w-full object-contain"
            />
            <div className="flex flex-wrap items-center gap-4 px-6 py-4">
              <p className="flex-1 font-display text-xl text-paper">{es ? current.es : current.en}</p>
              <span className="text-base text-sage-soft tabular-nums" aria-live="polite">
                {(active ?? 0) + 1} / {photos.length}
              </span>
              <button type="button" onClick={() => go(-1)} aria-label={t.previous} className="grid size-12 place-items-center rounded-full bg-paper/10 hover:bg-paper/20">
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t.next} className="grid size-12 place-items-center rounded-full bg-paper/10 hover:bg-paper/20">
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
