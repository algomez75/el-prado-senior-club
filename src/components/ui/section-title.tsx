import type { ElementType } from "react";
import { cn } from "./cn";

/**
 * Titular de dos voces: la primera línea en Cormorant 500, la segunda en itálica terracota.
 * El contraste de peso es la firma tipográfica del sitio.
 */
export function SectionTitle({
  id,
  strong,
  soft,
  as: Tag = "h2",
  tone = "light",
  className,
}: {
  id?: string;
  strong: string;
  soft: string;
  as?: ElementType;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-display text-[clamp(2.15rem,4vw,3.25rem)] leading-[1.02]",
        tone === "light" ? "text-ink" : "text-paper",
        className,
      )}
    >
      <span className="line-mask">
        <span className="font-medium">{strong}</span>
      </span>
      <span className="line-mask">
        <span className={cn("font-normal italic", tone === "light" ? "text-terra" : "text-gold-light")}>{soft}</span>
      </span>
    </Tag>
  );
}
