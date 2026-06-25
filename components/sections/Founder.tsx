import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { founder, company } from "@/lib/content";

export function Founder() {
  return (
    <section id="founder" className="scroll-mt-24 bg-stone-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Founder & Legacy"
          title="A vision built on trust"
          description="Decades of industry knowledge, relationships, and integrity — guiding Perception Impex since the beginning."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Founder identity card */}
          <Reveal>
            <div className="hover-lift relative overflow-hidden rounded-2xl bg-teal-700 p-8 text-white shadow-soft hover:shadow-lift sm:p-10">
              {/* decorative drifting glow */}
              <div
                aria-hidden
                className="animate-drift pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 65%)" }}
              />
              <div className="relative">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-white/10 font-display text-2xl font-extrabold tracking-tight-display ring-1 ring-white/20">
                  {founder.initials}
                </span>
                <h3 className="mt-7 font-display text-2xl font-bold tracking-tight-display sm:text-3xl">
                  {founder.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide-label text-teal-100">
                  {founder.role} · Since {founder.since}
                </p>
                <div className="mt-8 border-t border-white/15 pt-6">
                  <p className="text-lg italic leading-relaxed text-white/85">
                    “Built on trust, consistency, and lasting industry relationships.”
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Narrative */}
          <div className="relative">
            {/* large quote mark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-10 font-display text-[7rem] leading-none text-teal-500/15"
            >
              &ldquo;
            </span>
            <div className="relative space-y-5">
              {founder.paragraphs.map((p, i) => (
                <Reveal as="div" key={i} delay={i * 90}>
                  <p
                    className={
                      i === 0
                        ? "text-lg font-medium leading-relaxed text-ink sm:text-xl"
                        : "leading-relaxed text-ink-soft"
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={founder.paragraphs.length * 90}>
                <p className="pt-2 font-display text-xl font-bold tracking-tight-display text-teal-600">
                  {founder.name}
                  <span className="ml-2 align-middle text-sm font-semibold uppercase tracking-wide-label text-ink-muted">
                    — {company.name}
                  </span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
