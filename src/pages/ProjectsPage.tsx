import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import {
  projectCategoryAccentClass,
  projectDisplayYear,
  projectPosterCategoryLabel,
} from "@/lib/project";
import { cn } from "@/lib/utils";

type SortMode = "newest" | "name";

type Project = (typeof portfolioData.projects)[number];

function ProjectArchiveCard({ project }: { project: Project }) {
  const year = projectDisplayYear(project);
  const yearLabel = year !== null ? String(year) : "—";
  return (
    <Link
      to={`/projects/${project.slug}`}
      state={{ from: "projects" }}
      className={cn(
        "group relative block aspect-2/3 cursor-pointer overflow-hidden rounded-md border border-border/60 bg-muted",
        "transition-all duration-200 ease-out",
        "hover:z-10 hover:-translate-y-1 hover:border-secondary/45",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-poster-gradient opacity-95 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <span
          className={cn(
            "mb-1 block text-[10px] font-medium tracking-widest",
            projectCategoryAccentClass(project.label)
          )}
        >
          {projectPosterCategoryLabel(project.label)}
        </span>
        <h2 className="line-clamp-2 font-heading text-sm font-bold leading-tight text-foreground sm:text-base">
          {project.name}
        </h2>
        {project.role ? (
          <p
            className={cn(
              "mt-0 max-h-0 overflow-hidden text-[11px] leading-snug text-muted-foreground opacity-0",
              "transition-[max-height,margin,opacity] duration-200 ease-out",
              "group-hover:mt-1 group-hover:max-h-12 group-hover:opacity-100",
              "line-clamp-2"
            )}
          >
            {project.role}
          </p>
        ) : null}
        <span className="mt-1 block text-[10px] font-bold text-muted-foreground">
          {yearLabel}
        </span>
      </div>
    </Link>
  );
}

export function ProjectsPage() {
  const projects = portfolioData.projects;
  const [sortBy, setSortBy] = useState<SortMode>("newest");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  useEffect(() => {
    document.title = "Projects — Matthew Benison Javier";
  }, []);

  const archiveYear = new Date().getFullYear();

  const categoryStats = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      const key = p.label ?? "Other";
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const yearBuckets = useMemo(() => {
    const years = new Set<number>();
    for (const p of projects) {
      const y = projectDisplayYear(p);
      if (y !== null) years.add(y);
    }
    const sorted = [...years].sort((a, b) => b - a);
    const threshold = 2022;
    const hasEarlier = [...years].some((y) => y < threshold);
    return { sorted, hasEarlier, threshold };
  }, [projects]);

  const filteredSorted = useMemo(() => {
    let list = [...projects];

    if (categoryFilter !== "all") {
      list = list.filter((p) => (p.label ?? "Other") === categoryFilter);
    }

    if (yearFilter !== "all") {
      list = list.filter((p) => {
        const y = projectDisplayYear(p);
        if (y === null) return false;
        if (yearFilter === "Earlier") return y < yearBuckets.threshold;
        return String(y) === yearFilter;
      });
    }

    if (sortBy === "newest") {
      list.sort((a, b) => {
        const ya = projectDisplayYear(a) ?? 0;
        const yb = projectDisplayYear(b) ?? 0;
        return yb - ya;
      });
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [projects, categoryFilter, yearFilter, sortBy, yearBuckets.threshold]);

  const yearShelves = useMemo(() => {
    if (sortBy !== "newest") return null;
    const map = new Map<number | "other", Project[]>();
    for (const p of filteredSorted) {
      const y = projectDisplayYear(p);
      const key = y === null ? "other" : y;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    const numericKeys = [...map.keys()]
      .filter((k): k is number => k !== "other")
      .sort((a, b) => b - a);
    const keys: (number | "other")[] = [...numericKeys];
    if (map.has("other")) keys.push("other");
    return keys.map((yearKey) => ({ yearKey, items: map.get(yearKey)! }));
  }, [filteredSorted, sortBy]);

  return (
    <div className="pb-12">
      <header className="mb-8 flex flex-col gap-8 md:mb-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-0.5 w-8 bg-secondary" aria-hidden />
              <span className="text-xs font-medium uppercase tracking-widest text-secondary">
                Archive {archiveYear}
              </span>
            </div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
              All Projects
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              A catalog of work—newest shelves first.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border/50 bg-muted/20 p-1 dark:bg-muted/15">
            <span className="px-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Sort
            </span>
            <button
              type="button"
              onClick={() => setSortBy("newest")}
              className={cn(
                buttonVariants({ variant: sortBy === "newest" ? "default" : "ghost", size: "sm" }),
                "h-8 rounded-md px-4 text-xs font-bold"
              )}
            >
              Newest
            </button>
            <button
              type="button"
              onClick={() => setSortBy("name")}
              className={cn(
                buttonVariants({ variant: sortBy === "name" ? "default" : "ghost", size: "sm" }),
                "h-8 rounded-md px-4 text-xs font-bold text-muted-foreground",
                sortBy === "name" && "text-primary-foreground"
              )}
            >
              A–Z
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-10 md:flex-row md:gap-10">
        <aside className="w-full shrink-0 space-y-10 md:w-64">
          <section>
            <h2 className="mb-4 border-b border-border/40 pb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Category
            </h2>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => setCategoryFilter("all")}
                  className="group flex w-full cursor-pointer items-center justify-between text-left"
                >
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      categoryFilter === "all"
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-secondary"
                    )}
                  >
                    All categories
                  </span>
                  <span className="text-[10px] text-muted-foreground">{projects.length}</span>
                </button>
              </li>
              {categoryStats.map(([label, count]) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setCategoryFilter(label)}
                    className="group flex w-full cursor-pointer items-center justify-between text-left"
                  >
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors",
                        categoryFilter === label
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-secondary"
                      )}
                    >
                      {label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 border-b border-border/40 pb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Year
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setYearFilter("all")}
                className={cn(
                  "col-span-2 rounded-md border border-transparent py-2 text-xs font-bold transition-colors",
                  yearFilter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:border-border/60 dark:bg-muted/40"
                )}
              >
                All years
              </button>
              {yearBuckets.sorted.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYearFilter(String(y))}
                  className={cn(
                    "rounded-md border border-transparent py-2 text-xs font-bold transition-colors",
                    yearFilter === String(y)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 text-muted-foreground hover:border-border/60 dark:bg-muted/40"
                  )}
                >
                  {y}
                </button>
              ))}
              {yearBuckets.hasEarlier ? (
                <button
                  type="button"
                  onClick={() => setYearFilter("Earlier")}
                  className={cn(
                    "col-span-2 rounded-md border border-transparent py-2 text-xs font-bold transition-colors",
                    yearFilter === "Earlier"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted/60 text-muted-foreground hover:border-border/60 dark:bg-muted/40"
                  )}
                >
                  Earlier
                </button>
              ) : null}
            </div>
          </section>
        </aside>

        <div className="min-w-0 flex-1">
          {filteredSorted.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/60 bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
              No projects match these filters. Try another category or year.
            </p>
          ) : yearShelves ? (
            <div className="space-y-12">
              {yearShelves.map(({ yearKey, items }) => (
                <section key={String(yearKey)} aria-labelledby={`shelf-${yearKey}`}>
                  <div
                    id={`shelf-${yearKey}`}
                    className="mb-4 flex flex-wrap items-baseline gap-3 border-b border-border/30 pb-3"
                  >
                    <h2 className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground">
                      {yearKey === "other" ? "Other" : yearKey}
                    </h2>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      {items.length} {items.length === 1 ? "project" : "projects"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((project) => (
                      <ProjectArchiveCard key={project.slug} project={project} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSorted.map((project) => (
                <ProjectArchiveCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
