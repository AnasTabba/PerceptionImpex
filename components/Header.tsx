"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { Menu, Close, WhatsApp, ArrowRight } from "@/components/ui/Icons";
import { nav, whatsappHref } from "@/lib/content";

// Section id for a nav href like "/#products" -> "products"; "" for hash-less links (e.g. /careers/).
const sectionId = (href: string) => href.split("#")[1] ?? "";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = nav.map((n) => sectionId(n.href)).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
          scrolled || open
            ? "border-b border-stone-200/80 bg-canvas/95 shadow-[0_6px_24px_-16px_rgba(20,28,26,0.45)] backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between lg:h-20">
        <a href="/#main" className="shrink-0" aria-label="Perception Impex home">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const id = sectionId(item.href);
            const active = id !== "" && activeId === id;
            return (
              <a
                key={item.href}
                href={item.href}
                data-active={active}
                className={`nav-underline text-sm font-medium transition-colors ${
                  active ? "text-teal-600" : "text-ink-soft hover:text-teal-600"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-stone-100 hover:text-[#25D366]"
          >
            <WhatsApp className="h-5 w-5" />
          </a>
          <Button as="a" href="/#quote" variant="primary">
            Request Quote
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full text-ink lg:hidden"
        >
          {open ? <Close /> : <Menu />}
        </button>
        </Container>
      </header>

      {/* Mobile menu — full-height overlay rendered OUTSIDE <header> so the
          header's backdrop-blur can't create a containing block that collapses
          this fixed element. */}
      <div
        id="mobile-menu"
        // `inert` (when closed) removes the menu's links/buttons from the tab
        // order and accessibility tree — so no interactive elements live inside
        // a hidden container. Cast avoids React 18 JSX typing gap for `inert`.
        {...(!open ? ({ inert: "" } as Record<string, string>) : {})}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto overscroll-contain border-t border-stone-200 bg-canvas transition-all duration-300 ease-out-expo lg:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container className="flex min-h-full flex-col py-6">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => {
              const id = sectionId(item.href);
              const active = id !== "" && activeId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={`group flex items-center justify-between border-b border-stone-200/70 py-4 text-lg font-medium transition-colors ${
                    active ? "text-teal-700" : "text-ink hover:text-teal-700"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    className={`h-4 w-4 transition-colors ${
                      active ? "text-teal-600" : "text-ink-muted/40 group-hover:text-teal-600"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button as="a" href="/#quote" variant="primary" size="lg" onClick={() => setOpen(false)}>
              Request Quote
            </Button>
            <Button
              as="a"
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
              onClick={() => setOpen(false)}
            >
              <WhatsApp className="h-5 w-5" /> WhatsApp Us
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
