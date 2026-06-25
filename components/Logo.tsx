import Image from "next/image";
import { company } from "@/lib/content";

type LogoProps = {
  /** "dark" = on light backgrounds (header). "light" = on dark backgrounds (footer). */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Brand lockup: the globe emblem (from the company logo, background removed)
 * paired with a crisp "PERCEPTION IMPEX" wordmark — legible at header size,
 * which the full vertical logo is not when shrunk into a nav bar.
 */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const isLight = tone === "light";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label={company.name}>
      <Image
        src="/images/logo-mark.webp"
        alt={`${company.name} globe emblem`}
        width={256}
        height={256}
        priority
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
      />
      <span className="leading-none">
        <span
          className="block font-display text-[1.05rem] font-extrabold tracking-tight-display sm:text-lg"
          style={{ color: isLight ? "#FFFFFF" : "#16245C" }}
        >
          PERCEPTION
        </span>
        <span
          className="mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.32em]"
          style={{ color: isLight ? "rgba(255,255,255,0.65)" : "#C2A063" }}
        >
          Impex
        </span>
      </span>
    </span>
  );
}
