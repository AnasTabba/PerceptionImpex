import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { strengths } from "@/lib/content";

export function Strengths() {
  return (
    <section id="why" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Perception Impex"
          title="A trading partner manufacturers rely on"
          description="Not a small broker, but an experienced trading house with decades of mill relationships, dependable supply, and terms built for real production schedules."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-stone-200 ring-1 ring-stone-200 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, i) => (
            <Reveal
              as="div"
              key={item.title}
              delay={(i % 4) * 70}
              className="group flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-teal-50"
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-[3px] bg-teal-500 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110"
              />
              <h3 className="mt-4 font-display text-base font-bold tracking-tight-display text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
