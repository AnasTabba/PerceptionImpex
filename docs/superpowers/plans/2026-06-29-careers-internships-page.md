# Careers / Internships Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/careers/` page advertising two early-career programs (Aspire Summer Internship for students, Elevate Management Trainee Program for fresh graduates) across six departments, with an on-site application form, plus nav/footer/sitemap/SEO wiring and a homepage hiring banner.

**Architecture:** A new App Router static route reusing the site's existing primitives (`Container`, `SectionHeading`, `Reveal`, `Button`, Icons) and the `Quote.tsx` Formspree-with-WhatsApp-fallback form pattern. All copy/data lives in `lib/content.ts` (single source of truth). Interactive pieces (program cards + form sharing a "selected program" state) are isolated in client components under `components/sections/careers/`; static sections are server components.

**Tech Stack:** Next.js 14 App Router (static export, `output: 'export'`, `trailingSlash: true`), React 18, TypeScript 5.5, Tailwind 3.4.

## Global Constraints

- All copy/data in `lib/content.ts`, never hardcoded in components.
- Reuse `Container`, `SectionHeading`, `Reveal`, `Button`, and `components/ui/Icons`; match existing teal/ink/surface design tokens and Tailwind utility style.
- Avoid em dashes in new body prose (owner prefers a less templated tone).
- No new runtime dependencies (only next/react/react-dom).
- This codebase has **no unit-test harness**. The verification cycle for every task is: `npm run lint` (zero errors) and `npm run build` (succeeds — this type-checks and produces the static export), plus a visual check via `npm run dev` where noted. Treat a clean lint + build as the task's passing test.
- Program names exactly: **"Aspire Summer Internship"** and **"Elevate Management Trainee Program"**.
- The six positions exactly: **Finance & Accounts**, **Information Technology (IT)**, **Human Resources (HR)**, **Sales & Business Development**, **Supply Chain & Logistics**, **Import/Export & Merchandising**.
- CSP already allows `https://formspree.io` for `connect-src` and `form-action` (see `app/layout.tsx`). No CSP change needed.

---

### Task 1: Content model — careers data, types, nav, Formspree id

**Files:**
- Modify: `lib/content.ts`

**Interfaces:**
- Consumes: existing `FormField` type.
- Produces:
  - `type CareerProgram = { id: "aspire" | "elevate"; name: string; audience: string; duration: string; blurb: string; employmentType: "INTERN" | "FULL_TIME"; departmentIds: string[]; }`
  - `type CareerPosition = { id: string; name: string; blurb: string; programIds: Array<"aspire" | "elevate">; }`
  - `careerPrograms: CareerProgram[]`, `careerPositions: CareerPosition[]`, `careerApplicationFields: FormField[]`, `careerFaqs: { q: string; a: string }[]`, `careerBenefits: { title: string; desc: string }[]`
  - `CAREERS_FORMSPREE_ID: string` (empty), `careersFormspreeAction: string`, `CAREERS_POSTED_DATE: string`
  - `nav` items become root-relative; a `{ label: "Careers", href: "/careers/" }` entry is appended.
  - `FormField.type` union gains `"url"`.

- [ ] **Step 1: Add `"url"` to the `FormField` type union**

In `lib/content.ts`, change the `type` field of the `FormField` type:

```ts
export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "select" | "textarea";
  required: boolean;
  options?: string[];
  autoComplete?: string;
  placeholder?: string;
  full?: boolean; // span full width in the grid
};
```

- [ ] **Step 2: Make `nav` links root-relative and add the Careers entry**

Replace the existing `nav` export with:

```ts
export const nav = [
  { label: "Yarns", href: "/#products" },
  { label: "Yarn Range", href: "/#yarn-range" },
  { label: "Global Reach", href: "/#global" },
  { label: "Why Us", href: "/#why" },
  { label: "Partners", href: "/#partners" },
  { label: "About", href: "/#about" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact", href: "/#quote" },
];
```

- [ ] **Step 3: Append the careers content model at the end of `lib/content.ts`**

