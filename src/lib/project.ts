export function isUXProject(project: { label?: string; tech?: string }): boolean {
  const label = project.label ?? "";
  const tech = project.tech ?? "";
  return label.includes("UX") || tech.includes("UX");
}

/** Years mentioned in a project timeline string (e.g. "June – August 2024" → [2024]). */
export function extractYearsFromTimeline(timeline: string): number[] {
  const matches = timeline.match(/\b(20\d{2})\b/g);
  return matches ? matches.map((y) => parseInt(y, 10)) : [];
}

/** Latest year in the timeline, for sorting “newest first” like the Projects page. */
export function projectDisplayYear(project: { timeline?: string }): number | null {
  const ys = extractYearsFromTimeline(project.timeline ?? "");
  return ys.length ? Math.max(...ys) : null;
}

/** Poster-style category line (archive grid / detail header). */
export function projectPosterCategoryLabel(label: string | undefined): string {
  if (!label) return "PROJECT";
  if (label.includes("UX")) return "UX / RESEARCH";
  if (label.includes("Full-Stack")) return "FULL-STACK";
  if (label.includes("Database")) return "DATABASE";
  return label.toUpperCase();
}

export function projectCategoryAccentClass(label: string | undefined): string {
  if (!label) return "text-muted-foreground";
  if (label.includes("UX")) return "text-sky-400";
  if (label.includes("Database")) return "text-primary";
  if (label.includes("Full-Stack")) return "text-secondary";
  return "text-muted-foreground";
}
