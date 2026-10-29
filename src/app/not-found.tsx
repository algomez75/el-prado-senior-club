import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonStyles } from "@/components/ui/button-styles";

export default function NotFound() {
  return (
    <main className="grain grid min-h-dvh place-items-center px-5 py-20">
      <div className="max-w-xl text-center">
        <p className="text-base font-semibold text-sage-deep">El Prado Senior Club · 404</p>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,5rem)] leading-[1.02] text-ink">
          <span className="block font-medium">Volvamos a</span>
          <span className="block font-normal text-terra italic">encontrarnos.</span>
        </h1>
        <p className="mt-6 text-xl text-muted">Esta página no está disponible. Te esperamos en el inicio.</p>
        <Link href="/" className={buttonStyles("primary", "lg", "mt-10")}>
          <ArrowLeft size={20} aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
