import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ease-out-expo focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-500 text-white shadow-soft hover:bg-teal-600 hover:shadow-lift active:translate-y-px",
  secondary:
    "bg-ink text-white hover:bg-ink-soft active:translate-y-px",
  ghost:
    "bg-transparent text-ink ring-1 ring-stone-200 hover:ring-ink hover:bg-stone-100",
  onDark:
    "bg-white/95 text-ink hover:bg-white active:translate-y-px",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; href?: never };
type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;
  const cls = `${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`;

  if (props.as === "a") {
    const { as: _as, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      as?: string;
    };
    return (
      <a className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: string;
  };
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
