// Central content model for Perception Impex.
// All copy sourced from info.md so the site stays single-source-of-truth.

export const company = {
  name: "Perception Impex",
  shortName: "Perception Impex",
  tagline: "Connecting Quality Yarn with Global Manufacturing Excellence",
  founded: 2000,
  yearsLabel: "25+ Years",
  founder: "Muhammad Basheer Tabba",
  heroHeadline: "25+ Years of Trusted Yarn Trading Excellence",
  heroSubline:
    "Supplying high-quality cotton, PC, CVC, and specialty yarns through strong relationships with Pakistan's leading spinning mills. Trusted by manufacturers and exporters since 2000.",
  overview:
    "Perception Impex is one of Pakistan's trusted yarn suppliers and dealers, a yarn trading and sourcing company established in 2000. For over 25 years we have built strong relationships with Pakistan's leading spinning and textile mills, enabling manufacturers and exporters to secure high-quality yarn at competitive rates with reliable delivery schedules.",
  mission:
    "To provide textile manufacturers with reliable access to high-quality yarn through strong supplier relationships, competitive pricing, transparent business practices, and dependable service.",
  vision:
    "To become one of the most trusted yarn sourcing and trading partners for textile manufacturers across Pakistan and international markets.",
};

export const contact = {
  email: "info@perceptionimpex.com",
  phone: "+92-300-8209877",
  phoneHref: "tel:+923008209877",
  whatsappNumber: "923008209877", // E.164 without + for wa.me
  whatsappMessage:
    "Hello Perception Impex, I'm interested in sourcing yarn and would like to discuss requirements.",
  hours: "Monday – Saturday, 9:00 AM – 7:00 PM",
  domain: "perceptionimpex.com",
  moq: "500 Bags Per Month",
  paymentTerms: "30 / 60 / 90 Day Options",
};

