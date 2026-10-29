"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { photos, type Locale } from "@/lib/site";

export function Gallery({ locale, expand, close, previous, next }: { locale: Locale; expand: string; close: string; previous: string; next: string }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (active !== null) { if (!node.open) node.showModal(); document.body.style.overflow = "hidden"; }
    if (active === null && node.open) { node.close(); document.body.style.overflow = ""; trigger.current?.focus(); }
    return () => { document.body.style.overflow = ""; };
  }, [active]);
  const current = active === null ? null : photos[active];
  return <>
    <div className="gallery-grid">
      {photos.map((photo, i) => <button key={photo.src} className={`gallery-photo gallery-photo-${i}`} aria-label={`${expand}: ${locale === "es" ? photo.es : photo.en}`} onClick={event => { trigger.current = event.currentTarget; setActive(i); }}>
        <Image src={photo.src} alt={locale === "es" ? photo.altEs : photo.altEn} fill sizes={i === 0 ? "(max-width: 700px) 100vw, 60vw" : "(max-width: 700px) 50vw, 30vw"}/>
        <span className="gallery-photo-shade"/><span className="gallery-photo-caption">{locale === "es" ? photo.es : photo.en}</span><span className="gallery-expand"><Expand size={16}/></span>
      </button>)}
    </div>
    <dialog className="gallery-dialog" ref={dialog} aria-label={locale === "es" ? "Galería del centro" : "Center gallery"} onCancel={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) setActive(null); }} onKeyDown={event => { if (event.key === "ArrowRight" && active !== null) setActive((active + 1) % photos.length); if (event.key === "ArrowLeft" && active !== null) setActive((active + photos.length - 1) % photos.length); }}>
      {current ? <div className="lightbox-content">
        <button className="lightbox-close" onClick={() => setActive(null)} aria-label={close}><X/></button>
        <Image src={current.src} width={1600} height={1200} alt={locale === "es" ? current.altEs : current.altEn} className="lightbox-image"/>
        <div className="lightbox-bottom"><p>{locale === "es" ? current.es : current.en}</p><span>{(active ?? 0) + 1} / {photos.length}</span><button aria-label={previous} onClick={() => setActive(((active ?? 0) + photos.length - 1) % photos.length)}><ArrowLeft size={20}/></button><button aria-label={next} onClick={() => setActive(((active ?? 0) + 1) % photos.length)}><ArrowRight size={20}/></button></div>
      </div> : null}
    </dialog>
  </>;
}
