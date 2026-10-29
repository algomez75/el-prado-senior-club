import type { CSSProperties } from "react";

/** Índice de escalonado para el revelado al hacer scroll (90 ms por paso). */
export function stagger(index: number): CSSProperties {
  return { "--stagger": index } as CSSProperties;
}
