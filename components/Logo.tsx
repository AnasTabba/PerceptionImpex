import Image from "next/image";
import { company } from "@/lib/content";

type LogoProps = {
  /** "dark" = on light backgrounds (header). "light" = on dark backgrounds (footer). */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Company logo.
 * - Light backgrounds (header): the real logo image (its background matches the
 *   site canvas, so it blends seamlessly).
 * - Dark backgrounds (footer): a white wordmark, since the logo art is on light.
 */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  if (tone === "light") {
    return (
      <span className={`inline-flex flex-col leading-none ${className}`} aria-label={company.name}>
        <span className="font-display text-xl font-extrabold tracking-tight-display text-white">
          PERCEPTION&nbsp;IMPEX
        </span>
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-wide-label text-white/55">
          Connecting Quality Yarn Globally
        </span>
      </span>
    );
  }

  return (
    <Image
      src="/images/logo.webp"
      alt={`${company.name} logo`}
      width={384}
      height={384}
      priority
      className={`h-11 w-auto sm:h-12 lg:h-14 ${className}`}
    />
  );
}
