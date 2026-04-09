import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, ChevronDown, FileText, Mail } from "lucide-react";
import { TypewriterText } from "@/components/typewriter-text";
import { portfolioData } from "@/data/portfolio";
import { ContactEmailForm } from "@/components/contact-email-form";
import { CreativeGallerySection } from "@/components/creative-gallery-section";
import { TechPill } from "@/components/tech-pill";
import { TECH_CATEGORY_LABELS, TECH_HOME_PREVIEW_KEYS } from "@/lib/tech-stack";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projectDisplayYear } from "@/lib/project";
import { cn } from "@/lib/utils";

const HERO_BG = "/assets/images/wavebg.png";
const HERO_PLACEHOLDER_BEFORE = "/assets/images/herobg-before.JPG";
const HERO_PLACEHOLDER_AFTER = "/assets/images/herobg-after.png";

const RECENT_PROJECT_COUNT = 3;
const RECENT_CERTIFICATIONS_COUNT = 6;
const INTRO_VISIBLE_MS = 3500;
const INTRO_TOTAL_MS = 4500;

const SOCIAL_GITHUB_ICON =
  "https://raw.githubusercontent.com/CLorant/readme-social-icons/main/medium/light/github.svg";
const SOCIAL_LINKEDIN_ICON =
  "https://raw.githubusercontent.com/CLorant/readme-social-icons/main/medium/light/linkedin.svg";
const SOCIAL_INSTAGRAM_ICON =
  "https://raw.githubusercontent.com/CLorant/readme-social-icons/main/medium/light/instagram.svg";

function shouldRunSessionIntro() {
  if (typeof window === "undefined") return false;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return false;
  const introStorageKey = "portfolio-intro-seen-session";
  return window.sessionStorage.getItem(introStorageKey) !== "1";
}