Add (after the existing `formspreeAction` export):

```ts
// ─── Careers / Internships ──────────────────────────────────────────────────

export type CareerProgram = {
  id: "aspire" | "elevate";
  name: string;
  audience: string;
  duration: string;
  blurb: string;
  employmentType: "INTERN" | "FULL_TIME";
  departmentIds: string[];
};

export const careerPrograms: CareerProgram[] = [
  {
    id: "aspire",
    name: "Aspire Summer Internship",
    audience: "3rd-year (penultimate-year) university students",
    duration: "6 to 8 weeks, summer",
    blurb:
      "A hands-on summer internship for students who want real exposure to how a textile trading house runs. Work alongside our teams, learn the yarn trade from the inside, and build skills you cannot get in a classroom.",
    employmentType: "INTERN",
    departmentIds: ["finance", "it", "hr", "sales", "supply-chain", "impex"],
  },
  {
    id: "elevate",
    name: "Elevate Management Trainee Program",
    audience: "Fresh graduates",
    duration: "12-month structured trainee track",
    blurb:
      "A career-track program for fresh graduates ready to grow into future leaders. Structured rotations, mentorship from senior management, and a clear path into a permanent role within the company.",
    employmentType: "FULL_TIME",
    departmentIds: ["sales", "supply-chain", "finance", "impex"],
  },
];

export type CareerPosition = {
  id: string;
  name: string;
  blurb: string;
  programIds: Array<"aspire" | "elevate">;
};

export const careerPositions: CareerPosition[] = [
  {
    id: "finance",
    name: "Finance & Accounts",
    blurb: "Support bookkeeping, receivables and payables, and financial reporting.",
    programIds: ["aspire", "elevate"],
  },
  {
    id: "it",
    name: "Information Technology (IT)",
    blurb: "Help maintain internal systems, data, and the tools the business runs on.",
    programIds: ["aspire"],
  },
  {
    id: "hr",
    name: "Human Resources (HR)",
    blurb: "Assist with recruitment, onboarding, and day-to-day people operations.",
    programIds: ["aspire"],
  },
  {
    id: "sales",
    name: "Sales & Business Development",
    blurb: "Support client outreach, lead generation, and account coordination.",
    programIds: ["aspire", "elevate"],
  },
  {
    id: "supply-chain",
    name: "Supply Chain & Logistics",
    blurb: "Help with order fulfilment, dispatch scheduling, and inventory tracking.",
    programIds: ["aspire", "elevate"],
  },
  {
    id: "impex",
    name: "Import/Export & Merchandising",
    blurb: "Assist with trade documentation, export coordination, and merchandising support.",
    programIds: ["aspire", "elevate"],
  },
];

export const careerBenefits = [
  { title: "Real Industry Exposure", desc: "Work on live trade, not filler tasks. See how yarn moves from mill to manufacturer." },
  { title: "Senior Mentorship", desc: "Learn directly from a team with 25+ years in the textile trade." },
  { title: "A 25-Year Network", desc: "Build relationships across Pakistan's leading spinning mills and manufacturers." },
  { title: "A Path Forward", desc: "Strong performers in the trainee program move into permanent roles." },
];

// Application form fields. The "program" select is pre-filled by the Apply
// buttons; options must match careerPrograms names exactly.
export const careerApplicationFields: FormField[] = [
  { name: "full_name", label: "Full Name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, autoComplete: "tel" },
  {
    name: "program",
    label: "Program",
    type: "select",
    required: true,
    options: ["Aspire Summer Internship", "Elevate Management Trainee Program"],
  },
  {
    name: "position",
    label: "Position Applied For",
    type: "select",
    required: true,
    options: [
      "Finance & Accounts",
      "Information Technology (IT)",
      "Human Resources (HR)",
      "Sales & Business Development",
      "Supply Chain & Logistics",
      "Import/Export & Merchandising",
    ],
  },
  { name: "university", label: "University / Institution", type: "text", required: true },
  { name: "degree", label: "Degree / Field of Study", type: "text", required: true },
  {
    name: "year",
    label: "Year / Graduation Year",
    type: "text",
    required: true,
    placeholder: "e.g. 3rd year, 6th semester  or  2026 graduate",
  },
  { name: "gpa", label: "CGPA / GPA", type: "text", required: true, placeholder: "e.g. 3.4 / 4.0" },
  { name: "city", label: "City", type: "text", required: true, autoComplete: "address-level2" },
  {
    name: "cv_link",
    label: "LinkedIn or CV Link",
    type: "url",
    required: true,
    placeholder: "https://drive.google.com/…  or  linkedin.com/in/…",
  },
  { name: "availability", label: "Availability / Start Date", type: "text", required: false },
  {
    name: "cover_note",
    label: "Cover Note",
    type: "textarea",
    required: false,
    full: true,
    placeholder: "Why do you want to join Perception Impex?",
  },
];

export const careerFaqs = [
  {
    q: "Who can apply to the Aspire Summer Internship?",
    a: "Students currently in their 3rd (penultimate) year of a university degree. It runs over the summer and is open across all six departments.",
  },
  {
    q: "Who is the Elevate Management Trainee Program for?",
    a: "Fresh graduates looking for a career-track role. It is a structured 12-month program with rotations and mentorship, leading toward a permanent position.",
  },
  {
    q: "Do I need a CV to apply?",
    a: "Yes. Paste a link to your CV (a Google Drive link) or your LinkedIn profile in the application form so we can review your background.",
  },
  {
    q: "Is the internship paid?",
    a: "Stipend and compensation are discussed with shortlisted candidates based on the program and role.",
  },
  {
    q: "How will I hear back?",
    a: "Our HR team reviews applications and contacts shortlisted candidates by email or phone. Apply through the form on this page.",
  },
];

// Static posting date for JobPosting structured data (kept constant so the
// static export is deterministic). Update when the campaign is refreshed.
export const CAREERS_POSTED_DATE = "2026-06-29";

// Separate Formspree endpoint for applications (distinct from the quote form).
// Replace once the form is created at formspree.io. While empty, the
// application form falls back to a pre-filled WhatsApp message.
export const CAREERS_FORMSPREE_ID = "";
export const careersFormspreeAction = CAREERS_FORMSPREE_ID
  ? `https://formspree.io/f/${CAREERS_FORMSPREE_ID}`
  : "";
