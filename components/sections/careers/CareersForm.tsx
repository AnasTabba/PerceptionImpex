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
