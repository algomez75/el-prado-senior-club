import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonStyles } from "@/components/ui/button-styles";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacidad y contacto", alternates: { canonical: "/privacidad/" } };

const h2 = "mt-14 font-display text-3xl font-bold text-ink";
const p = "mt-4 text-lg leading-relaxed text-muted";
const a = "font-semibold text-terra underline underline-offset-4";

export default function Privacy() {
  return (
    <main className="grain min-h-dvh py-16 sm:py-24">
      <article className="mx-auto max-w-3xl px-5">
        <Link href="/" className="inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-terra">
          <ArrowLeft size={18} aria-hidden="true" />
          El Prado Senior Club
        </Link>
        <h1 className="mt-10 font-display text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.02] text-ink">
          <span className="block font-medium">Tu información,</span>
          <span className="block font-normal text-terra italic">con cuidado.</span>
        </h1>
        <p className={p}>Última actualización: 29 de octubre de 2026.</p>

        <h2 className={h2}>Cómo funciona la solicitud de visita</h2>
        <p className={p}>
          Los datos del calendario y del formulario (día y momento preferidos, nombre, teléfono y, opcionalmente, un motivo y una nota) se utilizan únicamente en tu navegador para preparar una solicitud. Este sitio no envía automáticamente la solicitud a un servidor, no guarda los datos en una base de datos y no utiliza almacenamiento local para conservarlos.
        </p>
        <p className={p}>
          Si eliges “Enviar por SMS”, tu dispositivo abrirá su aplicación de mensajes con el texto preparado. Tú decides si lo envías al {site.phone}. El envío y las tarifas dependen de tu operador; no se ha confirmado que el número acepte SMS. Si eliges “Copiar mensaje”, el texto se copiará al portapapeles de tu dispositivo. La visita solo queda confirmada cuando el centro la confirma contigo.
        </p>

        <h2 className={h2}>Qué información incluir</h2>
        <p className={p}>
          Nombre, teléfono y, opcionalmente, una consulta general. No incluyas expedientes, diagnósticos ni información médica sensible. Para necesidades específicas, llama directamente al centro.
        </p>

        <h2 className={h2}>Correo temporal</h2>
        <p className={p}>{site.email} es un marcador de muestra con un dominio reservado. No es un correo operativo y el formulario no envía información a esa dirección.</p>

        <h2 className={h2}>Servicios externos</h2>
        <p className={p}>
          Los enlaces de Google Maps, teléfono y SMS abren servicios externos o aplicaciones de tu dispositivo, sujetos a sus propias políticas. No se cargan mapas, rastreadores ni analítica de terceros en esta página. El proveedor de alojamiento puede tratar datos técnicos de conexión para prestar el servicio.
        </p>

        <h2 className={h2}>Contacto</h2>
        <p className={p}>
          Para comunicarte con el centro:{" "}
          <a className={a} href={site.phoneHref}>
            {site.phone}
          </a>
          . Dirección: {site.address}, {site.city}.
        </p>

        <hr className="mt-16 border-ink/10" />

        <section lang="en">
          <h2 className={h2}>Privacy notice in English</h2>
          <p className={p}>
            The visit calendar and form prepare a request in your browser only. They do not automatically submit, store or send your information to a server. “Send by text” launches your messaging app with a prepared message; you decide whether to send it. Text availability and carrier charges may vary. Copying places the text on your device’s clipboard. A visit is confirmed only once the center confirms it with you. Please do not include medical records or sensitive health information.
          </p>
          <p className={p}>
            The sample email address is inactive. Google Maps, telephone and text links open external services. No third-party analytics or embedded maps are loaded. The hosting provider may process technical connection data to deliver the website. Contact the center at{" "}
            <a className={a} href={site.phoneHref}>
              {site.phone}
            </a>
            .
          </p>
        </section>

        <Link href="/" className={buttonStyles("primary", "lg", "mt-14")}>
          <ArrowLeft size={20} aria-hidden="true" />
          Volver al club
        </Link>
      </article>
    </main>
  );
}
