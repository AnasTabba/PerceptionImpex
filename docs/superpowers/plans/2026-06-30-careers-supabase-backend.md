# Careers Application Backend (Supabase) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the careers form's WhatsApp fallback with a Supabase-backed pipeline: owned Postgres DB, real CV file uploads, Turnstile + honeypot anti-spam, server-side validation, an internal notification email, and an applicant acknowledgment email.

**Architecture:** The static site posts the application (fields + CV file + Turnstile token) as `multipart/form-data` to a Supabase Edge Function `submit-application`. The function verifies Turnstile, validates, uploads the CV to a private Storage bucket, inserts a row, and sends two emails via Resend. The browser holds only public values (function URL, Turnstile site key); all secrets live in the function's env. No new dependency is added to the site bundle.

**Tech Stack:** Next.js 14 static export (browser `fetch`), Supabase (Edge Functions/Deno, Postgres, Storage), Cloudflare Turnstile, Resend.

## Global Constraints

- Site stays a static export (`output: "export"`); the browser only `fetch`es the Edge Function. **No new npm dependency** in the site bundle.
- All site copy/config lives in `lib/content.ts`. Avoid em dashes in new body prose.
- Program names exactly: "Aspire Summer Internship", "Elevate Management Trainee Program". Six positions exactly: Finance & Accounts, Information Technology (IT), Human Resources (HR), Sales & Business Development, Supply Chain & Logistics, Import/Export & Merchandising.
- CNIC format: `^\d{5}-\d{7}-\d$`. CV: extensions pdf/doc/docx, size ≤ 5 MB. Emails sent from `hr@perceptionimpex.com`; internal notification to `info@perceptionimpex.com`.
- Verification gate is `npm run build` (type-check + static export). There is NO unit-test harness and `npm run lint` is unconfigured/hangs — do not run it. The Deno Edge Function is excluded from the Next build (tsconfig) and verified by review + `deno check` if available, plus owner e2e after deploy.
- CSP must be updated in BOTH `app/layout.tsx` (prod meta) and `render.yaml`; the owner re-pastes the `render.yaml` value into the Render dashboard and verifies. (HANDOFF §6.)
- Secrets (service-role key, Turnstile secret, Resend key) live ONLY in the Edge Function env, never in the site bundle.

---

### Task 1: Content model, config, and tsconfig exclude

**Files:**
- Modify: `lib/content.ts`
- Modify: `tsconfig.json`

**Interfaces:**
- Produces: `careerApplicationFields` (with `cnic` + `cv` file field, no `cv_link`); `FormField.type` gains `"file"` and an optional `accept`; new `CAREERS_SUBMIT_URL` and `TURNSTILE_SITE_KEY` (empty strings for now); `CAREERS_FORMSPREE_ID`/`careersFormspreeAction` removed.

- [ ] **Step 1: Exclude `supabase/` from the TypeScript build**

In `tsconfig.json`, change the exclude line:

```json
  "exclude": ["node_modules", "supabase"]
```

- [ ] **Step 2: Extend the `FormField` type**

In `lib/content.ts`, update the `FormField` type to support file inputs:

```ts
export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "file" | "select" | "textarea";
  required: boolean;
  options?: string[];
  autoComplete?: string;
  placeholder?: string;
  accept?: string; // for file inputs
  full?: boolean; // span full width in the grid
};
```

- [ ] **Step 3: Add the CNIC field and replace the CV-link field with a file upload**

In `careerApplicationFields`, add a `cnic` field immediately after the `phone` field. The phone field currently reads:

```ts
  { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, autoComplete: "tel" },
```

Change it to add CNIC right after:

```ts
  { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, autoComplete: "tel" },
  {
    name: "cnic",
    label: "CNIC",
    type: "text",
    required: true,
    placeholder: "00000-0000000-0",
  },
```

Then replace the `cv_link` field block:

```ts
  {
    name: "cv_link",
    label: "LinkedIn or CV Link",
    type: "url",
    required: true,
    placeholder: "https://drive.google.com/…  or  linkedin.com/in/…",
  },
```

with a file-upload field:

```ts
  {
    name: "cv",
    label: "CV / Resume (PDF, DOC, DOCX — max 5MB)",
    type: "file",
    required: true,
    accept: ".pdf,.doc,.docx",
    full: true,
  },
```

