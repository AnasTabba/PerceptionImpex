# Perception Impex Website Implementation Plan

> **For agentic workers:** This is a static-export Next.js marketing site. There is no unit-test
> surface; verification per task = `npm run build` succeeds (static export to `out/`) and the
> section renders/behaves correctly in the dev server. Final tasks add a Lighthouse + a11y pass.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, premium, single-page statically-exported marketing site for Perception
Impex that generates B2B yarn inquiries.

**Architecture:** Next.js App Router with `output: 'export'`. One page composed of focused
section components under `components/sections/`. Tailwind compiled at build. Content centralized
in `lib/content.ts`. Animations via a small IntersectionObserver hook + CSS. Images pre-optimized
to WebP in `public/images/`. Quote form posts to Formspree.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, next/font, no animation lib.

## Global Constraints

- Static export only: `output: 'export'`, `images.unoptimized: true`. No server/runtime code.
- Brand: deep teal accent, warm off-white background, charcoal text. Company logo = placeholder.
- All content sourced verbatim from `info.md`.
- Contact: WhatsApp `https://wa.me/923008209877`, email `info@perceptionimpex.com`.
- Animations gated behind `prefers-reduced-motion: no-preference`; min 44px touch targets.
- Performance target: Lighthouse 95+; no render-blocking CDN scripts/fonts.

---

### Task 1: Scaffold project + Tailwind + design tokens
- [ ] Init Next.js (TS, App Router, Tailwind) in repo root; set `next.config` for static export.
- [ ] Define design tokens (colors, fonts, radii) in `tailwind.config.ts` + `globals.css`.
- [ ] Wire `next/font` (grotesk display + body sans). Base layout + metadata/SEO.
- [ ] Verify: `npm run build` produces `out/index.html`.

### Task 2: Content model + asset prep
- [ ] Create `lib/content.ts` with typed content (company, stats, products, strengths, suppliers,
      clients, markets, contact, form fields) from `info.md`.
- [ ] Convert i1/i2/i3 → WebP responsive sizes into `public/images/`; copy supplier logos into
      `public/images/suppliers/`. Add company logo placeholder slot.
- [ ] Verify: assets referenced resolve; build passes.

### Task 3: Shared UI + animation hook
- [ ] `components/ui/` — Button, SectionHeading, Container, Reveal (IntersectionObserver fade-up),
      CountUp (animated number on scroll). `lib/useInView.ts` hook.
- [ ] `components/FloatingContact.tsx` — fixed WhatsApp + email buttons.
- [ ] Verify: reveal + countup work in dev; reduced-motion disables them.

### Task 4: Header + Hero
- [ ] Sticky header with logo placeholder, anchor nav, Request Quote + WhatsApp, mobile menu.
- [ ] Hero with i2 background, headline, subline, dual CTAs.
- [ ] Verify: responsive, menu works, build passes.

### Task 5: Stats band + Products
- [ ] Stats band with animated CountUp (26+, PKR 1B+, 15–20+, 5+).
- [ ] Products grid: Cotton, PC, CVC, Specialty — image + description + application tags.
- [ ] Verify: counts animate on scroll; responsive grid.

### Task 6: Global reach animated map
- [ ] Lightweight inline SVG world map; Pakistan origin marker; animated arcs to USA/Canada/UK
      via stroke-dashoffset; pulsing destination markers. Reduced-motion = static.
- [ ] Verify: arcs draw on scroll-in; degrades gracefully; mobile-legible.

### Task 7: Strengths + Suppliers/Clients + Timeline
- [ ] Core strengths grid. Supplier logo row (Gul Ahmed, Premium Textile, Unique normalized;
      Bhanero text). Client references text row. Heritage "since 2000" timeline.
- [ ] Verify: logos uniform; responsive; build passes.

### Task 8: Quote form (Formspree) + Footer
- [ ] 11-field form with validation + success/error states; Formspree action via const (graceful
      notice if unset). Footer with contact, hours, MOQ, payment terms, WhatsApp/email.
- [ ] Verify: validation works; submit states render; links correct.

### Task 9: Polish, performance + a11y pass
- [ ] Run ui-ux-pro-max review + web-design-guidelines audit; fix findings.
- [ ] Lighthouse pass (perf/a11y/best-practices/SEO 95+); fix CLS/contrast/focus issues.
- [ ] Add `render.yaml` (or document Render static settings: build `npm run build`, publish `out`).
- [ ] Verify: clean production build; commit.

---

## Self-Review

- **Spec coverage:** header/hero (T4), stats (T5), products (T5), map (T6), strengths/suppliers/
  clients/timeline (T7), form+footer (T8), floating contact (T3), perf/a11y (T9), static export +
  tokens + fonts (T1), content + images + real supplier logos (T2). All spec sections covered.
- **Placeholders:** company logo placeholder + Formspree ID are intentional, non-blocking.
- **Consistency:** content flows from `lib/content.ts`; animation primitives (Reveal/CountUp) in T3
  reused by later tasks.
