"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Check, WhatsApp, Mail, Phone, Clock, Package, MapPin } from "@/components/ui/Icons";
import {
  quoteFields,
  contact,
  formspreeAction,
  whatsappHref,
  gmailHref,
  type FormField,
} from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-lg border border-stone-200 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

function FieldControl({ field }: { field: FormField }) {
  const id = `qf-${field.name}`;
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
      ) : (
        <input
          {...common}
          type={field.type}
          placeholder={field.placeholder}
          className={inputBase}
        />
      )}
    </div>
  );
}

export function Quote() {
  const formRef = useRef<HTMLFormElement>(null);
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
    if (!formspreeAction) {
      const lines = quoteFields
        .map((f) => {
          const v = data.get(f.name);
          return v ? `${f.label}: ${v}` : null;
        })
        .filter(Boolean)
        .join("\n");
      const message = `New yarn quote request:\n\n${lines}`;
      window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
      setStatus("success");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch(formspreeAction, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
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
    <section id="quote" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: info */}
          <div>
            <SectionHeading
              eyebrow="Request a Quote"
              title="Let's discuss your yarn requirement"
              description="Share your specification and we'll respond with availability and competitive pricing. Prefer to talk now? Reach us on WhatsApp or email."
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as="a" href={whatsappHref()} target="_blank" rel="noopener noreferrer" variant="primary">
                <WhatsApp className="h-5 w-5" /> WhatsApp Us
              </Button>
              <Button
                as="a"
                href={gmailHref()}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                <Mail className="h-5 w-5" /> Email Us
              </Button>
            </div>

            <dl className="mt-10 space-y-5">
              <ContactRow icon={<Phone className="h-5 w-5" />} label="Phone / WhatsApp" value={contact.phone} href={contact.phoneHref} />
              <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value={contact.email} href={gmailHref()} />
              <ContactRow icon={<Clock className="h-5 w-5" />} label="Business Hours" value={contact.hours} />
              <ContactRow icon={<Package className="h-5 w-5" />} label="Minimum Order" value={contact.moq} />
              <ContactRow icon={<MapPin className="h-5 w-5" />} label="Payment Terms" value={contact.paymentTerms} />
            </dl>
          </div>

          {/* Right: form / success */}
          <div className="rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-stone-200 sm:p-8">
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-500/10 text-teal-600">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink">Thank you</h3>
                <p className="mt-3 max-w-sm text-ink-soft">
                  {formspreeAction
                    ? "Your request has been received. Our team will get back to you with availability and pricing shortly."
                    : "Your details have been prepared in WhatsApp — send the message to reach our team directly."}
                </p>
                <Button className="mt-8" variant="ghost" onClick={() => setStatus("idle")}>
                  Submit another request
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  {quoteFields.map((field) => (
                    <FieldControl key={field.name} field={field} />
                  ))}
                </div>

                {status === "error" && (
                  <p role="alert" aria-live="assertive" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending…" : "Send Request"}
                  </Button>
                  <p className="text-xs text-ink-muted">
                    We respond during business hours, Mon–Sat.
                  </p>
                </div>

                {!formspreeAction && (
                  <p className="mt-4 text-xs text-ink-muted">
                    Note: connect a Formspree form ID to receive submissions by email. Until then,
                    sending opens a pre-filled WhatsApp message with your details.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const external = href?.startsWith("http");
  const valueEl = href ? (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="font-medium text-ink transition-colors hover:text-teal-600"
    >
      {value}
    </a>
  ) : (
    <span className="font-medium text-ink">{value}</span>
  );
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-500/10 text-teal-600">
        {icon}
      </span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide-label text-ink-muted">{label}</dt>
        <dd className="mt-0.5">{valueEl}</dd>
      </div>
    </div>
  );
}
