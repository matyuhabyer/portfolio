import { Outlet, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteMobileNav } from "@/components/layout/SiteMobileNav";
import { SiteNav } from "@/components/layout/SiteNav";

export function SiteLayout() {
  const location = useLocation();

  return (
    <div className="site-shell flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-2 font-bold text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <SiteNav />
      <main id="main-content" className="relative z-10 mx-auto w-full max-w-[1600px] flex-1 overflow-x-clip px-[clamp(1rem,4vw,4rem)] pb-28 pt-16 lg:pb-16">
        <div
          key={location.pathname}
          className="animate-in fade-in slide-in-from-bottom-1 duration-300"
        >
          <Outlet />
        </div>
      </main>
      <SiteFooter />
      <SiteMobileNav />
    </div>
  );
}
