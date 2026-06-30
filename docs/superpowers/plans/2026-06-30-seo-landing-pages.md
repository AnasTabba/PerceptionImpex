# SEO Commercial Landing Pages (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 6 SEO-optimized commercial pages (4 product pages + a products hub + a Karachi/Pakistan local page + one export page), each substantial and distinct, in the existing teal theme.

**Architecture:** Data-driven product pages — a `productPages` record in `lib/content.ts` feeds a shared `ProductLandingPage` template; each product route is a thin file. Hub/local/export pages are their own route files composing shared landing primitives extracted from the approved prototype. Static export, no new dependencies.

**Tech Stack:** Next.js 14 App Router (static export), React 18, TypeScript, Tailwind.

## Global Constraints

- Static export (`output: "export"`); no new npm dependencies. All copy/data in `lib/content.ts`.
- Keep the original teal theme (`#0F766E`); do not change `tailwind.config.ts` colors.
- Avoid em dashes in body prose. Ground all copy strictly in real facts already in `lib/content.ts` (products, yarn counts, partner mills, MOQ "500 Bags Per Month", terms "30 / 60 / 90 Day Options", markets US/CA/GB). Invent nothing.
- Verification gate is `npm run build` (type-check + static export). No unit-test harness; `npm run lint` is unconfigured — do not run it. Visual-check each page on the dev server.
- Reuse `Container`, `SectionHeading`, `Reveal`, `Button`, `components/ui/Icons`, and the `Header`/`Footer`/`ScrollProgress`/`FloatingContact` shell. CTAs link to `/#quote` and `whatsappHref(...)`.
- Exact program/product names and the six yarn types must match existing content.

## File structure

- `lib/content.ts` — add `ProductPage` type + `productPages` record (4 entries with full copy).
- `components/landing/LandingHero.tsx` — dark hero: breadcrumb + eyebrow + H1 + subhead + CTAs.
- `components/landing/CtaBand.tsx` — closing quote CTA band.
- `components/landing/LandingFaq.tsx` — FAQ accordion taking `{ q, a }[]`.
- `components/landing/ProductLandingPage.tsx` — full product page from `ProductPage` data.
- `components/landing/Jsonld.tsx` — `BreadcrumbJsonLd`, `FaqJsonLd`, `ProductJsonLd` helpers.
- `app/products/page.tsx` — hub.
- `app/products/cotton-yarn/page.tsx`, `pc-yarn/`, `cvc-yarn/`, `specialty-yarn/` — thin routes.
- `app/yarn-supplier-karachi/page.tsx` — local page.
- `app/yarn-exporter-pakistan/page.tsx` — export page.
- `lib/content.ts` `nav` — add `{ label: "Products", href: "/products/" }`.
- `components/Footer.tsx` — add a product-links column.
- `app/sitemap.ts` — add the 6 new URLs.

(The approved prototype `app/products/cotton-yarn/page.tsx` is replaced by the data-driven version in Task 1.)

---

### Task 1: Shared landing components + product-page system + Cotton page

**Files:**
- Create: `components/landing/LandingHero.tsx`, `components/landing/CtaBand.tsx`, `components/landing/LandingFaq.tsx`, `components/landing/Jsonld.tsx`, `components/landing/ProductLandingPage.tsx`
- Modify: `lib/content.ts` (add `ProductPage` type + `productPages.cotton`)
- Replace: `app/products/cotton-yarn/page.tsx` (thin, data-driven)

**Interfaces:**
- Produces:
  - `type ProductPage = { slug: string; name: string; metaTitle: string; metaDescription: string; keywords: string[]; h1: string; intro: string; overview: string[]; image: { src: string; alt: string; w: number; h: number }; specGroups: { title: string; desc: string; counts: string[] }[]; extraSpecNote: string; applications: string[]; faqs: { q: string; a: string }[]; related: string[] /* slugs */ }`
  - `productPages: Record<string, ProductPage>`
  - `LandingHero({ breadcrumb, eyebrow, h1, intro, quoteHref?, whatsappMessage })`
  - `CtaBand({ title, body })`
  - `LandingFaq({ eyebrow?, title, faqs })`
  - `ProductLandingPage({ data }: { data: ProductPage })`
  - `BreadcrumbJsonLd({ items })`, `FaqJsonLd({ faqs })`, `ProductJsonLd({ data })`

