import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Check, Clock3, Heart, HeartHandshake, MapPin, MessageCircle, Phone, ShieldCheck, Smile, Sparkles, Star, Sun, UsersRound } from "lucide-react";
import { getContent } from "@/lib/content";
import { site, type Locale } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { Gallery } from "./gallery";
import { Navigation } from "./navigation";
import { RevealObserver } from "./reveal";

const serviceIcons = [HeartHandshake, UsersRound, Sun, MessageCircle];
const trustIcons = [Heart, UsersRound, MessageCircle];

export function Website({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const en = locale === "en";
  const jsonLd = {
    "@context": "https://schema.org", "@type": "LocalBusiness", "@id": `${site.url}/#business`,
    name: site.name, legalName: site.legalName, url: `${site.url}${en ? "/en/" : "/"}`,
    description: en ? "Adult day care center in Hialeah, Florida, with a focus on companionship and a family atmosphere." : "Centro de cuidado diurno para adultos en Hialeah, Florida, con enfoque en compañía y ambiente familiar.",
    telephone: "+1-305-967-8776", image: `${site.url}/images/centro-sala.webp`,
    address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Hialeah", addressRegion: "FL", postalCode: "33014", addressCountry: "US" },
    hasMap: site.maps,
    contactPoint: { "@type": "ContactPoint", telephone: "+1-305-967-8776", contactType: "customer service", availableLanguage: ["Spanish", "English"] },
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}/>
    <a className="skip-link" href="#contenido">{en ? "Skip to content" : "Saltar al contenido"}</a>
    <div className="topbar"><div className="container topbar-inner"><span><MapPin size={12}/>{t.location}</span><a href={site.phoneHref}><Phone size={12}/><span>{t.call}: {site.phone}</span><ArrowUpRight size={12}/></a></div></div>
    <Navigation locale={locale} labels={t.nav} visit={t.visit} language={t.language}/>
    <main id="contenido">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="tiny-sun"><Sun size={16}/></span>{t.eyebrow}</p>
            <h1 id="hero-title">{t.heroStart}<br/>{t.heroMiddle}<br/><span className="hero-script">{t.heroEnd}<svg viewBox="0 0 270 15" aria-hidden="true"><path d="M3 10C64 1 160 0 264 7M32 14C106 5 173 4 232 9"/></svg></span></h1>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-buttons"><a className="button" href="#club">{t.heroCta}<ArrowUpRight size={18}/></a><a className="hero-phone" href={site.phoneHref}><span><Phone size={18}/></span><span>{t.heroSecondary}<strong>{site.phone}</strong></span></a></div>
            <div className="hero-notes"><span><Check size={14}/>{t.heroNote}</span><span><Check size={14}/>{t.heroNoteTwo}</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><Image src="/images/hero-compartir.webp" alt={en ? "Two older adults laughing together over dominoes" : "Dos adultos mayores compartiendo una partida de dominó"} fill sizes="(max-width: 800px) 100vw, 52vw" priority/></div>
            <div className="hero-flower" aria-hidden="true"><svg viewBox="0 0 100 100"><g fill="currentColor"><ellipse cx="50" cy="27" rx="14" ry="25"/><ellipse cx="50" cy="73" rx="14" ry="25"/><ellipse cx="27" cy="50" rx="25" ry="14"/><ellipse cx="73" cy="50" rx="25" ry="14"/><ellipse cx="34" cy="34" rx="12" ry="24" transform="rotate(-45 34 34)"/><ellipse cx="66" cy="66" rx="12" ry="24" transform="rotate(-45 66 66)"/><ellipse cx="34" cy="66" rx="12" ry="24" transform="rotate(45 34 66)"/><ellipse cx="66" cy="34" rx="12" ry="24" transform="rotate(45 66 34)"/></g><circle cx="50" cy="50" r="14" fill="#f6edda"/></svg></div>
            <div className="hero-floating-card"><span className="floating-heart"><Heart size={23}/></span><div>{t.imageBadge}<strong>{t.imageBadgeSub}</strong></div><span className="floating-card-line"/></div>
            <span className="hero-side-text">EL PRADO · SENIOR CLUB · HIALEAH</span>
          </div>
        </div>
        <div className="container hero-bottom"><a href="#club" className="discover-link">{en ? "A little more about us" : "Un poquito más de nosotros"}<ArrowDown size={14}/></a><span className="hero-bottom-message">{en ? "Good days start with good company." : "Los buenos días empiezan con buena compañía."}<Sparkles size={14}/></span></div>
      </section>

      <section className="trust-band" aria-label={en ? "Our approach" : "Nuestra forma de cuidar"}><div className="container trust-inner"><a className="rating" href={site.maps} target="_blank" rel="noopener noreferrer"><span className="google-letter" aria-hidden="true">G</span><span className="rating-main"><span><b>4.6</b><span className="stars" aria-label={en ? "4.6 out of 5" : "4.6 de 5"}>{Array.from({length:5}, (_,i) => <Star size={12} fill="currentColor" key={i}/>)}</span><span>{t.ratingLabel}</span></span><small>{t.ratingCaption}</small></span><ArrowUpRight size={17}/></a><div className="trust-items">{t.trustItems.map((text, i) => { const Icon = trustIcons[i]; return <div key={text}><Icon size={23} strokeWidth={1.4}/><span>{text}</span></div>; })}</div></div></section>

      <section className="section intro" id="club" aria-labelledby="intro-title"><div className="container intro-grid">
        <div className="intro-visual" data-reveal><div className="intro-photo"><Image src="/images/centro-sala.webp" alt={en ? "The real lounge at El Prado Senior Club in Hialeah" : "Sala real de El Prado Senior Club en Hialeah"} fill sizes="(max-width:800px) 100vw, 45vw"/><span className="photo-corner"><Sun size={18}/>{t.introPhotoLabel}</span></div><div className="community-stamp"><HeartHandshake size={29} strokeWidth={1.2}/><span>{t.since}<strong>{t.sinceSub}</strong></span></div><span className="intro-visual-line" aria-hidden="true"/></div>
        <div className="intro-copy" data-reveal><p className="eyebrow">{t.introLabel}</p><h2 id="intro-title">{t.introTitle} <em>{t.introEm}</em></h2><p className="lead">{t.introText}</p><p>{t.introSmall}</p><a className="text-link" href="#contacto">{t.introLink}<ArrowUpRight size={18}/></a></div>
      </div></section>

      <section className="section services-section" id="servicios" aria-labelledby="services-title"><div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow">{t.servicesLabel}</p><h2 id="services-title">{t.servicesTitle}<br/><em>{t.servicesEm}</em></h2></div><p>{t.servicesText}</p></div>
        <div className="services-grid">{t.services.map((service, i) => { const Icon = serviceIcons[i]; return <article className={`service-card service-card-${i}`} key={service.title} data-reveal><div className="service-card-top"><span className="service-icon"><Icon size={29} strokeWidth={1.25}/></span><span className="service-number">0{i+1}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contacto" className="service-card-link"><span>{service.tag}</span><ArrowUpRight size={18}/></a></article>; })}</div>
        <p className="services-note"><ShieldCheck size={18}/>{t.servicesNote}</p>
      </div></section>

      <section className="family-section"><div className="container family-grid">
        <div className="family-copy" data-reveal><p className="eyebrow">{t.familyLabel}</p><h2>{t.familyTitle}<br/><em>{t.familyEm}</em></h2><p>{t.familyText}</p><ul>{t.familyPoints.map(point => <li key={point}><span><Check size={14}/></span>{point}</li>)}</ul><a className="button button-light" href="#contacto">{t.familyCta}<ArrowUpRight size={18}/></a></div>
        <div className="family-art" data-reveal><span className="family-orbit orbit-one"/><span className="family-orbit orbit-two"/><span className="family-orbit orbit-three"/><span className="family-orbit orbit-four"/><div className="family-center"><Heart size={57} strokeWidth={1}/><span>{en ? "With love," : "Con cariño,"}<strong>El Prado.</strong></span></div><span className="family-art-note note-one"><Smile size={19}/>{en ? "A shared smile" : "Una sonrisa compartida"}</span><span className="family-art-note note-two"><Sun size={19}/>{en ? "A brighter day" : "Un día más bonito"}</span><span className="family-art-note note-three"><UsersRound size={19}/>{en ? "A place to belong" : "Un lugar al que pertenecer"}</span></div>
      </div></section>

      <section className="section gallery-section" id="espacio" aria-labelledby="gallery-title"><div className="container"><div className="section-heading" data-reveal><div><p className="eyebrow">{t.galleryLabel}</p><h2 id="gallery-title">{t.galleryTitle}<br/><em>{t.galleryEm}</em></h2></div><p>{t.galleryText}</p></div><Gallery locale={locale} expand={t.galleryExpand} close={t.galleryClose} previous={t.galleryPrevious} next={t.galleryNext}/></div></section>

      <section className="section steps-section"><div className="container"><div className="center-heading" data-reveal><p className="eyebrow">{t.stepsLabel}</p><h2>{t.stepsTitle}<br/><em>{t.stepsEm}</em></h2></div><div className="steps-grid">{t.steps.map((step, i) => <article className="step" key={step.title} data-reveal><div className="step-top"><span>0{i+1}</span>{i<2 ? <div className="step-connector"><ArrowRight size={18}/></div> : <Heart size={23} strokeWidth={1.2}/>}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

      <section className="section faq-section" id="preguntas" aria-labelledby="faq-title"><div className="container faq-grid"><div data-reveal><p className="eyebrow">{t.faqLabel}</p><h2 id="faq-title">{t.faqTitle}<br/><em>{t.faqEm}</em></h2><p>{t.faqText}</p><a className="text-link" href={site.phoneHref}><Phone size={16}/>{site.phone}<ArrowUpRight size={16}/></a></div><div className="faq-list" data-reveal>{t.faqs.map((faq, i) => <details key={faq.q} name="preguntas-frecuentes" open={i === 0}><summary><span>{faq.q}</span><span className="faq-plus" aria-hidden="true"/></summary><p>{faq.a}</p></details>)}</div></div></section>

      <section className="section contact-section" id="contacto" aria-labelledby="contact-title"><div className="container contact-grid"><div className="contact-copy" data-reveal><p className="eyebrow">{t.contactLabel}</p><h2 id="contact-title">{t.contactTitle}<br/><em>{t.contactEm}</em></h2><p className="contact-description">{t.contactText}</p><div className="contact-info"><div className="contact-detail"><span className="contact-detail-icon"><Phone size={21}/></span><div><span className="contact-detail-label">{t.contactPhoneLabel}</span><a className="contact-phone" href={site.phoneHref}>{site.phone}</a><small>{t.alternate}: <a href={site.alternatePhoneHref}>{site.alternatePhone}</a></small></div></div><div className="contact-detail"><span className="contact-detail-icon"><MapPin size={22}/></span><div><span className="contact-detail-label">{t.contactAddressLabel}</span><address>{site.address}<br/>{site.city}</address><a className="text-link" href={site.maps} target="_blank" rel="noopener noreferrer">{t.directions}<ArrowUpRight size={15}/></a></div></div><div className="contact-hours"><Clock3 size={17}/><span>{t.contactHours}</span></div></div><div className="temporary-email"><span>{site.email}</span><small>{t.temporaryEmail}</small></div></div><ContactForm locale={locale}/></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-main"><div><Link href={en ? "/en/" : "/"} className="footer-brand">El Prado<span>SENIOR CLUB</span></Link><p>{t.footerLine}</p></div><div className="footer-links"><span>{t.footerCategory}</span><a href={site.phoneHref}>{site.phone}<ArrowUpRight size={15}/></a><a href={site.maps} target="_blank" rel="noopener noreferrer">Hialeah, FL<ArrowUpRight size={15}/></a></div><a href="#inicio" className="back-to-top">{t.footerTop}<span><ArrowUp size={19}/></span></a></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} {site.legalName} {t.footerRights}</span><Link href="/privacidad/">{t.footerPrivacy}</Link><span>{en ? "Made with care, for our community." : "Hecho con cariño, para nuestra comunidad."}<Heart size={11}/></span></div></div></footer>
    <div className="mobile-contact-bar"><a href={site.phoneHref}><Phone size={17}/>{t.mobileCall}</a><a href="#contacto">{t.mobileVisit}<ArrowUpRight size={17}/></a></div>
    <RevealObserver/>
  </>;
}
