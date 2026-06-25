import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { suppliers, clients, type Supplier, type Client } from "@/lib/content";

function LogoCard({ entry, index }: { entry: Supplier | Client; index: number }) {
  return (
    <Reveal
      as="div"
      delay={(index % 4) * 70}
      className="hover-lift group flex flex-col items-center justify-between gap-4 rounded-xl bg-surface p-5 shadow-soft ring-1 ring-stone-200 hover:shadow-lift hover:ring-teal-200"
    >
      <div className="flex h-16 w-full items-center justify-center">
        {entry.logo ? (
          <Image
            src={entry.logo.src}
            alt={entry.logo.alt}
            width={entry.logo.w}
            height={entry.logo.h}
            loading="lazy"
            className="max-h-14 w-auto max-w-[150px] object-contain transition-transform duration-300 ease-out-expo group-hover:scale-105"
          />
        ) : (
          <span className="text-center font-display text-lg font-bold tracking-tight-display text-ink-soft">
            {entry.name}
          </span>
        )}
      </div>
      <span className="text-center text-xs font-semibold uppercase tracking-wide-label text-ink-muted">
        {entry.name}
      </span>
    </Reveal>
  );
}

export function Partners() {
  return (
    <section id="partners" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        {/* Suppliers */}
        <SectionHeading
          eyebrow="Supplier Network"
          title="Sourced from Pakistan's leading mills"
          description="We maintain partnerships with approximately 15–20 spinning and textile mills to ensure supply continuity, quality, and product availability."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {suppliers.map((s, i) => (
            <LogoCard key={s.name} entry={s} index={i} />
          ))}
        </div>

        {/* Clients */}
        <div className="mt-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide-label text-teal-600">
              Our Clients
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight-display text-ink sm:text-3xl">
              Trusted by manufacturers &amp; exporters
            </h3>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {clients.map((c, i) => (
              <LogoCard key={c.name} entry={c} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
