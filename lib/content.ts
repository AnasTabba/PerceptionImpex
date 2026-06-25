// Central content model for Perception Impex.
// All copy sourced from info.md so the site stays single-source-of-truth.

export const company = {
  name: "Perception Impex",
  shortName: "Perception Impex",
  tagline: "Connecting Quality Yarn with Global Manufacturing Excellence",
  founded: 2000,
  yearsLabel: "26 Years",
  founder: "Muhammad Basheer Tabba",
  heroHeadline: "26 Years of Trusted Yarn Trading Excellence",
  heroSubline:
    "Supplying high-quality cotton, PC, CVC, and specialty yarns through strong relationships with Pakistan's leading spinning mills. Trusted by manufacturers and exporters since 2000.",
  overview:
    "Perception Impex is a Pakistan-based yarn trading and sourcing company established in 2000. For over 26 years we have built strong relationships with Pakistan's leading spinning and textile mills, enabling manufacturers and exporters to secure high-quality yarn at competitive rates with reliable delivery schedules.",
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
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${contact.email}?${params.toString()}`;
}

export const stats = [
  { value: 26, suffix: "+", label: "Years in Business" },
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
  },
];

export const strengths = [
  { title: "26 Years Experience", desc: "Decades of industry relationships and market knowledge." },
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
    logo: { src: "/images/suppliers/gul-ahmed.webp", alt: "Gul Ahmed Textile Mills", w: 237, h: 27 },
  },
  {
    name: "Premium Textile Mills",
    logo: { src: "/images/suppliers/premium-textile.webp", alt: "Premium Textile Mills", w: 1570, h: 678 },
  },
  {
    name: "Unique Textile",
    logo: { src: "/images/suppliers/unique-textile.webp", alt: "Unique Textile", w: 300, h: 281 },
  },
  { name: "Bhanero Textile Mills" },
];

export const clients = [
  "Unique Textiles",
  "AOL Apparel",
  "Zunaira",
  "Multimat",
  "Redox Fashion",
  "Al Zainab & Sons",
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
    year: "2008",
    title: "Mill Network Expands",
    desc: "Partnerships deepen with leading spinning mills, broadening yarn varieties and supply capacity.",
  },
  {
    year: "2015",
    title: "Export Markets",
    desc: "Sourcing relationships extend to serve international manufacturers and exporters.",
  },
  {
    year: "Today",
    title: "A Trusted Partner",
    desc: "26+ years on, supplying cotton, PC, CVC, and specialty yarns at scale with PKR 1B+ annual trade volume.",
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

export const nav = [
  { label: "Products", href: "#products" },
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
