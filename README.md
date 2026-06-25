# Perception Impex — Website

Premium single-page marketing site for **Perception Impex**, a Pakistan-based B2B yarn trading
& sourcing company. Built with Next.js (App Router) and exported as a fully static site for
hosting on Render.

## Tech stack

- **Next.js 14** (App Router) with `output: 'export'` → static HTML/CSS/JS
- **Tailwind CSS** (compiled, tree-shaken)
- **Self-hosted fonts** via `next/font` (Manrope + Inter)
- Animations via CSS + IntersectionObserver (no animation library)
- Pre-optimized WebP imagery; inline CC0 world map (Natural Earth)

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build (static export)

```bash
npm run build    # outputs static site to ./out
```

Serve the export locally to preview:

```bash
npx serve out
```

## Deploy to Render

A `render.yaml` blueprint is included. Either:

- **Blueprint:** push to GitHub and create a new Blueprint instance in Render (auto-detects
  `render.yaml`), or
- **Manual static site:** New → Static Site, with:
  - **Build command:** `npm ci && npm run build`
  - **Publish directory:** `out`

## Configuration

### Quote form (Formspree)

The quote form is wired to [Formspree](https://formspree.io). Until an ID is set, submitting the
form opens a pre-filled **WhatsApp** message with the entered details (so it works immediately).

To receive submissions by email:

1. Create a form at formspree.io and copy its ID (the part after `/f/`).
2. Set it in `lib/content.ts`:

   ```ts
   export const FORMSPREE_ID = "your_form_id";
   ```

3. Rebuild. Submissions will now POST to Formspree.

### Contact details

Phone, WhatsApp, email, hours, MOQ, and payment terms live in `lib/content.ts` (`contact`).
WhatsApp uses `https://wa.me/923008209877`; email uses `mailto:info@perceptionimpex.com`.

### Logo

The header/footer use a **text placeholder** (`components/Logo.tsx`). When the real logo is ready,
replace the inner markup with a `next/image` — the surrounding sizing can stay.

### Content

All copy, products, stats, suppliers, clients, and form fields are centralized in
`lib/content.ts` — edit there to update the site.

## Project structure

```
app/                 # layout, page, global styles, favicon
components/
  ui/                # Button, Container, SectionHeading, Reveal, CountUp, Icons
  sections/          # Hero, Stats, Products, GlobalReach, Strengths, Partners, About, Quote
  Header.tsx  Footer.tsx  Logo.tsx  FloatingContact.tsx
lib/
  content.ts         # single source of truth for all content
  useInView.ts       # IntersectionObserver hook
  worldmap.ts        # generated world map path
public/images/       # optimized WebP photos + supplier logos
```