export function whatsappHref(message: string = contact.whatsappMessage): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(
  subject = "Yarn Sourcing Inquiry",
  body = "",
): string {
  // Encode with %20 (not URLSearchParams' "+") for maximum mail-client compatibility.
  const parts = [`subject=${encodeURIComponent(subject)}`];
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${contact.email}?${parts.join("&")}`;
}

// Opens the Gmail web compose window pre-addressed to us (new tab).
// Reliable for visitors who use Gmail in the browser, with no OS mail-app needed.
export function gmailHref(
  subject = "Yarn Sourcing Inquiry",
  body = "",
): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: contact.email,
    su: subject,
  });
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const stats = [
  { value: 25, suffix: "+", label: "Years in Business" },
  { value: 1, prefix: "PKR ", suffix: "B+", label: "Annual Trade Volume" },
  { value: 15, suffix: "–20+", label: "Partner Mills" },
  { value: 5, suffix: "+", label: "Countries Served" },
] as const;

export type Product = {
  id: string;
  name: string;
  blurb: string;
  applications: string[];
  image?: { src: string; alt: string; w: number; h: number };
};

export const products: Product[] = [
  {
    id: "cotton",
    name: "Cotton Yarn",
    blurb:
      "High-quality cotton yarn engineered for softness, consistency, and breathability across knitwear and woven applications.",
    applications: [
      "T-Shirts",
      "Polo Shirts",
      "Hoodies",
      "Sweatshirts",
      "Pullovers",
      "Knitwear",
      "Trousers",
    ],
    image: {
      src: "/images/cotton-yarn.webp",
      alt: "Cotton yarn cones with natural cotton bolls",
      w: 499,
      h: 431,
    },
  },
  {
    id: "pc",
    name: "PC Yarn",
    blurb:
      "Polyester-cotton blended yarn offering durability and comfort for a wide range of garment applications.",
    applications: ["Knitted Garments", "Workwear", "Activewear", "Fleece"],
    image: {
      src: "/images/pc-yarn.webp",
      alt: "Brightly coloured polyester-cotton PC yarn cones",
      w: 496,
      h: 440,
    },
  },
  {
    id: "cvc",
    name: "CVC Yarn",
    blurb:
      "Chief Value Cotton yarn engineered for superior comfort and performance with a cotton-rich blend.",
    applications: ["Premium Knitwear", "Hoodies", "Sweatshirts", "Polos"],
    image: {
      src: "/images/cvc-yarn.webp",
      alt: "Cream, blue and navy CVC yarn cones",
      w: 507,
      h: 442,
    },
  },
  {
    id: "specialty",
    name: "Specialty Yarns",
    blurb:
      "Jacquard-finish, custom-requirement, and export-quality yarns produced to precise buyer specifications.",
    applications: [
      "Jacquard Finish",
      "Custom Requirement",
      "Export Quality",
      "Knitted Polos",
      "Jackets",
      "Tracksuits",
    ],
    image: {
      src: "/images/specialty-yarn.webp",
      alt: "Pastel dyed specialty yarn skeins",
      w: 762,
      h: 450,
    },
  },
];

// Detailed yarn catalog — the full range we can source and supply.
export type YarnCategory = {
  name: string;
  desc: string;
  counts?: string[];
  specs?: { label: string; value: string }[];
};

export const yarnCatalog: YarnCategory[] = [
  {
    name: "Carded Yarns",
    desc: "Ring-spun carded counts for everyday knit and woven fabrics.",
    counts: ["Ne 8/1", "Ne 10/1", "Ne 12/1", "Ne 14/1", "Ne 16/1", "Ne 20/1", "Ne 21/1"],
  },
  {
    name: "Combed Yarns",
    desc: "Smoother, stronger combed counts for premium-quality fabrics.",
    counts: ["Ne 16/1", "Ne 20/1", "Ne 24/1", "Ne 26/1", "Ne 30/1", "Ne 32/1"],
  },
  {
    name: "Compact Siro Yarns",
    desc: "Compact-spun Siro yarns with low hairiness and high strength.",
    counts: ["Ne 8/1", "Ne 10/1", "Ne 12/1"],
  },
  {
    name: "Fancy Yarns",
    desc: "Yarns engineered with various man-made fibre (MMF) content and custom blends.",
    counts: ["Various MMF & blends", "Custom specification"],
  },
  {
    name: "Plied Yarns",
    desc: "Two-ply carded and combed yarns for added strength and durability.",
    counts: ["Ne 20/2 Carded", "Ne 32/2 Carded", "Ne 20/2 Combed", "Ne 32/2 Combed"],
  },
  {
    name: "Core Spun Yarns",
    desc: "Cotton-wrapped Lycra core for stretch and performance fabrics.",
    counts: [
      "Ne 12/1 CD + 40D Lycra",
      "Ne 12/1 CD + 70D Lycra",
      "Ne 16/1 CD + 40D Lycra",
      "Ne 16/1 CD + 70D Lycra",
    ],
  },
  {
    name: "Slub Yarns",
    desc: "Carded slub yarns in a range of slub patterns for textured, character fabrics.",
    counts: ["Ne 8/1", "Ne 10/1", "Ne 12/1", "Various slub patterns"],
  },
  {
    name: "Package / Cone Dyed Yarns",
    desc: "Cone-dyed to your required shade, ready for knitting and weaving.",
    specs: [
      { label: "Count", value: "Ne 5s – Ne 40s & multiply" },
      { label: "Quality", value: "Carded & Combed, Ring Spun & Compact" },
      { label: "Fiber", value: "100% Cotton, Poly-Cotton, Tencel, Modal" },
      { label: "Usage", value: "Knitting, Fabric & Towel weaving, Socks" },
    ],
  },
  {
    name: "Gassed Mercerized / Dyed Yarns",
    desc: "Gassed, mercerized and dyed yarns with superior lustre and smoothness.",
    specs: [
      { label: "Count", value: "Ne 5/2 – Ne 120/2 & multiply" },
      { label: "Quality", value: "Carded & Combed, Ring Spun & Compact" },
      { label: "Fiber", value: "100% Cotton" },
      { label: "Usage", value: "Knitting, Weaving, Towel, Socks, Crochet" },
    ],
  },
];

export const founder = {
  name: "Muhammad Basheer Tabba",
  role: "Founder",
  since: 2000,
  initials: "MBT",
  paragraphs: [
    "Perception Impex was founded in 2000 by Muhammad Basheer Tabba, whose vision was to create a trading company built on trust, consistency, and lasting industry relationships.",
    "For more than two decades, the company has worked alongside textile manufacturers, exporters, and spinning mills, developing a reputation for reliability and professionalism within Pakistan's textile sector.",
    "Under his leadership, Perception Impex has grown into a trusted yarn sourcing and trading partner, connecting manufacturers with quality yarn solutions while maintaining the highest standards of service and business integrity.",
    "Today, the company continues to build on that legacy, combining decades of industry knowledge with a commitment to supporting the evolving needs of modern textile businesses.",
  ],
};

export const strengths = [
  { title: "25+ Years Experience", desc: "Decades of industry relationships and market knowledge." },
  { title: "Strong Supplier Network", desc: "Direct access to Pakistan's leading spinning mills." },
  { title: "Competitive Pricing", desc: "Market-aligned rates backed by trusted partnerships." },
  { title: "Reliable Supply Chain", desc: "Dependable delivery schedules and supply continuity." },
  { title: "Flexible Payment Terms", desc: "30 / 60 / 90 day options to suit your cash flow." },
  { title: "Fast Procurement", desc: "Quick sourcing and responsive order fulfilment." },
  { title: "Consistent Quality", desc: "Reliable, specification-matched yarn every time." },
  { title: "High-Volume Capability", desc: "Scaled supply for large manufacturing demand." },
];

export type Supplier = {
  name: string;
  logo?: { src: string; alt: string; w: number; h: number };
};

export const suppliers: Supplier[] = [
  {
    name: "Gul Ahmed Textile Mills",
    logo: { src: "/images/suppliers/gul-ahmed.webp", alt: "Gul Ahmed Textile Mills logo", w: 237, h: 27 },
  },
  {
    name: "Premium Textile Mills",
    logo: { src: "/images/suppliers/premium-textile.webp", alt: "Premium Textile Mills logo", w: 1570, h: 678 },
  },
  {
    name: "Bhanero Textile Mills",
    logo: { src: "/images/suppliers/bhanero.webp", alt: "Bhanero Textile Mills logo", w: 600, h: 600 },
  },
];

export type Client = {
  name: string;
  logo?: { src: string; alt: string; w: number; h: number };
};

export const clients: Client[] = [
  {
    name: "Multimat",
    logo: { src: "/images/clients/multimat.webp", alt: "Multimat International logo", w: 750, h: 201 },
  },
  {
    name: "AOL Apparel",
    logo: { src: "/images/clients/aol.webp", alt: "AOL Apparel logo", w: 250, h: 171 },
  },
  {
    name: "Unique Textiles",
    logo: { src: "/images/clients/unique.webp", alt: "Unique Textiles logo", w: 300, h: 281 },
  },
  {
    name: "Redox Fashion",
    logo: { src: "/images/clients/redox.webp", alt: "Redox Fashion logo", w: 200, h: 200 },
  },
  {
    name: "Zunaira Industries",
    logo: { src: "/images/clients/zunaira.webp", alt: "Zunaira Industries logo", w: 550, h: 215 },
  },
  { name: "Al Zainab & Sons" },
];

export const customerSegments = [
  "Textile Manufacturers",
  "Garment Exporters",
  "Knitting Mills",
  "Weaving Mills",
  "Fabric Manufacturers",
  "Home Textile Producers",
  "Apparel Production Facilities",
];

export const timeline = [
  {
    year: "2000",
    title: "Founded in Pakistan",
    desc: `${company.founder} establishes Perception Impex as a dedicated yarn trading and sourcing house.`,
  },
  {
    year: "2009",
    title: "Mill Network Expands",
    desc: "Partnerships deepen with leading spinning mills, broadening yarn varieties and supply capacity.",
  },
  {
    year: "2016",
    title: "Export Markets",
    desc: "Sourcing relationships extend to serve international manufacturers and exporters.",
  },
  {
    year: "Today",
    title: "A Trusted Partner",
    desc: "25+ years on, supplying cotton, PC, CVC, and specialty yarns at scale with PKR 1B+ annual trade volume.",
  },
];

// Highlighted export destinations for the global-reach map.
// Coordinates are percentages on the map viewBox (set in the map component).
export const markets = [
  { code: "PK", name: "Pakistan", role: "origin" as const },
  { code: "US", name: "United States", role: "destination" as const },
  { code: "CA", name: "Canada", role: "destination" as const },
  { code: "GB", name: "United Kingdom", role: "destination" as const },
];

// Quote request form fields (from info.md).
export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "file" | "select" | "textarea";
  required: boolean;
  options?: string[];
  autoComplete?: string;
  placeholder?: string;
  accept?: string; // for file inputs
  full?: boolean; // span full width in the grid
};

export const quoteFields: FormField[] = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Company Name", type: "text", required: true, autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone Number", type: "tel", required: true, autoComplete: "tel" },
  { name: "whatsapp", label: "WhatsApp Number", type: "tel", required: false, autoComplete: "tel" },
  { name: "country", label: "Country", type: "text", required: true, autoComplete: "country-name" },
  {
    name: "yarn_type",
    label: "Yarn Type",
    type: "select",
    required: true,
    options: ["Cotton Yarn", "PC Yarn", "CVC Yarn", "Specialty Yarn", "Other / Custom"],
  },
  { name: "quantity", label: "Quantity Required", type: "text", required: true, placeholder: "e.g. 2,000 bags" },
  { name: "monthly_requirement", label: "Monthly Requirement", type: "text", required: false, placeholder: "e.g. 500 bags / month" },
  {
    name: "payment_terms",
    label: "Payment Terms Required",
    type: "select",
    required: false,
    options: ["30 Days", "60 Days", "90 Days", "Advance", "To Discuss"],
  },
  { name: "message", label: "Message", type: "textarea", required: false, full: true, placeholder: "Tell us about your requirement…" },
];

// FAQ — phrased the way B2B yarn buyers actually search (drives "People Also
// Ask" results). Answers feed both the on-page section and FAQPage schema.
export const faqs = [
  {
    q: "What is the minimum order quantity (MOQ) for yarn?",
    a: "Our minimum order quantity is 500 bags per month. We supply at volume for manufacturers and exporters, and can discuss requirements based on yarn type and count.",
  },
  {
    q: "Do you provide yarn samples before bulk orders?",
    a: "Yes. Samples are available on request so you can verify quality, count, and blend before placing a bulk order.",
  },
  {
    q: "Can yarn be customized according to requirements?",
    a: "Yes. We source custom counts, plies, blends, and dyed or gassed-mercerized yarns to your exact specification from our mill network in Pakistan.",
  },
  {
    q: "Which yarn types and counts do you supply?",
    a: "We supply cotton, PC, and CVC yarns plus specialty yarns (carded, combed, compact Siro, plied, core-spun, slub, package/cone-dyed, and gassed mercerized) across a wide count range, e.g. Ne 8s to Ne 40s and multiply.",
  },
  {
    q: "Do you export yarn from Pakistan to other countries?",
    a: "Yes. We supply manufacturers and exporters internationally, including buyers in the United States, Canada, and the United Kingdom, sourcing quality yarn from Pakistan's leading spinning mills.",
  },
  {
    q: "What payment terms do you offer?",
    a: "We offer flexible payment terms with 30, 60, and 90 day options to suit your cash flow.",
  },
  {
    q: "Who is a reliable yarn supplier and dealer in Pakistan?",
    a: "Perception Impex is a trusted yarn supplier, dealer, and exporter based in Pakistan, in business since 2000. We supply cotton, PC, CVC, and specialty yarns sourced from leading spinning mills to manufacturers and exporters in Pakistan and worldwide. Contact us at info@perceptionimpex.com or +92 300 8209877 for a quote.",
  },
  {
    q: "Who founded Perception Impex?",
    a: "Perception Impex was founded in 2000 by Muhammad Basheer Tabba. Under his leadership the company has grown into one of Pakistan's trusted yarn trading and sourcing partners, working with leading spinning mills to supply quality yarn to manufacturers and exporters.",
  },
];

export const nav = [
  { label: "Yarns", href: "/#products" },
  { label: "Yarn Range", href: "/#yarn-range" },
  { label: "Global Reach", href: "/#global" },
  { label: "Why Us", href: "/#why" },
  { label: "Partners", href: "/#partners" },
  { label: "About", href: "/#about" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact", href: "/#quote" },
];

// Formspree endpoint. Replace the ID once the form is created at formspree.io.
// While unset (placeholder), the form shows a "not yet configured" notice.
export const FORMSPREE_ID = "";
export const formspreeAction = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : "";

// ─── Careers / Internships ──────────────────────────────────────────────────

export type CareerProgram = {
  id: "aspire" | "elevate";
  name: string;
  audience: string;
  duration: string;
  blurb: string;
  employmentType: "INTERN" | "FULL_TIME";
};

export const careerPrograms: CareerProgram[] = [
  {
    id: "aspire",
    name: "Aspire Summer Internship",
    audience: "3rd-year (penultimate-year) university students",
    duration: "6 to 8 weeks, summer",
    blurb:
      "A hands-on summer internship for students who want real exposure to how a textile trading house runs. Work alongside our teams, learn the yarn trade from the inside, and build skills you cannot get in a classroom.",
    employmentType: "INTERN",
  },
  {
    id: "elevate",
    name: "Elevate Management Trainee Program",
    audience: "Fresh graduates",
    duration: "12-month structured trainee track",
    blurb:
      "A career-track program for fresh graduates ready to grow into future leaders. Structured rotations, mentorship from senior management, and a clear path into a permanent role within the company.",
    employmentType: "FULL_TIME",
  },
];

export type CareerPosition = {
  id: string;
  name: string;
  blurb: string;
  programIds: Array<"aspire" | "elevate">;
};

export const careerPositions: CareerPosition[] = [
  {
    id: "finance",
    name: "Finance & Accounts",
    blurb: "Support bookkeeping, receivables and payables, and financial reporting.",
    programIds: ["aspire", "elevate"],
  },
  {
    id: "it",
    name: "Information Technology (IT)",
    blurb: "Help maintain internal systems, data, and the tools the business runs on.",
    programIds: ["aspire"],
  },
  {
    id: "hr",
    name: "Human Resources (HR)",
    blurb: "Assist with recruitment, onboarding, and day-to-day people operations.",
    programIds: ["aspire"],
  },
  {
    id: "sales",
    name: "Sales & Business Development",
    blurb: "Support client outreach, lead generation, and account coordination.",
    programIds: ["aspire", "elevate"],
  },
  {
    id: "supply-chain",
    name: "Supply Chain & Logistics",
    blurb: "Help with order fulfilment, dispatch scheduling, and inventory tracking.",
    programIds: ["aspire", "elevate"],
  },
  {
    id: "impex",
    name: "Import/Export & Merchandising",
    blurb: "Assist with trade documentation, export coordination, and merchandising support.",
    programIds: ["aspire", "elevate"],
  },
];

export const careerBenefits = [
  { title: "Real Industry Exposure", desc: "Work on live trade, not filler tasks. See how yarn moves from mill to manufacturer." },
  { title: "Senior Mentorship", desc: "Learn directly from a team with 25+ years in the textile trade." },
  { title: "A 25-Year Network", desc: "Build relationships across Pakistan's leading spinning mills and manufacturers." },
  { title: "A Path Forward", desc: "Strong performers in the trainee program move into permanent roles." },
];

// Application form fields. The "program" select is pre-filled by the Apply
// buttons; options must match careerPrograms names exactly.
export const careerApplicationFields: FormField[] = [
  { name: "full_name", label: "Full Name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, autoComplete: "tel" },
  {
    name: "cnic",
    label: "CNIC",
    type: "text",
    required: true,
    placeholder: "00000-0000000-0",
  },
  {
    name: "program",
    label: "Program",
    type: "select",
    required: true,
    options: ["Aspire Summer Internship", "Elevate Management Trainee Program"],
  },
  {
    name: "position",
    label: "Position Applied For",
    type: "select",
    required: true,
    options: [
      "Finance & Accounts",
      "Information Technology (IT)",
      "Human Resources (HR)",
      "Sales & Business Development",
      "Supply Chain & Logistics",
      "Import/Export & Merchandising",
    ],
  },
  { name: "university", label: "University / Institution", type: "text", required: true },
  { name: "degree", label: "Degree / Field of Study", type: "text", required: true },
  {
    name: "year",
    label: "Year / Graduation Year",
    type: "text",
    required: true,
    placeholder: "e.g. 3rd year, 6th semester  or  2026 graduate",
  },
  { name: "gpa", label: "CGPA / GPA", type: "text", required: true, placeholder: "e.g. 3.4 / 4.0" },
  { name: "city", label: "City", type: "text", required: true, autoComplete: "address-level2" },
  {
    name: "cv",
    label: "CV / Resume (PDF, DOC, DOCX — max 5MB)",
    type: "file",
    required: true,
    accept: ".pdf,.doc,.docx",
    full: true,
  },
  { name: "availability", label: "Availability / Start Date", type: "text", required: false },
  {
    name: "cover_note",
    label: "Cover Note",
    type: "textarea",
    required: false,
    full: true,
    placeholder: "Why do you want to join Perception Impex?",
  },
];

export const careerFaqs = [
  {
    q: "Who can apply to the Aspire Summer Internship?",
    a: "Students currently in their 3rd (penultimate) year of a university degree. It runs over the summer and is open across all six departments.",
  },
  {
    q: "Who is the Elevate Management Trainee Program for?",
    a: "Fresh graduates looking for a career-track role. It is a structured 12-month program with rotations and mentorship, leading toward a permanent position.",
  },
  {
    q: "Do I need a CV to apply?",
    a: "Yes. Attach your CV as a PDF, DOC, or DOCX file (up to 5MB) in the application form so we can review your background.",
  },
  {
    q: "Is the internship paid?",
    a: "Stipend and compensation are discussed with shortlisted candidates based on the program and role.",
  },
  {
    q: "How will I hear back?",
    a: "Our HR team reviews applications and contacts shortlisted candidates by email or phone. Apply through the form on this page.",
  },
];

// Static posting date for JobPosting structured data (kept constant so the
// static export is deterministic). Update when the campaign is refreshed.
export const CAREERS_POSTED_DATE = "2026-06-29";

// Applications stay open through this date. Google recommends validThrough on JobPostings.
export const CAREERS_VALID_THROUGH = "2026-12-31";

// Careers application submission endpoint (Supabase Edge Function) and the
// public Cloudflare Turnstile site key. Both are filled once the owner's
// Supabase project and Turnstile widget exist. While CAREERS_SUBMIT_URL is
// empty, the form shows an "applications open soon" state (no WhatsApp).
export const CAREERS_SUBMIT_URL =
  "https://pihsfbgxmpnmogwgvqlk.supabase.co/functions/v1/submit-application";
export const TURNSTILE_SITE_KEY = "0x4AAAAAADs_uR77o-ZfE1Kt";

// ─── SEO product landing pages ──────────────────────────────────────────────

export type ProductPage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  overview: string[];
  image: { src: string; alt: string; w: number; h: number };
  specGroups: { title: string; desc: string; counts: string[] }[];
  extraSpecNote: string;
  applications: string[];
  faqs: { q: string; a: string }[];
  related: string[]; // slugs of related product pages
};

export const productPages: Record<string, ProductPage> = {
  "cotton-yarn": {
    slug: "cotton-yarn",
    name: "Cotton Yarn",
    metaTitle: "Cotton Yarn Supplier & Exporter in Pakistan",
    metaDescription:
      "Perception Impex is a trusted cotton yarn supplier, dealer and exporter in Pakistan. Carded and combed, ring-spun and compact cotton yarn from Ne 8s to Ne 40s, sourced from leading spinning mills since 2000.",
    keywords: [
      "cotton yarn supplier Pakistan",
      "cotton yarn exporter Pakistan",
      "carded cotton yarn",
      "combed cotton yarn",
      "ring spun cotton yarn",
      "cotton yarn dealer Karachi",
    ],
    h1: "Cotton Yarn Supplier & Exporter in Pakistan",
    intro:
      "Perception Impex supplies high-quality 100% cotton yarn, carded and combed, ring-spun and compact, sourced from Pakistan's leading spinning mills. In the yarn trade since 2000, we serve knitters, weavers, and garment exporters with consistent quality, competitive pricing, and dependable delivery.",
    overview: [
      "Cotton yarn is the backbone of knit and woven fabrics. We source it across the full count range from trusted spinning mills, so manufacturers get the right quality at the right price, on time. Our cotton yarn is engineered for softness, consistency, and breathability.",
      "Carded qualities give you cost-effective yarn for everyday production, while combed qualities deliver the smoothness and strength premium garments demand. Because we work directly with leading mills, we match your specification on count, twist, and quality, and supply consistent lots order after order, from single programs to high-volume export orders.",
    ],
    image: {
      src: "/images/cotton-yarn.webp",
      alt: "Natural white cotton yarn cones with cotton bolls",
      w: 499,
      h: 431,
    },
    specGroups: [
      {
        title: "Carded Cotton Yarn",
        desc: "Ring-spun carded counts for everyday knit and woven fabrics.",
        counts: ["Ne 8/1", "Ne 10/1", "Ne 12/1", "Ne 14/1", "Ne 16/1", "Ne 20/1", "Ne 21/1"],
      },
      {
        title: "Combed Cotton Yarn",
        desc: "Smoother, stronger combed counts for premium-quality fabrics.",
        counts: ["Ne 16/1", "Ne 20/1", "Ne 24/1", "Ne 26/1", "Ne 30/1", "Ne 32/1"],
      },
    ],
    extraSpecNote:
      "Also available: compact and Siro qualities, plied yarns (e.g. Ne 20/2, Ne 32/2), and cone-dyed cotton yarn. Range extends to Ne 40s and beyond on request.",
    applications: [
      "T-Shirts",
      "Polo Shirts",
      "Hoodies",
      "Sweatshirts",
      "Pullovers",
      "Knitwear",
      "Trousers",
      "Home Textiles",
    ],
    faqs: [
      {
        q: "What cotton yarn counts do you supply?",
        a: "We supply carded counts from Ne 8/1 to Ne 21/1 and combed counts from Ne 16/1 to Ne 32/1, in ring-spun and compact qualities. Other counts up to Ne 40s and multiply (plied) yarns are available to order.",
      },
      {
        q: "What is the difference between carded and combed cotton yarn?",
        a: "Carded yarn is cost-effective and well suited to everyday knit and woven fabrics. Combed yarn goes through an extra combing stage that removes short fibres, giving a smoother, stronger, higher-quality yarn for premium fabrics.",
      },
      {
        q: "What is your minimum order quantity for cotton yarn?",
        a: "Our minimum order is 500 bags per month. We supply at volume to manufacturers and exporters and can discuss requirements based on count and quality.",
      },
      {
        q: "Do you export cotton yarn from Pakistan?",
        a: "Yes. We supply manufacturers and exporters in Pakistan and internationally, including buyers in the United States, Canada, and the United Kingdom, sourcing quality cotton yarn from leading spinning mills.",
      },
    ],
    related: ["pc-yarn", "cvc-yarn", "specialty-yarn"],
  },
  "pc-yarn": {
    slug: "pc-yarn",
    name: "PC Yarn",
    metaTitle: "PC Yarn (Polyester-Cotton) Supplier & Exporter in Pakistan",
    metaDescription:
      "Perception Impex supplies polyester-cotton (PC) blended yarn in Pakistan. Durable, easy-care PC yarn for knitwear, workwear and activewear, sourced from leading spinning mills since 2000.",
    keywords: [
      "PC yarn supplier Pakistan",
      "polyester cotton yarn",
      "PC blended yarn",
      "PC yarn exporter Pakistan",
      "poly cotton yarn supplier",
    ],
    h1: "PC Yarn (Polyester-Cotton) Supplier in Pakistan",
    intro:
      "Perception Impex supplies polyester-cotton (PC) blended yarn that combines the durability of polyester with the comfort of cotton. Sourced from Pakistan's leading spinning mills since 2000, our PC yarn serves knitters and garment manufacturers who need hard-wearing, easy-care fabrics at competitive prices.",
    overview: [
      "PC yarn blends polyester and cotton so fabrics hold their shape, resist shrinkage, and need less care, while keeping a comfortable cotton feel. The standard blend is 65% polyester and 35% cotton, the most widely used ratio for knitted and woven garments.",
      "We source PC yarn across a range of counts directly from leading mills, matching your blend ratio, count, and quality. From workwear and uniforms to activewear and fleece, our PC yarn keeps high-volume production running on time and on budget.",
    ],
    image: {
      src: "/images/pc-yarn.webp",
      alt: "Brightly coloured polyester-cotton PC yarn cones",
      w: 496,
      h: 440,
    },
    specGroups: [
      {
        title: "Carded PC Yarn",
        desc: "Polyester-cotton counts for everyday knit and woven fabrics.",
        counts: ["Ne 10/1", "Ne 16/1", "Ne 20/1", "Ne 24/1"],
      },
      {
        title: "Finer PC Yarn",
        desc: "Finer polyester-cotton counts for lighter, smoother fabrics.",
        counts: ["Ne 26/1", "Ne 30/1", "Ne 32/1"],
      },
    ],
    extraSpecNote:
      "Standard 65/35 polyester-cotton blend, with other blend ratios and plied PC yarn available to order. Counts up to Ne 40s on request.",
    applications: ["Knitted Garments", "Workwear", "Activewear", "Fleece", "T-Shirts", "Uniforms"],
    faqs: [
      {
        q: "What is PC yarn?",
        a: "PC yarn is a polyester-cotton blended yarn. It combines polyester's strength and durability with cotton's softness and breathability, giving fabrics that wear well and need less care.",
      },
      {
        q: "What blend ratios do you supply?",
        a: "Our standard blend is 65% polyester and 35% cotton, the most widely used PC ratio. Other blend ratios are available to order based on your fabric requirement.",
      },
      {
        q: "What is PC yarn used for?",
        a: "PC yarn is popular for knitted garments, workwear, uniforms, activewear, and fleece, where durability and easy care matter most.",
      },
      {
        q: "Do you export PC yarn from Pakistan?",
        a: "Yes. We supply PC yarn to manufacturers and exporters in Pakistan and abroad, including buyers in the United States, Canada, and the United Kingdom.",
      },
    ],
    related: ["cotton-yarn", "cvc-yarn", "specialty-yarn"],
  },
  "cvc-yarn": {
    slug: "cvc-yarn",
    name: "CVC Yarn",
    metaTitle: "CVC Yarn (Chief Value Cotton) Supplier in Pakistan",
    metaDescription:
      "Perception Impex supplies CVC (Chief Value Cotton) yarn in Pakistan. Cotton-rich blends for premium knitwear, hoodies and polos, sourced from leading spinning mills since 2000.",
    keywords: [
      "CVC yarn supplier Pakistan",
      "chief value cotton yarn",
      "CVC blended yarn",
      "CVC yarn exporter",
      "cotton rich yarn supplier",
    ],
    h1: "CVC Yarn (Chief Value Cotton) Supplier in Pakistan",
    intro:
      "Perception Impex supplies CVC yarn, a Chief Value Cotton blend where cotton is the majority fibre. It offers the comfort and feel of cotton with the added durability of polyester, which makes it a favourite for premium knitwear. We source it from Pakistan's leading spinning mills with consistent quality and competitive pricing.",
    overview: [
      "CVC stands for Chief Value Cotton, a blend in which cotton is the larger share, for example 60% cotton and 40% polyester. That cotton-rich balance gives fabrics a soft, natural feel while the polyester adds strength and shape retention.",
      "We source CVC yarn across a range of counts directly from leading mills, matching your blend ratio and quality. It is a popular choice for hoodies, sweatshirts, and polos where a premium cotton hand is wanted with everyday durability.",
    ],
    image: {
      src: "/images/cvc-yarn.webp",
      alt: "Cream, blue and navy CVC yarn cones",
      w: 507,
      h: 442,
    },
    specGroups: [
      {
        title: "Carded CVC Yarn",
        desc: "Cotton-rich blended counts for premium knit fabrics.",
        counts: ["Ne 16/1", "Ne 20/1", "Ne 24/1", "Ne 26/1"],
      },
      {
        title: "Combed CVC Yarn",
        desc: "Finer, smoother combed counts for higher-quality fabrics.",
        counts: ["Ne 28/1", "Ne 30/1", "Ne 32/1"],
      },
    ],
    extraSpecNote:
      "Standard CVC blend is cotton-rich, for example 60% cotton and 40% polyester, with other ratios and plied yarns available to order.",
    applications: ["Premium Knitwear", "Hoodies", "Sweatshirts", "Polos", "Fleece"],
    faqs: [
      {
        q: "What is CVC yarn?",
        a: "CVC stands for Chief Value Cotton. It is a polyester-cotton blend where cotton is the majority fibre, so the yarn feels closer to pure cotton while gaining some of polyester's durability.",
      },
      {
        q: "How is CVC different from PC yarn?",
        a: "In CVC yarn cotton is the larger share of the blend, so it feels softer and more cotton-like. In PC yarn polyester is usually the larger share, which makes it more hard-wearing and economical.",
      },
      {
        q: "What is CVC yarn used for?",
        a: "CVC is popular for premium knitwear, hoodies, sweatshirts, and polos, where a soft cotton feel with added durability is wanted.",
      },
      {
        q: "Do you export CVC yarn?",
        a: "Yes. We supply CVC yarn to manufacturers and exporters in Pakistan and internationally, including the United States, United Kingdom, and Canada.",
      },
    ],
    related: ["cotton-yarn", "pc-yarn", "specialty-yarn"],
  },
  "specialty-yarn": {
    slug: "specialty-yarn",
    name: "Specialty Yarn",
    metaTitle: "Specialty & Dyed Yarn Supplier in Pakistan",
    metaDescription:
      "Perception Impex supplies specialty yarns in Pakistan, including slub, core-spun, gassed mercerized and cone-dyed yarns. Custom and export-quality yarn from leading spinning mills since 2000.",
    keywords: [
      "specialty yarn supplier Pakistan",
      "dyed yarn supplier",
      "gassed mercerized yarn",
      "slub yarn",
      "core spun yarn",
      "custom yarn Pakistan",
    ],
    h1: "Specialty & Dyed Yarn Supplier in Pakistan",
    intro:
      "Beyond standard cotton and blended yarns, Perception Impex sources a wide range of specialty yarns: slub, core-spun, compact Siro, gassed mercerized, and cone-dyed yarns produced to precise buyer specifications. If you have a custom or export-quality requirement, we can source it from our mill network.",
    overview: [
      "Specialty yarns let you build character and performance into fabric, from textured slub and fancy yarns to stretch core-spun yarn with a Lycra core. We also source compact Siro yarns with low hairiness and high strength for premium results.",
      "For finish and colour, we supply cone-dyed yarn in your required shade and gassed mercerized yarn with superior lustre and smoothness. Tell us the fabric you are making and the look you want, and we will source the right specialty yarn to your specification.",
    ],
    image: {
      src: "/images/specialty-yarn.webp",
      alt: "Pastel dyed specialty yarn skeins",
      w: 762,
      h: 450,
    },
    specGroups: [
      {
        title: "Textured & Fancy Yarns",
        desc: "Slub, fancy, core-spun and compact Siro yarns for character and stretch.",
        counts: ["Slub Yarn", "Fancy Yarn", "Core-Spun (Lycra)", "Compact Siro"],
      },
      {
        title: "Dyed & Finished Yarns",
        desc: "Cone-dyed and gassed mercerized yarns with superior finish.",
        counts: ["Package / Cone Dyed", "Gassed Mercerized", "Plied (2-ply)", "Jacquard Finish"],
      },
    ],
    extraSpecNote:
      "All produced to your specification on count, blend, twist, and shade. Tell us the fabric you are making and we will source the right specialty yarn.",
    applications: [
      "Jacquard Finish",
      "Custom Requirement",
      "Export Quality",
      "Knitted Polos",
      "Jackets",
      "Tracksuits",
    ],
    faqs: [
      {
        q: "What specialty yarns do you supply?",
        a: "We source slub, fancy, core-spun (cotton-wrapped Lycra), compact Siro, plied, package or cone-dyed, and gassed mercerized yarns, plus custom blends to your specification.",
      },
      {
        q: "Can you supply dyed yarn to a specific shade?",
        a: "Yes. We supply cone-dyed and gassed mercerized yarns dyed to your required shade, ready for knitting and weaving.",
      },
      {
        q: "Can yarn be made to a custom specification?",
        a: "Yes. We source custom counts, plies, blends, and finishes to your exact specification from our mill network in Pakistan.",
      },
      {
        q: "Do you supply export-quality specialty yarn?",
        a: "Yes. We supply export-quality specialty and dyed yarns to manufacturers and exporters in Pakistan and abroad.",
      },
    ],
    related: ["cotton-yarn", "pc-yarn", "cvc-yarn"],
  },
};
