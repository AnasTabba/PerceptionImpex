import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Package } from "@/components/ui/Icons";
import { products, type Product } from "@/lib/content";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal
      as="article"
      delay={(index % 2) * 80}
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-stone-200 transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-teal-700">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            loading="lazy"
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          // Specialty yarns: no photo — branded panel with mark
          <div
            className="grid h-full w-full place-items-center"
            style={{
              background:
                "linear-gradient(135deg, #0A4D47 0%, #0F766E 55%, #2C8A7D 100%)",
            }}
          >
            <Package className="h-12 w-12 text-white/70" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold tracking-tight-display text-ink">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{product.blurb}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {product.applications.map((app) => (
            <li
              key={app}
              className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-ink-soft"
            >
              {app}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function Products() {
  return (
    <section id="products" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our Yarns"
            title="Quality yarn for every garment application"
            description="From everyday knitwear to export-quality specialty yarns, we source the right count and blend for your production line."
          />
          <Reveal delay={120} className="shrink-0">
            <Button as="a" href="#quote" variant="ghost">
              Request availability <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
