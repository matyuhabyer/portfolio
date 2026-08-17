import { BriefcaseBusiness, Home, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/components/layout/SiteNav";

const ITEMS = [
  ["home", "Home", Home],
  ["projects", "Work", Sparkles],
  ["experience", "Journey", BriefcaseBusiness],
  ["contact", "Contact", Mail],
] as const;

export function SiteMobileNav() {
  const active = useActiveSection();
  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-primary/20 bg-[#07142f]/92 pb-[env(safe-area-inset-bottom)] shadow-2xl backdrop-blur-xl lg:hidden">
      <div className="grid min-h-16 grid-cols-4">
        {ITEMS.map(([id, label, Icon]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold uppercase tracking-wider", active === id ? "text-primary" : "text-muted-foreground")}>
            <Icon className="size-5" aria-hidden />{label}
          </a>
        ))}
      </div>
    </nav>
  );
}
