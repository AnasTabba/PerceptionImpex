# Careers Application Backend (Supabase) — Design Spec

**Date:** 2026-06-30
**Status:** Approved (pending written-spec review)

## 1. Goal

Replace the careers application form's unprofessional WhatsApp fallback with a proper,
owned submission pipeline: a real database the company controls, genuine CV file uploads,
server-side validation and anti-spam, an internal notification email, and a branded
acknowledgment email to the applicant. The public site remains a Next.js static export on
Render; all server logic lives in a Supabase Edge Function.

## 2. Constraints

- The site is a **static export** (`next.config.mjs`: `output: "export"`, Render `runtime: static`).
  There is no application server. All dynamic work happens in a Supabase Edge Function.
- Keep the **site bundle dependency-free** (only next/react/react-dom). The browser talks to the
  Edge Function with a plain `fetch`; the Supabase/Resend/Turnstile SDKs live only in the function.
- Keep copy/config in `lib/content.ts` per the project convention.
- Avoid em dashes in new body prose.

## 3. Architecture

```
Browser (static site)                Supabase Edge Function            External
─────────────────────                ──────────────────────           ────────
CareersForm  ──fetch(multipart)──▶   submit-application
  fields + CV file + Turnstile         1. verify Turnstile token ─────▶ Cloudflare siteverify
  token                                2. validate fields server-side
                                       3. upload CV ───────────────────▶ Supabase Storage (cvs)
                                       4. insert row ──────────────────▶ Postgres (applications)
                                       5. send 2 emails ───────────────▶ Resend
  ◀── { ok: true } / { error } ──────  6. return JSON
```

The Edge Function is the **only** trusted boundary. It holds every secret (service-role key,
Turnstile secret, Resend key) in its environment. It is deployed with `verify_jwt = false` so the
public form can call it without a Supabase session; abuse is controlled by Turnstile + honeypot +
server-side validation + Storage/DB write happening only inside the function (service role).

The browser knows only two **public** values (safe to ship in the bundle): the function URL and the
Turnstile **site** key. These live in `lib/content.ts`.

## 4. Data model

**Table `public.applications`** (created via SQL migration):

| column | type | notes |
|---|---|---|
| id | uuid pk default gen_random_uuid() | |
| created_at | timestamptz default now() | |
| full_name | text not null | |
| email | text not null | |
| phone | text not null | |
| cnic | text not null | stored normalized `00000-0000000-0` |
| program | text not null | one of the two program names |
| position | text not null | one of the six departments |
| university | text not null | |
| degree | text not null | |
| year_or_grad | text not null | |
| gpa | text not null | |
| city | text not null | |
| availability | text | nullable |
| cover_note | text | nullable |
| cv_path | text not null | path in the `cvs` Storage bucket |
| user_agent | text | nullable, for triage |

- **Row Level Security: ON**, with **no anon policies** (the table is written only by the Edge
  Function via the service-role key, which bypasses RLS). This means the public/anon key cannot
  read or write the table directly. The owner reads it via the Supabase dashboard.

**Storage bucket `cvs`**: **private** (not public). CVs are uploaded by the Edge Function
(service role). The owner downloads them from the dashboard or via short-lived signed URLs included
in the notification email. Object path: `applications/<application-id>/<sanitized-filename>`.

## 5. Submission flow (Edge Function `submit-application`)

1. Accept `POST multipart/form-data`. Reject other methods/content-types.
2. Read the honeypot field (`company_website`); if non-empty, return `{ ok: true }` silently
   (pretend success, drop the spam).
3. Verify the Turnstile token against `https://challenges.cloudflare.com/turnstile/v0/siteverify`
   with the secret key. On failure return `400 { error: "captcha" }`.
4. Validate every field server-side (see §6 rules). On failure return `400 { error, fields }`.
5. Validate the CV file: extension in {pdf, doc, docx}, MIME sniff, size ≤ 5 MB. Else `400`.
6. Insert the row (service role) to get the `id`.
7. Upload the CV to `cvs/applications/<id>/<filename>` (service role).
8. Update the row with `cv_path`.
9. Send two emails via Resend (see §7). Email failures are logged but do **not** fail the
   submission (the data is already saved); return `{ ok: true }` if the row is stored.
10. Return `{ ok: true }`.

Errors return a JSON `{ error }` with an appropriate status; the form surfaces a friendly message.

## 6. Form changes (`components/sections/careers/CareersForm.tsx` + `lib/content.ts`)

**Fields** (`careerApplicationFields`):
- **Add** `cnic` (text, required) and a **CV file upload** (`cv`, type file, required).
- **Remove** the old `cv_link` URL field.
- Keep: full_name, email, phone, program, position, university, degree, year, gpa, city,
  availability, cover_note.

**Validation rules** (client-side inline + re-checked in the function):
- full_name, university, degree, year, city: required, non-empty (trimmed).
- email: required, RFC-ish email regex.
- phone: required, digits/spaces/+/- , length 7–20.
- cnic: required, matches `^\d{5}-\d{7}-\d$` (auto-insert dashes as the user types).
- gpa: required, matches a number 0–4 (e.g. `3.4`) or `x/y` form (e.g. `3.4/4.0`).
- program, position: required, must equal one of the known options.
- cv: required, extension pdf/doc/docx, size ≤ 5 MB (checked before upload).
- availability, cover_note: optional.

**Anti-spam:**
- Invisible **honeypot** input `company_website` (visually hidden, `tabindex=-1`, `autocomplete=off`).
- **Cloudflare Turnstile** widget (script from `challenges.cloudflare.com`); the token is sent with
  the submission and verified in the function.

