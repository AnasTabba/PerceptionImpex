"use client";

import { useInView } from "@/lib/useInView";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
};

/**
 * Fade-up on scroll into view. Motion is CSS-driven (.reveal/.is-visible)
 * and automatically disabled under prefers-reduced-motion via globals.css.
 */
export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
