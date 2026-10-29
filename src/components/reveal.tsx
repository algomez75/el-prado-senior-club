"use client";

import { useEffect } from "react";

/**
 * Activa el revelado escalonado de los elementos con `data-reveal`.
 * El CSS solo los oculta cuando <html> tiene la clase `.js` y el usuario
 * no pidió reducir el movimiento, así que sin JavaScript todo es visible.
 * Los elementos que ya están en pantalla al cargar también se animan.
 */
export function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const showAll = () => nodes.forEach((node) => node.classList.add("is-visible"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));

    // Red de seguridad: si algo no llegó a cruzar el umbral (p. ej. anclas o impresión), se muestra igual.
    const reveal = () => showAll();
    window.addEventListener("beforeprint", reveal);
    return () => {
      observer.disconnect();
      window.removeEventListener("beforeprint", reveal);
    };
  }, []);
  return null;
}
