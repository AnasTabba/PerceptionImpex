"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Yarn-ball cursor: replaces the native pointer with a small wound-yarn ball
 * that rolls as it moves, trailed by a soft glowing highlight that lags behind.
 *
 * Activates only on fine-pointer (desktop) devices and bows out for touch and
 * `prefers-reduced-motion`, so mobile and motion-sensitive users keep the
 * normal cursor.
 */
export function YarnCursor() {
  const ballRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only run on devices that actually have a precise, hovering pointer and
    // where the user hasn't asked for reduced motion.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    // NOTE: we don't hide the native cursor yet — only once the yarn ball is
    // actually tracking the pointer (first mousemove). This avoids any window
    // where the page has no visible cursor at all.

    // Target = real mouse. ball/glow chase it with easing so the ball trails
    // the pointer slightly and the glow trails the ball — the "highlight behind".
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ball = { x: target.x, y: target.y };
    const glow = { x: target.x, y: target.y };
    let rotation = 0;
    let visible = false;
    let hovering = false;
    let pressed = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        // Jump to the first known position so it doesn't fly in from the corner.
        ball.x = glow.x = target.x;
        ball.y = glow.y = target.y;
        visible = true;
        // Now that the ball is positioned on the pointer, hand off from the
        // native cursor to the yarn ball in the same frame.
        document.documentElement.classList.add("yarn-cursor-active");
        if (ballRef.current) ballRef.current.style.opacity = "1";
        if (glowRef.current) glowRef.current.style.opacity = "1";
      }
      // Hover state for interactive targets -> ball swells a touch.
      const el = e.target as HTMLElement | null;
      hovering = !!el?.closest(
        'a, button, [role="button"], input, select, textarea, label, summary'
      );
    };

    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeave = () => {
      visible = false;
      if (ballRef.current) ballRef.current.style.opacity = "0";
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const tick = () => {
      // Easing: ball follows quickly, glow follows the ball more slowly.
      const dx = target.x - ball.x;
      const dy = target.y - ball.y;
      ball.x += dx * 0.22;
      ball.y += dy * 0.22;
      glow.x += (ball.x - glow.x) * 0.12;
      glow.y += (ball.y - glow.y) * 0.12;

      // Roll the ball proportionally to how far/fast it moved.
      const dist = Math.hypot(dx, dy);
      rotation += (dx >= 0 ? 1 : -1) * dist * 0.6;

      const scale = (hovering ? 1.45 : 1) * (pressed ? 0.82 : 1);

      if (ballRef.current) {
        ballRef.current.style.transform = `translate3d(${ball.x}px, ${ball.y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.5 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("yarn-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Soft trailing highlight — sits behind the ball and lags further. */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full opacity-0 blur-md transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(194,160,99,0.55) 0%, rgba(15,118,110,0.35) 45%, transparent 72%)",
          willChange: "transform",
        }}
      />

      {/* The yarn ball itself. */}
      <div
        ref={ballRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91] opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <defs>
            <radialGradient id="yarnBody" cx="36%" cy="30%" r="72%">
              <stop offset="0%" stopColor="#2C8A7D" />
              <stop offset="55%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#0A4D47" />
            </radialGradient>
          </defs>

          {/* Ball body */}
          <circle cx="20" cy="20" r="15" fill="url(#yarnBody)" />

          {/* Wound strands — overlapping ellipses at varied angles read as yarn. */}
          <g
            stroke="#C2A063"
            strokeWidth="1"
            strokeOpacity="0.85"
            fill="none"
            strokeLinecap="round"
          >
            <ellipse cx="20" cy="20" rx="14.5" ry="6.5" transform="rotate(25 20 20)" />
            <ellipse cx="20" cy="20" rx="14.5" ry="6.5" transform="rotate(75 20 20)" />
            <ellipse cx="20" cy="20" rx="14.5" ry="6.5" transform="rotate(125 20 20)" />
            <ellipse cx="20" cy="20" rx="14.5" ry="9.5" transform="rotate(-20 20 20)" />
            <ellipse cx="20" cy="20" rx="14.5" ry="3" transform="rotate(50 20 20)" />
          </g>
          <g
            stroke="#E6F2F0"
            strokeWidth="0.6"
            strokeOpacity="0.5"
            fill="none"
          >
            <ellipse cx="20" cy="20" rx="14.5" ry="6.5" transform="rotate(100 20 20)" />
            <ellipse cx="20" cy="20" rx="14.5" ry="11" transform="rotate(10 20 20)" />
          </g>

          {/* Top-left sheen so it reads as a 3D ball */}
          <circle cx="14" cy="13" r="4" fill="#ffffff" fillOpacity="0.18" />

          {/* A loose dangling strand for a playful yarn-ball touch */}
          <path
            d="M33 24 q6 3 4 8 q-2 4 3 6"
            stroke="#C2A063"
            strokeWidth="1"
            strokeOpacity="0.8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
