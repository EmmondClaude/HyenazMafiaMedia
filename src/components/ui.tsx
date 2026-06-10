import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Shared primitives, themed to the brand. Stand-in for the shadcn/ui layer
 *  (APEX-STACK tool 10) until the CLI is run against the repo. */

const page = "mx-auto w-full max-w-6xl px-6";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className={page}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="display text-sm tracking-[0.3em] text-crimson">
      {children}
    </span>
  );
}

/** Big display heading with the crimson slash underline. */
export function SlashHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`display text-pearl text-4xl sm:text-6xl ${className}`}>
      <span className="slash inline-block">{children}</span>
    </h2>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "crimson" | "gold" | "ghost";
} & Partial<ComponentProps<"button">> &
  Partial<ComponentProps<typeof Link>>;

export function Button({
  children,
  href,
  variant = "crimson",
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "display inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-[0.15em] transition-all duration-300 ease-[var(--ease-brand)]";
  const styles = {
    crimson:
      "bg-crimson text-pearl-highlight hover:bg-crimson-shadow hover:shadow-[0_0_30px_-8px_var(--color-crimson)]",
    gold: "border border-gold text-gold hover:bg-gold hover:text-ink",
    ghost: "border border-smoke text-pearl hover:border-pearl",
  }[variant];

  const cls = `${base} ${styles} ${className}`;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={cls} {...(rest as ComponentProps<"a">)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-smoke/60 bg-smoke/10 p-6 backdrop-blur-sm transition-colors hover:border-smoke ${className}`}
    >
      {children}
    </div>
  );
}
