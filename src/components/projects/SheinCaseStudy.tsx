import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import {
  figmaEmbedSrc,
  sheinCaseStudy as C,
} from "@/data/sheinCaseStudy";
import { buttonVariants } from "@/components/ui/button";
import {
  LetterboxedProjectHero,
  ProjectPosterHeader,
} from "@/components/projects/project-film-detail";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Project = (typeof portfolioData.projects)[number];

function InlineBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/);
        if (m) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {m[1]}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function PullQuote({
  quote,
  attribution,
  sub,
}: {
  quote: string;
  attribution: string;
  sub?: string;
}) {
  return (
    <figure
      className={cn(
        "my-6 rounded-lg border border-primary/25 bg-primary/5 px-5 py-4",
        "not-prose"
      )}
    >
      <blockquote className="text-base italic leading-relaxed text-foreground/95">
        “{quote}”
      </blockquote>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        — <span className="font-medium text-foreground">{attribution}</span>
        {sub ? <span className="text-muted-foreground">, {sub}</span> : null}
      </figcaption>
    </figure>
  );
}

function OutcomeSummaryWidget() {
  const w = C.outcomeWidget;
  return (
    <div className="not-prose mb-12 overflow-hidden rounded-xl border border-white/10 bg-[#14181C] text-zinc-100 shadow-lg">
      <div className="grid gap-4 border-b border-white/10 px-4 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {w.meta.map((row) => (
          <div key={row.label}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              {row.label}
            </p>
            <p className="mt-1 text-sm text-zinc-100">{row.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 px-4 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:px-6">
        {w.processPhases.map((ph) => (
          <div
            key={ph.step}
            className={cn(
              "rounded-lg border p-3.5 shadow-sm",
              ph.cardClass
            )}
          >
            <p className="text-[10px] font-bold uppercase tracking-wide opacity-90">
              {ph.step}
            </p>
            <p className="mt-2 font-heading text-base font-bold">{ph.title}</p>
            <p className="mt-2 text-xs leading-relaxed opacity-95">{ph.body}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 border-y border-white/10 px-4 py-8 sm:grid-cols-3 lg:px-6">
        {w.metrics.map((m) => (
          <div key={m.label} className="text-center sm:text-left">
            <p className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {m.value}
            </p>
            <p className="mt-2 text-sm text-zinc-400">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 py-6 lg:px-6">
        <h2 className="font-heading text-lg font-bold text-white">
          Redesign outcomes
        </h2>
        <ul className="mt-4 space-y-4">
          {w.outcomes.map((o) => (
            <li
              key={o.title}
              className="flex flex-col gap-2 rounded-lg border border-white/10 bg-black/20 px-4 py-3 sm:flex-row sm:items-start sm:gap-3"
            >
              <span
                className={cn(
                  "inline-flex w-fit shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  o.status === "resolved"
                    ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                    : "bg-amber-500/20 text-amber-200 ring-1 ring-amber-500/35"
                )}
              >
                {o.status === "resolved" ? "Resolved" : "Partial"}
              </span>
              <div>
                <span className="font-semibold text-white">{o.title}:</span>{" "}
                <span className="text-sm text-zinc-300">{o.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 px-4 py-6 lg:px-6">
        <blockquote className="text-sm italic leading-relaxed text-zinc-400">
          “{w.quote.text}”
        </blockquote>
        <p className="mt-3 text-xs text-zinc-500">
          — <span className="font-medium text-zinc-400">{w.quote.attribution}</span>
          {w.quote.context ? `, ${w.quote.context}` : ""}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 font-heading text-xl font-bold text-secondary md:text-2xl"
    >
      {children}
    </h2>
  );
}

export function SheinCaseStudy({
  project,
  backLink,
}: {
  project: Project;
  backLink: { to: string; label: string };
}) {
  return (
    <article className="mx-auto w-full min-w-0 max-w-4xl pb-16">
      <div className="mb-8">
        <Link
          to={backLink.to}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-1 pl-0 text-primary"
          )}
        >
          <ArrowLeft className="size-4" />
          {backLink.label}
        </Link>
      </div>

      <ProjectPosterHeader project={project} />

      {project.heroImage ? (
        <LetterboxedProjectHero
          src={project.heroImage}
          alt={`${project.name} mockup`}
        />
      ) : null}

      <OutcomeSummaryWidget />

      <div className="space-y-12 text-sm leading-relaxed text-muted-foreground">
        <section aria-labelledby="shein-problem" className="space-y-4">
          <SectionTitle id="shein-problem">01 — The Problem</SectionTitle>
          {C.problem.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          <ul className="list-inside list-disc space-y-2 pl-1">
            {C.problem.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="shein-research" className="space-y-4">
          <SectionTitle id="shein-research">02 — Research Methodology</SectionTitle>
          {C.research.paragraphs.map((p) => (
            <p key={p.slice(0, 50)}>
              <InlineBold text={p} />
            </p>
          ))}
        </section>

        <section aria-labelledby="shein-found" className="space-y-6">
          <SectionTitle id="shein-found">03 — What We Found</SectionTitle>
          <p className="font-medium text-foreground">{C.findings.intro}</p>
          {C.findings.themes.map((theme) => (
            <div key={theme.title} className="space-y-3">
              <h3 className="font-heading text-base font-bold text-primary">
                {theme.title}
              </h3>
              <p>{theme.body}</p>
              {"quote" in theme && theme.quote ? (
                <PullQuote
                  quote={theme.quote.text}
                  attribution={theme.quote.attribution}
                />
              ) : null}
            </div>
          ))}
        </section>

        <section aria-labelledby="shein-opp" className="space-y-4">
          <SectionTitle id="shein-opp">04 — Design Opportunities</SectionTitle>
          <p>From the research, we defined five key design opportunities:</p>
          <ol className="list-inside list-decimal space-y-2 pl-1">
            {C.opportunities.map((o) => (
              <li key={o.slice(0, 48)}>{o}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="shein-stories" className="space-y-4">
          <SectionTitle id="shein-stories">05 — User Stories</SectionTitle>
          <p>
            We translated research findings into six user stories anchored to real
            interview quotes:
          </p>
          <div className="not-prose overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[520px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {C.userStories.headers.map((h) => (
                    <th key={h} className="px-3 py-2.5 font-heading font-semibold text-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {C.userStories.rows.map((row) => (
                  <tr
                    key={row.userType}
                    className="border-b border-border/80 last:border-0"
                  >
                    <td className="px-3 py-2.5 align-top text-foreground">
                      {row.userType}
                    </td>
                    <td className="px-3 py-2.5 align-top">{row.goal}</td>
                    <td className="px-3 py-2.5 align-top">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="shein-visual" className="space-y-4">
          <SectionTitle id="shein-visual">06 — Visual Design Strategy</SectionTitle>
          {C.visualStrategy.paragraphs.map((p) => (
            <p key={p.slice(0, 50)}>
              <InlineBold text={p} />
            </p>
          ))}
        </section>

        <section aria-labelledby="shein-features" className="space-y-5">
          <SectionTitle id="shein-features">07 — Proposed Features</SectionTitle>
          <p>
            Five evidence-backed features were proposed, each tied directly to
            interview findings:
          </p>
          {C.features.map((f) => (
            <div key={f.title}>
              <h3 className="font-heading text-base font-bold text-primary">
                {f.title}
              </h3>
              <p className="mt-2">{f.body}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="shein-proto" className="space-y-6">
          <SectionTitle id="shein-proto">08 — Prototype</SectionTitle>
          <p>
            We built two iterations before usability testing.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {C.prototypes.loFi.label}
              </h3>
              <p className="mt-2">{C.prototypes.loFi.description}</p>
              <a
                href={C.prototypes.loFi.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "mt-2 h-auto px-0 text-primary"
                )}
              >
                → {C.prototypes.loFi.linkText}
              </a>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-muted/20 shadow-inner">
              <iframe
                title="SHEIN redesign low-fidelity Figma prototype"
                className="aspect-16/10 min-h-[360px] w-full"
                src={figmaEmbedSrc(C.prototypes.loFi.url)}
                allowFullScreen
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {C.prototypes.hiFi.label}
              </h3>
              <p className="mt-2">{C.prototypes.hiFi.description}</p>
              <a
                href={C.prototypes.hiFi.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "mt-2 h-auto px-0 text-primary"
                )}
              >
                → {C.prototypes.hiFi.linkText}
              </a>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-muted/20 shadow-inner">
              <iframe
                title="SHEIN redesign high-fidelity Figma prototype"
                className="aspect-16/10 min-h-[360px] w-full"
                src={figmaEmbedSrc(C.prototypes.hiFi.url)}
                allowFullScreen
              />
            </div>
          </div>

          <p>
            <InlineBold text={C.prototypes.nielsen} />
          </p>
        </section>

        <section aria-labelledby="shein-test" className="space-y-4">
          <SectionTitle id="shein-test">09 — Usability Testing</SectionTitle>
          <ul className="space-y-1">
            <li>
              <span className="font-semibold text-foreground">Method:</span>{" "}
              {C.usability.method}
            </li>
            <li>
              <span className="font-semibold text-foreground">Participant:</span>{" "}
              {C.usability.participant}
            </li>
            <li>
              <span className="font-semibold text-foreground">Duration:</span>{" "}
              {C.usability.duration}
            </li>
            <li>
              <span className="font-semibold text-foreground">Tasks tested:</span>{" "}
              {C.usability.tasks}
            </li>
          </ul>

          <div>
            <h3 className="font-heading text-base font-bold text-primary">
              What worked
            </h3>
            <p className="mt-2">{C.usability.worked.intro}</p>
            <ul className="mt-3 list-inside list-disc space-y-2 pl-1">
              {C.usability.worked.bullets.map((b) => (
                <li key={b.slice(0, 40)}>{b}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold text-primary">
              What didn&apos;t work
            </h3>
            <p className="mt-2">{C.usability.didntWork.intro}</p>
            <PullQuote
              quote={C.usability.didntWork.quote.text}
              attribution={C.usability.didntWork.quote.attribution}
            />
          </div>
        </section>

        <section aria-labelledby="shein-outcomes" className="space-y-4">
          <SectionTitle id="shein-outcomes">10 — Outcomes &amp; Reflections</SectionTitle>
          <div className="not-prose overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[480px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-3 py-2.5 font-heading font-semibold text-foreground">
                    Pain Point
                  </th>
                  <th className="px-3 py-2.5 font-heading font-semibold text-foreground">
                    Redesign Solution
                  </th>
                  <th className="px-3 py-2.5 font-heading font-semibold text-foreground">
                    Resolved?
                  </th>
                </tr>
              </thead>
              <tbody>
                {C.outcomes.rows.map((row) => (
                  <tr
                    key={row.pain}
                    className="border-b border-border/80 last:border-0"
                  >
                    <td className="px-3 py-2.5 align-top text-foreground">
                      {row.pain}
                    </td>
                    <td className="px-3 py-2.5 align-top">{row.solution}</td>
                    <td className="px-3 py-2.5 align-top">
                      {row.resolved === "yes" ? (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          Yes
                        </span>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400">
                          Partially
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {C.outcomes.reflection.map((p) => (
            <p key={p.slice(0, 50)}>{p}</p>
          ))}
        </section>

        <Separator />

        <div className="flex flex-wrap gap-4 not-prose">
          {project.ctaPresentationUrl ? (
            <a
              href={project.ctaPresentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants())}
            >
              {project.ctaPresentationLabel ?? "View Presentation"}
            </a>
          ) : null}
          {project.ctaPrototypeUrl ? (
            <a
              href={project.ctaPrototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {project.ctaPrototypeLabel ?? "Hi-Fi Prototype"}
            </a>
          ) : null}
          <a
            href={C.prototypes.loFi.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Lo-fi Prototype
          </a>
        </div>
      </div>
    </article>
  );
}
