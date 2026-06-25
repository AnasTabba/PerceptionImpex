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
    "Perception Impex is a Pakistan-based yarn trading and sourcing company established in 2000. For over 25 years we have built strong relationships with Pakistan's leading spinning and textile mills, enabling manufacturers and exporters to secure high-quality yarn at competitive rates with reliable delivery schedules.",
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
      src: "/images/yarn-cones.webp",
      alt: "Rows of cotton yarn cones ready for production",
      w: 500,
      h: 500,
    },
  },
  {
    id: "pc",
    name: "PC Yarn",
    blurb:
      "Polyester-cotton blended yarn offering durability and comfort for a wide range of garment applications.",
    applications: ["Knitted Garments", "Workwear", "Activewear", "Fleece"],
    image: {
      src: "/images/yarn-warehouse.webp",
      alt: "Warehouse rows of blended yarn cones",
      w: 525,
      h: 350,
    },
  },
  {
    id: "cvc",
    name: "CVC Yarn",
    blurb:
      "Chief Value Cotton yarn engineered for superior comfort and performance with a cotton-rich blend.",
    applications: ["Premium Knitwear", "Hoodies", "Sweatshirts", "Polos"],
    image: {
      src: "/images/yarn-spinning.webp",
      alt: "Spinning machine producing fine yarn",
      w: 547,
      h: 365,
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
      src: "/images/yarn-jacquard.webp",
      alt: "Jacquard and specialty yarn production on a modern spinning floor",
      w: 692,
      h: 443,
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
  type: "text" | "email" | "tel" | "select" | "textarea";
  required: boolean;
  options?: string[];
  autoComplete?: string;
  placeholder?: string;
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
    a: "We supply cotton, PC, and CVC yarns plus specialty yarns — carded, combed, compact Siro, plied, core-spun, slub, package/cone-dyed, and gassed mercerized — across a wide count range (e.g. Ne 8s to Ne 40s and multiply).",
  },
  {
    q: "Do you export yarn from Pakistan to other countries?",
    a: "Yes. We supply manufacturers and exporters internationally, including buyers in the United States, Canada, and the United Kingdom, sourcing quality yarn from Pakistan's leading spinning mills.",
  },
  {
    q: "What payment terms do you offer?",
    a: "We offer flexible payment terms with 30, 60, and 90 day options to suit your cash flow.",
  },
];

export const nav = [
  { label: "Yarns", href: "#products" },
  { label: "Yarn Range", href: "#yarn-range" },
  { label: "Global Reach", href: "#global" },
  { label: "Why Us", href: "#why" },
  { label: "Partners", href: "#partners" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#quote" },
];

// Formspree endpoint. Replace the ID once the form is created at formspree.io.
// While unset (placeholder), the form shows a "not yet configured" notice.
export const FORMSPREE_ID = "";
export const formspreeAction = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : "";
