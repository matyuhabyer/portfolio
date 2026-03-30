import { Outlet } from "react-router-dom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteMobileNav } from "@/components/layout/SiteMobileNav";
import { SiteNav } from "@/components/layout/SiteNav";

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-20 pb-28 sm:px-6 sm:pt-24 md:pb-16">
        <Outlet />
      </main>
      <SiteFooter />
      <SiteMobileNav />
    </div>
  );
}
