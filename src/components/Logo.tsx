import Link from "next/link";

/**
 * HYENAZ MAFIA MEDIA lockup.
 *
 * NOTE: the real "HYENAZ" wordmark is bespoke hand-lettering and must never be
 * re-typeset (KICKOFF §3). The supplied art (IMG_0254/0255/0256.PNG) was not in
 * the repo, so this is a brand-correct stand-in: drop the PNG/SVG into
 * /public/brand and swap the markup below. Colors and the crimson lightning
 * slash stay on-palette either way.
 */
export function Logo({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "wordmark" | "badge";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="HYENAZ MAFIA MEDIA — home"
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span className="relative flex items-baseline">
        <span className="display text-pearl text-2xl tracking-tight transition-colors group-hover:text-pearl-highlight">
          HYENA
          <span className="text-crimson">Z</span>
        </span>
        {/* lightning slash */}
        <svg
          viewBox="0 0 24 40"
          className="ml-1 h-6 w-3 self-center"
          aria-hidden
        >
          <path
            d="M14 0 L2 22 L10 22 L6 40 L22 14 L14 14 Z"
            fill="var(--color-crimson)"
          />
        </svg>
      </span>
      {variant === "full" && (
        <span className="display mt-1 inline-block bg-crimson px-1.5 py-0.5 text-[0.6rem] tracking-[0.35em] text-pearl-highlight">
          MAFIA&nbsp;MEDIA
        </span>
      )}
    </Link>
  );
}
