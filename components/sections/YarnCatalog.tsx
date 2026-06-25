import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { yarnCatalog, type YarnCategory } from "@/lib/content";

function CatalogCard({ cat, index }: { cat: YarnCategory; index: number }) {
  return (
    <Reveal
      as="article"
      delay={(index % 3) * 70}
      className="hover-lift flex flex-col rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-stone-200 hover:shadow-lift hover:ring-teal-200"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-display text-sm font-bold text-teal-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-lg font-bold tracking-tight-display text-ink">
          {cat.name}
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{cat.desc}</p>

      {cat.counts && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {cat.counts.map((c) => (
            <li
              key={c}
              className="tabular rounded-md bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 ring-1 ring-teal-100"
            >
              {c}
            </li>
          ))}
        </ul>
      )}

      {cat.specs && (
        <dl className="mt-4 divide-y divide-stone-100 border-t border-stone-100">
          {cat.specs.map((s) => (
            <div key={s.label} className="flex gap-3 py-2.5">
              <dt className="w-16 shrink-0 text-xs font-semibold uppercase tracking-wide-label text-teal-600">
                {s.label}
              </dt>
              <dd className="text-sm text-ink-soft">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Reveal>
  );
}

export function YarnCatalog() {
  return (
    <section id="yarn-range" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Yarn Range"
          title="The complete yarn range we supply"
          description="Yarn is all we do. From coarse to fine counts, carded to combed, plied to core-spun, and package-dyed to gassed mercerized — we source the full spectrum for knitting, weaving, towels, socks, and crochet."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {yarnCatalog.map((cat, i) => (
            <CatalogCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="text-sm italic leading-relaxed text-ink-muted">
            Representative range — counts, plies, and blends are sourced to requirement from our
            mill network. Specifications can vary by order and availability.
          </p>
        </Reveal>

        {/* Custom-count note + CTA */}
        <Reveal className="mt-10">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-ink p-7 text-white sm:flex-row sm:items-center sm:p-8">
            <p className="max-w-2xl text-base leading-relaxed text-white/85">
              Need a specific count, blend, or dyed shade? We source custom requirements and
              export-quality yarn to your exact specification.
            </p>
            <Button as="a" href="#quote" variant="onDark" className="shrink-0">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
