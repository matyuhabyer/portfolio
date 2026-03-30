import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CertificationsPage() {
  useEffect(() => {
    document.title = "Certifications — Matthew Benison Javier";
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <div>
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-1 pl-0 text-primary"
          )}
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
      <h1 className="flex items-center gap-2 font-heading text-2xl font-bold sm:gap-3 sm:text-3xl">
        <span className="h-6 w-1.5 rounded-sm bg-secondary sm:h-7" aria-hidden />
        Certifications
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {portfolioData.certifications.map((c) => (
          <a
            key={c.title}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-border/50 bg-muted/10 p-4 transition-colors hover:border-primary/40 hover:bg-muted/30"
          >
            <p className="font-heading text-sm font-bold">{c.title}</p>
            <p className="text-xs text-muted-foreground">{c.issuer}</p>
            <p className="mt-2 text-[10px] uppercase tracking-wider text-primary">{c.date}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
