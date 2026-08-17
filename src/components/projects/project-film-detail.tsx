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
    <header className="mb-8 border-b border-white/15 pb-7 text-left">
      <p
        className={cn(
          "text-[11px] font-bold uppercase tracking-[0.16em]",
          projectCategoryAccentClass(project.label)
        )}
      >
        {projectPosterCategoryLabel(project.label)}
      </p>
      <h1 className="font-heading mt-2 text-4xl font-black tracking-[-0.035em] text-white md:text-6xl">
        {project.name}
      </h1>
      {project.role ? (
        <dl className="mt-4 text-sm">
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1 font-semibold text-secondary">{project.role}</dd>
          </div>
        </dl>
      ) : null}
    </header>
  );
}

export function LetterboxedProjectHero({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="film-surface film-poster-ring mb-10 overflow-hidden rounded-lg border border-white/10">
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
