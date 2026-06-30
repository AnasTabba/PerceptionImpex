import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { whatsappHref } from "@/lib/content";

type Crumb = { name: string; href?: string };

/** Dark landing hero: breadcrumb + eyebrow + H1 + intro + quote/WhatsApp CTAs. */
export function LandingHero({
  breadcrumb,
  eyebrow,
  h1,
  intro,
  whatsappMessage = "Hello Perception Impex, I'd like to discuss a yarn requirement.",
}: {
  breadcrumb: Crumb[];
  eyebrow: string;
  h1: string;
  intro: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="bg-ink pt-28 pb-20 text-white sm:pt-36 sm:pb-24">
      <Container>
        <Reveal className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumb.map((c, i) => (
                <li key={c.name} className="flex items-center gap-2">
                  {c.href ? (
                    <a href={c.href} className="hover:text-white">{c.name}</a>
                  ) : (
                    <span className="text-white/80">{c.name}</span>
                  )}
                  {i < breadcrumb.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
          <div className="mb-4 flex items-center gap-3">
            <span className="accent-rule !h-px !w-7" aria-hidden />
            <p className="text-[0.7rem] font-semibold uppercase tracking-wide-label text-teal-300">
              {eyebrow}
            </p>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight-display text-balance sm:text-5xl lg:text-6xl">
            {h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 text-pretty">{intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="/#quote" variant="onDark">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as="a"
              href={whatsappHref(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="!text-white !ring-white/30 hover:!bg-white/10"
            >
              <WhatsApp className="h-5 w-5" /> WhatsApp Us
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
