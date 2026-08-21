import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Award, BriefcaseBusiness, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, FileText,
  Mail, Orbit, Send, Sparkles,
} from "lucide-react";
import { ContactEmailForm } from "@/components/contact-email-form";
import { ActivitySection } from "@/components/activity-section";
import { CreativeGallerySection } from "@/components/creative-gallery-section";
import { CelestialBackdrop } from "@/components/celestial-backdrop";
import { FoxPet } from "@/components/fox-pet";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { SHEIN_CASE_STUDY_SLUG } from "@/data/sheinCaseStudy";
import { CHECKYOURSELF_CASE_STUDY_SLUG } from "@/data/checkYourselfCaseStudy";
import { TECH_CATEGORY_LABELS, TECH_CATEGORY_ORDER, type TechCategoryKey } from "@/lib/tech-stack";
import { SOCIAL_GITHUB_ICON, SOCIAL_INSTAGRAM_ICON, SOCIAL_LINKEDIN_ICON } from "@/lib/social-icons";
import { cn } from "@/lib/utils";

type Project = (typeof portfolioData.projects)[number];

const CAPSTONE_PROJECT_SLUG = "luntiang-republika-iot-soil-monitoring-system";
const CAPSTONE_MODAL_SLIDES = Array.from({ length: 7 }, (_, index) => ({
  number: String(index + 1).padStart(2, "0"),
  label: `Project image ${index + 1}`,
}));

