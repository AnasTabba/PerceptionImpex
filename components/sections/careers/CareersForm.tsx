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