```

- [ ] **Step 4: Lint and build**

Run: `npm run lint && npm run build`
Expected: PASS — lint clean, build completes and writes `./out`. (No page consumes the new exports yet; this verifies types compile.)

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts
git commit -m "Add careers content model, types, nav entry"
```

---

### Task 2: Header & Footer cross-page nav + scroll-spy fix

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: `nav` (now root-relative, with Careers entry) from Task 1.
- Produces: a header/footer that work from any route. Section-id extraction uses `href.split("#")[1] ?? ""`.

**Context:** `nav` hrefs are now `/#products` etc. The header CTA and the footer "Yarns" links use literal `#quote` / `#products` and must become root-relative so they work from `/careers/`. The scroll-spy currently does `n.href.replace("#", "")` which would yield `/products` — it must extract the id after `#`.

- [ ] **Step 1: Fix the scroll-spy id extraction in `components/Header.tsx`**

Replace this line (inside the scroll-spy `useEffect`):

```ts
    const ids = nav.map((n) => n.href.replace("#", ""));
```

with:

```ts
    const ids = nav.map((n) => n.href.split("#")[1] ?? "").filter(Boolean);
```

- [ ] **Step 2: Fix the active-state comparison in `components/Header.tsx` (desktop nav)**

In the desktop `<nav>` map, replace:

```ts
            const active = activeId === item.href.replace("#", "");
```

with:

```ts
            const active = activeId === (item.href.split("#")[1] ?? "");
```

- [ ] **Step 3: Fix the active-state comparison in `components/Header.tsx` (mobile nav)**

In the mobile menu `<nav>` map, replace the identical line:

```ts
              const active = activeId === item.href.replace("#", "");
```

