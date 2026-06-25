import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Consistent section header: eyebrow label + display title + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const isCenter = align === "center";
  return (
    <Reveal className={`max-w-2xl ${alignment} ${className}`}>
      {/* One restrained label: short animated hairline + tracked kicker, on a
          single line. Replaces the eyebrow-over-rule-over-heading scaffold. */}
      <div
        className={`mb-4 flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
      >
        <span className="accent-rule !h-px !w-7" aria-hidden />
        <p className="text-[0.7rem] font-semibold uppercase tracking-wide-label text-teal-700">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-display text-[1.75rem] font-bold leading-[1.12] tracking-tight-display text-ink sm:text-4xl lg:text-[2.6rem] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg text-pretty">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
