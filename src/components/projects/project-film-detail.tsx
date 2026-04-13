import {
  projectCategoryAccentClass,
  projectPosterCategoryLabel,
} from "@/lib/project";
import { cn } from "@/lib/utils";

type ProjectHeaderProject = {
  name: string;
  label?: string;
  role?: string;
};

export function ProjectPosterHeader({ project }: { project: ProjectHeaderProject }) {
  return (
    <header className="mb-8 text-left">
      <p
        className={cn(
          "text-[10px] font-semibold uppercase tracking-widest",
          projectCategoryAccentClass(project.label)
        )}
      >
        {projectPosterCategoryLabel(project.label)}
      </p>
      <h1 className="font-heading mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {project.name}
      </h1>
      {project.role ? (
        <dl className="mt-4 text-sm">
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1 text-secondary">{project.role}</dd>
          </div>
        </dl>
      ) : null}
    </header>
  );
}

export function LetterboxedProjectHero({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="mb-10 overflow-hidden rounded-lg border border-border/60 bg-muted/30 dark:bg-muted/20">
      <div className="flex min-h-[180px] items-center justify-center px-2 py-5 sm:px-6 sm:py-10">
        <img
          src={src}
          alt={alt}
          className="max-h-[min(72vh,840px)] w-full max-w-4xl object-contain"
          loading="lazy"
        />
      </div>
    </figure>
  );
}
