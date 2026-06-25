import { company } from "@/lib/content";

type LogoProps = {
  /** "dark" = ink text (light backgrounds), "light" = white text (dark/hero). */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * LOGO PLACEHOLDER.
 * The real logo isn't ready yet. This text wordmark + mark fills the slot and
 * is sized to be swapped for an <Image> when the asset arrives — replace the
 * inner markup only; the surrounding layout/sizing can stay.
 */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const text = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/70" : "text-ink-muted";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label={company.name}>
      {/* Placeholder mark — interlocking "PI" rings, echoes spun yarn */}
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-500 text-white shadow-soft">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="15" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.05rem] font-bold tracking-tight-display ${text}`}>
          PERCEPTION
        </span>
        <span className={`block text-[0.62rem] font-semibold uppercase tracking-wide-label ${sub}`}>
          Impex
        </span>
      </span>
    </span>
  );
}
