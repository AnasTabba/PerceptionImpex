import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icons";
import { strengths, productPages, type ProductPage } from "@/lib/content";
import { LandingHero } from "./LandingHero";
import { CtaBand } from "./CtaBand";
import { LandingFaq } from "./LandingFaq";

/** Full product landing page rendered from a ProductPage data entry. */
export function ProductLandingPage({ data }: { data: ProductPage }) {
  const related = data.related.map((s) => productPages[s]).filter(Boolean);
  const lower = data.name.toLowerCase();

  return (
    <>
      <LandingHero
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products/" },
          { name: data.name },
        ]}
        eyebrow={data.name}
        h1={data.h1}
        intro={data.intro}
        whatsappMessage={`Hello Perception Impex, I'm interested in sourcing ${lower}.`}
      />

      {/* Overview + image */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Overview" title={`Premium ${lower}, sourced at scale`} />
              <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
                {data.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <Reveal className="overflow-hidden rounded-2xl shadow-lift ring-1 ring-stone-200">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                width={data.image.w}
                height={data.image.h}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 540px, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Counts & specs */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Counts &amp; Specifications"
            title="The counts and qualities we supply"
            description="Need a count or quality not listed here? We can source it from our mill network."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {data.specGroups.map((g) => (
              <Reveal key={g.title} className="rounded-2xl bg-surface p-7 shadow-soft ring-1 ring-stone-200">
                <h3 className="font-display text-xl font-bold tracking-tight-display text-ink">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.counts.map((c) => (
                    <li key={c} className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-ink-soft">
                      <Check className="h-3.5 w-3.5 text-teal-600" /> {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-muted">{data.extraSpecNote}</p>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Applications"
            title={`Where our ${lower} is used`}
            description="From everyday production to export-quality garments, our yarn fits a wide range of manufacturing."
          />
          <ul className="mt-10 flex flex-wrap gap-3">
            {data.applications.map((a) => (
              <li key={a} className="rounded-full bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-700">
                {a}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why us */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why Perception Impex"
            title="A yarn partner you can rely on"
            description="An experienced trading house with decades of mill relationships and terms built for real production schedules."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-stone-200 ring-1 ring-stone-200 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.slice(0, 4).map((item, i) => (
              <Reveal
                as="div"
                key={item.title}
                delay={(i % 4) * 70}
                className="group flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-teal-50"
              >
                <span aria-hidden className="h-2.5 w-2.5 rounded-[3px] bg-teal-500" />
                <h3 className="mt-4 font-display text-base font-bold tracking-tight-display text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <LandingFaq title={`${data.name} questions, answered`} faqs={data.faqs} />

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-stone-50 py-16 sm:py-20">
          <Container>
            <SectionHeading eyebrow="More Yarn" title="Related products" />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/products/${r.slug}/`}
                  className="group rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-stone-200 transition hover:ring-teal-400"
                >
                  <h3 className="font-display text-lg font-bold tracking-tight-display text-ink group-hover:text-teal-700">
                    {r.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.intro}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-teal-600">View {r.name} →</span>
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title={`Need ${lower} for your next order?`}
        body="Share your count, quantity, and quality. We respond with availability and competitive pricing, Mon to Sat."
      />
    </>
  );
}