(Note: the Formspree config exports — `CAREERS_FORMSPREE_ID`/`careersFormspreeAction` — are NOT
touched here. The still-current `CareersForm.tsx` imports them, so removing them now would break the
build. They are swapped for `CAREERS_SUBMIT_URL`/`TURNSTILE_SITE_KEY` in Task 4, together with the
form rewrite, so each task stays build-green. Adding the `cnic`/`cv` fields is safe: the current
form's `FieldControl` falls through to a plain `<input type={field.type}>`, which renders a working
file/text input.)

- [ ] **Step 4: Update the CV FAQ**

Replace the "Do I need a CV to apply?" answer:

```ts
    a: "Yes. Paste a link to your CV (a Google Drive link) or your LinkedIn profile in the application form so we can review your background.",
```

with:

```ts
    a: "Yes. Attach your CV as a PDF, DOC, or DOCX file (up to 5MB) in the application form so we can review your background.",
```

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: PASS cleanly. The current `CareersForm.tsx` still imports `careersFormspreeAction`/`whatsappHref`, which remain (untouched in this task), and the new `cnic`/`cv` fields render via the existing `FieldControl` fallthrough (`<input type={field.type}>`). Nothing the form depends on is removed here.

- [ ] **Step 6: Commit**

```bash
git add lib/content.ts tsconfig.json
git commit -m "Careers: add CNIC + CV file fields to content model; exclude supabase/ from tsc"
```

---

### Task 2: Database schema + Storage bucket + setup doc

**Files:**
- Create: `supabase/migrations/0001_applications.sql`
- Create: `supabase/README.md`

**Interfaces:**
- Produces: `public.applications` table (columns per spec §4), RLS enabled with no anon policies, private `cvs` Storage bucket. Consumed by the Edge Function (Task 3) via the service-role key.

- [ ] **Step 1: Write the migration SQL**

Create `supabase/migrations/0001_applications.sql`:

```sql
-- Careers applications: written only by the submit-application Edge Function
-- (service role). RLS is ON with no anon policies, so the public anon key
-- cannot read or write this table. The owner reads it via the dashboard.

create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  full_name     text not null,
  email         text not null,
  phone         text not null,
  cnic          text not null,
  program       text not null,
  position      text not null,
  university    text not null,
  degree        text not null,
  year_or_grad  text not null,
  gpa           text not null,
  city          text not null,
  availability  text,
  cover_note    text,
  cv_path       text not null,
  user_agent    text,
  status        text not null default 'new'
);

alter table public.applications enable row level security;
-- Intentionally no policies: only the service role (Edge Function) accesses this table.

-- Private bucket for CV files. Reachable only via the service role / signed URLs.
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false)
on conflict (id) do nothing;
-- No storage policies for anon: only the service role uploads/reads.
```

- [ ] **Step 2: Write the setup doc**

Create `supabase/README.md`:

````markdown
# Careers backend setup (Supabase)

The site posts applications to the `submit-application` Edge Function. Follow these steps once.

## 1. Project
- Create a free project at supabase.com (region near Pakistan, e.g. Singapore or Frankfurt).
- Settings → API: copy the **Project URL**, **anon key**, and **service_role key**.

## 2. Database + bucket
- SQL Editor → run the contents of `supabase/migrations/0001_applications.sql`.
- Confirm a private bucket named `cvs` exists under Storage.

## 3. Deploy the Edge Function
With the Supabase CLI (`brew install supabase/tap/supabase`):
```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase functions deploy submit-application --no-verify-jwt
```
`--no-verify-jwt` makes the form callable without a Supabase session (abuse is blocked by
Turnstile + honeypot + server validation).

## 4. Function secrets
```bash
supabase secrets set \
  SUPABASE_URL="https://<ref>.supabase.co" \
  SUPABASE_SERVICE_ROLE_KEY="<service_role key>" \
  TURNSTILE_SECRET_KEY="<cloudflare turnstile secret>" \
  RESEND_API_KEY="<resend api key>" \
  NOTIFY_TO="info@perceptionimpex.com" \
  HR_FROM="hr@perceptionimpex.com"
```

