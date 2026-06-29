import { careerPositions, careerPrograms, CAREERS_POSTED_DATE } from "@/lib/content";

const SITE_URL = "https://www.perceptionimpex.com";

export function CareersJsonLd() {
  const postings = careerPositions.map((pos) => {
    const programs = pos.programIds
      .map((id) => careerPrograms.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    const employmentType = Array.from(new Set(programs.map((p) => p.employmentType)));
    const programNames = programs.map((p) => p.name).join(" and ");
    return {
      "@type": "JobPosting",
      title: `${pos.name} — ${programNames}`,
      description: `${pos.blurb} Apply through the ${programNames} at Perception Impex, a Pakistan-based yarn trading and sourcing company.`,
      datePosted: CAREERS_POSTED_DATE,
      employmentType,
      hiringOrganization: {
        "@type": "Organization",
        name: "Perception Impex",
        sameAs: SITE_URL,
        logo: `${SITE_URL}/images/logo.webp`,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
      },
      directApply: true,
    };
  });

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": postings,
        }),
      }}
    />
  );
}