export function HomePage() {
  const { profile, workExperience, organizations, projects, certifications } = portfolioData;
  const recentProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => {
        const ya = projectDisplayYear(a) ?? 0;
        const yb = projectDisplayYear(b) ?? 0;
        return yb - ya;
      })
      .slice(0, RECENT_PROJECT_COUNT);
  }, [projects]);
  const recentCertifications = certifications.slice(0, RECENT_CERTIFICATIONS_COUNT);
  const [openExperienceId, setOpenExperienceId] = useState<string | null>(null);
  const [runIntro, setRunIntro] = useState(() => shouldRunSessionIntro());
  const [introOverlayStage, setIntroOverlayStage] = useState<"hidden" | "visible" | "exiting">(() =>
    shouldRunSessionIntro() ? "visible" : "hidden"
  );
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    document.title = "Matthew Benison Javier";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const introStorageKey = "portfolio-intro-seen-session";
    const introShouldRun = shouldRunSessionIntro();
    if (introShouldRun) {
      setRunIntro(true);
      window.sessionStorage.setItem(introStorageKey, "1");
    }
  }, []);

  useEffect(() => {
    if (!runIntro) return;

    setIntroProgress(0);
    setIntroOverlayStage("visible");
    const kickProgress = window.setTimeout(() => {
      setIntroProgress(100);
    }, 60);
    const beginExit = window.setTimeout(() => {
      setIntroOverlayStage("exiting");
    }, INTRO_VISIBLE_MS);
    const hideOverlay = window.setTimeout(() => {
      setIntroOverlayStage("hidden");
    }, INTRO_TOTAL_MS);

    return () => {
      window.clearTimeout(kickProgress);
      window.clearTimeout(beginExit);
      window.clearTimeout(hideOverlay);
    };
  }, [runIntro]);

  return (
    <div className="relative">
      {introOverlayStage !== "hidden" ? (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background/95 px-6 backdrop-blur-md",
            "transition-opacity duration-500 ease-out",
            introOverlayStage === "exiting" ? "opacity-0" : "opacity-100"
          )}
          aria-hidden
        >
          <div
            className={cn(
              "text-center transition-all duration-500 ease-out",
              introOverlayStage === "exiting" ? "translate-y-1 scale-95 opacity-0" : "translate-y-0 scale-100 opacity-100"
            )}
          >
            <p className="font-heading text-[30px] font-bold tracking-tight text-primary sm:text-[48px]">
              Welcome to My Portfolio!
            </p>
            <p className="mt-3 text-[14px] font-medium tracking-wide text-muted-foreground sm:text-[16px]">
              Loading experience...
            </p>
            <div className="mx-auto mt-5 h-[6px] w-[224px] overflow-hidden rounded-full bg-muted/60 sm:w-[288px]">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-secondary transition-[width] duration-1800 ease-out"
                style={{
                  width: `${introProgress}%`,
                  transitionDuration: `${INTRO_VISIBLE_MS}ms`,
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={cn(
          "space-y-12 transition-[opacity,transform,filter] duration-500 ease-out sm:space-y-16",
          introOverlayStage !== "hidden" && "pointer-events-none scale-[0.995] blur-[1px] opacity-0"
        )}
      >
      <section className="relative mb-6 flex min-h-[min(380px,78svh)] w-full flex-col justify-end overflow-hidden rounded-lg border border-border/50 px-4 py-7 shadow-2xl sm:mb-8 sm:min-h-[min(440px,75vh)] sm:rounded-xl sm:px-6 sm:py-9 md:px-12 md:py-11">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-175"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-background via-background/75 to-background/35"
          aria-hidden
        />
        <div className="relative z-10 flex w-full flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 max-w-7xl flex-1 text-left">
            <p
              className={cn(
                "font-['Inter'] text-xl font-medium text-foreground/90 sm:text-2xl md:text-3xl",
                runIntro && "animate-in fade-in slide-in-from-bottom-2 duration-500"
              )}
            >
              Hello, I&apos;m
            </p>
            <h1
              className={cn(
                "mt-0.5 bg-linear-to-b from-primary to-secondary bg-clip-text font-['Inter'] text-[clamp(2.35rem,6.5vw,4.25rem)] font-extrabold tracking-tight text-transparent md:text-7xl lg:text-8xl",
                runIntro &&
                  "animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-700"
              )}
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSynthesis: "none",
                ...(runIntro ? { animationDelay: "100ms" } : {}),
              }}
            >
              {profile.name}
            </h1>
            <div
              className={cn(
                "mt-3 h-2 w-36 rounded-full bg-secondary sm:mt-3.5 sm:w-18",
                runIntro && "animate-in fade-in duration-500"
              )}
              style={runIntro ? { animationDelay: "160ms" } : undefined}
              aria-hidden
            />
            <p
              className={cn(
                "mt-3 font-['Inter'] text-2xl font-bold tracking-tight text-foreground sm:mt-3.5 sm:text-3xl md:text-4xl lg:text-5xl",
                runIntro && "animate-in fade-in slide-in-from-bottom-1 duration-700"
              )}
              style={runIntro ? { animationDelay: "220ms" } : undefined}
            >
              I am a{" "}
              <TypewriterText
                texts={[
                  "UI/UX Designer.",
                  "Web Developer.",
                  "UX Researcher.",
                  "Database Administrator.",
                  "Lifelong Learner.",
                ]}
                className="font-['Inter'] text-2xl font-bold tracking-tight text-secondary sm:text-3xl md:text-4xl lg:text-5xl"
              />
            </p>
            <div
              className={cn(
                "mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3",
                runIntro && "animate-in fade-in slide-in-from-bottom-2 duration-700"
              )}
              style={runIntro ? { animationDelay: "320ms" } : undefined}
            >
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 shadow-lg shadow-primary/20"
                )}
              >
                <FileText className="size-4" aria-hidden />
                View Resume
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2"
                )}
              >
                <Mail className="size-4" aria-hidden />
                Get in touch
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "inline-flex gap-2"
                )}
              >
                <img
                  src={SOCIAL_LINKEDIN_ICON}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 shrink-0 object-contain"
                  aria-hidden
                />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "inline-flex gap-2"
                )}
              >
                <img
                  src={SOCIAL_GITHUB_ICON}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 shrink-0 object-contain"
                  aria-hidden
                />
                GitHub
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "inline-flex gap-2"
                )}
              >
                <img
                  src={SOCIAL_INSTAGRAM_ICON}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 shrink-0 object-contain"
                  aria-hidden
                />
                Instagram
              </a>
            </div>
          </div>
          <div
            className={cn(
              "mx-auto shrink-0 p-2 sm:p-4 lg:mx-0 lg:mt-2",
              runIntro && "animate-in fade-in zoom-in-95 duration-700"
            )}
            style={runIntro ? { animationDelay: "240ms" } : undefined}
          >
            <div
              className={cn(
                "group relative size-52 cursor-default sm:size-60 md:size-72 lg:size-80",
                "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform",
                "hover:scale-110 hover:-rotate-2",
                "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:rotate-0"
              )}
              role="img"
              aria-label={`${profile.name} — hover to reveal alternate photo`}
            >
              {/* Fire glow — only on hover */}
              <div
                className="pointer-events-none absolute -inset-3 z-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:group-hover:opacity-0"
                aria-hidden
              >
                <div
                  className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_130%_110%_at_50%_100%,rgba(255,140,40,0.65)_0%,rgba(255,70,0,0.45)_35%,rgba(255,40,0,0.2)_55%,transparent_72%)]"
                  style={{
                    animation: "hero-fire-flicker 0.42s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute -inset-1 rounded-full bg-[radial-gradient(ellipse_100%_90%_at_50%_110%,rgba(255,220,80,0.55)_0%,rgba(255,100,20,0.4)_45%,transparent_68%)] mix-blend-screen"
                  style={{
                    animation: "hero-fire-flicker 0.55s ease-in-out infinite",
                    animationDelay: "0.08s",
                  }}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 z-2 animate-spin rounded-full border-2 border-dashed border-primary animation-duration-[30s] motion-reduce:animate-none"
                aria-hidden
              />
              <div className="absolute inset-[8px] z-10 overflow-hidden rounded-full bg-muted/50 shadow-inner">
                <img
                  src={HERO_PLACEHOLDER_BEFORE}
                  alt=""
                  className="absolute inset-0 size-full object-cover object-center transition-opacity duration-500 group-hover:opacity-0 motion-reduce:group-hover:opacity-100"
                  draggable={false}
                />
                <img
                  src={HERO_PLACEHOLDER_AFTER}
                  alt=""
                  className="absolute inset-0 size-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-6 lg:gap-8">
        <div className="space-y-5 md:col-span-8 md:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-heading text-2xl font-bold sm:gap-3 sm:text-3xl">
              <span className="h-7 w-1.5 rounded-sm bg-secondary sm:h-8" />
              Recent Projects
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {recentProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                state={{ from: "home" }}
                className="group block"
              >
                <Card className="border border-border/50 bg-card/40 shadow-inner ring-0 transition-[colors,box-shadow] duration-300 ease-out hover:border-primary/40 hover:bg-muted/30 hover:shadow-md">
                  <CardContent className="flex flex-row items-stretch gap-4 p-4 sm:gap-5 sm:p-5">
                    <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-card/30 sm:h-32 sm:w-44">
                      <img
                        src={project.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-1">
                      <h3 className="font-heading text-base font-bold leading-snug sm:text-lg">
                        {project.name}
                      </h3>
                      {project.label ? (
                        <Badge variant="secondary" className="w-fit text-[10px] sm:text-xs mt-1">
                          {project.label}
                        </Badge>
                      ) : null}
                      {project.description ? (
                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground mt-3">
                          {project.description}
                        </p>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Link
            to="/projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "inline-flex w-full gap-2 sm:w-auto"
            )}
          >
            View all projects
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <aside className="space-y-8 md:col-span-4 md:space-y-10">
          <Card className="border border-border/50 bg-card/40 shadow-inner ring-0 transition-[colors,box-shadow] duration-300 ease-out hover:bg-muted/30 hover:shadow-md">
            <CardContent className="space-y-4 sm:space-y-4 px-6 pb-6 pt-0 sm:px-6 sm:pb-6 sm:pt-0">
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold sm:gap-3 sm:text-2xl">
                <span className="h-6 w-1.5 rounded-sm bg-secondary transition-colors duration-300 ease-out" />
                Experience
              </h3>

              <div>
                <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  Work experience
                </p>
                <ExperienceEntries
                  sectionKey="work"
                  entries={workExperience}
                  openId={openExperienceId}
                  onOpenChange={setOpenExperienceId}
                />
              </div>

              <div>
                <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  Organizations
                </p>
                <ExperienceEntries
                  sectionKey="organizations"
                  entries={organizations}
                  openId={openExperienceId}
                  onOpenChange={setOpenExperienceId}
                />
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="-mt-5 grid grid-cols-1 gap-6 sm:-mt-7 lg:grid-cols-2">
        <Card className="border border-border/50 bg-card/40 shadow-inner ring-0 transition-shadow duration-300 ease-out hover:shadow-md">
          <CardContent className="px-4 pb-4 pt-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold sm:gap-3 sm:text-2xl">
               <span className="h-7 w-1.5 rounded-sm bg-secondary transition-colors duration-300 ease-out" />
                Tech Stack
              </h2>
              <Link
                to="/tech-stack"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "shrink-0 gap-1.5"
                )}
              >
                View all
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
            <div className="space-y-5">
              {TECH_HOME_PREVIEW_KEYS.map((key) => {
                const items = portfolioData.techStack[key];
                return (
                  <div key={key}>
                    <h3 className="mb-2 font-heading text-sm font-semibold text-foreground">
                      {TECH_CATEGORY_LABELS[key]}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <TechPill key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 bg-card/40 shadow-inner ring-0 transition-shadow duration-300 ease-out hover:shadow-md">
          <CardContent className="px-4 pb-4 pt-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold sm:gap-3 sm:text-2xl">
                <span className="h-7 w-1.5 rounded-sm bg-secondary transition-colors duration-300 ease-out" />
                Recent Certifications</h2>
              <Link
                to="/certifications"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "shrink-0 gap-1.5"
                )}
              >
                View all
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {recentCertifications.map((c) => (
                <a
                  key={c.title}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-border/50 bg-muted/10 p-2.5 transition-colors hover:border-primary/40 hover:bg-muted/30"
                >
                  <p className="font-heading text-sm font-bold leading-snug">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-primary">{c.date}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <CreativeGallerySection />

      <section
        id="contact"
        className="-mt-5 scroll-mt-24 rounded-xl border border-border/50 bg-card/40 p-6 shadow-inner sm:p-8 sm:scroll-mt-28"
      >
        <div className="mb-4 flex items-center gap-2 sm:mb-5 sm:gap-3">
          <span className="h-6 w-1.5 rounded-sm bg-secondary sm:h-7" aria-hidden />
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Let's Connect!</h2>
        </div>
        <p className="mb-6 max-w-full text-sm leading-relaxed text-muted-foreground sm:text-base">
          I'm currently seeking exciting internship opportunities! If you'd like to connect or collaborate, feel free to reach out by email, connect with me on LinkedIn, or check out my GitHub.
        </p>

        <div className="mb-8 rounded-lg border border-border/60 bg-muted/20 p-4 sm:p-5">
          <h3 className="mb-4 font-heading text-base font-semibold text-foreground sm:text-lg">Send me a message</h3>
          <ContactEmailForm />
        </div>
      </section>
      </div>
    </div>
  );
}

type ExperienceEntry = {
  name: string;
  dates: string;
  role: string;
  highlights: string[];
  /** Optional logo URL; when absent, a neutral placeholder is shown */
  logo?: string;
};

function ExperienceEntries({
  entries,
  sectionKey,
  openId,
  onOpenChange,
}: {
  entries: readonly ExperienceEntry[];
  sectionKey: string;
  openId: string | null;
  onOpenChange: (id: string | null) => void;
}) {
  return (
    <div className="space-y-2">
      {entries.map((item, i) => {
        const id = `${sectionKey}-${i}`;
        const isOpen = openId === id;

        return (
        <details
          key={id}
          open={isOpen}
          className={cn(
            "group overflow-hidden rounded-lg border border-border/50 bg-muted/10 shadow-sm",
            "transition-[border-color,box-shadow,background-color] duration-300 ease-out",
            "hover:border-primary/40 hover:bg-muted/30",
            "open:border-secondary/25 open:bg-secondary/4 open:shadow-md",
            "open:hover:border-secondary/25 open:hover:bg-secondary/4",
            "motion-reduce:transition-none"
          )}
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start gap-2 p-2.5 outline-none marker:hidden sm:p-3 [&::-webkit-details-marker]:hidden",
              "rounded-lg transition-[background-color,color] duration-200 ease-out",
              "group-open:bg-secondary/8",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
            onClick={(e) => {
              e.preventDefault();
              onOpenChange(isOpen ? null : id);
            }}
          >
            <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-2.5">
              <div
                className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border/50 bg-muted/40 transition-[border-color,background-color] duration-300 ease-out group-open:border-secondary/20 group-open:bg-muted/60 sm:size-10"
                aria-hidden
              >
                {item.logo ? (
                  <img src={item.logo} alt="" className="size-full object-cover" />
                ) : (
                  <span className="flex size-full items-center justify-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-open:scale-105">
                    <Building2 className="size-4 text-muted-foreground/35" strokeWidth={1.25} aria-hidden />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="block wrap-break-word font-heading text-sm font-semibold leading-snug text-white sm:text-base">
                  {item.role}
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-muted-foreground sm:text-xs">
                  {item.name}
                  <span aria-hidden> · </span>
                  {item.dates}
                </span>
              </div>
            </div>
            <ChevronDown
              className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden
            />
          </summary>
          <div
            className={cn(
              "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out",
              "motion-reduce:transition-none group-open:grid-rows-[1fr]"
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="border-t border-border/40 px-3 pb-3 pt-3">
                <ul className="list-outside list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-muted-foreground/90">
                  {item.highlights.map((h, i) => (
                    <li
                      key={`${item.name}-${i}`}
                      className={cn(
                        "pl-0.5 motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out",
                        "translate-y-1 opacity-0 group-open:translate-y-0 group-open:opacity-100",
                        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
                      )}
                      style={{ transitionDelay: `${Math.min(i, 5) * 45}ms` }}
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </details>
        );
      })}
    </div>
  );
}