## 5. Cloudflare Turnstile
- dash.cloudflare.com → Turnstile → add widget for `perceptionimpex.com`.
- Put the **site key** in `lib/content.ts` (`TURNSTILE_SITE_KEY`); set the **secret key** as `TURNSTILE_SECRET_KEY` above.

## 6. Resend
- resend.com → add domain `perceptionimpex.com`; add the DKIM/SPF DNS records it gives you (in Hostinger DNS).
- Create an API key; set it as `RESEND_API_KEY` above.
- Create the `hr@perceptionimpex.com` mailbox/alias in Hostinger so applicant replies are received.

## 7. Wire the site
- Put the function URL `https://<ref>.supabase.co/functions/v1/submit-application` in `lib/content.ts`
  (`CAREERS_SUBMIT_URL`) and the Turnstile site key in `TURNSTILE_SITE_KEY`, then redeploy the site.
````

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/0001_applications.sql supabase/README.md
git commit -m "Add Supabase schema (applications table + cvs bucket) and setup doc"
```

---

### Task 3: Edge Function `submit-application`

**Files:**
- Create: `supabase/functions/submit-application/index.ts`

**Interfaces:**
- Consumes: the `applications` table + `cvs` bucket (Task 2); env secrets (Task 2 §4).
- Produces: an HTTP endpoint accepting `POST multipart/form-data` with fields matching `careerApplicationFields` names plus `company_website` (honeypot) and `cf-turnstile-response` (Turnstile token); returns `{ ok: true }` or `{ error, fields? }`.

**Note:** This file is Deno, excluded from the Next build (tsconfig, Task 1). It cannot be type-checked by `npm run build`. Verify by careful review and, if `deno` is available, `deno check supabase/functions/submit-application/index.ts`.

- [ ] **Step 1: Write the function**

Create `supabase/functions/submit-application/index.ts`:

```ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const ALLOWED_ORIGIN = "https://www.perceptionimpex.com";
const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

const PROGRAMS = ["Aspire Summer Internship", "Elevate Management Trainee Program"];
const POSITIONS = [
  "Finance & Accounts",
  "Information Technology (IT)",
  "Human Resources (HR)",
  "Sales & Business Development",
  "Supply Chain & Logistics",
  "Import/Export & Merchandising",
];
const CNIC_RE = /^\d{5}-\d{7}-\d$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CV_EXT = ["pdf", "doc", "docx"];
const MAX_CV = 5 * 1024 * 1024;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  // Honeypot: a real user never fills this. Pretend success and drop it.
  if (String(form.get("company_website") ?? "").trim() !== "") return json({ ok: true });

  // Turnstile
  const token = String(form.get("cf-turnstile-response") ?? "");
  if (!(await verifyTurnstile(token, req.headers.get("cf-connecting-ip")))) {
    return json({ error: "captcha" }, 400);
  }

  const g = (k: string) => String(form.get(k) ?? "").trim();
  const data = {
    full_name: g("full_name"),
    email: g("email"),
    phone: g("phone"),
    cnic: g("cnic"),
    program: g("program"),
    position: g("position"),
    university: g("university"),
    degree: g("degree"),
    year_or_grad: g("year"),
    gpa: g("gpa"),
    city: g("city"),
    availability: g("availability") || null,
    cover_note: g("cover_note") || null,
  };

  const errors: Record<string, string> = {};
  const required = ["full_name","email","phone","cnic","program","position","university","degree","year_or_grad","gpa","city"] as const;
  for (const k of required) if (!data[k as keyof typeof data]) errors[k] = "required";
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = "invalid";
  if (data.cnic && !CNIC_RE.test(data.cnic)) errors.cnic = "format";
  if (data.program && !PROGRAMS.includes(data.program)) errors.program = "invalid";
  if (data.position && !POSITIONS.includes(data.position)) errors.position = "invalid";

  const cv = form.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    errors.cv = "required";
  } else {
    const ext = cv.name.split(".").pop()?.toLowerCase() ?? "";
    if (!CV_EXT.includes(ext)) errors.cv = "type";
    else if (cv.size > MAX_CV) errors.cv = "size";
  }
  if (Object.keys(errors).length) return json({ error: "validation", fields: errors }, 400);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Upload CV first (path uses a pre-generated id so the row's cv_path is never null).
  const file = cv as File;
  const id = crypto.randomUUID();
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `applications/${id}/${safe}`;
  const up = await supabase.storage.from("cvs").upload(path, file, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (up.error) {
    console.error("cv upload failed", up.error);
    return json({ error: "server" }, 500);
  }

  const ins = await supabase
    .from("applications")
    .insert({ id, ...data, cv_path: path, user_agent: req.headers.get("user-agent") });
  if (ins.error) {
    console.error("insert failed", ins.error);
    return json({ error: "server" }, 500);
  }

  // Signed CV link for the internal email (7 days).
  const signed = await supabase.storage.from("cvs").createSignedUrl(path, 60 * 60 * 24 * 7);
  const cvLink = signed.data?.signedUrl ?? "";

  // Emails are best-effort: the application is already saved.
  try {
    await sendEmails(data, cvLink);
  } catch (e) {
    console.error("email failed", e);
  }

  return json({ ok: true });
});

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append("secret", Deno.env.get("TURNSTILE_SECRET_KEY")!);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const out = await r.json();
  return out.success === true;
}