with:

```ts
              const active = activeId === (item.href.split("#")[1] ?? "");
```

- [ ] **Step 4: Make the header CTA links root-relative**

In `components/Header.tsx`, change both "Request Quote" buttons (desktop block and mobile menu) from `href="#quote"` to `href="/#quote"`:

```tsx
          <Button as="a" href="/#quote" variant="primary">
            Request Quote
          </Button>
```

and in the mobile menu:

```tsx
            <Button as="a" href="/#quote" variant="primary" size="lg" onClick={() => setOpen(false)}>
              Request Quote
            </Button>
```

- [ ] **Step 5: Make the footer "Yarns" links root-relative**

In `components/Footer.tsx`, change the product link from `href="#products"` to `href="/#products"`:

```tsx
                  <a href="/#products" className="text-sm text-white/70 transition-colors hover:text-white">
                    {p.name}
                  </a>
```

(The footer's "Explore" list already maps `nav`, so the Careers link appears there automatically.)

- [ ] **Step 6: Lint, build, and visual check**

Run: `npm run lint && npm run build`
Expected: PASS.
Then run `npm run dev`, open `http://localhost:3000`, confirm: nav still scrolls to sections on the homepage, the active underline still tracks on scroll, and a "Careers" link is present in both the header and footer.

- [ ] **Step 7: Commit**

```bash
git add components/Header.tsx components/Footer.tsx
git commit -m "Make nav cross-page; add Careers link; fix scroll-spy id parse"
```

---

### Task 3: Careers application form (Formspree + WhatsApp fallback)

**Files:**
- Create: `components/sections/careers/CareersForm.tsx`

**Interfaces:**
- Consumes: `careerApplicationFields`, `careersFormspreeAction`, `whatsappHref`, `contact`, `type FormField` from `lib/content`; `Container`, `SectionHeading`, `Button`, `Check` icon.
- Produces: `export function CareersForm({ selectedProgram, onProgramChange }: { selectedProgram: string; onProgramChange: (v: string) => void })`. Renders a `<section id="apply">`. The `program` field is controlled by `selectedProgram`/`onProgramChange`; all other fields are uncontrolled (read via `FormData` on submit).

**Context:** Mirror `components/sections/Quote.tsx`: same input styling, same success state, same WhatsApp fallback when the Formspree action is empty. The only structural difference is the controlled `program` select so the Apply buttons can pre-select it.

- [ ] **Step 1: Create the form component**

Create `components/sections/careers/CareersForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import {
  careerApplicationFields,
  careersFormspreeAction,
  whatsappHref,
  type FormField,
} from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-lg border border-stone-200 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

function FieldControl({
  field,
  controlledValue,
  onControlledChange,
}: {
  field: FormField;
  controlledValue?: string;
  onControlledChange?: (v: string) => void;
}) {
  const id = `cf-${field.name}`;
  const common = {
    id,
    name: field.name,
    required: field.required,
    autoComplete: field.autoComplete,
    "aria-required": field.required,
  };

  return (
    <div className={field.full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-soft">
        {field.label}
        {field.required && <span className="ml-0.5 text-teal-600">*</span>}
      </label>

      {field.type === "textarea" ? (
        <textarea {...common} rows={4} placeholder={field.placeholder} className={inputBase} />
      ) : field.type === "select" ? (
        onControlledChange ? (
          <select
            {...common}
            value={controlledValue ?? ""}
            onChange={(e) => onControlledChange(e.target.value)}
            className={`${inputBase} appearance-none`}
          >
            <option value="" disabled>
              Select…
            </option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <select {...common} defaultValue="" className={`${inputBase} appearance-none`}>
            <option value="" disabled>
              Select…
            </option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )
      ) : (
        <input {...common} type={field.type} placeholder={field.placeholder} className={inputBase} />
      )}
    </div>
  );
}

export function CareersForm({
  selectedProgram,
  onProgramChange,
}: {
  selectedProgram: string;
  onProgramChange: (v: string) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    // Fallback when Formspree isn't configured yet: compose a WhatsApp
    // message from the entered details so the form still works.
    if (!careersFormspreeAction) {
      const lines = careerApplicationFields
        .map((f) => {
          const v = data.get(f.name);
          return v ? `${f.label}: ${v}` : null;
        })
        .filter(Boolean)
        .join("\n");
      const message = `New career application:\n\n${lines}`;
      window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
      setStatus("success");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch(careersFormspreeAction, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        onProgramChange("");
      } else {
        const body = await res.json().catch(() => null);
        setErrorMsg(
          body?.errors?.[0]?.message ?? "Something went wrong. Please try again or contact us directly.",
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again or reach us on WhatsApp.");
      setStatus("error");
    }
  }

  return (
    <section id="apply" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Apply Now"
          title="Send us your application"
          description="Fill in your details and pick the program and position you want. We review every application and contact shortlisted candidates."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-stone-200 sm:p-8">
          {status === "success" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-500/10 text-teal-600">
                <Check className="h-8 w-8" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink">Thank you</h3>
              <p className="mt-3 max-w-sm text-ink-soft">
                {careersFormspreeAction
                  ? "Your application has been received. Our team will review it and get back to you if you are shortlisted."
                  : "Your details have been prepared in WhatsApp. Send the message to submit your application to our team."}
              </p>
              <Button className="mt-8" variant="ghost" onClick={() => setStatus("idle")}>
                Submit another application
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              action={careersFormspreeAction || undefined}
              method="POST"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {careerApplicationFields.map((field) =>
                  field.name === "program" ? (
                    <FieldControl
                      key={field.name}
                      field={field}
                      controlledValue={selectedProgram}
                      onControlledChange={onProgramChange}
                    />
                  ) : (
                    <FieldControl key={field.name} field={field} />
                  ),
                )}
              </div>

              {status === "error" && (
                <p role="alert" aria-live="assertive" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMsg}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Submit Application"}
                </Button>
                <p className="text-xs text-ink-muted">We review applications during business hours, Mon to Sat.</p>
              </div>

              {!careersFormspreeAction && (
                <p className="mt-4 text-xs text-ink-muted">
                  Note: connect a Formspree form ID to receive applications by email. Until then,
                  submitting opens a pre-filled WhatsApp message with your details.
                </p>
              )}
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Lint and build**

Run: `npm run lint && npm run build`
Expected: PASS. (Component compiles; it is consumed in Task 4.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/careers/CareersForm.tsx
git commit -m "Add careers application form (Formspree + WhatsApp fallback)"
```

---

### Task 4: Careers page sections, assembly, metadata, and JobPosting JSON-LD

**Files:**
- Create: `components/sections/careers/CareersHero.tsx`
- Create: `components/sections/careers/ProgramCards.tsx`
- Create: `components/sections/careers/Positions.tsx`
- Create: `components/sections/careers/CareerBenefits.tsx`
- Create: `components/sections/careers/CareersFaq.tsx`
- Create: `components/sections/careers/CareersApply.tsx`
- Create: `components/sections/careers/CareersJsonLd.tsx`
- Create: `app/careers/page.tsx`

**Interfaces:**
- Consumes: `careerPrograms`, `careerPositions`, `careerBenefits`, `careerFaqs`, `CAREERS_POSTED_DATE` from `lib/content`; `CareersForm` from Task 3; primitives.
- Produces: a static `/careers/` route. `CareersApply` is the client wrapper owning `selectedProgram` state and composing `ProgramCards` + `CareersForm`.

- [ ] **Step 1: Create the careers hero**

Create `components/sections/careers/CareersHero.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { careerPrograms } from "@/lib/content";

export function CareersHero() {
  return (
    <section className="scroll-mt-24 bg-ink pt-28 pb-20 text-white sm:pt-36 sm:pb-28">
      <Container>
        <Reveal className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="accent-rule !h-px !w-7" aria-hidden />
            <p className="text-[0.7rem] font-semibold uppercase tracking-wide-label text-teal-300">
              Careers at Perception Impex
            </p>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight-display text-balance sm:text-5xl lg:text-6xl">
            Start your career in the textile trade
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 text-pretty">
            Two early-career programs at one of Pakistan&apos;s trusted yarn trading houses: the{" "}
            {careerPrograms[0].name} for students and the {careerPrograms[1].name} for fresh
            graduates. Learn the business from a team with 25+ years in the industry.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="#programs" variant="onDark">
              View Programs
            </Button>
            <Button as="a" href="#apply" variant="ghost" className="!text-white !ring-white/30 hover:!bg-white/10">
              Apply Now
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create the program cards**

Create `components/sections/careers/ProgramCards.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { careerPrograms, careerPositions } from "@/lib/content";

export function ProgramCards({ onApply }: { onApply: (programName: string) => void }) {
  return (
    <section id="programs" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Programs"
          title="Two ways to join us"
          description="Whether you are still studying or fresh out of university, there is a track built for where you are."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {careerPrograms.map((p, i) => {
            const depts = careerPositions.filter((pos) => pos.programIds.includes(p.id));
            return (
              <Reveal
                as="div"
                key={p.id}
                delay={i * 80}
                className="flex flex-col rounded-2xl bg-surface p-7 shadow-soft ring-1 ring-stone-200 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wide-label text-teal-700">
                  {p.employmentType === "INTERN" ? "Internship" : "Graduate Program"}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight-display text-ink">
                  {p.name}
                </h3>
                <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-ink-muted">Who</dt>
                    <dd className="mt-0.5 text-ink-soft">{p.audience}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-muted">Duration</dt>
                    <dd className="mt-0.5 text-ink-soft">{p.duration}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">{p.blurb}</p>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide-label text-ink-muted">
                    Open departments
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {depts.map((d) => (
                      <li
                        key={d.id}
                        className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-700"
                      >
                        {d.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-2">
                  <Button onClick={() => onApply(p.name)} variant="primary">
                    Apply for this program <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create the positions section**

Create `components/sections/careers/Positions.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { careerPositions, careerPrograms } from "@/lib/content";

function programLabel(ids: Array<"aspire" | "elevate">): string {
  return ids
    .map((id) => careerPrograms.find((p) => p.id === id)?.name)
    .filter(Boolean)
    .join("  ·  ");
}

export function Positions() {
  return (
    <section id="positions" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Open Positions"
          title="Departments hiring right now"
          description="Pick the area that fits your skills. Each department takes trainees through one or both of our programs."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-stone-200 ring-1 ring-stone-200 sm:grid-cols-2 lg:grid-cols-3">
          {careerPositions.map((pos, i) => (
            <Reveal
              as="div"
              key={pos.id}
              delay={(i % 3) * 70}
              className="group flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-teal-50"
            >
              <h3 className="font-display text-base font-bold tracking-tight-display text-ink">
                {pos.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pos.blurb}</p>
              <p className="mt-4 text-xs font-medium text-teal-700">{programLabel(pos.programIds)}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create the benefits section**

Create `components/sections/careers/CareerBenefits.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { careerBenefits } from "@/lib/content";

export function CareerBenefits() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Join Us"
          title="What you will gain"
          description="More than a line on your CV. Real work, real mentorship, and a real path forward."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-stone-200 ring-1 ring-stone-200 sm:grid-cols-2 lg:grid-cols-4">
          {careerBenefits.map((item, i) => (
            <Reveal
              as="div"
              key={item.title}
              delay={(i % 4) * 70}
              className="group flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-teal-50"
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-[3px] bg-teal-500 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110"
              />
              <h3 className="mt-4 font-display text-base font-bold tracking-tight-display text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Create the careers FAQ**

Create `components/sections/careers/CareersFaq.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { careerFaqs } from "@/lib/content";

export function CareersFaq() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions about applying"
          description="The essentials for students and graduates applying to our programs."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-stone-200 border-y border-stone-200">
          {careerFaqs.map((f, i) => (
            <Reveal as="div" key={f.q} delay={(i % 3) * 60}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold tracking-tight-display text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-500/10 text-teal-600 transition-transform duration-300 ease-out-expo group-open:rotate-45"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-base leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Create the apply wrapper (client state owner)**

Create `components/sections/careers/CareersApply.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ProgramCards } from "./ProgramCards";
import { CareersForm } from "./CareersForm";

export function CareersApply() {
  const [selectedProgram, setSelectedProgram] = useState("");

  function handleApply(programName: string) {
    setSelectedProgram(programName);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <ProgramCards onApply={handleApply} />
      <CareersForm selectedProgram={selectedProgram} onProgramChange={setSelectedProgram} />
    </>
  );
}
```

- [ ] **Step 7: Create the JobPosting structured data**

Create `components/sections/careers/CareersJsonLd.tsx`:

```tsx
import { careerPositions, careerPrograms, CAREERS_POSTED_DATE } from "@/lib/content";

const SITE_URL = "https://www.perceptionimpex.com";

export function CareersJsonLd() {
  const postings = careerPositions.map((pos) => {
    const programs = pos.programIds
      .map((id) => careerPrograms.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    const employmentType = Array.from(new Set(programs.map((p) => p.employmentType)));
    const programNames = programs.map((p) => p.name).join(" and ");
    return {
      "@type": "JobPosting",
      title: `${pos.name} — ${programNames}`,
      description: `${pos.blurb} Apply through the ${programNames} at Perception Impex, a Pakistan-based yarn trading and sourcing company.`,
      datePosted: CAREERS_POSTED_DATE,
      employmentType,
      hiringOrganization: {
        "@type": "Organization",
        name: "Perception Impex",
        sameAs: SITE_URL,
        logo: `${SITE_URL}/images/logo.webp`,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
      },
      directApply: true,
    };
  });

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": postings,
        }),
      }}
    />
  );
}
```

- [ ] **Step 8: Create the careers page**

Create `app/careers/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingContact } from "@/components/FloatingContact";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersApply } from "@/components/sections/careers/CareersApply";
import { Positions } from "@/components/sections/careers/Positions";
import { CareerBenefits } from "@/components/sections/careers/CareerBenefits";
import { CareersFaq } from "@/components/sections/careers/CareersFaq";
import { CareersJsonLd } from "@/components/sections/careers/CareersJsonLd";

export const metadata: Metadata = {
  title: "Careers & Internships in Pakistan",
  description:
    "Join Perception Impex. Apply to the Aspire Summer Internship for students or the Elevate Management Trainee Program for fresh graduates. Roles in finance, IT, HR, sales, supply chain, and import/export at a Pakistan-based yarn trading company.",
  keywords: [
    "textile internship Pakistan",
    "yarn industry internship",
    "management trainee program Pakistan",
    "Aspire Summer Internship",
    "Elevate Management Trainee Program",
    "fresh graduate jobs Pakistan",
    "internship Karachi",
    "Perception Impex careers",
  ],
  alternates: { canonical: "/careers/" },
  openGraph: {
    type: "website",
    url: "https://www.perceptionimpex.com/careers/",
    title: "Careers & Internships at Perception Impex",
    description:
      "Aspire Summer Internship for students and the Elevate Management Trainee Program for fresh graduates. Apply online.",
    siteName: "Perception Impex",
  },
};

export default function CareersPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <CareersJsonLd />
        <CareersHero />
        <CareersApply />
        <Positions />
        <CareerBenefits />
        <CareersFaq />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
```

Note section order: `CareersApply` renders ProgramCards then the application form. Positions, Benefits, and FAQ follow. (Program cards before Positions keeps the "choose a program then see departments" flow; the form sits directly under the cards so an Apply click scrolls a short distance.)

- [ ] **Step 9: Lint, build, and visual check**

Run: `npm run lint && npm run build`
Expected: PASS — build emits `out/careers/index.html`.
Then run `npm run dev`, open `http://localhost:3000/careers/`, and confirm:
- Hero, two program cards, positions grid, benefits, application form, and FAQ all render.
- Clicking "Apply for this program" on a card scrolls to the form and pre-selects that program in the Program dropdown.
- Submitting a valid form (Formspree empty) opens a pre-filled WhatsApp message and shows the success state.
- Header/Footer present; "Careers" nav link highlights nothing odd.

- [ ] **Step 10: Verify the JobPosting JSON-LD is valid**

Run: `npm run build` then inspect the emitted HTML for the script tag:

```bash
grep -c '"@type":"JobPosting"' out/careers/index.html
```

Expected: `6` (one JobPosting per department).

- [ ] **Step 11: Commit**

```bash
git add app/careers components/sections/careers
git commit -m "Add /careers page: hero, programs, positions, benefits, FAQ, JobPosting schema"
```

---

### Task 5: Homepage hiring banner

**Files:**
- Create: `components/sections/Hiring.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal`, `Button`, `ArrowRight`.
- Produces: a slim full-width band, inserted between `<Partners />` and `<About />` in `app/page.tsx`.

- [ ] **Step 1: Create the hiring banner**

Create `components/sections/Hiring.tsx`:

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export function Hiring() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal className="flex flex-col items-start gap-5 rounded-2xl bg-ink px-7 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide-label text-teal-300">
              We&apos;re Hiring
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight-display text-balance sm:text-3xl">
              Internships and graduate roles are open
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
              Students and fresh graduates: build your career in the textile trade with our Aspire
              and Elevate programs.
            </p>
          </div>
          <Button as="a" href="/careers/" variant="onDark" size="lg" className="shrink-0">
            View Open Roles <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Insert the banner into the homepage**

In `app/page.tsx`, add the import:

```tsx
import { Hiring } from "@/components/sections/Hiring";
```

and insert `<Hiring />` between `<Partners />` and `<About />`:

```tsx
        <Partners />
        <Hiring />
        <About />
```

- [ ] **Step 3: Lint, build, and visual check**

Run: `npm run lint && npm run build`
Expected: PASS.
Then run `npm run dev`, open `http://localhost:3000`, scroll to between Partners and About, confirm the hiring band renders and its button links to `/careers/`.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hiring.tsx app/page.tsx
git commit -m "Add homepage 'We're hiring' banner linking to /careers"
```

---

### Task 6: Sitemap + final verification

**Files:**
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `/careers/` listed in the sitemap.

- [ ] **Step 1: Add `/careers/` to the sitemap**

In `app/sitemap.ts`, add a second entry to the returned array:

```ts
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/careers/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
```

- [ ] **Step 2: Final lint + build**

Run: `npm run lint && npm run build`
Expected: PASS. Confirm the build output includes both `out/index.html` and `out/careers/index.html`, and `out/sitemap.xml` lists the careers URL:

```bash
grep -c '/careers/' out/sitemap.xml
```

Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "Add /careers to sitemap"
```

---

## Self-Review Notes

- **Spec coverage:** §2 programs → Task 1 `careerPrograms`. §3 positions + distribution → Task 1 `careerPositions` (programIds), surfaced in Tasks 4. §4 route/nav/anchor-fix/banner → Tasks 1 (nav), 2 (header/footer + scroll-spy), 5 (banner), 4 (page route). §5 page structure → Task 4 (hero, program cards, positions, benefits, form, FAQ). §6 form → Task 3. §7 content model → Task 1. §8 SEO (metadata, sitemap, JobPosting) → Task 4 metadata + JSON-LD, Task 6 sitemap. §9 conventions → Global Constraints. All covered.
- **Type consistency:** `CareersForm` props (`selectedProgram`, `onProgramChange`) match `CareersApply`'s usage. `onApply(programName: string)` in `ProgramCards` matches `handleApply` in `CareersApply`. `careerPrograms[].id` values (`"aspire"`/`"elevate"`) match `CareerPosition.programIds`. Program select options match `careerPrograms[].name` exactly.
- **No external deps added.** No CSP change (formspree.io already allowed).