- [ ] **Step 1: Add the `ProductPage` type and the Cotton data to `lib/content.ts`**

Append after the existing `products` export. Use the exact shape above. Cotton entry content (author grounded in facts):
- `slug: "cotton-yarn"`, `name: "Cotton Yarn"`
- `metaTitle: "Cotton Yarn Supplier & Exporter in Pakistan"`, `metaDescription` ≈ the prototype's.
- `keywords`: ["cotton yarn supplier Pakistan","cotton yarn exporter Pakistan","carded cotton yarn","combed cotton yarn","ring spun cotton yarn","cotton yarn dealer Karachi"].
- `h1: "Cotton Yarn Supplier & Exporter in Pakistan"`.
- `intro`, `overview` (2 paragraphs), `image` = `/images/cotton-yarn.webp` (499×431).
- `specGroups`: Carded `["Ne 8/1"… "Ne 21/1"]`, Combed `["Ne 16/1"…"Ne 32/1"]` (from `yarnCatalog`).
- `extraSpecNote`: compact/Siro, plied, cone-dyed, up to Ne 40s.
- `applications`: ["T-Shirts","Polo Shirts","Hoodies","Sweatshirts","Pullovers","Knitwear","Trousers","Home Textiles"].
- `faqs`: the 4 from the prototype.
- `related`: ["pc-yarn","cvc-yarn","specialty-yarn"].

- [ ] **Step 2: Create the shared components**

Extract from the prototype into `components/landing/`:
- `LandingHero.tsx` — the dark hero block (breadcrumb `ol`, eyebrow with `accent-rule`, `h1`, intro, "Request a Quote" + WhatsApp buttons). Props per interface.
- `CtaBand.tsx` — the closing dark CTA band (title, body, "Request a Quote" button + phone).
- `LandingFaq.tsx` — the `<details>` accordion (the prototype's FAQ markup) driven by `faqs`.
- `Jsonld.tsx` — three components rendering `<script type="application/ld+json">` for BreadcrumbList, FAQPage, and Product (name, description, brand "Perception Impex", category "Yarn"). Follow the `dangerouslySetInnerHTML` + `eslint-disable react/no-danger` pattern from `app/layout.tsx`.

- [ ] **Step 3: Create `ProductLandingPage.tsx`**

Composes (within `<main id="main">`, with `ScrollProgress`/`Header` before and `Footer`/`FloatingContact` after — OR keep shell in the route and have this render just the sections; choose sections-only so the route owns the shell and JSON-LD). Renders: `LandingHero` → overview+image → spec groups (the `SpecCard` from the prototype) → applications chips → "why us" (first 4 `strengths`) → `LandingFaq` → `CtaBand`. All teal theme, no em dashes.

- [ ] **Step 4: Replace the Cotton route with the data-driven version**

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingContact } from "@/components/FloatingContact";
import { ProductLandingPage } from "@/components/landing/ProductLandingPage";
import { BreadcrumbJsonLd, FaqJsonLd, ProductJsonLd } from "@/components/landing/Jsonld";
import { productPages } from "@/lib/content";

const data = productPages["cotton-yarn"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: { canonical: `/products/${data.slug}/` },
  openGraph: { type: "website", url: `https://www.perceptionimpex.com/products/${data.slug}/`, title: data.metaTitle, description: data.metaDescription, siteName: "Perception Impex" },
};

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Products", url: "/products/" }, { name: data.name, url: `/products/${data.slug}/` }]} />
        <ProductJsonLd data={data} />
        <FaqJsonLd faqs={data.faqs} />
        <ProductLandingPage data={data} />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
