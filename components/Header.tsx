"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { Menu, Close, WhatsApp } from "@/components/ui/Icons";
import { nav, whatsappHref } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open
          ? "border-b border-stone-200/80 bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <a href="#main" className="shrink-0" aria-label="Perception Impex home">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-teal-600"
            >
              {item.label}
            </a>
          ))}
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
          <Button as="a" href="#quote" variant="primary">
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

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-stone-200 bg-canvas transition-[max-height] duration-300 ease-out-expo lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-stone-100"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-3 px-1">
            <Button
              as="a"
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              <WhatsApp className="h-5 w-5" /> WhatsApp
            </Button>
            <Button as="a" href="#quote" variant="primary" onClick={() => setOpen(false)}>
              Request Quote
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
