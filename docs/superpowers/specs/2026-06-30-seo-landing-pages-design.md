# SEO Commercial Landing Pages (Phase 1) — Design Spec

**Date:** 2026-06-30
**Status:** Approved (prototype previewed and accepted; theme kept as original teal)

## 1. Goal

Add a focused set of dedicated, SEO-optimized commercial pages so the site can rank for
buyer-intent, local, and export searches that a single long homepage cannot target well. Each page
is genuinely substantial and distinct (no thin or duplicated content), built in the existing teal
theme, with minimal em dashes (owner preference).

This is **Phase 1**. Phase 2 (an automated blog) is a separate future project and is explicitly out
of scope here. Note for Phase 2: bulk auto-generated content risks Google "scaled content abuse"
penalties and must be designed carefully.

## 2. Pages and URLs (6 total)

- **Products hub** — `/products/` — overview of all yarn types, links to each product page.
- **Product pages (4)** — `/products/cotton-yarn/`, `/products/pc-yarn/`, `/products/cvc-yarn/`,
  `/products/specialty-yarn/`.
- **Local** — `/yarn-supplier-karachi/` — geo page targeting "yarn supplier in Karachi, Pakistan".
- **Export** — `/yarn-exporter-pakistan/` — one page covering export to the US, UK, and Canada in
  distinct sections. (Deliberately one page, not three near-identical country pages, to avoid
  thin/duplicate-content penalties. Can split later if it ranks.)

The homepage and `/careers/` are unchanged. The homepage's Products section stays as the overview
and links into the deeper product pages.

## 3. Architecture

Matches the existing codebase (section components + `lib/content.ts` data + thin route files).
Static export, no new dependencies.

- **Product pages** are data-driven: a `productPages` record in `lib/content.ts` holds each product's
  page content (slug, meta title/description, H1, intro, overview paragraphs, carded/combed counts,
  applications, FAQs). A shared `ProductLandingPage` component renders from that data. Each route
  (`app/products/<slug>/page.tsx`) is a thin file that selects its data, exports its `metadata`, and
  renders `<ProductLandingPage data={...} />` plus its JSON-LD.
- **Hub, local, and export pages** are their own `page.tsx` files composing shared section
  primitives (CTA band, FAQ block, breadcrumb, hero) since their content shape differs from products.
- **Shared building blocks** extracted from the approved prototype into
  `components/landing/`: `LandingHero` (dark hero + breadcrumb + H1 + CTAs), `CtaBand`,
  `LandingFaq`, and small helpers. Reuses `Container`, `SectionHeading`, `Reveal`, `Button`, Icons,
  and the `Header`/`Footer`/`ScrollProgress`/`FloatingContact` shell.

## 4. Page structure

**Product page** (approved prototype): hero with breadcrumb + H1 + "Request a Quote"/WhatsApp CTAs →
overview with product image → counts & specifications → applications → why source from us → FAQ →
CTA band. CTAs link to the existing homepage quote form (`/#quote`) and WhatsApp.

**Hub** (`/products/`): hero + a grid of the four products (cards linking to each page) + a short
"full yarn range" section referencing the catalog + CTA band.

**Local** (`/yarn-supplier-karachi/`): hero + local supply angle (Karachi base, proximity to mills,
fast local fulfilment, MOQ/terms) + products served + why local buyers choose us + FAQ + CTA.

**Export** (`/yarn-exporter-pakistan/`): hero + export capability + distinct sections for the US, UK,
and Canada (markets served, documentation/logistics, what they buy) + trust signals + FAQ + CTA.

## 5. Content

All copy is drafted from the company's real facts already in `lib/content.ts` (products, yarn
counts, partner mills, MOQ, 30/60/90 terms, markets). Nothing invented. Each page is distinct and
substantial. Owner reviews for accuracy before merge. Avoid em dashes in body prose.

## 6. SEO wiring

- **Per-page metadata**: title, description, keywords, `alternates.canonical`, OpenGraph — each
  targeting that page's primary keyword (e.g. "Cotton Yarn Supplier & Exporter in Pakistan").
- **Structured data** per page via JSON-LD: `Product` (product pages) or `Service` (local/export) +
  `BreadcrumbList` + `FAQPage`. Follows the existing `@graph` pattern in `app/layout.tsx`.
- **Sitemap**: add all 6 URLs to `app/sitemap.ts`.
- **Navigation**: add a "Products" entry to the header nav (links to `/products/`) and footer links
  to the product pages, so the pages are crawlable and internally linked. Cross-link related product
  pages and the hub from each page.

## 7. Theme

Original teal (`#0F766E`) kept site-wide. No theme change (a dark-green variant was previewed and
rejected). New pages use the existing tokens/components.

## 8. Out of scope

- Phase 2 automated blog.
- Per-country export pages (single export page for now).
- Any homepage redesign.

## 9. Verification

- `npm run build` (type-check + static export) stays green; build emits all 6 new routes.
- Every `/images/*` reference resolves; JSON-LD present per page; sitemap lists all 6.
- Visual check of each page on the dev server.