```

- [ ] **Step 5: Build + visual check**

Run: `npm run build` (PASS). Then on the dev server open `/products/cotton-yarn/` — confirm it matches the prototype look and the JSON-LD is present (`grep -c '"@type":"Product"' out/products/cotton-yarn/index.html` → 1 after build).

- [ ] **Step 6: Commit**

```bash
git add lib/content.ts components/landing app/products/cotton-yarn
git commit -m "Add product landing-page system + Cotton Yarn page (data-driven)"
```

---

### Task 2: PC, CVC, Specialty product pages

**Files:**
- Modify: `lib/content.ts` (add `productPages` entries `pc-yarn`, `cvc-yarn`, `specialty-yarn`)
- Create: `app/products/pc-yarn/page.tsx`, `app/products/cvc-yarn/page.tsx`, `app/products/specialty-yarn/page.tsx`

**Interfaces:** Consumes `ProductPage`/`ProductLandingPage` from Task 1.

- [ ] **Step 1: Add three `productPages` entries** (author from facts in `products`/`yarnCatalog`):
  - **pc-yarn**: name "PC Yarn"; H1/metaTitle "PC Yarn (Polyester-Cotton) Supplier & Exporter in Pakistan"; keywords around "PC yarn supplier Pakistan", "polyester cotton yarn". Overview = durability + comfort blend. specGroups from a sensible PC count range; applications ["Knitted Garments","Workwear","Activewear","Fleece","T-Shirts"]; image `/images/pc-yarn.webp` (496×440); 4 PC-specific FAQs; related the other three slugs.
  - **cvc-yarn**: name "CVC Yarn"; "CVC Yarn (Chief Value Cotton) Supplier in Pakistan"; cotton-rich blend angle; applications ["Premium Knitwear","Hoodies","Sweatshirts","Polos"]; image `/images/cvc-yarn.webp` (507×442).
  - **specialty-yarn**: name "Specialty Yarns"; "Specialty & Dyed Yarn Supplier in Pakistan"; covers jacquard/custom/export-quality + dyed/gassed-mercerized (from `yarnCatalog`); applications ["Jacquard Finish","Custom Requirement","Export Quality","Knitted Polos","Jackets","Tracksuits"]; image `/images/specialty-yarn.webp` (762×450).

- [ ] **Step 2: Create the three route files** — identical to the Cotton route in Task 1 Step 4 but with `productPages["pc-yarn"]` / `["cvc-yarn"]` / `["specialty-yarn"]`.

- [ ] **Step 3: Build + visual** — `npm run build` PASS; open each of the three pages; confirm distinct copy + images render.

- [ ] **Step 4: Commit**

```bash
git add lib/content.ts app/products/pc-yarn app/products/cvc-yarn app/products/specialty-yarn
git commit -m "Add PC, CVC, and Specialty yarn product pages"
```

---

### Task 3: Products hub `/products/`

**Files:**
- Create: `app/products/page.tsx`

**Interfaces:** Consumes `productPages`, `LandingHero`/`CtaBand`, `Container`, `SectionHeading`, `Reveal`, `Button`.

- [ ] **Step 1: Build the hub page** — shell + metadata (title "Yarn Products & Range | Cotton, PC, CVC & Specialty Yarn"); `LandingHero` (breadcrumb Home/Products; H1 "Our Yarn Products & Range"); a responsive grid of 4 cards (one per `productPages` entry: name, one-line blurb, image thumb, link to `/products/<slug>/`); a short "full yarn range" section listing the `yarnCatalog` category names with a link to the homepage `/#yarn-range`; `CtaBand`. Include `BreadcrumbJsonLd`.

- [ ] **Step 2: Build + visual** — `npm run build` PASS; open `/products/`; confirm 4 cards link correctly.

- [ ] **Step 3: Commit**

```bash
git add app/products/page.tsx
git commit -m "Add /products hub page"
```

---

### Task 4: Local page `/yarn-supplier-karachi/`

**Files:**
- Create: `app/yarn-supplier-karachi/page.tsx`

