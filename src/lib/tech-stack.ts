import { portfolioData } from "@/data/portfolio";

export type TechCategoryKey = keyof typeof portfolioData.techStack;

export const TECH_CATEGORY_LABELS: Record<TechCategoryKey, string> = {
  backend: "Backend",
  frontend: "Frontend",
  databases: "Databases",
  cloudDevops: "Cloud & DevOps",
  uiux: "UI/UX",
  tools: "Tools",
};

/** Full order on the dedicated tech stack page */
export const TECH_CATEGORY_ORDER: TechCategoryKey[] = [
  "frontend",
  "backend",
  "databases",
  "cloudDevops",
  "uiux",
  "tools",
];

/** Three-line preview on the home page */
export const TECH_HOME_PREVIEW_KEYS: TechCategoryKey[] = ["frontend", "backend", "databases"];
