import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { WhatsApp, Mail, Phone } from "@/components/ui/Icons";
import { company, contact, nav, products, whatsappHref } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {company.tagline}. A Pakistan-based yarn trading &amp; sourcing partner, trusted since{" "}
              {company.founded}.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#25D366]"
              >
                <WhatsApp className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-teal-500"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={contact.phoneHref}
                aria-label="Phone"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-teal-500"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-wide-label text-white/40">Explore</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide-label text-white/40">Yarns</h3>
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.id}>
                  <a href="#products" className="text-sm text-white/70 transition-colors hover:text-white">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide-label text-white/40">Get in Touch</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="transition-colors hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li>{contact.hours}</li>
              <li className="text-white/50">MOQ: {contact.moq}</li>
              <li className="text-white/50">Terms: {contact.paymentTerms}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {company.name}. All rights reserved.
          </span>
          <span>{contact.domain}</span>
        </div>
      </Container>
    </footer>
  );
}
