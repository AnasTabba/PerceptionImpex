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
