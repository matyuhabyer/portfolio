import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ONE_PAGE_SECTIONS = [
  ["home", "Home"], ["projects", "Projects"], ["experience", "Experience"],
  ["skills", "Skills"], ["certifications", "Certifications"], ["gallery", "Gallery"], ["activity", "Activity"], ["contact", "Contact"],
] as const;

export function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const sections = ONE_PAGE_SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function SiteNav() {
  const active = useActiveSection();
  const location = useLocation();
  const sectionHref = (id: string) => `${location.pathname === "/" ? "" : "/"}#${id}`;

  return (
    <nav aria-label="Primary navigation" className="fixed inset-x-0 top-0 z-50 border-b border-primary/15 bg-[#061027]/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-[clamp(1rem,4vw,4rem)]">
        <a href={sectionHref("home")} className="flex min-w-0 items-center gap-2 font-heading text-lg font-semibold text-[#fff8df]">
          <img src="/assets/images/matyuart.png" alt="" width={32} height={32} className="size-8 rounded-full border border-primary/40 object-cover" />
          <span className="hidden sm:inline">matyuhabyer<span className="text-primary">.</span></span>
        </a>
        <div className="hidden items-center gap-[clamp(1rem,2vw,2.25rem)] lg:flex">
          {ONE_PAGE_SECTIONS.map(([id, label]) => (
            <a key={id} href={sectionHref(id)} aria-current={active === id ? "location" : undefined} className={cn("text-xs font-semibold tracking-wide transition-colors", active === id ? "text-primary" : "text-muted-foreground hover:text-white")}>{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
