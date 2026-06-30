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
import { productPages, strengths, contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Yarn Supplier in Karachi, Pakistan",
  description:
    "Perception Impex is a Karachi-based yarn supplier, dealer and exporter since 2000. Cotton, PC, CVC and specialty yarn sourced from Pakistan's leading spinning mills, supplied to manufacturers across Karachi and Pakistan.",
  keywords: [
    "yarn supplier Karachi",
    "yarn dealer Karachi",
    "yarn supplier in Karachi Pakistan",
    "cotton yarn Karachi",
    "yarn trader Karachi",
  ],
  alternates: { canonical: "/yarn-supplier-karachi/" },
  openGraph: {
    type: "website",
    url: "https://www.perceptionimpex.com/yarn-supplier-karachi/",
    title: "Yarn Supplier in Karachi, Pakistan | Perception Impex",
    description:
      "Karachi-based yarn supplier since 2000. Cotton, PC, CVC and specialty yarn from leading spinning mills.",
    siteName: "Perception Impex",
  },
};

const faqs = [
  {
    q: "Are you a yarn supplier in Karachi?",
    a: "Yes. Perception Impex is based in Karachi and has supplied yarn to manufacturers and exporters since 2000. We source cotton, PC, CVC, and specialty yarns from Pakistan's leading spinning mills.",
  },
  {
    q: "What is your minimum order quantity?",
    a: "Our minimum order is 500 bags per month. We supply at volume and can discuss requirements based on yarn type and count.",
  },
  {
    q: "What payment terms do you offer?",
    a: "We offer flexible payment terms with 30, 60, and 90 day options to suit your cash flow.",
  },
  {
    q: "Do you deliver yarn within Karachi and across Pakistan?",
    a: "Yes. We arrange dependable delivery to manufacturers in Karachi and across Pakistan, with reliable schedules and supply continuity.",
  },
];

const order = ["cotton-yarn", "pc-yarn", "cvc-yarn", "specialty-yarn"];

const stats = [
  { value: "Since 2000", label: "Trading in Karachi" },
  { value: "500 bags", label: "Minimum order / month" },
  { value: "30 / 60 / 90", label: "Day payment terms" },
];

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
            { name: "Yarn Supplier in Karachi", url: "/yarn-supplier-karachi/" },
          ]}
        />
        <ServiceJsonLd
          name="Yarn supplier in Karachi, Pakistan"
          description="Cotton, PC, CVC and specialty yarn supplied to manufacturers and exporters in Karachi and across Pakistan since 2000."
          areaServed={["Karachi", "Pakistan"]}
          url="/yarn-supplier-karachi/"
        />
        <FaqJsonLd faqs={faqs} />

        <LandingHero
          breadcrumb={[{ name: "Home", href: "/" }, { name: "Yarn Supplier in Karachi" }]}
          eyebrow="Karachi, Pakistan"
          h1="Yarn Supplier in Karachi, Pakistan"
          intro="Perception Impex is a Karachi-based yarn supplier, dealer, and exporter, in business since 2000. We supply cotton, PC, CVC, and specialty yarns to manufacturers and exporters in Karachi and across Pakistan, sourced directly from the country's leading spinning mills."
        />

        {/* Local supply */}
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Local Supply"
              title="Your yarn partner in Karachi"
              description="As a Karachi trading house with direct mill relationships, we keep local manufacturers supplied with the right yarn, at the right price, on dependable schedules."
            />
            <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Karachi is the heart of Pakistan's textile trade, and we have worked within it for
                more than two decades. That means quick sourcing, competitive local pricing, and a
                team that understands the needs of manufacturers and exporters here.
              </p>
              <p>
                Whether you run a knitting unit, a weaving mill, or a garment export business, we
                supply consistent, specification-matched yarn order after order, backed by flexible
                payment terms and reliable delivery.
              </p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-stone-200 ring-1 ring-stone-200 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-surface p-7 text-center">
                  <p className="font-display text-2xl font-bold tracking-tight-display text-teal-600">{s.value}</p>
                  <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Yarns we supply */}
        <section className="bg-stone-50 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Products"
              title="Yarns we supply in Karachi"
              description="Our full range, available to Karachi and Pakistan-wide buyers."
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

        {/* Why local buyers choose us */}
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Why Perception Impex"
              title="Why Karachi buyers source from us"
              description="An experienced local trading house with decades of mill relationships and terms built for real production schedules."
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

        <LandingFaq title="Yarn supply in Karachi, answered" faqs={faqs} />

        <CtaBand
          title="Need a yarn supplier in Karachi?"
          body={`Reach us at ${contact.phone}, or send your requirement for a quote. We respond Mon to Sat.`}
        />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
