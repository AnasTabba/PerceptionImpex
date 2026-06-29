import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { careerPositions, careerPrograms } from "@/lib/content";

function programLabel(ids: Array<"aspire" | "elevate">): string {
  return ids
    .map((id) => careerPrograms.find((p) => p.id === id)?.name)
    .filter(Boolean)
    .join("  ·  ");
}

export function Positions() {
  return (
    <section id="positions" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Open Positions"
          title="Departments hiring right now"
          description="Pick the area that fits your skills. Each department takes trainees through one or both of our programs."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-stone-200 ring-1 ring-stone-200 sm:grid-cols-2 lg:grid-cols-3">
          {careerPositions.map((pos, i) => (
            <Reveal
              as="div"
              key={pos.id}
              delay={(i % 3) * 70}
              className="group flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-teal-50"
            >
              <h3 className="font-display text-base font-bold tracking-tight-display text-ink">
                {pos.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pos.blurb}</p>
              <p className="mt-4 text-xs font-medium text-teal-700">{programLabel(pos.programIds)}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
