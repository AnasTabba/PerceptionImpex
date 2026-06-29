import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { careerPrograms, careerPositions } from "@/lib/content";

export function ProgramCards({ onApply }: { onApply: (programName: string) => void }) {
  return (
    <section id="programs" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Programs"
          title="Two ways to join us"
          description="Whether you are still studying or fresh out of university, there is a track built for where you are."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {careerPrograms.map((p, i) => {
            const depts = careerPositions.filter((pos) => pos.programIds.includes(p.id));
            return (
              <Reveal
                as="div"
                key={p.id}
                delay={i * 80}
                className="flex flex-col rounded-2xl bg-surface p-7 shadow-soft ring-1 ring-stone-200 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wide-label text-teal-700">
                  {p.employmentType === "INTERN" ? "Internship" : "Graduate Program"}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight-display text-ink">
                  {p.name}
                </h3>
                <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-ink-muted">Who</dt>
                    <dd className="mt-0.5 text-ink-soft">{p.audience}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-muted">Duration</dt>
                    <dd className="mt-0.5 text-ink-soft">{p.duration}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">{p.blurb}</p>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide-label text-ink-muted">
                    Open departments
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {depts.map((d) => (
                      <li
                        key={d.id}
                        className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-700"
                      >
                        {d.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-2">
                  <Button onClick={() => onApply(p.name)} variant="primary">
                    Apply for this program <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
