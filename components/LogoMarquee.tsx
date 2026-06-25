import Image from "next/image";
import { suppliers, clients } from "@/lib/content";

// All partner/client logos that have an image, for the moving trust band.
const logos = [...suppliers, ...clients].filter((e) => e.logo).map((e) => e.logo!);

export function LogoMarquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const track = [...logos, ...logos];

  return (
    <section aria-label="Partners and clients" className="border-y border-stone-200 bg-surface py-10">
      <p className="mb-7 text-center text-xs font-semibold uppercase tracking-wide-label text-ink-muted">
        Trusted across Pakistan&apos;s textile supply chain
      </p>
      <div className="marquee-mask group relative overflow-hidden">
        <ul className="animate-marquee flex w-max items-center gap-14 group-hover:[animation-play-state:paused]">
          {track.map((logo, i) => (
            <li key={`${logo.src}-${i}`} className="flex h-12 shrink-0 items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                loading="lazy"
                className="max-h-10 w-auto max-w-[150px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