**Behavior:**
- Remove the WhatsApp fallback path and the `whatsappHref` usage entirely.
- On success: show a clean **"Application submitted successfully"** screen (we have received your
  application; we will be in touch).
- On error: inline error message with a retry; never silently fail.
- Submit posts `multipart/form-data` (so the CV file is included) via `fetch` to the function URL.
- **Unconfigured state:** while `CAREERS_SUBMIT_URL` is empty (during the build, before the owner's
  keys exist), the submit button is disabled and a small note reads "Applications open soon." There
  is no WhatsApp fallback. Once the URL and Turnstile site key are set, the form is fully live.

**Config (`lib/content.ts`):** replace `CAREERS_FORMSPREE_ID`/`careersFormspreeAction` with
`CAREERS_SUBMIT_URL` (the Edge Function URL) and `TURNSTILE_SITE_KEY` (public). Remove the now-dead
Formspree careers references. (The main quote form's Formspree config is untouched.)

## 7. Email workflow (Resend, inside the Edge Function)

Both emails are sent **from `hr@perceptionimpex.com`** (the single verified sender, display name
"Perception Impex HR"):
- **Internal notification** → to `info@perceptionimpex.com`. Subject:
  `New application: <position> — <full_name>`. Body: all fields + a short-lived signed download link
  to the CV. (Set `Reply-To` to the applicant so the team can reply directly.)
- **Applicant acknowledgment** → to the applicant's email. Subject:
  `We've received your application`. Branded body thanking them for applying to
  `<program> — <position>`, noting the team will review and reach out to shortlisted candidates.
  Plain, warm, no em dashes.

Resend requires the `perceptionimpex.com` domain to be **verified** (DNS records) so `hr@`/`info@`
can send. This is an owner setup step (§9).

## 8. Hero / About images

- **Hero** (`components/sections/HeroVisual.tsx`): swap `/images/yarn-warehouse.webp` →
  `/images/spinning-mills.webp` (the production-line photo). Update the `alt` to match. Delete the
  unused `yarn-warehouse.webp`.
- **About** (`components/sections/About.tsx`): remove the spinning-mill banner added earlier (it now
  lives in the hero), reverting About to heading + timeline + mission/vision so the photo is not
  duplicated. (If the owner later supplies a dedicated About image, it can be re-added.)

## 9. Owner setup (accounts, keys, DNS)

The implementer writes all code (form, Edge Function, SQL migration). The owner provides:

1. **Supabase** (free): create a project. Provide `SUPABASE_URL`, `SUPABASE_ANON_KEY` (public),
   `SUPABASE_SERVICE_ROLE_KEY` (secret). Run the SQL migration; create the private `cvs` bucket.
   Deploy the Edge Function and set its secrets.
2. **Cloudflare Turnstile** (free): create a widget for `perceptionimpex.com`. Provide the
   **site key** (public, goes in the site) and **secret key** (goes in the function env).
3. **Resend** (free): create an account, **verify `perceptionimpex.com`** by adding the DNS records
   Resend provides (DKIM/SPF). Provide the `RESEND_API_KEY` (function env).
4. **Hostinger**: create the `hr@perceptionimpex.com` alias/mailbox so applicant replies are received.
5. **Edge Function secrets** (set in Supabase): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `NOTIFY_TO=info@perceptionimpex.com`,
   `HR_FROM=hr@perceptionimpex.com`.
6. **Site public config** (the implementer puts these in `lib/content.ts` once known):
   `CAREERS_SUBMIT_URL` (function URL), `TURNSTILE_SITE_KEY`.

## 10. CSP / security headers (the HANDOFF §6 gotcha)

The strict CSP must be extended (in BOTH the `app/layout.tsx` prod meta tag AND `render.yaml`, then
re-pasted into the Render dashboard by the owner, then verified):
- `script-src`: add `https://challenges.cloudflare.com` (Turnstile script).
- `frame-src`: add `https://challenges.cloudflare.com` (Turnstile renders in an iframe).
- `connect-src`: add the Supabase function origin `https://<project-ref>.supabase.co` and
  `https://challenges.cloudflare.com`.
- `form-action`/`connect-src`: the old `https://formspree.io` for the careers path is no longer
  needed, but the main quote form may still use Formspree, so leave Formspree entries in place.

Other security notes:
- The anon key is public and safe; the service-role key is **only** in the Edge Function env, never
  in the site bundle.
- RLS on with no anon policies = the public cannot read applications.
- `cvs` bucket is private; CVs reachable only via dashboard or signed URLs.
- Turnstile secret verified server-side; honeypot drops basic bots before any work.
- Server-side validation is authoritative; client validation is UX only.

## 11. Out of scope

- An in-app admin/applicant-tracking UI (the Supabase dashboard is the admin for now; a `status`
  column is included to allow it later).
- Real CNIC identity verification (NADRA) — not available to a private web form; we validate
  **format** only.
- Email double-opt-in verification (the applicant acknowledgment is a courtesy, not a gate).
- Multi-language.

## 12. Verification / testing

- Gate: `npm run build` (type-check + static export) stays green. (No unit-test harness; see
  [[verification-gate]].)
- Edge Function: test locally with `supabase functions serve` using sample multipart payloads
  (valid, bad CNIC, oversized CV, failed captcha, honeypot filled) before deploy.
- Manual end-to-end once keys are in: submit a real application, confirm the row + CV in Supabase
  and both emails arrive.
- Confirm the live CSP allows Turnstile + the function (curl the header; check the widget renders).
