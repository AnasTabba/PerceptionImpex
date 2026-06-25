"use client";

import Image from "next/image";
import { useParallax } from "@/lib/useParallax";

/** Hero image panel with a subtle scroll parallax on the photo + floating badge. */
export function HeroVisual() {
  const { ref, offset } = useParallax<HTMLDivElement>(-0.06);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift ring-1 ring-stone-200 sm:aspect-[5/5] lg:aspect-[4/5]"
      >
        <Image
          src="/images/yarn-warehouse.webp"
          alt="Rows of premium yarn cones in a spinning mill warehouse"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="scale-110 object-cover"
          style={{ transform: `translateY(${offset}px) scale(1.1)`, willChange: "transform" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,58,53,0) 45%, rgba(7,58,53,0.55) 100%)",
          }}
        />
      </div>

      {/* Floating heritage badge */}
      <div className="animate-float absolute -bottom-5 -left-3 rounded-xl bg-surface px-5 py-4 shadow-lift ring-1 ring-stone-200 sm:-left-5">
        <p className="font-display text-3xl font-extrabold leading-none text-teal-500">26+</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide-label text-ink-muted">
          Years Trading
        </p>
      </div>
    </div>
  );
}
