# Perception Impex — Website Design Spec

**Date:** 2026-06-25
**Status:** Approved (design) — pending spec review

## 1. Overview

A single-page, statically-exported marketing/portfolio website for **Perception Impex**, a
Pakistan-based B2B yarn trading & sourcing company (founded 2000). The site's primary goal is
to **generate qualified B2B inquiries** from textile manufacturers, exporters, apparel
producers, fabric mills, and international buyers.

Personality: established, trustworthy, premium, professional, modern, corporate, global.
Design direction: Apple-style storytelling + industrial textile professionalism.

## 2. Tech stack & hosting

- **Framework:** Next.js (App Router) with `output: 'export'` → pure static HTML/CSS/JS.
- **Hosting:** Render (static site). Build command `next build`, publish directory `out/`.
- **Styling:** Tailwind CSS compiled at build time (tree-shaken). NOT the runtime CDN script.
- **Fonts:** self-hosted via `next/font` (no external font round-trip, no layout shift).
  Grotesk display face for headings + clean sans for body.
- **Images:** the three provided photos (i1 spinning machine, i2 warehouse cones, i3 top-down
  cones) pre-converted to WebP at responsive sizes, explicit width/height, lazy below the fold.
  Hero image eager + preloaded. `next/image` used with `unoptimized: true` (required for static
  export) against pre-optimized assets.
- **Animations:** CSS + IntersectionObserver only (no heavy animation library). All animations
  respect `prefers-reduced-motion`.
- **Performance target:** Lighthouse 95+ (Performance, Accessibility, Best Practices, SEO),
  minimal JS bundle, no render-blocking resources.

## 3. Visual design

- **Palette:** warm off-white / soft stone background, near-black charcoal text (#1c1c1c-ish),
  **deep teal accent** (primary brand color), white yarn imagery as hero material.
- **Typography:** large editorial uppercase headings with tight tracking; highly legible body
  text; generous whitespace.
- **Logo:** text placeholder ("PERCEPTION IMPEX") in a dedicated slot sized for the real logo;
  designed for one-line swap-in later.
- **Radii/shadows:** restrained, premium — soft corners, subtle elevation, no gaudy effects.

## 4. Page sections (single long-scroll)

1. **Sticky header** — logo placeholder, anchor nav, "Request Quote" CTA + WhatsApp button.
   Collapses to a mobile menu under the breakpoint.
2. **Hero** — full-bleed yarn image (i2), headline "26 Years of Trusted Yarn Trading
   Excellence," supporting subline, dual CTAs (Request Quote / Explore Products).
3. **Stats band** — animated count-up on scroll: 26+ years, PKR 1B+ annual volume,
   15–20+ partner mills, 5+ countries served.
4. **Products** — Cotton, PC, CVC, Specialty yarns. Clean cards (no flip gimmick) with
   imagery, short description, and application tags (t-shirts, hoodies, knitwear, etc.).
5. **Global reach** — animated world map. Pakistan as the sourcing origin; animated arcs draw
   out to **USA, Canada, UK** (highlighted export markets) with pulsing destination markers.
   Hand-built lightweight SVG (no map library); arcs animated via SVG stroke-dashoffset.
6. **Why us / core strengths** — trust grid: 26 yrs experience, strong supplier relationships,
   competitive pricing, reliable supply chain, flexible payment terms, fast procurement,
   consistent quality, dedicated support, high-volume capability, long-term relationships.
7. **Suppliers & clients** — partner mills shown as a logo trust row. **Real logos available**
   in `suppliers_logo/`: Gul Ahmed (`gulahmedlogo.png`), Premium Textile Mills
   (`premiumtextileslogo.png`), Unique Textile (`uniquelogo.png`). Bhanero shown as a text
   entry (no logo yet). Logos normalized into uniform partner cards (equal height, consistent
   padding, centered) since source files differ in aspect ratio and background. Client
   references (AOL Apparel, Zunaira, Multimat, Redox Fashion, Al Zainab & Sons) shown as a
   text-based trust list.
8. **Heritage timeline** — "Since 2000" story arc communicating 26 years of relationships.
9. **Quote request form** — 11 fields (Name, Company, Email, Phone, WhatsApp, Country, Yarn
   Type, Quantity Required, Monthly Requirement, Payment Terms Required, Message). Wired to
   **Formspree** (form ID to be provided; placeholder env/const until then). Client-side
   validation + success/error states.
10. **Footer** — contact info, business hours (Mon–Sat 9–7), MOQ (500 bags/month), payment
    terms (30/60/90 day), WhatsApp + email links, copyright.

## 5. Contact actions

- **Floating WhatsApp + Email buttons** fixed bottom-right, always reachable.
- WhatsApp → `https://wa.me/923008209877?text=<pre-filled message>`.
- Email → `mailto:info@perceptionimpex.com`.
- Both also surfaced in the header and footer.
- Verified to open the correct app on mobile and the correct client on desktop; 44×44px min
  touch targets.

## 6. Animations

- Count-up stat numbers triggered on scroll into view.
- Soft fade-up reveals for sections.
- Animated map arcs (draw-on) + pulsing destination markers.
- Subtle hover states on cards/buttons.
- All gated behind `prefers-reduced-motion: no-preference`.

## 7. Content source

All copy, stats, products, supplier/client names, contact details, and hero messaging come from
`info.md`. Future features (AI quote assistant, supplier portal, dashboards, live market data,
blog, catalog download) are explicitly **out of scope** for this static build, but the layout
leaves room to add them later.

## 8. Out of scope

- Any backend/server, authentication, database, or dynamic data.
- The "Future Features" list in `info.md`.
- Company logo asset (placeholder only — not yet ready).
- Partner logos for Bhanero and real client logos (text treatment only); the three supplied
  supplier logos (Gul Ahmed, Premium Textile Mills, Unique Textile) ARE used.

## 9. Open items (non-blocking)

- Formspree form ID — to be supplied; wired as a constant/env value, build works without it
  (form falls back to a visible "not yet configured" notice if missing).
- Real logo and any additional product photography — swap-in later.

## 10. Success criteria

- Static export builds cleanly and deploys to Render.
- All sections present and populated from `info.md`.
- Quote form, WhatsApp, and email actions function on mobile and desktop.
- Animated stats and world map work and degrade gracefully with reduced-motion.
- Lighthouse 95+ across categories; responsive from mobile to large desktop.
- Accessible: semantic HTML, proper heading order, AA contrast, visible focus states.
