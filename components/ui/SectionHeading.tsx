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
  return (
    <Reveal className={`max-w-2xl ${alignment} ${className}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide-label text-teal-600">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight-display text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
