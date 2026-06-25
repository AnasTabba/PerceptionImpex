"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";

type CountUpProps = {
  end: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  className?: string;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Animated number that counts up once it scrolls into view.
 * Honors prefers-reduced-motion by showing the final value immediately.
 */
export function CountUp({
  end,
  duration = 1600,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion()) {
      setValue(end);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * end));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
