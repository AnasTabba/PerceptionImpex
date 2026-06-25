"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fraction of the element visible before triggering. */
  threshold?: number;
  /** Trigger only once, then stop observing. */
  once?: boolean;
  /** Root margin, e.g. to trigger slightly before fully in view. */
  rootMargin?: string;
};

/**
 * Returns a ref and whether the element has entered the viewport.
 * Used to drive scroll reveals and count-up animations without a library.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  once = true,
  rootMargin = "0px 0px -10% 0px",
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers): show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, inView };
}
