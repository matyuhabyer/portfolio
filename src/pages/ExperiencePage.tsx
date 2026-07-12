import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExperienceEntries } from "@/components/experience-entries";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ExperiencePage() {
  const [openExperienceId, setOpenExperienceId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Experience — Matthew Benison Javier";
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
          <ArrowLeft className="size-4" aria-hidden />
          Back to Home
        </Link>
      </div>

      <h1 className="flex items-center gap-2 font-heading text-2xl font-bold sm:gap-3 sm:text-3xl">
        <span className="h-6 w-1.5 rounded-sm bg-secondary sm:h-7" aria-hidden />
        Experience
      </h1>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-lg">Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <ExperienceEntries
              sectionKey="work"
              entries={portfolioData.workExperience}
              openId={openExperienceId}
              onOpenChange={setOpenExperienceId}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-lg">Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <ExperienceEntries
              sectionKey="organizations"
              entries={portfolioData.organizations}
              openId={openExperienceId}
              onOpenChange={setOpenExperienceId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
