import { ExternalLink, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function UxContributionSummary({
  id,
  contributions,
  ctaHref,
  ctaLabel = "View interactive prototype",
}: {
  id: string;
  contributions: readonly string[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  if (contributions.length === 0) return null;

  const headingId = `${id}-contributions`;

  return (
    <section
      aria-labelledby={headingId}
      className="not-prose mb-12 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/40 to-secondary/5 p-5 shadow-sm sm:p-7"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
        My role in the project
      </p>
      <h2
        id={headingId}
        className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
      >
        What I Contributed
      </h2>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {contributions.map((contribution) => (
          <li
            key={contribution}
            className="flex gap-3 rounded-lg border border-border/70 bg-background/35 p-4 text-sm leading-relaxed text-muted-foreground"
          >
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span>{contribution}</span>
          </li>
        ))}
      </ul>

      {ctaHref ? (
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "mt-6 gap-2")}
        >
          {ctaLabel}
          <ExternalLink className="size-4" aria-hidden />
        </a>
      ) : null}
    </section>
  );
}
