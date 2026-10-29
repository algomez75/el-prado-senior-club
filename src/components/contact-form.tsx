"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CheckCircle2, Copy, MessageCircle, Phone } from "lucide-react";
import { site, type Locale } from "@/lib/site";

export function ContactForm({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  const messageBox = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") ?? "").trim();
    const phoneInput = event.currentTarget.elements.namedItem("phone") as HTMLInputElement;
    const digits = phone.replace(/\D/g, "");
    phoneInput.setCustomValidity(digits.length >= 10 && digits.length <= 15 ? "" : en ? "Enter a valid phone number with 10–15 digits." : "Introduce un teléfono válido de 10 a 15 dígitos.");
    if (!event.currentTarget.reportValidity()) return;
    setMessage([
      en ? "Hello, El Prado Senior Club. I’d like more information." : "Hola, El Prado Senior Club. Me gustaría recibir información.",
      `${en ? "Name" : "Nombre"}: ${String(data.get("name")).trim()}`,
      `${en ? "Phone" : "Teléfono"}: ${phone}`,
      data.get("email") ? `Email: ${String(data.get("email")).trim()}` : "",
      `${en ? "I’m interested in" : "Me interesa"}: ${data.get("interest")}`,
      String(data.get("details") ?? "").trim(),
    ].filter(Boolean).join("\n"));
    setCopied(false); setCopyError(false);
    requestAnimationFrame(() => { result.current?.focus(); result.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
  }

  async function copyMessage() {
    try { await navigator.clipboard.writeText(message); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); messageBox.current?.focus(); messageBox.current?.select(); }
  }

  return <div className="contact-form-card">
    <div className="form-heading"><span className="form-icon"><MessageCircle size={23}/></span><div><h3>{en ? "Let’s get to know each other" : "Empecemos por conocernos"}</h3><p>{en ? "A little about you, a first hello." : "Un poco sobre ti, un primer hola."}</p></div></div>
    <form onSubmit={handleSubmit}>
      <div className="form-row"><label>{en ? "Your name" : "Tu nombre"}<input name="name" autoComplete="name" placeholder={en ? "First and last name" : "Nombre y apellido"} required minLength={2} maxLength={100}/></label><label>{en ? "Phone number" : "Teléfono"}<input name="phone" type="tel" autoComplete="tel" placeholder="(305) 000-0000" required maxLength={24} onInput={event => event.currentTarget.setCustomValidity("")}/></label></div>
      <label>{en ? "Email (optional)" : "Correo electrónico (opcional)"}<input name="email" type="email" autoComplete="email" placeholder={en ? "you@email.com" : "tu@correo.com"} maxLength={150}/></label>
      <label>{en ? "What would you like to know?" : "¿En qué podemos orientarte?"}<select name="interest" required defaultValue=""><option value="" disabled>{en ? "Choose an option" : "Selecciona una opción"}</option><option>{en ? "Arrange a visit" : "Coordinar una visita"}</option><option>{en ? "Adult day care information" : "Información sobre cuidado diurno"}</option><option>{en ? "Availability and costs" : "Disponibilidad y costos"}</option><option>{en ? "Ask about transportation or other services" : "Consultar transporte u otros servicios"}</option></select></label>
      <label>{en ? "Anything else? (optional)" : "¿Algo más que quieras contarnos? (opcional)"}<textarea name="details" rows={3} placeholder={en ? "Tell us how we can help…" : "Cuéntanos cómo podemos ayudarte…"} maxLength={700}/></label>
      <p className="form-data-note">{en ? "Please don’t include medical records or sensitive health information." : "No incluyas expedientes médicos ni información de salud sensible."}</p>
      <label className="consent"><input type="checkbox" name="consent" required/><span>{en ? "I have read the " : "He leído la "}<Link href="/privacidad/">{en ? "privacy notice" : "política de privacidad"}</Link>{en ? " and want to prepare an inquiry to the center." : " y deseo preparar una consulta al centro."}</span></label>
      <button type="submit" className="button form-submit">{en ? "Prepare my inquiry" : "Preparar mi consulta"}<ArrowUpRight size={18}/></button>
      <p className="form-footnote"><Check size={13}/>{en ? "You choose how to send it. No automatic submission." : "Tú eliges cómo enviarla. Sin envío automático."}</p>
    </form>
    {message ? <div className="contact-result" ref={result} tabIndex={-1}>
      <p className="result-heading" role="status"><CheckCircle2 size={20}/>{en ? "Your inquiry is ready. Choose how to send it." : "Tu consulta está lista. Elige cómo enviarla."}</p>
      <textarea ref={messageBox} value={message} readOnly aria-label={en ? "Prepared inquiry" : "Consulta preparada"} rows={6}/>
      <div className="result-actions"><a className="button" href={`sms:+13059678776?body=${encodeURIComponent(message)}`}><MessageCircle size={17}/>{en ? "Open SMS" : "Abrir SMS"}</a><button type="button" className="button button-outline" onClick={copyMessage}>{copied ? <Check size={17}/> : <Copy size={17}/>}{copied ? (en ? "Copied" : "Copiado") : (en ? "Copy message" : "Copiar mensaje")}</button></div>
      <p role="status" className="result-note">{copyError ? (en ? "The message is selected. Copy it using your device’s copy command." : "El mensaje está seleccionado. Cópialo con la opción de copiar de tu dispositivo.") : en ? "SMS opens your messaging app; delivery depends on your device and whether the number accepts texts. You can also call us." : "SMS abre tu aplicación de mensajes; la entrega depende de tu dispositivo y de que el número admita mensajes. También puedes llamarnos."}</p>
      <a className="text-link" href={site.phoneHref}><Phone size={15}/>{site.phone}</a>
    </div> : null}
  </div>;
}
