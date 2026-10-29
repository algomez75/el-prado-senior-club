"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, MessageSquareText, Phone } from "lucide-react";
import type { Content } from "@/lib/content";
import { site, type Locale } from "@/lib/site";
import { buttonStyles } from "./ui/button-styles";
import { cn } from "./ui/cn";

const WEEKS_AHEAD = 3;

type Errors = Partial<Record<"day" | "time" | "name" | "phone" | "consent", string>>;

function isoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Días laborables (lunes a viernes) de las próximas semanas, empezando mañana. */
function upcomingWeekdays(from: Date) {
  const days: Date[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  const limit = new Date(cursor);
  limit.setDate(limit.getDate() + WEEKS_AHEAD * 7);
  while (cursor < limit) {
    const weekday = cursor.getDay();
    if (weekday !== 0 && weekday !== 6) days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function VisitScheduler({ locale, t }: { locale: Locale; t: Content["scheduler"] }) {
  const lang = locale === "es" ? "es-US" : "en-US";
  const [today, setToday] = useState<Date | null>(null);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const messageBox = useRef<HTMLTextAreaElement>(null);

  // La fecha depende del dispositivo: se calcula tras montar para no romper la hidratación del HTML estático.
  useEffect(() => setToday(new Date()), []);

  const days = useMemo(() => (today ? upcomingWeekdays(today) : []), [today]);
  const formats = useMemo(
    () => ({
      weekday: new Intl.DateTimeFormat(lang, { weekday: "short" }),
      month: new Intl.DateTimeFormat(lang, { month: "short" }),
      monthName: new Intl.DateTimeFormat(lang, { month: "long" }),
      long: new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long" }),
    }),
    [lang],
  );



  const leadingBlanks = days.length ? days[0].getDay() - 1 : 0;
  const rangeLabel = days.length
    ? `${Array.from(new Set([formats.monthName.format(days[0]), formats.monthName.format(days[days.length - 1])])).join(" – ")} ${days[days.length - 1].getFullYear()}`
    : "";
  const selectedDate = days.find((d) => isoDate(d) === day);
  const timeLabel = t.times.find((option) => option.value === time)?.label ?? "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    const next: Errors = {};
    if (!selectedDate) next.day = t.dayError;
    if (!time) next.time = t.timeError;
    if (name.length < 2) next.name = t.nameError;
    if (digits.length < 10 || digits.length > 15) next.phone = t.phoneError;
    if (!data.get("consent")) next.consent = t.consentError;
    setErrors(next);

    const firstInvalid = (["day", "time", "name", "phone", "consent"] as const).find((key) => next[key]);
    if (firstInvalid) {
      const target = form.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
      target?.focus();
      return;
    }

    const interest = String(data.get("interest") ?? "");
    const notes = String(data.get("notes") ?? "").trim();
    setMessage(
      [
        t.greeting,
        `${t.msgDay}: ${selectedDate ? formats.long.format(selectedDate) : ""}`,
        `${t.msgTime}: ${timeLabel}`,
        `${t.msgName}: ${name}`,
        `${t.msgPhone}: ${phone}`,
        interest ? `${t.msgInterest}: ${interest}` : "",
        notes,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    setCopied(false);
    setCopyFailed(false);
    requestAnimationFrame(() => {
      result.current?.focus();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      result.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
    });
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
      messageBox.current?.focus();
      messageBox.current?.select();
    }
  }

  const fieldClass =
    "mt-1.5 block min-h-12 w-full rounded-xl border-2 border-ink/50 bg-paper px-3.5 text-base text-ink placeholder:text-muted " +
    "transition-colors focus:border-sage focus-visible:outline-3 focus-visible:outline-offset-2 aria-invalid:border-terra";
  const errorText = (id: string, text?: string) =>
    text ? (
      <p id={id} className="mt-2 flex items-center gap-2 text-base font-semibold text-terra" role="alert">
        {text}
      </p>
    ) : null;

  return (
    <div className="rounded-[1.75rem_0.75rem_1.75rem_1.75rem] bg-paper p-4 shadow-lift sm:p-7">
      <form
        ref={form}
        onSubmit={handleSubmit}
        // Cualquier cambio invalida la solicitud ya preparada: nunca se envía una fecha antigua.
        onChange={() => message && setMessage("")}
        noValidate
        className="flex flex-col gap-7"
      >
        {/* 1 · Día */}
        <fieldset aria-describedby="day-help day-error">
          <legend className="flex w-full flex-wrap items-baseline justify-between gap-2">
            <span className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink">
              <StepDot n={1} />
              {t.dayLegend}
            </span>
            <span className="text-base font-semibold text-sage first-letter:uppercase">{rangeLabel}</span>
          </legend>
          <p id="day-help" className="mt-2 text-base text-muted">
            {t.dayHelp}
          </p>

          <div className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2.5" aria-busy={!today}>
            {t.weekdays.map((label) => (
              <span key={label} className="pb-1 text-center text-base font-semibold text-muted" aria-hidden="true">
                {label}
              </span>
            ))}
            {!today ? (
              <p className="col-span-5 grid min-h-40 place-items-center rounded-xl bg-sand text-base text-muted">{t.loading}</p>
            ) : (
              <>
                {Array.from({ length: Math.max(0, leadingBlanks) }, (_, i) => (
                  <span key={`blank-${i}`} aria-hidden="true" />
                ))}
                {days.map((date, i) => {
                  const value = isoDate(date);
                  const showMonth = i === 0 || date.getMonth() !== days[i - 1].getMonth();
                  return (
                    <label key={value} className="animate-rise relative" style={{ "--d": `${i * 30}ms` } as CSSProperties}>
                      <input
                        type="radio"
                        name="day"
                        value={value}
                        checked={day === value}
                        onChange={() => {
                          setDay(value);
                          setErrors((current) => ({ ...current, day: undefined }));
                        }}
                        className="peer sr-only"
                        aria-label={formats.long.format(date)}
                        aria-invalid={Boolean(errors.day)}
                        {...(i === 0 ? { "data-field": "day" } : {})}
                      />
                      <span
                        className={cn(
                          "flex aspect-square min-h-11 min-w-0 sm:aspect-auto sm:h-14 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-ink/50 bg-paper text-ink",
                          "transition-[background-color,border-color,color,transform] duration-200 ease-out-soft hover:border-sage hover:bg-mist",
                          "peer-checked:scale-[1.04] peer-checked:border-sage peer-checked:bg-sage peer-checked:text-paper peer-checked:shadow-soft",
                          "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terra",
                        )}
                        aria-hidden="true"
                      >
                        <span className="font-sans text-lg leading-none font-semibold tabular-nums">{date.getDate()}</span>
                        {showMonth ? <span className="mt-0.5 text-sm font-semibold">{formats.month.format(date).replace(".", "")}</span> : null}
                      </span>
                    </label>
                  );
                })}
              </>
            )}
          </div>
          {errorText("day-error", errors.day)}
        </fieldset>

        {/* 2 · Momento del día */}
        <fieldset aria-describedby="time-error">
          <legend className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink">
            <StepDot n={2} />
            {t.timeLegend}
          </legend>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {t.times.map((option, i) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="time"
                  value={option.value}
                  checked={time === option.value}
                  onChange={() => {
                    setTime(option.value);
                    setErrors((current) => ({ ...current, time: undefined }));
                  }}
                  className="peer sr-only"
                  aria-invalid={Boolean(errors.time)}
                  {...(i === 0 ? { "data-field": "time" } : {})}
                />
                <span
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center justify-center rounded-full border-2 border-ink/50 px-3 text-center text-base font-semibold text-ink",
                    "transition-colors duration-200 hover:border-sage hover:bg-mist",
                    "peer-checked:border-sage peer-checked:bg-sage peer-checked:text-paper",
                    "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terra",
                  )}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          {errorText("time-error", errors.time)}
        </fieldset>

        {/* 3 · Datos */}
        <fieldset className="flex flex-col gap-4">
          <legend className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink">
            <StepDot n={3} />
            {t.detailsLegend}
          </legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="visit-name" className="text-base font-semibold text-ink">
                {t.name}
              </label>
              <input
                id="visit-name"
                name="name"
                autoComplete="name"
                placeholder={t.namePlaceholder}
                maxLength={100}
                className={fieldClass}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                data-field="name"
                onInput={() => errors.name && setErrors((current) => ({ ...current, name: undefined }))}
              />
              {errorText("name-error", errors.name)}
            </div>
            <div>
              <label htmlFor="visit-phone" className="text-base font-semibold text-ink">
                {t.phone}
              </label>
              <input
                id="visit-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(305) 000-0000"
                maxLength={24}
                className={cn(fieldClass, "tabular-nums")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                data-field="phone"
                onInput={() => errors.phone && setErrors((current) => ({ ...current, phone: undefined }))}
              />
              {errorText("phone-error", errors.phone)}
            </div>
          </div>
          <div>
            <label htmlFor="visit-interest" className="text-base font-semibold text-ink">
              {t.interest}
            </label>
            <select id="visit-interest" name="interest" defaultValue="" className={cn(fieldClass, "cursor-pointer")}>
              <option value="">{t.interestPlaceholder}</option>
              {t.interestOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="visit-notes" className="text-base font-semibold text-ink">
              {t.notes}
            </label>
            <textarea
              id="visit-notes"
              name="notes"
              rows={3}
              maxLength={600}
              placeholder={t.notesPlaceholder}
              aria-describedby="visit-notes-hint"
              className={cn(fieldClass, "py-3")}
            />
            <p id="visit-notes-hint" className="mt-2 text-base text-muted">
              {t.privacyHint}
            </p>
          </div>
          <div>
            <label className="flex cursor-pointer items-start gap-4 text-base leading-relaxed text-ink">
              <input
                type="checkbox"
                name="consent"
                className="mt-1 size-6 shrink-0 cursor-pointer accent-sage"
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                data-field="consent"
                onChange={() => errors.consent && setErrors((current) => ({ ...current, consent: undefined }))}
              />
              <span>
                {t.consentBefore}
                <Link href="/privacidad/" className="font-semibold text-terra underline underline-offset-4">
                  {t.consentLink}
                </Link>
                {t.consentAfter}
              </span>
            </label>
            {errorText("consent-error", errors.consent)}
          </div>
        </fieldset>

        <div className="flex flex-col gap-3">
          <button type="submit" className={buttonStyles("accent", "lg", "w-full")}>
            {t.submit}
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
          </button>
          <p className="flex items-center justify-center gap-2 text-center text-base text-muted">
            <Check size={16} className="text-sage" aria-hidden="true" />
            {t.footnote}
          </p>
        </div>
      </form>

      {message ? (
        <div ref={result} tabIndex={-1} className="mt-10 animate-rise rounded-2xl border-2 border-sage bg-mist p-6 sm:p-8">
          <p role="status" className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink">
            <span className="grid size-10 place-items-center rounded-full bg-sage text-paper" aria-hidden="true">
              <Check size={20} strokeWidth={3} />
            </span>
            {t.readyTitle}
          </p>
          {selectedDate ? (
            <p className="mt-3 text-lg font-semibold text-sage-deep first-letter:uppercase">
              {formats.long.format(selectedDate)} · {timeLabel}
            </p>
          ) : null}
          <p className="mt-2 text-lg text-muted">{t.readyText}</p>
          <label htmlFor="visit-message" className="sr-only">
            {t.messageLabel}
          </label>
          <textarea
            id="visit-message"
            ref={messageBox}
            value={message}
            readOnly
            rows={6}
            className="mt-5 w-full rounded-xl border-2 border-ink/10 bg-paper p-4 text-base text-ink"
          />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className={buttonStyles("primary", "md")} href={`${site.smsHref}?&body=${encodeURIComponent(message)}`}>
              <MessageSquareText size={19} aria-hidden="true" />
              {t.sms}
            </a>
            <a className={buttonStyles("outline", "md")} href={site.phoneHref}>
              <Phone size={19} aria-hidden="true" />
              {t.call}
            </a>
            <button type="button" className={buttonStyles("quiet", "md")} onClick={copyMessage}>
              {copied ? <Check size={19} aria-hidden="true" /> : <Copy size={19} aria-hidden="true" />}
              {copied ? t.copied : t.copy}
            </button>
          </div>
          <p role="status" className="mt-4 text-base text-muted">
            {copyFailed ? t.copyFallback : t.smsNote}
          </p>
          {site.bookingUrl ? (
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold text-terra underline">
              {t.online}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function StepDot({ n }: { n: number }) {
  return (
    <span className="grid size-8 place-items-center rounded-full bg-terra font-sans text-[0.95rem] font-bold text-paper" aria-hidden="true">
      {n}
    </span>
  );
}
