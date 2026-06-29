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

  if (!key) {
    console.error("RESEND_API_KEY is not set; skipping emails");
    return;
  }
  const send = async (payload: unknown) => {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error("resend send failed", r.status, await r.text());
    return r;
  };

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
