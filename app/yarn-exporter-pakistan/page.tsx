import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingContact } from "@/components/FloatingContact";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { LandingHero } from "@/components/landing/LandingHero";
import { CtaBand } from "@/components/landing/CtaBand";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/landing/Jsonld";
import { productPages, strengths } from "@/lib/content";

export const metadata: Metadata = {
  title: "Yarn Exporter in Pakistan | Export to USA, UK & Canada",
  description:
    "Perception Impex is a yarn exporter in Pakistan, supplying cotton, PC, CVC and specialty yarn to manufacturers and importers in the USA, UK and Canada since 2000, sourced from leading spinning mills.",
  keywords: [
    "yarn exporter Pakistan",
    "yarn export from Pakistan",
    "cotton yarn exporter Pakistan",
    "export yarn USA UK Canada",
    "Pakistan yarn supplier export",
  ],
  alternates: { canonical: "/yarn-exporter-pakistan/" },
  openGraph: {
    type: "website",
    url: "https://www.perceptionimpex.com/yarn-exporter-pakistan/",
    title: "Yarn Exporter in Pakistan | Perception Impex",
    description:
      "Cotton, PC, CVC and specialty yarn exported from Pakistan to the USA, UK and Canada.",
    siteName: "Perception Impex",
  },
};

const markets = [
  {
    country: "United States",
    body: "The United States is one of the largest apparel import markets, and US manufacturers and importers source cotton and blended yarn from Pakistan for its quality and value. We supply cotton, PC, and CVC yarn for knitwear and garment programs, shipped with complete export documentation and dependable lead times.",
  },
  {
    country: "United Kingdom",
    body: "UK knitwear and home-textile buyers value consistent quality and reliable supply. We export combed and carded cotton yarn, along with specialty and dyed yarns, and handle the export paperwork and logistics so your orders arrive on schedule.",
  },
  {
    country: "Canada",
    body: "Canadian apparel manufacturers and importers source cotton and CVC yarn from Pakistan for premium knitwear and everyday garments. We provide consistent lots, competitive pricing, and dependable shipping schedules across the supply season.",
  },
];

const faqs = [
  {
    q: "Do you export yarn from Pakistan?",
    a: "Yes. We export cotton, PC, CVC, and specialty yarns from Pakistan to manufacturers and importers worldwide, including buyers in the United States, United Kingdom, and Canada.",
  },
  {
    q: "Do you handle export documentation and shipping?",
    a: "Yes. We arrange the export documentation and logistics needed to ship yarn from Pakistan to your destination port.",
  },
  {
    q: "What is your minimum export order?",
    a: "Our minimum order is 500 bags per month. We supply at volume for export programs and can discuss requirements based on yarn type and count.",
  },
  {
    q: "What payment terms do you offer for export orders?",
    a: "We offer flexible payment terms with 30, 60, and 90 day options, and can discuss terms suited to export trade.",
  },
];

const order = ["cotton-yarn", "pc-yarn", "cvc-yarn", "specialty-yarn"];

export default function Page() {
  const products = order.map((s) => productPages[s]);
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: "/" },
            { name: "Yarn Exporter in Pakistan", url: "/yarn-exporter-pakistan/" },
          ]}
        />
        <ServiceJsonLd
          name="Yarn exporter in Pakistan"
          description="Cotton, PC, CVC and specialty yarn exported from Pakistan to manufacturers and importers in the USA, UK and Canada since 2000."
          areaServed={["United States", "United Kingdom", "Canada", "Pakistan"]}
          url="/yarn-exporter-pakistan/"
        />
        <FaqJsonLd faqs={faqs} />

        <LandingHero
          breadcrumb={[{ name: "Home", href: "/" }, { name: "Yarn Exporter in Pakistan" }]}
          eyebrow="Export"
          h1="Yarn Exporter in Pakistan"
          intro="Perception Impex exports cotton, PC, CVC, and specialty yarn from Pakistan to manufacturers and importers worldwide. In the trade since 2000, we source from the country's leading spinning mills and ship with the documentation and reliability that international buyers expect."
        />

        {/* Export overview */}
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Export Capability"
              title="Pakistan-origin yarn, delivered worldwide"
              description="We combine direct mill sourcing with export experience, so international buyers get quality yarn at competitive prices, with dependable supply and documentation."
            />
            <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Pakistan is one of the world's major cotton and yarn producers, and Perception Impex
                has connected its mills with international buyers for over two decades. We supply at
                volume, match your specification, and keep export programs running on schedule.
              </p>
            </div>
          </Container>
        </section>

        {/* Markets */}
        <section className="bg-stone-50 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Markets We Serve"
              title="Exporting to the USA, UK, and Canada"
              description="We supply manufacturers and importers across these markets, with sourcing and logistics tailored to each."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {markets.map((m, i) => (
                <Reveal
                  key={m.country}
                  delay={(i % 3) * 80}
                  className="rounded-2xl bg-surface p-7 shadow-soft ring-1 ring-stone-200"
                >
                  <h3 className="font-display text-xl font-bold tracking-tight-display text-ink">{m.country}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.body}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* What we export */}
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Products"
              title="Yarn we export"
              description="Our full range is available for export programs."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p, i) => (
                <Reveal
                  as="article"
                  key={p.slug}
                  delay={(i % 4) * 70}
                  className="group rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-stone-200 transition hover:ring-teal-400"
                >
                  <a href={`/products/${p.slug}/`} className="block">
                    <h3 className="font-display text-lg font-bold tracking-tight-display text-ink group-hover:text-teal-700">
                      {p.name}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-teal-600">
                      View <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Why us */}
        <section className="bg-stone-50 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Why Perception Impex"
              title="Why importers source from us"
              description="An experienced export trading house with direct mill relationships and terms built for international trade."
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

        <LandingFaq title="Yarn export from Pakistan, answered" faqs={faqs} />

        <CtaBand
          title="Importing yarn from Pakistan?"
          body="Send your specification, quantity, and destination. We respond with availability, pricing, and export terms, Mon to Sat."
        />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
