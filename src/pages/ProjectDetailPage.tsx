import { useEffect, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { isUXProject } from "@/lib/project";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SheinCaseStudy } from "@/components/projects/SheinCaseStudy";
import { SHEIN_CASE_STUDY_SLUG } from "@/data/sheinCaseStudy";

export type ProjectDetailReferrer = "home" | "projects";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const referrer = (location.state as { from?: ProjectDetailReferrer } | null)?.from;
  const backLink =
    referrer === "home"
      ? { to: "/", label: "Back to Home" as const }
      : { to: "/projects", label: "Back to Projects" as const };

  const project = useMemo(
    () => portfolioData.projects.find((p) => p.slug === slug),
    [slug]
  );

  useEffect(() => {
    if (project) document.title = `${project.name} — Matthew Benison Javier`;
  }, [project]);

  if (!slug || !project) {
    return <NotFoundPage />;
  }

  if (slug === SHEIN_CASE_STUDY_SLUG) {
    return (
      <SheinCaseStudy project={project} backLink={backLink} />
    );
  }

  const showUxLessons =
    project.lessonsLearned &&
    project.lessonsLearned.length > 0 &&
    isUXProject(project);

  return (
    <article className="mx-auto w-full min-w-0 max-w-3xl pb-12">
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
        <h1 className="font-heading text-3xl font-extrabold md:text-4xl">{project.name}</h1>
        {project.label ? (
          <Badge className="mt-3" variant="secondary">
            {project.label}
          </Badge>
        ) : null}
        {project.timeline ? (
          <p className="mt-4 text-sm text-muted-foreground">{project.timeline}</p>
        ) : null}
        {project.role ? (
          <p className="mt-1 text-sm text-primary">{project.role}</p>
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

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        {project.tech ? (
          <p>
            <span className="font-semibold text-foreground">Skills &amp; tools:</span>{" "}
            {project.tech}
          </p>
        ) : null}
        {project.longDescription ? <p>{project.longDescription}</p> : null}

        {project.highlights && project.highlights.length > 0 ? (
          <section>
            <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
              Highlights
            </h2>
            <ul className="list-inside list-disc space-y-2">
              {project.highlights.map((h) => (
                <li key={h.slice(0, 40)} dangerouslySetInnerHTML={{ __html: h }} />
              ))}
            </ul>
          </section>
        ) : null}

        {showUxLessons && project.lessonsLearned ? (
          <section>
            <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
              Key lessons learned
            </h2>
            <ul className="list-inside list-disc space-y-2">
              {project.lessonsLearned.map((l) => (
                <li key={l.slice(0, 40)} dangerouslySetInnerHTML={{ __html: l }} />
              ))}
            </ul>
          </section>
        ) : null}

        <Separator />

        <div className="flex flex-wrap gap-4">
          {project.ctaPresentationUrl ? (
            <a
              href={project.ctaPresentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants())}
            >
              {project.ctaPresentationLabel ?? "View presentation"}
            </a>
          ) : null}
          {project.ctaPrototypeUrl ? (
            <a
              href={project.ctaPrototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {project.ctaPrototypeLabel ?? "Interactive prototype"}
            </a>
          ) : null}
          {!project.ctaPresentationUrl &&
          !project.ctaPrototypeUrl &&
          project.ctaUrl ? (
            <a
              href={project.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants())}
            >
              {project.ctaLabel ?? "View project"}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