async function sendEmails(
  d: { full_name: string; email: string; phone: string; cnic: string; program: string; position: string; university: string; degree: string; year_or_grad: string; gpa: string; city: string; availability: string | null; cover_note: string | null },
  cvLink: string,
): Promise<void> {
  const key = Deno.env.get("RESEND_API_KEY")!;
  const from = `Perception Impex HR <${Deno.env.get("HR_FROM") ?? "hr@perceptionimpex.com"}>`;
  const notifyTo = Deno.env.get("NOTIFY_TO") ?? "info@perceptionimpex.com";

  const send = (payload: unknown) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

  const rows = Object.entries({
    Name: d.full_name, Email: d.email, Phone: d.phone, CNIC: d.cnic,
    Program: d.program, Position: d.position, University: d.university,
    Degree: d.degree, "Year / Graduation": d.year_or_grad, GPA: d.gpa, City: d.city,
    Availability: d.availability ?? "-", "Cover note": d.cover_note ?? "-",
  })
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td style="padding:4px 0">${escapeHtml(String(v))}</td></tr>`)
    .join("");

  await send({
    from,
    to: notifyTo,
    reply_to: d.email,
    subject: `New application: ${d.position} — ${d.full_name}`,
    html: `<h2 style="font-family:sans-serif">New career application</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>${cvLink ? `<p style="font-family:sans-serif"><a href="${cvLink}">Download CV</a> (link valid 7 days)</p>` : `<p style="font-family:sans-serif">CV link unavailable; check the Supabase dashboard.</p>`}`,
  });

  await send({
    from,
    to: d.email,
    subject: "We've received your application",
    html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6"><p>Dear ${escapeHtml(d.full_name)},</p><p>Thank you for applying to the ${escapeHtml(d.program)} (${escapeHtml(d.position)}) at Perception Impex. We have received your application and our team will review it carefully. If you are shortlisted, we will reach out to you using the contact details you provided.</p><p>Warm regards,<br/>Perception Impex HR</p></div>`,
  });
}
```

- [ ] **Step 2: Type-check if possible**

Run (only if Deno is installed; the Supabase CLI bundles it): `deno check supabase/functions/submit-application/index.ts`
Expected: PASS, or skip if `deno` is unavailable (the file is excluded from the Next build; it is deployed and tested by the owner per `supabase/README.md`).

- [ ] **Step 3: Confirm the Next build still ignores `supabase/`**

Run: `npm run build`
Expected: PASS (proves the tsconfig exclude from Task 1 keeps the Deno file out of the Next type-check).

- [ ] **Step 4: Commit**

```bash
git add supabase/functions/submit-application/index.ts
git commit -m "Add submit-application Edge Function (Turnstile + validation + CV upload + emails)"
```

---

### Task 4: Rewrite `CareersForm` for file upload, CNIC, Turnstile, and the new endpoint

**Files:**
- Modify: `lib/content.ts` (swap the careers config exports)
- Modify: `components/sections/careers/CareersForm.tsx` (full rewrite)

**Interfaces:**
- Consumes: `careerApplicationFields`, `CAREERS_SUBMIT_URL`, `TURNSTILE_SITE_KEY`, `FormField` (Task 1).
- Produces: same exported signature `CareersForm({ selectedProgram, onProgramChange }: { selectedProgram: string; onProgramChange: (v: string) => void })`.

This task swaps the config AND rewrites the form in one commit so the build stays green (removing the Formspree exports and dropping their last consumer happen together).

- [ ] **Step 1: Swap the careers config in `lib/content.ts`**

Replace this block:

```ts
// Separate Formspree endpoint for applications (distinct from the quote form).
// Replace once the form is created at formspree.io. While empty, the
// application form falls back to a pre-filled WhatsApp message.
export const CAREERS_FORMSPREE_ID = "";
export const careersFormspreeAction = CAREERS_FORMSPREE_ID
  ? `https://formspree.io/f/${CAREERS_FORMSPREE_ID}`
  : "";
