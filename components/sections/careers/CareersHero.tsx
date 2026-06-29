import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { careerPrograms } from "@/lib/content";

export function CareersHero() {
  return (
    <section className="scroll-mt-24 bg-ink pt-28 pb-20 text-white sm:pt-36 sm:pb-28">
      <Container>
        <Reveal className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="accent-rule !h-px !w-7" aria-hidden />
            <p className="text-[0.7rem] font-semibold uppercase tracking-wide-label text-teal-300">
              Careers at Perception Impex
            </p>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight-display text-balance sm:text-5xl lg:text-6xl">
            Start your career in the textile trade
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 text-pretty">
            Two early-career programs at one of Pakistan&apos;s trusted yarn trading houses: the{" "}
            {careerPrograms[0].name} for students and the {careerPrograms[1].name} for fresh
            graduates. Learn the business from a team with 25+ years in the industry.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="#programs" variant="onDark">
              View Programs
            </Button>
            <Button as="a" href="#apply" variant="ghost" className="!text-white !ring-white/30 hover:!bg-white/10">
              Apply Now
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
