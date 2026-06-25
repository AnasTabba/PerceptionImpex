import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { company } from "@/lib/content";

const trustPoints = ["Cotton · PC · CVC", "15–20+ partner mills", "Export quality"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* Warm ambient background accents (gently drifting) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="animate-drift absolute -right-32 -top-40 h-[40rem] w-[40rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(15,118,110,0.12), transparent 62%)" }}
        />
        <div
          className="animate-drift absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,191,174,0.28), transparent 60%)", animationDelay: "-7s" }}
        />
      </div>

      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide-label text-teal-700 ring-1 ring-teal-100">
              Established {company.founded} · Pakistan
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="font-display text-[1.85rem] font-extrabold leading-[1.1] tracking-tight-display text-ink xs:text-4xl sm:text-5xl sm:leading-[1.04] lg:text-6xl">
              26 Years of <span className="text-teal-500">Trusted Yarn</span> Trading Excellence
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {company.heroSubline}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button as="a" href="#quote" variant="primary" size="lg">
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Button>
              <Button as="a" href="#products" variant="ghost" size="lg">
                Explore Products
              </Button>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-500/10 text-teal-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Image panel */}
        <Reveal delay={120} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift ring-1 ring-stone-200 sm:aspect-[5/5] lg:aspect-[4/5]">
            <Image
              src="/images/yarn-warehouse.webp"
              alt="Rows of premium yarn cones in a spinning mill warehouse"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(7,58,53,0) 45%, rgba(7,58,53,0.55) 100%)",
              }}
            />
          </div>

          {/* Floating heritage badge */}
          <div className="animate-float absolute -bottom-5 -left-3 rounded-xl bg-surface px-5 py-4 shadow-lift ring-1 ring-stone-200 sm:-left-5">
            <p className="font-display text-3xl font-extrabold leading-none text-teal-500">26+</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide-label text-ink-muted">
              Years Trading
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
