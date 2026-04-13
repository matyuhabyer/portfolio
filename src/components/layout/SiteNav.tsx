import { Link, NavLink } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/assets/images/matyuart.png";

function navLinkClass(active: boolean) {
  return cn(
    "text-sm font-semibold tracking-tight transition-colors",
    active
      ? "text-primary"
      : "text-muted-foreground hover:text-foreground"
  );
}

export function SiteNav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-screen-2xl min-h-14 items-center justify-between gap-3 px-4 py-3 sm:min-h-0 sm:px-6 sm:py-4">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 font-heading text-lg font-black tracking-tighter text-primary sm:gap-3 sm:text-xl"
        >
          <img
            src={LOGO_SRC}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-lg border border-border/60 bg-muted object-cover shadow-sm"
          />
          <span className="max-w-40 truncate leading-none sm:max-w-none">matyuhabyer.</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Projects
          </NavLink>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={portfolioData.profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1.5 font-semibold touch-manipulation"
            )}
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
