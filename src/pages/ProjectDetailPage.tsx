import { useEffect, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { isUXProject } from "@/lib/project";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SheinCaseStudy } from "@/components/projects/SheinCaseStudy";
import { CheckYourselfCaseStudy } from "@/components/projects/CheckYourselfCaseStudy";
import { CHECKYOURSELF_CASE_STUDY_SLUG } from "@/data/checkYourselfCaseStudy";
import { SHEIN_CASE_STUDY_SLUG } from "@/data/sheinCaseStudy";
import {
  LetterboxedProjectHero,
  ProjectPosterHeader,
} from "@/components/projects/project-film-detail";

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
    return <SheinCaseStudy project={project} backLink={backLink} />;
  }

  if (slug === CHECKYOURSELF_CASE_STUDY_SLUG) {
    return <CheckYourselfCaseStudy project={project} backLink={backLink} />;
  }

  const lessonsLearnedRaw =
    "lessonsLearned" in project ? project.lessonsLearned : undefined;
  const lessonsLearned = Array.isArray(lessonsLearnedRaw)
    ? lessonsLearnedRaw
    : undefined;
  const showUxLessons =
    lessonsLearned &&
    lessonsLearned.length > 0 &&
    isUXProject(project);

  return (
    <article className="mx-auto w-full min-w-0 max-w-4xl pb-12">
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

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        {project.tech ? (
          <p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Skills &amp; tools
            </span>
            <span className="mt-2 block text-foreground/90">{project.tech}</span>
          </p>
        ) : null}
        {project.longDescription ? <p>{project.longDescription}</p> : null}

        {project.highlights && project.highlights.length > 0 ? (
          <section>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Highlights
            </h2>
            <ul className="list-inside list-disc space-y-2">
              {project.highlights.map((h) => (
                <li key={h.slice(0, 40)} dangerouslySetInnerHTML={{ __html: h }} />
              ))}
            </ul>
          </section>
        ) : null}

        {showUxLessons && lessonsLearned ? (
          <section>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Key lessons learned
            </h2>
            <ul className="list-inside list-disc space-y-2">
              {lessonsLearned.map((l) => (
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
