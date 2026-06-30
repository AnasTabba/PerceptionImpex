import type { ProductPage } from "@/lib/content";

const SITE_URL = "https://www.perceptionimpex.com";

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${SITE_URL}${it.url}`,
          })),
        }),
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      }}
    />
  );
}

export function ProductJsonLd({ data }: { data: ProductPage }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: data.name,
          description: data.metaDescription,
          category: "Yarn",
          image: `${SITE_URL}${data.image.src}`,
          brand: { "@type": "Brand", name: "Perception Impex" },
          url: `${SITE_URL}/products/${data.slug}/`,
        }),
      }}
    />
  );
}

/** Generic Service schema for the local/export landing pages. */
export function ServiceJsonLd({
  name,
  description,
  areaServed,
  url,
}: {
  name: string;
  description: string;
  areaServed: string[];
  url: string;
}) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Yarn supply and sourcing",
          name,
          description,
          areaServed,
          provider: { "@type": "Organization", name: "Perception Impex", url: SITE_URL },
          url: `${SITE_URL}${url}`,
        }),
      }}
    />
  );
}
