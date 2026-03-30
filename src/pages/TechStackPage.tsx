import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TechPill } from "@/components/tech-pill";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TECH_CATEGORY_LABELS,
  TECH_CATEGORY_ORDER,
  type TechCategoryKey,
} from "@/lib/tech-stack";

export function TechStackPage() {
  useEffect(() => {
    document.title = "Tech Stack — Matthew Benison Javier";
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
        Tech Stack
      </h1>
      <div className="space-y-6">
        {TECH_CATEGORY_ORDER.map((key: TechCategoryKey) => {
          const items = portfolioData.techStack[key];
          return (
            <Card key={key}>
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg">
                  {TECH_CATEGORY_LABELS[key]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <TechPill key={item.name} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
