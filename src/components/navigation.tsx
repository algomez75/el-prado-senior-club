"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2, Menu, Phone, X } from "lucide-react";
import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";

export function Navigation({ locale, labels, visit, language }: { locale: Locale; labels: string[]; visit: string; language: string }) {
  const [open, setOpen] = useState(false);
  const ids = ["club", "servicios", "espacio", "preguntas"];
  return <header className="site-header">
    <div className="container header-inner">
      <Link href={locale === "es" ? "/" : "/en/"} className="brand" aria-label="El Prado Senior Club — inicio">
        <span className="brand-mark"><Image src="/images/logo-original.jpg" width={104} height={78} alt="" priority /></span>
        <span className="brand-name">El Prado<span>S E N I O R  C L U B</span></span>
      </Link>
      <nav className="desktop-nav" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
        {labels.map((label, i) => <a href={`#${ids[i]}`} key={label}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <Link className="language-switch" href={locale === "es" ? "/en/" : "/"} aria-label={language}><Globe2 size={16} /><span>{locale === "es" ? "EN" : "ES"}</span></Link>
        <a className="button button-small header-visit" href="#contacto">{visit}<ArrowUpRight size={17}/></a>
        <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? (locale === "es" ? "Cerrar menú" : "Close menu") : (locale === "es" ? "Abrir menú" : "Open menu")} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
    {open ? <nav id="mobile-navigation" className="mobile-navigation" aria-label={locale === "es" ? "Navegación móvil" : "Mobile navigation"}>
      {labels.map((label, i) => <a href={`#${ids[i]}`} key={label} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17}/></a>)}
      <a href="#contacto" onClick={() => setOpen(false)}>{visit}<ArrowUpRight size={17}/></a>
      <a href={site.phoneHref}><Phone size={16}/>{site.phone}</a>
    </nav> : null}
  </header>;
}
