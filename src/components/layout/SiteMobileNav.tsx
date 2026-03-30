import { NavLink } from "react-router-dom";
import { LayoutGrid, UserRound, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

function itemClass(active: boolean) {
  return cn(
    "flex flex-col items-center justify-center gap-1 text-[10px] font-medium uppercase tracking-widest",
    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
  );
}

export function SiteMobileNav() {
  return (
    <nav className="fixed bottom-0 z-50 w-full border-t border-border/40 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <div className="flex h-16 items-center justify-around px-4">
        <NavLink to="/" end className={({ isActive }) => itemClass(isActive)}>
          <Zap className="size-5" />
          Home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => itemClass(isActive)}>
          <LayoutGrid className="size-5" />
          Projects
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => itemClass(isActive)}>
          <UserRound className="size-5" />
          About
        </NavLink>
      </div>
    </nav>
  );
}
