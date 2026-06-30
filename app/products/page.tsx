import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingContact } from "@/components/FloatingContact";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { LandingHero } from "@/components/landing/LandingHero";
import { CtaBand } from "@/components/landing/CtaBand";
import { BreadcrumbJsonLd } from "@/components/landing/Jsonld";
import { productPages, yarnCatalog } from "@/lib/content";

export const metadata: Metadata = {
  title: "Yarn Products & Range | Cotton, PC, CVC & Specialty Yarn",
  description:
    "Explore the Perception Impex yarn range: cotton, PC, CVC, and specialty yarns sourced from Pakistan's leading spinning mills. Carded, combed, dyed and custom yarn for manufacturers and exporters.",
  alternates: { canonical: "/products/" },
  openGraph: {
    type: "website",
    url: "https://www.perceptionimpex.com/products/",
    title: "Yarn Products & Range | Perception Impex",
    description:
      "Cotton, PC, CVC, and specialty yarns sourced from Pakistan's leading spinning mills.",
    siteName: "Perception Impex",
  },
};

const order = ["cotton-yarn", "pc-yarn", "cvc-yarn", "specialty-yarn"];

export default function Page() {
  const products = order.map((s) => productPages[s]);
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Products", url: "/products/" }]} />
        <LandingHero
          breadcrumb={[{ name: "Home", href: "/" }, { name: "Products" }]}
          eyebrow="Our Yarn Products"
          h1="Our Yarn Products & Range"
          intro="From cotton and blended yarns to dyed and specialty yarns, Perception Impex sources the full range from Pakistan's leading spinning mills. Explore our products below, or send us your requirement for a quote."
        />

        {/* Product grid */}
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Products"
              title="The yarns we supply"
              description="Four core product families, each available across a wide count and quality range."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {products.map((p, i) => (
                <Reveal
                  as="article"
                  key={p.slug}
                  delay={(i % 2) * 80}
                  className="group flex overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-stone-200 transition hover:ring-teal-400"
                >
                  <div className="relative w-32 shrink-0 sm:w-44">
                    <Image src={p.image.src} alt={p.image.alt} fill className="object-cover" sizes="180px" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold tracking-tight-display text-ink group-hover:text-teal-700">
                      {p.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft line-clamp-3">{p.intro}</p>
                    <a
                      href={`/products/${p.slug}/`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600"
                    >
                      View {p.name} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Full yarn range */}
        <section className="bg-stone-50 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Full Range"
              title="The complete yarn catalog"
              description="Across these product families we source a wide range of yarn types and counts."
            />
            <ul className="mt-10 flex flex-wrap gap-3">
              {yarnCatalog.map((c) => (
                <li key={c.name} className="rounded-full bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-700">
                  {c.name}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button as="a" href="/#yarn-range" variant="ghost">
                See full yarn range <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Container>
        </section>

        <CtaBand
          title="Looking for a specific yarn?"
          body="Tell us the type, count, and quantity you need. We respond with availability and competitive pricing, Mon to Sat."
        />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
