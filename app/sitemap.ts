import type { MetadataRoute } from "next";

const SITE_URL = "https://www.perceptionimpex.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    "/products/",
    "/products/cotton-yarn/",
    "/products/pc-yarn/",
    "/products/cvc-yarn/",
    "/products/specialty-yarn/",
    "/yarn-supplier-karachi/",
    "/yarn-exporter-pakistan/",
  ];
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/careers/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...pages.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
