import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export function Hiring() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal className="flex flex-col items-start gap-5 rounded-2xl bg-ink px-7 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide-label text-teal-300">
              We&apos;re Hiring
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight-display text-balance sm:text-3xl">
              Internships and graduate roles are open
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
              Students and fresh graduates: build your career in the textile trade with our Aspire
              and Elevate programs.
            </p>
          </div>
          <Button as="a" href="/careers/" variant="onDark" size="lg" className="shrink-0">
            View Open Roles <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
