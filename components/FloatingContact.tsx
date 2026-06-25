"use client";

import { useEffect, useState } from "react";
import { contact, whatsappHref, mailtoHref } from "@/lib/content";
import { WhatsApp, Mail } from "@/components/ui/Icons";

/**
 * Fixed WhatsApp + Email quick-contact buttons, bottom-right.
 * Appears after the user scrolls past the hero so it doesn't crowd the top.
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col gap-3 transition-all duration-300 ease-out-expo ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${contact.domain} on WhatsApp`}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <WhatsApp className="h-7 w-7" />
      </a>
      <a
        href={mailtoHref()}
        aria-label={`Email ${contact.email}`}
        className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-lift transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Mail className="h-6 w-6" />
      </a>
    </div>
  );
}
