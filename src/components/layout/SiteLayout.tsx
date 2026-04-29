import { Outlet, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteMobileNav } from "@/components/layout/SiteMobileNav";
import { SiteNav } from "@/components/layout/SiteNav";

export function SiteLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollToTop />
      <SiteNav />
      <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 pt-20 pb-28 sm:px-6 sm:pt-24 md:pb-16">
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
