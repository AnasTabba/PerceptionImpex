import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { suppliers, clients } from "@/lib/content";

export function Partners() {
  return (
    <section id="partners" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Supplier Network"
          title="Sourced from Pakistan's leading mills"
          description="We maintain partnerships with approximately 15–20 spinning and textile mills to ensure supply continuity, quality, and product availability."
        />

        {/* Supplier logos — normalized uniform cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {suppliers.map((s, i) => (
            <Reveal
              as="div"
              key={s.name}
              delay={(i % 4) * 70}
              className="flex h-28 items-center justify-center rounded-xl bg-surface px-6 shadow-soft ring-1 ring-stone-200"
            >
              {s.logo ? (
                <Image
                  src={s.logo.src}
                  alt={s.logo.alt}
                  width={s.logo.w}
                  height={s.logo.h}
                  loading="lazy"
                  className="max-h-12 w-auto max-w-[140px] object-contain"
                />
              ) : (
                <span className="text-center font-display text-base font-bold tracking-tight-display text-ink-soft">
                  {s.name}
                </span>
              )}
            </Reveal>
          ))}
        </div>

        {/* Client references */}
        <Reveal className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-wide-label text-ink-muted">
            Trusted by manufacturers &amp; exporters
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {clients.map((c) => (
              <li
                key={c}
                className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink-soft ring-1 ring-stone-200"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
