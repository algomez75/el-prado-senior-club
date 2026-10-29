"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "./cn";

const MAX_SHIFT = 8;
const clamp = (value: number) => Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, value));

/**
 * Atrae suavemente su contenido hacia el puntero (efecto "magnético").
 * Solo se activa con ratón/trackpad y si el usuario no pidió reducir el movimiento.
 * Mueve únicamente `transform`, así que no provoca saltos de maquetación.
 */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const area = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const zone = area.current;
    const node = ref.current;
    if (!zone || !node) return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!query.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = clamp((event.clientX - (rect.left + rect.width / 2)) * strength);
      const y = clamp((event.clientY - (rect.top + rect.height / 2)) * strength);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      node.style.transform = "";
    };

    // La zona que escucha no se mueve: así el botón no "escapa" del puntero y no parpadea.
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      node.style.transform = "";
    };
  }, [strength]);

  return (
    <span ref={area} className={cn("inline-flex max-w-full", className)}>
      <span ref={ref} className="inline-flex w-full transition-transform duration-500 ease-out-soft will-change-transform">
        {children}
      </span>
    </span>
  );
}
