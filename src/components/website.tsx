import { getContent } from "@/lib/content";
import { photos, site, type Locale } from "@/lib/site";
import { Gallery } from "./gallery";
import { Navigation } from "./navigation";
import { RevealObserver } from "./reveal";
import { About } from "./sections/about";
import { MobileBar } from "./mobile-bar";
import { Contact, Footer } from "./sections/contact-footer";
import { Family } from "./sections/family";
import { Hero } from "./sections/hero";
import { Marquee } from "./sections/marquee";
import { Services } from "./sections/services";
import { Faq, Steps } from "./sections/steps-faq";
import { Visit } from "./sections/visit";
import { SectionTitle } from "./ui/section-title";

export function Website({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const en = locale === "en";
  // Con un calendario externo configurado, los botones "Agendar" van directo a él.
  const scheduleHref = site.bookingUrl ?? "#agendar";
  const welcomePhoto = photos.find((photo) => photo.src.includes("bienvenida")) ?? photos[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}${en ? "/en/" : "/"}`,
    description: en
      ? "Adult day care center in Hialeah, Florida, with a focus on companionship and a family atmosphere."
      : "Centro de cuidado diurno para adultos en Hialeah, Florida, con enfoque en compañía y ambiente familiar.",
    telephone: "+1-305-967-8776",
    image: `${site.url}/images/centro-sala.webp`,
    address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Hialeah", addressRegion: "FL", postalCode: "33014", addressCountry: "US" },
    hasMap: site.maps,
    contactPoint: { "@type": "ContactPoint", telephone: "+1-305-967-8776", contactType: "customer service", availableLanguage: ["Spanish"] },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a
        href="#contenido"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-ink px-6 py-3 text-base font-semibold text-paper transition-transform focus:translate-y-0"
      >
        {t.skip}
      </a>

      <Navigation locale={locale} t={t.nav} scheduleHref={scheduleHref} />

      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero t={t.hero} scheduleHref={scheduleHref} />
        <Marquee items={t.marquee} label={en ? "Our values" : "Nuestros valores"} />
        <About t={t.about} scheduleHref={scheduleHref} />
        <Services t={t.services} />
        <Family t={t.family} scheduleHref={scheduleHref} photoAlt={en ? welcomePhoto.altEn : welcomePhoto.altEs} />

        <section id="espacio" aria-labelledby="gallery-title" className="section-y">
          <div className="container-page">
            <div className="mb-9 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end" data-reveal>
              <SectionTitle id="gallery-title" strong={t.gallery.titleStrong} soft={t.gallery.titleSoft} className="lg:col-span-7" />
              <p className="max-w-md text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">{t.gallery.lead}</p>
            </div>
            <Gallery locale={locale} t={t.gallery} />
          </div>
        </section>

        <Steps t={t.steps} />
        <Visit locale={locale} t={t.scheduler} hours={t.contact.hours} />
        <Faq t={t.faq} />
        <Contact t={t.contact} />
      </main>

      <Footer locale={locale} t={t.footer} />
      <MobileBar t={t.mobileBar} scheduleHref={scheduleHref} />
      <RevealObserver />
    </>
  );
}
