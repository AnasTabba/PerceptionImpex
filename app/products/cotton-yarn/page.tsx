import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingContact } from "@/components/FloatingContact";
import { ProductLandingPage } from "@/components/landing/ProductLandingPage";
import { BreadcrumbJsonLd, FaqJsonLd, ProductJsonLd } from "@/components/landing/Jsonld";
import { productPages } from "@/lib/content";

const data = productPages["cotton-yarn"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: { canonical: `/products/${data.slug}/` },
  openGraph: {
    type: "website",
    url: `https://www.perceptionimpex.com/products/${data.slug}/`,
    title: data.metaTitle,
    description: data.metaDescription,
    siteName: "Perception Impex",
  },
};

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/" },
            { name: data.name, url: `/products/${data.slug}/` },
          ]}
        />
        <ProductJsonLd data={data} />
        <FaqJsonLd faqs={data.faqs} />
        <ProductLandingPage data={data} />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