function projectYear(project: Project) {
  const match = project.timeline?.match(/20\d{2}/g);
  return match?.at(-1) ?? "Selected work";
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const modalStartRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!project) return;

    setActiveSlide(0);

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      modalStartRef.current?.focus({ preventScroll: true });
      dialogRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      secondFrame = window.requestAnimationFrame(() => {
        dialogRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [project?.slug]);

  if (!project) return null;
  const isSheinCaseStudy = project.slug === SHEIN_CASE_STUDY_SLUG;
  const isCheckYourselfCaseStudy = project.slug === CHECKYOURSELF_CASE_STUDY_SLUG;
  const gallery = "gallery" in project && Array.isArray(project.gallery) ? project.gallery : undefined;
  const hasGalleryCarousel = Boolean(gallery?.length);
  const hasPlaceholderCarousel = project.slug === CAPSTONE_PROJECT_SLUG;
  const hasImageCarousel = hasGalleryCarousel || hasPlaceholderCarousel;
  const slideCount = gallery?.length ?? CAPSTONE_MODAL_SLIDES.length;
  const isFullUxCaseStudy = isSheinCaseStudy || isCheckYourselfCaseStudy;
  const projectIndex = portfolioData.projects.findIndex((entry) => entry.slug === project.slug);
  const projectNumber = String(projectIndex + 1).padStart(2, "0");
  const projectTotal = String(portfolioData.projects.length).padStart(2, "0");
  const highlights = "highlights" in project ? project.highlights : undefined;
  const contributions =
    "contributions" in project && Array.isArray(project.contributions)
      ? project.contributions
      : highlights;
  const longDescription = "longDescription" in project ? project.longDescription : undefined;
  const highlightsLabel = "highlightsLabel" in project ? project.highlightsLabel : undefined;
  const links = [
    "ctaUrl" in project && project.ctaUrl ? { label: project.ctaLabel ?? "View project", href: project.ctaUrl } : null,
    "ctaPresentationUrl" in project && project.ctaPresentationUrl ? { label: project.ctaPresentationLabel ?? "View presentation", href: project.ctaPresentationUrl } : null,
    "ctaPrototypeUrl" in project && project.ctaPrototypeUrl ? { label: project.ctaPrototypeLabel ?? "View prototype", href: project.ctaPrototypeUrl } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        ref={dialogRef}
        initialFocus={modalStartRef}
        overlayClassName="editorial-overlay"
        closeButtonClassName="editorial-dialog-close"
        className={cn(
          "editorial-dialog project-dialog"
        )}
      >
        <div ref={modalStartRef} tabIndex={-1} role="group" aria-label={`${project.name} project preview`} className="project-modal-hero">
          {hasImageCarousel ? (
            <div
              className="project-modal-carousel"
              aria-roledescription="carousel"
              aria-label={`${project.name} images`}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  setActiveSlide((current) => (current - 1 + slideCount) % slideCount);
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  setActiveSlide((current) => (current + 1) % slideCount);
                }
              }}
            >
              {hasGalleryCarousel && gallery ? (
                <img
                  key={gallery[activeSlide]}
                  className="project-modal-carousel-image"
                  src={gallery[activeSlide]}
                  alt={`${project.name} screenshot ${activeSlide + 1} of ${slideCount}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${activeSlide + 1} of ${slideCount}`}
                />
              ) : (
                <div
                  className="project-modal-placeholder"
                  data-slide={activeSlide + 1}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${activeSlide + 1} of ${slideCount}`}
                >
                  <span>{CAPSTONE_MODAL_SLIDES[activeSlide].number}</span>
                  <strong>{CAPSTONE_MODAL_SLIDES[activeSlide].label}</strong>
                  <small>Placeholder</small>
                </div>
              )}
              <button
                type="button"
                className="project-carousel-control project-carousel-previous"
                onClick={() => setActiveSlide((current) => (current - 1 + slideCount) % slideCount)}
                aria-label="Show previous project image"
              >
                <ChevronLeft aria-hidden />
              </button>
              <button
                type="button"
                className="project-carousel-control project-carousel-next"
                onClick={() => setActiveSlide((current) => (current + 1) % slideCount)}
                aria-label="Show next project image"
              >
                <ChevronRight aria-hidden />
              </button>
              <div className="project-carousel-indicators" aria-label="Choose project image">
                {Array.from({ length: slideCount }, (_, index) => (
                  <button
                    key={gallery?.[index] ?? CAPSTONE_MODAL_SLIDES[index].number}
                    type="button"
                    className={cn(index === activeSlide && "is-active")}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show project image ${index + 1}`}
                    aria-current={index === activeSlide ? "true" : undefined}
                  />
                ))}
              </div>
            </div>
          ) : (
            <img src={project.heroImage || project.image} alt={`${project.name} project preview`} />
          )}
          <span aria-hidden />
        </div>
        <header className="project-modal-masthead">
          <div className="project-modal-coordinate" aria-hidden>
            <span>Project</span>
            <strong>{projectNumber}</strong>
            <small>/ {projectTotal}</small>
          </div>
          <div className="project-modal-heading">
            <p className="section-eyebrow">{projectYear(project)} · {project.label}</p>
            <DialogTitle>{project.name}</DialogTitle>
            <DialogDescription>{project.role}</DialogDescription>
          </div>
        </header>
        <div className="project-modal-content">
          <aside className="project-modal-meta" aria-label="Project details">
            <p className="section-eyebrow">Archive notes</p>
            <dl>
              <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>
              <div><dt>Discipline</dt><dd>{project.label}</dd></div>
              {"tech" in project && project.tech ? <div><dt>Technology</dt><dd>{project.tech}</dd></div> : null}
            </dl>
          </aside>
          <div className="project-modal-narrative">
            <div className="project-modal-summary">
              {(Array.isArray(longDescription) ? longDescription : [longDescription || project.description]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {contributions?.length ? (
              <div className="project-modal-contributions">
                <h3>{highlightsLabel ?? "What I contributed"}</h3>
                <ul>
                  {contributions.map((contribution) => <li key={contribution}><Sparkles className="size-4 shrink-0 text-primary" aria-hidden />{contribution}</li>)}
                </ul>
              </div>
            ) : null}
            <div className="project-modal-actions">
              {isFullUxCaseStudy ? (
                <Link
                  to={`/projects/${project.slug}`}
                  state={{ from: "home" }}
                  className={cn(buttonVariants({ size: "lg" }), "celestial-pill gap-2")}
                >
                  View Full Case Study
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              ) : (
                links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "celestial-pill gap-2")}>
                    {link.label}<ExternalLink className="size-4" aria-hidden />
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function HomePage() {
  const { profile, about, projects, workExperience, organizations, certifications, techStack } = portfolioData;
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [journeyModal, setJourneyModal] = useState<"work" | "organizations" | null>(null);

  const syncProjectFromUrl = useMemo(() => () => {
    const slug = new URLSearchParams(window.location.search).get("project");
    setSelectedProject(projects.find((project) => project.slug === slug) ?? null);
  }, [projects]);

  useEffect(() => {
    document.title = "Matthew Benison Javier — Product Designer & Developer";
    syncProjectFromUrl();
    window.addEventListener("popstate", syncProjectFromUrl);
    return () => window.removeEventListener("popstate", syncProjectFromUrl);
  }, [syncProjectFromUrl]);

  function openProject(project: Project) {
    const url = new URL(window.location.href);
    url.searchParams.set("project", project.slug);
    url.hash = "projects";
    window.history.pushState({}, "", url);
    setSelectedProject(project);
  }

  function closeProject() {
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    url.hash = "projects";
    window.history.pushState({}, "", url);
    setSelectedProject(null);
  }

  const orderedProjects = [...projects].sort((a, b) => {
    const aFeatured = "featured" in a && a.featured === true;
    const bFeatured = "featured" in b && b.featured === true;
    return Number(bFeatured) - Number(aFeatured);
  });
  const visibleProjects = showAllProjects ? orderedProjects : orderedProjects.slice(0, 3);
  const visibleCertifications = showAllCertifications ? certifications : certifications.slice(0, 6);
  const visibleWorkExperience = workExperience.slice(0, 4);
  const visibleOrganizations = organizations.slice(0, 4);
  const journeyModalEntries = journeyModal === "work" ? workExperience : organizations;

  return (
    <>
      <CelestialBackdrop />
      <FoxPet />
      <div className="celestial-page">
        <section id="home" className="hero-one-page" aria-labelledby="hero-title">
          <span className="hero-cover-rule" aria-hidden />
          <div className="hero-copy">
            <p className="section-eyebrow"><Sparkles className="size-4" aria-hidden /> my place among the stars</p>
            <h1 id="hero-title">Matthew<br /><span>Benison Javier</span></h1>
            <p className="hero-lede">I design and build useful digital products—turning research, systems, and thoughtful details into experiences that feel effortless.</p>
            <div className="hero-actions">
              <a href="#projects" className={cn(buttonVariants({ size: "lg" }), "celestial-pill min-w-48 justify-center font-bold")}>Explore my work</a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "celestial-pill min-w-48 justify-center gap-2 font-bold")}><FileText className="size-4" aria-hidden /> Resume</a>
            </div>
          </div>
          <figure className="hero-portrait-planet">
            <span className="hero-portrait-orbit" aria-hidden><i /></span>
            <span className="hero-portrait-star hero-portrait-star-one" aria-hidden />
            <span className="hero-portrait-star hero-portrait-star-two" aria-hidden />
            <div className="hero-portrait-ring">
              <img src={about.profileImage} alt="Matthew Benison Javier" />
              <span className="hero-portrait-glaze" aria-hidden />
              <span className="hero-portrait-craters" aria-hidden><i /><i /><i /></span>
            </div>
          </figure>
        </section>

        <section id="projects" className="celestial-section projects-section" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="section-eyebrow">Selected worlds</p>
            <h2 id="projects-title">Projects with a purpose</h2>
            <p>Each project begins with a real problem and ends with a practical, considered outcome.</p>
          </div>
          <div className="projects-grid">
            {visibleProjects.map((project, index) => (
              <article
                key={project.slug}
                className={cn(
                  "project-card",
                  "featured" in project && project.featured === true && "project-featured"
                )}
              >
                <span className="project-index" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                {"featured" in project && project.featured === true ? <span className="project-featured-badge"><Sparkles className="size-3.5" aria-hidden /> Featured</span> : null}
                <button type="button" onClick={() => openProject(project)} className="project-card-button" aria-label={`View ${project.name} case study`}>
                  <div className="project-image"><img src={project.image} alt="" loading={index > 2 ? "lazy" : "eager"} /></div>
                  <div className="project-copy">
                    <p className="section-eyebrow">{projectYear(project)} · {project.label}</p>
                    <h3>{project.name}</h3>
                    <p className="project-role">{project.role}</p>
                    <p>{project.description}</p>
                    <span>Read more <ArrowRight className="size-4" aria-hidden /></span>
                  </div>
                </button>
              </article>
            ))}
          </div>
          {!showAllProjects ? <div className="section-action"><Button variant="outline" size="lg" className="celestial-pill" onClick={() => setShowAllProjects(true)}>View all {projects.length} projects</Button></div> : null}
        </section>

        <section id="experience" className="celestial-section experience-section" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="section-eyebrow">My journey</p>
            <h2 id="experience-title">Experience in orbit</h2>
            <p>Professional roles and communities that shaped how I lead, collaborate, and build.</p>
          </div>
          <div className="journey-grid">
            <div>
              <h3 className="journey-label"><BriefcaseBusiness className="size-5" aria-hidden /> Work experience</h3>
              <div className="journey-line">
                {visibleWorkExperience.map((entry) => <ExperienceCard key={`${entry.name}-${entry.role}`} entry={entry} />)}
              </div>
              {workExperience.length > 4 ? <Button variant="ghost" className="journey-more-action" onClick={() => setJourneyModal("work")}>View all work experience <ArrowRight className="size-4" aria-hidden /></Button> : null}
            </div>
            <div>
              <h3 className="journey-label"><Orbit className="size-5" aria-hidden /> Organizations</h3>
              <div className="journey-line">
                {visibleOrganizations.map((entry) => <ExperienceCard key={`${entry.name}-${entry.role}`} entry={entry} />)}
              </div>
              {organizations.length > 4 ? <Button variant="ghost" className="journey-more-action" onClick={() => setJourneyModal("organizations")}>View all organizations <ArrowRight className="size-4" aria-hidden /></Button> : null}
            </div>
          </div>
        </section>

        <section id="skills" className="celestial-section skills-section" aria-labelledby="skills-title">
          <div className="section-heading">
            <p className="section-eyebrow">Working constellations</p>
            <h2 id="skills-title">Tools I build with</h2>
            <p>A broad technical foundation organized around the work each tool helps me accomplish.</p>
          </div>
          <div className="skills-grid">
            {TECH_CATEGORY_ORDER.map((key: TechCategoryKey, index) => (
              <article key={key} className="skill-constellation">
                <p className="constellation-number">0{index + 1}</p>
                <h3>{TECH_CATEGORY_LABELS[key]}</h3>
                <div className="tech-list">
                  {techStack[key].map((item) => <span key={item.name}><img src={item.image} alt="" loading="lazy" />{item.name}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="celestial-section certifications-section" aria-labelledby="certifications-title">
          <div className="section-heading">
            <p className="section-eyebrow">Coordinates of growth</p>
            <h2 id="certifications-title">Certifications</h2>
            <p>Milestones from a habit of learning across design, development, data, and cloud technology.</p>
          </div>
          <div className="cert-grid">
            {visibleCertifications.map((certification, index) => (
              <a key={certification.title} href={certification.link} target="_blank" rel="noopener noreferrer" className="cert-card">
                <Award className="size-5 text-primary" aria-hidden />
                <span className="cert-coordinate">STAR {String(index + 1).padStart(2, "0")}</span>
                <h3>{certification.title}</h3>
                <p>{certification.issuer}</p><time>{certification.date}</time>
                <ExternalLink className="cert-link size-4" aria-hidden />
              </a>
            ))}
          </div>
          {!showAllCertifications ? <div className="section-action"><Button variant="outline" size="lg" className="celestial-pill" onClick={() => setShowAllCertifications(true)}>View all {certifications.length} certifications</Button></div> : null}
        </section>

        <CreativeGallerySection />

        <ActivitySection />

        <section id="contact" className="celestial-section contact-section" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="section-eyebrow">One message away</p>
            <h2 id="contact-title">Let’s create something meaningful.</h2>
            <p>Whether you have an opportunity, a product idea, or simply want to talk about thoughtful technology, I’d love to hear from you.</p>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`} aria-label="Email Matthew"><Mail aria-hidden /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Matthew on LinkedIn"><img src={SOCIAL_LINKEDIN_ICON} alt="" aria-hidden /></a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Matthew on GitHub"><img src={SOCIAL_GITHUB_ICON} alt="" aria-hidden /></a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Matthew on Instagram"><img src={SOCIAL_INSTAGRAM_ICON} alt="" aria-hidden /></a>
            </div>
          </div>
          <div className="contact-form-card">
            <div className="mb-6 flex items-center gap-3"><Send className="size-5 text-primary" aria-hidden /><h3 className="font-heading text-xl text-[#fff8df]">Send a message</h3></div>
            <ContactEmailForm />
          </div>
        </section>
      </div>
      <ProjectDialog project={selectedProject} onClose={closeProject} />
      <Dialog open={journeyModal !== null} onOpenChange={(open) => !open && setJourneyModal(null)}>
        <DialogContent
          overlayClassName="editorial-overlay"
          closeButtonClassName="editorial-dialog-close"
          className="editorial-dialog journey-dialog"
        >
          <header className="journey-modal-masthead">
            <div className="journey-modal-coordinate" aria-hidden><span>Archive</span><strong>{journeyModal === "work" ? "01" : "02"}</strong></div>
            <div>
              <p className="section-eyebrow">Complete journey</p>
              <DialogTitle>{journeyModal === "work" ? "Work experience" : "Organizations"}</DialogTitle>
              <DialogDescription>
                {journeyModal === "work" ? "All professional roles and contributions." : "All communities, leadership roles, and volunteer work."}
              </DialogDescription>
            </div>
          </header>
          <div className={`journey-modal-list${journeyModal === "organizations" ? " is-single" : ""}`}>
            <div className="journey-line">
              {journeyModalEntries.map((entry) => <ExperienceCard key={`${entry.name}-${entry.role}`} entry={entry} />)}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ExperienceCard({ entry }: { entry: (typeof portfolioData.workExperience)[number] }) {
  return (
    <details className="journey-card group">
      <summary>
        <span className="journey-planet"><img src={entry.logo} alt="" /></span>
        <span className="min-w-0 flex-1"><strong>{entry.role}</strong><small>{entry.name}</small><time>{entry.dates}</time></span>
        <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
    </details>
  );
}
