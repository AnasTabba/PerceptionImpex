import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { company, timeline } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Story"
          title="26 years of trusted relationships"
          description={company.overview}
        />

        {/* Timeline */}
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((item, i) => (
            <Reveal as="li" key={item.year} delay={i * 80} className="relative">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-500 ring-4 ring-teal-500/15" />
                <span className="font-display text-2xl font-extrabold tracking-tight-display text-teal-600">
                  {item.year}
                </span>
              </div>
              <div className="mt-4 border-t border-stone-200 pt-4">
                <h3 className="font-display text-base font-bold tracking-tight-display text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Mission & Vision */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal as="div" className="rounded-2xl bg-surface p-8 shadow-soft ring-1 ring-stone-200">
            <h3 className="text-xs font-semibold uppercase tracking-wide-label text-teal-600">
              Our Mission
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{company.mission}</p>
          </Reveal>
          <Reveal as="div" delay={100} className="rounded-2xl bg-ink p-8 text-white shadow-soft">
            <h3 className="text-xs font-semibold uppercase tracking-wide-label text-teal-300">
              Our Vision
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{company.vision}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
