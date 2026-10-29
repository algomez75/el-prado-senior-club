import { Sun } from "lucide-react";

/**
 * Cinta de valores en movimiento continuo.
 * Se pausa al pasar el ratón o al enfocar, y queda quieta con movimiento reducido.
 * La segunda copia solo sirve para el bucle visual y se oculta a lectores de pantalla.
 */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined} role="list">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 font-display text-lg whitespace-nowrap italic sm:text-xl">
          {item}
          <Sun size={16} className="text-gold-light" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={label} className="marquee overflow-hidden border-y border-sage-deep bg-sage py-3 text-paper">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