```

with:

```ts
// Careers application submission endpoint (Supabase Edge Function) and the
// public Cloudflare Turnstile site key. Both are filled once the owner's
// Supabase project and Turnstile widget exist. While CAREERS_SUBMIT_URL is
// empty, the form shows an "applications open soon" state (no WhatsApp).
export const CAREERS_SUBMIT_URL = "";
export const TURNSTILE_SITE_KEY = "";
```

- [ ] **Step 2: Replace the form file contents**

Overwrite `components/sections/careers/CareersForm.tsx` with:

```tsx
"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import {
  careerApplicationFields,
  CAREERS_SUBMIT_URL,
  TURNSTILE_SITE_KEY,
  type FormField,
} from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-lg border border-stone-200 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

// Format raw digits into the CNIC mask 00000-0000000-0 as the user types.
function formatCnic(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 13);
  if (d.length <= 5) return d;
  if (d.length <= 12) return `${d.slice(0, 5)}-${d.slice(5)}`;
  return `${d.slice(0, 5)}-${d.slice(5, 12)}-${d.slice(12)}`;
}

function FieldControl({
  field,
  selectedProgram,
  onProgramChange,
  cnic,
  onCnicChange,
}: {
  field: FormField;
  selectedProgram: string;
  onProgramChange: (v: string) => void;
  cnic: string;
  onCnicChange: (v: string) => void;
}) {
  const id = `cf-${field.name}`;
  const common = {
    id,
    name: field.name,
    required: field.required,
    autoComplete: field.autoComplete,
    "aria-required": field.required,
  };

  let control: React.ReactNode;
  if (field.type === "textarea") {
    control = <textarea {...common} rows={4} placeholder={field.placeholder} className={inputBase} />;
  } else if (field.type === "file") {
    control = (
      <input
        {...common}
        type="file"
        accept={field.accept}
        className="w-full rounded-lg border border-stone-200 bg-surface px-4 py-3 text-sm text-ink-soft file:mr-4 file:rounded-md file:border-0 file:bg-teal-500/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-teal-700 hover:file:bg-teal-500/20"
      />
    );
  } else if (field.type === "select") {
    const controlled = field.name === "program";
    control = (
      <select
        {...common}
        {...(controlled
          ? { value: selectedProgram, onChange: (e) => onProgramChange(e.target.value) }
          : { defaultValue: "" })}
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
    );
  } else if (field.name === "cnic") {
    control = (
      <input
        {...common}
        type="text"
        inputMode="numeric"
        placeholder={field.placeholder}
        value={cnic}
        onChange={(e) => onCnicChange(formatCnic(e.target.value))}
        pattern="\d{5}-\d{7}-\d"
        className={inputBase}
      />
    );
  } else {
    control = <input {...common} type={field.type} placeholder={field.placeholder} className={inputBase} />;
  }

  return (
    <div className={field.full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-soft">
        {field.label}
        {field.required && <span className="ml-0.5 text-teal-600">*</span>}
      </label>
      {control}
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
  const [cnic, setCnic] = useState("");
  const configured = Boolean(CAREERS_SUBMIT_URL);

  // Load the Turnstile script once (only when a site key is configured).
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    const cvInput = formEl.elements.namedItem("cv") as HTMLInputElement | null;
    const cv = cvInput?.files?.[0];
    if (cv) {
      const ext = cv.name.split(".").pop()?.toLowerCase() ?? "";
      if (!["pdf", "doc", "docx"].includes(ext)) {
        setErrorMsg("Your CV must be a PDF, DOC, or DOCX file.");
        setStatus("error");
        return;
      }
      if (cv.size > 5 * 1024 * 1024) {
        setErrorMsg("Your CV must be 5 MB or smaller.");
        setStatus("error");
        return;
      }
    }

    try {
      setStatus("submitting");
      const res = await fetch(CAREERS_SUBMIT_URL, { method: "POST", body: new FormData(formEl) });
      if (res.ok) {
        setStatus("success");
        formEl.reset();
        setCnic("");
        onProgramChange("");
      } else {
        const body = await res.json().catch(() => null);
        setErrorMsg(
          body?.error === "captcha"
            ? "Please complete the verification challenge and try again."
            : "Something went wrong. Please check your details and try again.",
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again in a moment.");
      setStatus("error");
    }
  }

  return (
    <section id="apply" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Apply Now"
          title="Send us your application"
          description="Fill in your details, attach your CV, and pick the program and position you want. We review every application and contact shortlisted candidates."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-stone-200 sm:p-8">
          {status === "success" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-500/10 text-teal-600">
                <Check className="h-8 w-8" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink">Application submitted successfully</h3>
              <p className="mt-3 max-w-sm text-ink-soft">
                Thank you. We have received your application and sent a confirmation to your email. Our
                team will review it and reach out if you are shortlisted.
              </p>
              <Button className="mt-8" variant="ghost" onClick={() => setStatus("idle")}>
                Submit another application
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                {careerApplicationFields.map((field) => (
                  <FieldControl
                    key={field.name}
                    field={field}
                    selectedProgram={selectedProgram}
                    onProgramChange={onProgramChange}
                    cnic={cnic}
                    onCnicChange={setCnic}
                  />
                ))}
              </div>

              {/* Honeypot: hidden from real users; bots that fill it are dropped server-side. */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              {TURNSTILE_SITE_KEY && (
                <div className="cf-turnstile mt-6" data-sitekey={TURNSTILE_SITE_KEY} />
              )}

              {status === "error" && (
                <p role="alert" aria-live="assertive" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMsg}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" disabled={!configured || status === "submitting"}>
                  {!configured
                    ? "Applications open soon"
                    : status === "submitting"
                      ? "Submitting…"
                      : "Submit Application"}
                </Button>
                <p className="text-xs text-ink-muted">
                  {configured
                    ? "We review applications during business hours, Mon to Sat."
                    : "Applications open soon. Please check back shortly."}
                </p>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Build and visual check**

Run: `npm run build`
Expected: PASS (no more references to `careersFormspreeAction`/`whatsappHref` anywhere; the swapped config + rewritten form land together).
Then `npm run dev`, open `/careers/`, confirm: the form shows a CNIC field that auto-masks to `00000-0000000-0`, a CV file picker, and a disabled "Applications open soon" submit button (since `CAREERS_SUBMIT_URL` is empty). No WhatsApp text anywhere.

- [ ] **Step 4: Commit**

```bash
git add lib/content.ts components/sections/careers/CareersForm.tsx
git commit -m "Rewrite careers form: CV upload, CNIC, Turnstile, honeypot, Supabase endpoint; remove WhatsApp"
```

---

### Task 5: CSP headers for Turnstile + Supabase

**Files:**
- Modify: `app/layout.tsx`
- Modify: `render.yaml`

**Interfaces:** none (header strings only).

- [ ] **Step 1: Update the CSP meta tag in `app/layout.tsx`**

Replace the `content` value of the production CSP meta tag:

```
default-src 'self'; base-uri 'self'; object-src 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io; upgrade-insecure-requests
```

with:

```
default-src 'self'; base-uri 'self'; object-src 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://formspree.io https://*.supabase.co https://challenges.cloudflare.com; form-action 'self' https://formspree.io; upgrade-insecure-requests
```

- [ ] **Step 2: Update the matching CSP value in `render.yaml`**

Find the `Content-Security-Policy` header value in `render.yaml` and apply the same three additions: `https://challenges.cloudflare.com` in `script-src`, a new `frame-src https://challenges.cloudflare.com`, and `https://*.supabase.co https://challenges.cloudflare.com` in `connect-src`. Keep all existing Formspree entries (the quote form still uses them).

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: PASS. Then confirm the emitted prod CSP includes the new origins:

```bash
grep -o "challenges.cloudflare.com" out/index.html | head -1
```

Expected: prints `challenges.cloudflare.com` (the meta tag is emitted in the static build only when `NODE_ENV=production`; if it does not appear in a dev-style build, verify by reading the meta string in `app/layout.tsx`).

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx render.yaml
git commit -m "CSP: allow Cloudflare Turnstile + Supabase for the careers form"
```

> Owner note (post-merge): re-paste the `render.yaml` CSP value into the Render dashboard (Settings → Headers) and verify with `curl -sLI -A "Mozilla/5.0" https://www.perceptionimpex.com/ | grep -i content-security-policy`.

---

### Task 6: Hero image swap + remove About banner

**Files:**
- Modify: `components/sections/HeroVisual.tsx`
- Modify: `components/sections/About.tsx`
- Delete: `public/images/yarn-warehouse.webp`

**Interfaces:** none.

- [ ] **Step 1: Swap the hero image**

In `components/sections/HeroVisual.tsx`, change the `<Image>` source and alt:

```tsx
          src="/images/yarn-warehouse.webp"
          alt="Rows of premium yarn cones in a spinning mill warehouse"
```

to:

```tsx
          src="/images/spinning-mills.webp"
          alt="Yarn spun on a production line at a partner spinning mill in Pakistan"
```

- [ ] **Step 2: Remove the spinning-mill banner from About**

In `components/sections/About.tsx`, delete the banner block added earlier (so the mill photo is not duplicated):

```tsx
        {/* Sourcing from partner spinning mills */}
        <Reveal className="mt-12 overflow-hidden rounded-2xl shadow-soft ring-1 ring-stone-200">
          <Image
            src="/images/spinning-mills.webp"
            alt="Yarn spun on a production line at a partner spinning mill in Pakistan"
            width={751}
            height={449}
            className="h-56 w-full object-cover sm:h-72 lg:h-80"
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
        </Reveal>

```

Then remove the now-unused `import Image from "next/image";` line at the top of `About.tsx` (it is no longer referenced).

- [ ] **Step 3: Delete the unused hero image and build**

```bash
git rm public/images/yarn-warehouse.webp
npm run build
```

Expected: build PASS. Confirm no remaining references:

```bash
grep -rn "yarn-warehouse" app components lib || echo "none"
```

Expected: `none`.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroVisual.tsx components/sections/About.tsx
git commit -m "Use spinning-mill photo for hero; remove duplicate About banner"
```

---

## Self-Review Notes

- **Spec coverage:** §3 architecture → Tasks 3+4. §4 data model → Task 2 (cv_path is NOT NULL; the function uploads-then-inserts with a pre-generated id, a justified refinement of spec §5's order so cv_path is never null). §5 flow → Task 3. §6 form (CNIC, CV upload, validation, honeypot, Turnstile, success, unconfigured, no WhatsApp) → Tasks 1+4. §7 emails → Task 3. §8 hero/About → Task 6. §9 owner setup → Task 2 README. §10 CSP → Task 5. All covered.
- **Type/name consistency:** form field names (`full_name`, `email`, `phone`, `cnic`, `program`, `position`, `university`, `degree`, `year`, `gpa`, `city`, `availability`, `cover_note`, `cv`, honeypot `company_website`, `cf-turnstile-response`) match between the form (Task 4) and the function's `g(...)`/`form.get(...)` reads (Task 3). Note the form field is named `year` and the DB column is `year_or_grad`; the function maps `year_or_grad: g("year")` — consistent. `CareersForm` keeps its `{ selectedProgram, onProgramChange }` signature so `CareersApply` is unchanged.
- **Build-green per task:** the Formspree config exports are removed in Task 4 (with the form rewrite), not Task 1, so every task ends with a clean `npm run build`. Task 1 only adds fields/types/FAQ and the tsconfig exclude; the old form keeps working until Task 4 replaces it.
- **No new site dependency** (browser uses `fetch`); Supabase/Resend code is Deno-only and excluded from the Next build via tsconfig (Task 1).
