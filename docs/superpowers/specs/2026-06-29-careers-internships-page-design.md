# Careers / Internships Page — Design Spec

**Date:** 2026-06-29
**Status:** Approved (pending final spec review)
**Author:** brainstorming session

## 1. Goal

Add a dedicated **Careers** page to the Perception Impex static site that advertises two
internship/early-career programs in the textile-trade industry and lets candidates apply
through an on-site form. The page must match the existing site's design language, tone, and
single-source-of-truth content convention.

## 2. The two programs

| Program | Audience | Nature |
|---|---|---|
| **Aspire Summer Internship** | 3rd-year (penultimate-year) university students | Fixed-term summer internship, learning-focused |
| **Elevate Management Trainee Program** | Fresh graduates | Career-track, permanent-path graduate trainee role |

Naming rationale: "Summer Internship" and "Management Trainee Program" are the widely
recognised terms in the Pakistani corporate market, so universities and applicants understand
them immediately. "Aspire" and "Elevate" give each a distinct, memorable brand.

## 3. Positions / departments

Six departments, grounded in what a B2B yarn trading & sourcing house (an *Impex* / import-export
trade business) actually runs:

1. **Finance & Accounts**
2. **Information Technology (IT)**
3. **Human Resources (HR)**
4. **Sales & Business Development**
5. **Supply Chain & Logistics**
6. **Import/Export & Merchandising**

Distribution:
- **Aspire Summer Internship** — opens **all 6** departments (interns slot into any team).
- **Elevate Management Trainee Program** — opens a **focused career-track subset**:
  Sales & Business Development, Supply Chain & Logistics, Finance & Accounts,
  Import/Export & Merchandising. (HR and IT are internship-only for now.)

Each position carries a one-line "what you'll do" description.

## 4. Route & navigation

- New static route: **`/careers/`** (`app/careers/page.tsx`). Chosen over `/internships` to stay
  future-proof for full-time roles. Static-export friendly (`output: 'export'`, `trailingSlash: true`).
- Add a **"Careers"** link to the header nav (`nav` in `lib/content.ts`) and the footer Explore list.
- **Cross-page anchor fix:** the homepage nav uses in-page hash links (`#products`, etc.). To keep
  the header working from `/careers`, those nav hrefs become root-relative (`/#products`). On the
  homepage these still behave as anchor scrolls; from `/careers` they navigate home and scroll.
  The header's scroll-spy currently derives a section id with `href.replace("#", "")`; with
  root-relative hrefs (`/#products`) this must change to extract the id **after** the `#`
  (e.g. `href.split("#")[1] ?? ""`) in both the observer setup and the active-state comparison.
  The Careers link (`/careers/`, no `#`) yields no id, so it is simply never the active section.
  The scroll-spy must also no-op gracefully when those sections are absent — it already guards with
  `if (!sections.length) return;` and per-element null filtering, so on `/careers` there is just no
  active item, which is acceptable.
- The careers page reuses the same shell: `ScrollProgress`, `Header`, `Footer`, `FloatingContact`.
- **Homepage hiring banner:** add a subtle "We're hiring — view open roles" callout band on the
  homepage, placed **between the Partners and About sections** (well below the hero so it does not
  distract from the core B2B sourcing message). It is a full-width slim band with a short line of
  copy and a single button linking to `/careers/`. New component `components/sections/Hiring.tsx`,
  inserted in `app/page.tsx`.

## 5. Page structure (`/careers/`)

Top → bottom:

1. **Careers hero** — headline framing early careers in textile trade, naming both programs,
   with anchor CTAs to the two program cards / application form.
2. **Program cards** — two side-by-side cards (Aspire Summer Internship, Elevate Management
   Trainee Program). Each shows: audience/eligibility, duration, open departments, and an
   **Apply** button that scrolls to the application form with that program pre-selected.
3. **Open positions** — the 6 departments as cards/list with one-line role summaries; a visual
   indication of which program(s) each is open under.
4. **Why join us** — what trainees gain: mentorship, hands-on B2B exposure, access to a 25+ year
   industry network. Reuses existing copy tone and the `Strengths`-style layout.
5. **Application form** — on-site form (see §6).
6. **Careers FAQ** — short accordion reusing the FAQ pattern (eligibility, stipend "to discuss",
   selection timeline, documents needed).

All sections reuse `Container`, `SectionHeading`, `Reveal`/`useInView`, `Button`, and existing
Icons. New section components live under `components/sections/careers/` (or prefixed `Careers*`),
keeping the file boundaries focused.

