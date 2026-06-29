import { careerPositions, careerPrograms, CAREERS_POSTED_DATE, CAREERS_VALID_THROUGH } from "@/lib/content";

const SITE_URL = "https://www.perceptionimpex.com";

export function CareersJsonLd() {
  const postings = careerPositions.map((pos) => {
    const programs = pos.programIds
      .map((id) => careerPrograms.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    const employmentTypes = Array.from(new Set(programs.map((p) => p.employmentType)));
    // Emit a plain string when there is one type (Google's canonical JobPosting
    // shape); fall back to an array only when a role spans both programs.
    const employmentType =
      employmentTypes.length === 1 ? employmentTypes[0] : employmentTypes;
    const programNames = programs.map((p) => p.name).join(" and ");
    return {
      "@type": "JobPosting",
      title: `${pos.name}: ${programNames}`,
      description: `${pos.blurb} Apply through the ${programNames} at Perception Impex, a Pakistan-based yarn trading and sourcing company.`,
      datePosted: CAREERS_POSTED_DATE,
      validThrough: CAREERS_VALID_THROUGH,
      identifier: {
        "@type": "PropertyValue",
        name: "Perception Impex",
        value: `PI-${pos.id}`,
      },
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
