import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { checkYourselfCaseStudy as C } from "@/data/checkYourselfCaseStudy";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Project = (typeof portfolioData.projects)[number];

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

function PullQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution?: string;
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
      {attribution ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function CheckYourselfCaseStudy({
  project,
  backLink,
}: {
  project: Project;
  backLink: { to: string; label: string };
}) {
  return (
    <article className="mx-auto w-full min-w-0 max-w-3xl pb-16">
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

      <header className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold md:text-4xl">
          {project.name}
        </h1>
        {project.label ? (
          <Badge className="mt-3" variant="secondary">
            {project.label}
          </Badge>
        ) : null}
        
        <br />

        {project.role ? (
          <dl className="mt-4 text-sm">
            <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1 text-secondary">{project.role}</dd>
          </dl>
        ) : null}
      </header>

      {project.heroImage ? (
        <div className="mb-10 overflow-hidden rounded-xl border border-border shadow">
          <img
            src={project.heroImage}
            alt={`${project.name} mockup`}
            className="w-full object-cover"
          />
        </div>
      ) : null}

      <p className="text-base leading-relaxed text-muted-foreground">
        {C.tagline}
      </p>

      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        {C.meta.map((row) => (
          <div key={row.label}>
            <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {row.label}
            </dt>
            <dd className="mt-1 text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 space-y-12 text-sm leading-relaxed text-muted-foreground">
        <section aria-labelledby="cy-empathize" className="space-y-4">
          <SectionTitle id="cy-empathize">01 — Empathize</SectionTitle>
          <p>{C.empathize.intro}</p>

          <div className="not-prose grid gap-4 sm:grid-cols-3">
            {C.empathize.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border bg-muted/30 px-4 py-4"
              >
                <p className="font-heading text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                  {m.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-foreground">
                  {m.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {m.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="not-prose space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              {C.empathize.barriersUncovered.title}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {C.empathize.barriersUncovered.items.map((b) => (
                <div
                  key={b.title}
                  className="rounded-lg border border-border p-4"
                >
                  <h4 className="font-heading text-base font-bold text-foreground">
                    {b.title}
                  </h4>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {b.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <PullQuote quote={C.empathize.quote} />

          <PullQuote
            quote={C.empathize.teamReflection.quote}
            attribution={C.empathize.teamReflection.attribution}
          />
        </section>

        <section aria-labelledby="cy-define" className="space-y-4">
          <SectionTitle id="cy-define">02 — Define</SectionTitle>
          <p>{C.define.intro}</p>

          <div className="not-prose rounded-lg border border-border bg-muted/20 p-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Point of View Statement
            </h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold text-foreground">User</dt>
                <dd className="mt-1 text-muted-foreground">{C.define.pov.user}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-foreground">Needs</dt>
                <dd className="mt-1 text-muted-foreground">{C.define.pov.needs}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-foreground">Insights</dt>
                <dd className="mt-1 text-muted-foreground">{C.define.pov.insights}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold text-primary">
              How Might We
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-2 pl-1">
              {C.define.hmw.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {C.define.sdgs.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs font-normal">
                {s}
              </Badge>
            ))}
          </div>
        </section>

        <section aria-labelledby="cy-ideate" className="space-y-8">
          <SectionTitle id="cy-ideate">03 — Ideate</SectionTitle>
          <p className="leading-relaxed">{C.ideate.intro}</p>
          <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3">
            {C.ideate.features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col rounded-lg border border-border bg-card/40 p-3.5 shadow-sm sm:p-4"
              >
                <h3 className="font-heading text-sm font-bold leading-snug text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="cy-prototype" className="space-y-6">
          <SectionTitle id="cy-prototype">04 — Prototype</SectionTitle>
          <p>{C.prototype.intro}</p>

          <div className="not-prose grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {C.prototype.loFi.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {C.prototype.loFi.description}
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1.5 pl-1 text-sm">
                {C.prototype.loFi.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {C.prototype.hiFi.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {C.prototype.hiFi.description}
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1.5 pl-1 text-sm">
                {C.prototype.hiFi.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="not-prose mt-8">
            <h3 className="font-heading text-lg font-bold text-primary">
              Prototype iterations
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
              {C.prototype.iterations.map((it) => (
                <div
                  key={it.label}
                  className="flex flex-col rounded-lg border border-border bg-card/40 p-3.5 shadow-sm sm:p-4"
                >
                  <p className="font-heading text-sm font-bold leading-snug text-foreground">
                    {it.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-secondary">
                    {it.focus}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {it.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <figure className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm not-prose">
            <blockquote className="italic text-foreground/90">
              “{C.prototype.iterationNote}”
            </blockquote>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              — {C.prototype.iterationAttribution}
            </figcaption>
          </figure>
        </section>

        <section aria-labelledby="cy-test" className="space-y-4">
          <SectionTitle id="cy-test">05 — Test</SectionTitle>
          <p>{C.test.intro}</p>

          <div className="not-prose grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                What users liked
              </h3>
              <ul className="mt-3 list-inside list-disc space-y-2 pl-1 text-sm">
                {C.test.liked.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Areas for improvement
              </h3>
              <ul className="mt-3 list-inside list-disc space-y-2 pl-1 text-sm">
                {C.test.improve.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="cy-insights" className="space-y-4">
          <SectionTitle id="cy-insights">06 — Insights</SectionTitle>
          <h3 className="font-heading text-base font-bold text-primary">{C.insights.title}</h3>
          <ul className="not-prose grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 text-xs">
            {C.insights.insights.map((f) => (
              <li key={f} className="rounded border border-border bg-card/30 px-3 py-2">
                {f}
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <div className="flex flex-wrap gap-4 not-prose">
          {project.ctaUrl ? (
            <a
              href={project.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants())}
            >
              {project.ctaLabel ?? "View prototype"}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