## 6. Application form

- **Provider:** Formspree, on-site (branded), reusing the `Quote.tsx` form pattern and styling.
- **Fallback:** identical to the Quote form — when the Formspree ID is empty, submitting composes a
  pre-filled **WhatsApp** message from the entered details so the form works before configuration.
- **Separate endpoint:** new `CAREERS_FORMSPREE_ID` constant (distinct from the quote form's
  `FORMSPREE_ID`), empty for now. Owner creates a Formspree form and pastes the ID later.
- **No file upload:** free Formspree has no attachments, so the CV is collected as a **link**
  (Google Drive / LinkedIn URL) rather than a file.
- **Free-tier note:** Formspree free tier caps ~50 submissions/month; documented for the owner.

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | text | yes | |
| Email | email | yes | |
| Phone / WhatsApp | tel | yes | |
| Program | select | yes | Aspire Summer Internship / Elevate Management Trainee Program; pre-filled by Apply button |
| Position applied for | select | yes | the 6 departments |
| University / Institution | text | yes | |
| Degree / Field of study | text | yes | |
| Year / Graduation year | text | yes | current year & semester (students) or graduation year (grads) |
| CGPA / GPA | text | yes | e.g. "3.4 / 4.0" |
| City | text | yes | |
| LinkedIn or CV link | url | yes | paste a Drive/LinkedIn link |
| Availability / start date | text | no | |
| Cover note | textarea | no | why you want to join |

The form field definitions live in `lib/content.ts` (`careerApplicationFields`), extending the
existing `FormField` type. If a `url` input type is needed, add `"url"` to the `FormField.type`
union and handle it in the field-control renderer.

## 7. Content model additions (`lib/content.ts`)

All copy/data added here (single source of truth). New exports:

- `careerPrograms` — the two programs (id, name, audience, duration, blurb, department ids).
- `careerPositions` — the 6 roles (id, name, blurb, which program ids they belong to).
- `careerApplicationFields` — `FormField[]` for the form above.
- `careerFaqs` — short Q/A list for the careers FAQ.
- `careerBenefits` — "why join" points (optional, may reuse a simple inline list).
- `CAREERS_FORMSPREE_ID` (empty) + derived `careersFormspreeAction`.
- Update `nav`: the existing section links become **root-relative** (`/#products`, `/#yarn-range`,
  …) so they work from any route, and a new `{ label: "Careers", href: "/careers/" }` entry is
  added. This matches the cross-page anchor fix in §4. On the homepage these root-relative hashes
  still scroll in-page; the scroll-spy keys off the id after the `#`, so it keeps working.

## 8. SEO & metadata

- `app/careers/page.tsx` exports its own `metadata`: title e.g. *"Careers & Internships in
  Karachi, Pakistan | Perception Impex"*, description targeting "textile internship Pakistan",
  "management trainee program", "yarn industry internship", "Aspire Summer Internship".
- Add `/careers/` to `app/sitemap.ts`.
- **JobPosting JSON-LD** — emit a `JobPosting` structured-data block per advertised role (or one
  per program) so roles are eligible for Google Jobs. Generated from `careerPositions` /
  `careerPrograms`, following the existing JSON-LD `@graph` approach in `app/layout.tsx`.
  Use valid required fields (title, description, hiringOrganization, jobLocation, datePosted,
  employmentType: INTERN/FULL_TIME). `validThrough` optional.

## 9. Conventions honoured

- Copy in `lib/content.ts`, not hardcoded in components.
- Reuse `Container` / `SectionHeading` / `Reveal` / `Button` / Icons; match Tailwind utility style
  and the existing teal/ink/surface design tokens.
- Avoid em dashes in new body prose (owner prefers a less templated tone).
- CSP: page is static and uses no new external origins beyond Formspree (already permitted by the
  existing form). Confirm CSP `connect-src`/`form-action` allows `formspree.io` if/when configured.

## 10. Out of scope

- Resume/file upload (needs paid Formspree) — links only for now.
- Applicant tracking / dashboard — responses land in Formspree (and email).
- Multi-language.

## 11. Owner follow-up (post-build)

1. Create a Formspree form, paste its ID into `CAREERS_FORMSPREE_ID`. Until then the WhatsApp
   fallback handles submissions.
2. Optionally upgrade Formspree if monthly volume exceeds the free tier or file upload is wanted.
