import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectItem = (typeof portfolioData.projects)[number];

type SortMode = "newest" | "name";

function extractYearsFromTimeline(timeline: string): number[] {
  const matches = timeline.match(/\b(20\d{2})\b/g);
  return matches ? matches.map((y) => parseInt(y, 10)) : [];
}

function projectDisplayYear(project: ProjectItem): number | null {
  const ys = extractYearsFromTimeline(project.timeline);
  return ys.length ? Math.max(...ys) : null;
}

function posterCategoryLabel(label: string | undefined): string {
  if (!label) return "PROJECT";
  if (label.includes("UX")) return "UX / RESEARCH";
  if (label.includes("Full-Stack")) return "FULL-STACK";
  if (label.includes("Database")) return "DATABASE";
  return label.toUpperCase();
}

function labelAccentClass(label: string | undefined): string {
  if (!label) return "text-muted-foreground";
  if (label.includes("UX")) return "text-sky-400";
  if (label.includes("Database")) return "text-primary";
  if (label.includes("Full-Stack")) return "text-secondary";
  return "text-muted-foreground";
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

  return (
    <div className="pb-12">
      <header className="mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-8 bg-secondary" aria-hidden />
            <span className="text-xs font-medium uppercase tracking-widest text-secondary">
              Archive {archiveYear}
            </span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
            All Projects
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-lg bg-muted/50 p-1 dark:bg-muted/30">
          <span className="px-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Sort by
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
                  className="flex w-full cursor-pointer items-center justify-between text-left group"
                >
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      categoryFilter === "all"
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-primary"
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
                    className="flex w-full cursor-pointer items-center justify-between text-left group"
                  >
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors",
                        categoryFilter === label
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-primary"
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
                  "col-span-2 rounded-md py-2 text-xs font-bold transition-colors",
                  yearFilter === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted dark:bg-muted/40"
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
                    "rounded-md py-2 text-xs font-bold transition-colors",
                    yearFilter === String(y)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted dark:bg-muted/40"
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
                    "col-span-2 rounded-md py-2 text-xs font-bold transition-colors",
                    yearFilter === "Earlier"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted dark:bg-muted/40"
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
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSorted.map((project) => {
                const year = projectDisplayYear(project);
                const yearLabel = year !== null ? String(year) : "—";
                return (
                  <Link
                    key={project.slug}
                    to={`/projects/${project.slug}`}
                    state={{ from: "projects" }}
                    className="group relative block aspect-2/3 cursor-pointer overflow-hidden rounded-lg bg-muted transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(238,178,17,0.12)] motion-reduce:transition-none motion-reduce:hover:scale-100"
                  >
                    <img
                      src={project.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-poster-gradient opacity-90" aria-hidden />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span
                        className={cn(
                          "mb-1 block text-[10px] font-medium tracking-widest",
                          labelAccentClass(project.label)
                        )}
                      >
                        {posterCategoryLabel(project.label)}
                      </span>
                      <h2 className="line-clamp-2 font-heading text-base font-bold leading-tight text-foreground">
                        {project.name}
                      </h2>
                      <span className="mt-2 block text-[10px] font-bold text-muted-foreground">
                        {yearLabel}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
