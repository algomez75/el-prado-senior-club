import { cn } from "./cn";

type Variant = "primary" | "accent" | "outline" | "light" | "quiet";
type Size = "md" | "lg";

/* Estilo de botón original de El Prado: esquinas de 6 px, terracota y la flecha al final con aire. */
const base =
  "group/btn inline-flex items-center justify-center gap-5 rounded-md border font-medium leading-tight " +
  "transition-[background-color,color,box-shadow,border-color,translate] duration-300 ease-out-soft hover:-translate-y-0.5 " +
  "focus-visible:outline-3 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50 " +
  "active:translate-y-0 select-none text-center whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "btn-shine border-transparent bg-brick text-paper hover:bg-brick-deep hover:shadow-[0_7px_20px_rgb(86_48_30/0.16)]",
  accent: "btn-shine border-transparent bg-brick text-paper hover:bg-brick-deep hover:shadow-[0_7px_20px_rgb(86_48_30/0.16)]",
  outline: "border-ink/40 bg-transparent text-ink hover:bg-mist",
  light: "btn-shine border-transparent bg-sand text-ink hover:bg-paper hover:shadow-[0_7px_20px_rgb(0_0_0/0.18)] focus-visible:outline-gold-light",
  quiet: "border-ink/15 bg-paper/80 text-ink hover:border-ink/40 hover:bg-mist",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 py-2.5 text-[0.9rem]",
  lg: "min-h-12 px-6 py-3.5 text-[0.95rem]",
};

export function buttonStyles(variant: Variant = "primary", size: Size = "lg", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