- [ ] **Step 1: Build the local page** — shell + metadata (title "Yarn Supplier in Karachi, Pakistan | Perception Impex"; description targeting local intent). Sections: `LandingHero` (breadcrumb Home / Yarn Supplier in Karachi; H1 "Yarn Supplier in Karachi, Pakistan"); local-supply angle (Karachi base since 2000, proximity to Pakistan's spinning mills, fast local fulfilment, MOQ 500 bags/month, 30/60/90 terms — all from `contact`/facts); a "yarns we supply" grid linking to the 4 product pages; "why Karachi buyers choose us" (reuse `strengths`); `LandingFaq` (3-4 local FAQs); `CtaBand`. JSON-LD: `BreadcrumbJsonLd` + a `Service`/`LocalBusiness`-style block (areaServed Karachi/Pakistan) + `FaqJsonLd`. No em dashes.

- [ ] **Step 2: Build + visual** — PASS; open `/yarn-supplier-karachi/`.

- [ ] **Step 3: Commit**

```bash
git add app/yarn-supplier-karachi
git commit -m "Add Karachi/Pakistan local yarn-supplier page"
```

---

### Task 5: Export page `/yarn-exporter-pakistan/`

**Files:**
- Create: `app/yarn-exporter-pakistan/page.tsx`

- [ ] **Step 1: Build the export page** — shell + metadata (title "Yarn Exporter in Pakistan | Export to USA, UK & Canada | Perception Impex"). Sections: `LandingHero` (H1 "Yarn Exporter in Pakistan"); export-capability intro; **three distinct country sections** (United States, United Kingdom, Canada) each with a short, genuinely different paragraph (what those buyers source, shipping/documentation, why Pakistan-origin yarn) — grounded in `markets`; a "what we export" grid linking the 4 product pages; trust signals (`strengths`); `LandingFaq` (export FAQs: documentation, MOQ, lead times, payment terms); `CtaBand`. JSON-LD: `BreadcrumbJsonLd` + `Service` (areaServed US/GB/CA) + `FaqJsonLd`. No em dashes; keep the three country sections genuinely distinct (no copy-paste with the country name swapped).

- [ ] **Step 2: Build + visual** — PASS; open `/yarn-exporter-pakistan/`.

- [ ] **Step 3: Commit**

```bash
git add app/yarn-exporter-pakistan
git commit -m "Add Pakistan yarn-exporter page (US/UK/Canada)"
```

---

### Task 6: Navigation, footer, sitemap wiring

**Files:**
- Modify: `lib/content.ts` (`nav`), `components/Footer.tsx`, `app/sitemap.ts`

- [ ] **Step 1: Add Products to nav** — in `nav`, insert `{ label: "Products", href: "/products/" }` after the existing "Yarn Range" entry. (Header already handles non-hash hrefs after the careers work, rendering them as links with no active section.)

- [ ] **Step 2: Add a footer Products column** — in `components/Footer.tsx`, add a small column or list linking to `/products/`, the 4 product pages, `/yarn-supplier-karachi/`, and `/yarn-exporter-pakistan/`.

- [ ] **Step 3: Add the 6 URLs to `app/sitemap.ts`** — append entries for `/products/`, the 4 `/products/<slug>/`, `/yarn-supplier-karachi/`, `/yarn-exporter-pakistan/`, each `changeFrequency: "monthly"`, `priority: 0.8`.

- [ ] **Step 4: Build + verify** — `npm run build` PASS; `grep -c '/products/cotton-yarn/' out/sitemap.xml` → 1; confirm "Products" appears in the header/footer; all new pages reachable.

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts components/Footer.tsx app/sitemap.ts
git commit -m "Wire Products into nav, footer, and sitemap"
```

---

## Self-Review Notes

- **Spec coverage:** §2 pages → Tasks 1–5 (6 routes). §3 architecture (data-driven products + shared landing components + bespoke hub/local/export) → Tasks 1–5. §4 page structure → Tasks 1 (template), 3/4/5. §5 content (real facts, distinct, no em dashes) → content briefs in each task + Global Constraints. §6 SEO (metadata, JSON-LD, sitemap, nav, internal linking) → per-route metadata/JSON-LD in Tasks 1–5 + Task 6 (nav/footer/sitemap). §7 theme (teal unchanged) → Global Constraints. All covered.
- **Content authoring note:** marketing prose is authored at build (grounded in the listed facts), not pre-written verbatim in the plan; section structure, data shape, facts, and target keywords are fully specified so there is no ambiguity about what each page contains.
- **Type consistency:** every product route consumes `productPages[slug]` and `ProductLandingPage`/`ProductPage` exactly as defined in Task 1. `related` holds slugs that exist. Image paths/dimensions match the committed `public/images/*-yarn.webp` files.
- **Build-green per task:** each task ends with a passing `npm run build`; routes only reference data/components created in the same or earlier tasks.
