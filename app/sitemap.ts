import type { MetadataRoute } from "next";

const SITE_URL = "https://perceptionimpex.com";

export const dynamic = "force-static";

// Single-page site: the homepage plus its in-page section anchors are the
// crawlable surface. Listing the root is sufficient for search engines.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
