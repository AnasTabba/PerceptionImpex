import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section aria-label="Company at a glance" className="bg-teal-700 text-white">
      <Container className="py-14 sm:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal as="div" key={stat.label} delay={i * 80} className="text-center lg:text-left">
              <dd className="font-display text-[1.75rem] font-bold leading-none tracking-tight-display xs:text-3xl sm:text-4xl lg:text-5xl">
                <CountUp
                  end={stat.value}
                  prefix={"prefix" in stat ? (stat as { prefix?: string }).prefix : ""}
                  suffix={stat.suffix}
                />
              </dd>
              <dt className="mt-3 text-xs font-medium uppercase tracking-wide-label text-teal-100/90 sm:text-sm">
                {stat.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
