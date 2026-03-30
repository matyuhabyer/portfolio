export function isUXProject(project: { label?: string; tech?: string }): boolean {
  const label = project.label ?? "";
  const tech = project.tech ?? "";
  return label.includes("UX") || tech.includes("UX");
}
