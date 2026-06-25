import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Yarn sourcing questions, answered"
          description="Common questions from manufacturers, exporters, and international buyers sourcing yarn from Pakistan."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((f, i) => (
            <Reveal as="div" key={f.q} delay={(i % 3) * 60}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold tracking-tight-display text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-500/10 text-teal-600 transition-transform duration-300 ease-out-expo group-open:rotate-45"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-base leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
