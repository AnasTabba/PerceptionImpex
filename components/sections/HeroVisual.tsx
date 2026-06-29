"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero image panel with a buttery scroll parallax: the transform is written
 * straight to the DOM inside requestAnimationFrame (no per-frame React renders).
 */
export function HeroVisual() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const frame = frameRef.current;
      const img = imgRef.current;
      if (!frame || !img) return;
      const rect = frame.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const delta = (elementCenter - window.innerHeight / 2) * -0.06;
      img.style.transform = `translate3d(0, ${delta.toFixed(2)}px, 0) scale(1.12)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={frameRef}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift ring-1 ring-stone-200 sm:aspect-[5/5] lg:aspect-[4/5]"
      >
        <Image
          ref={imgRef}
          src="/images/spinning-mills.webp"
          alt="Yarn spun on a production line at a partner spinning mill in Pakistan"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover [transform:scale(1.12)] [will-change:transform]"
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
        <p className="font-display text-3xl font-bold leading-none text-teal-500">25+</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide-label text-ink-muted">
          Years Trading
        </p>
      </div>
    </div>
  );
}
