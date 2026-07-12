import { Building2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExperienceEntry = {
  name: string;
  dates: string;
  role: string;
  highlights: string[];
  /** Optional logo URL; when absent, a neutral placeholder is shown. */
  logo?: string;
};

export function ExperienceEntries({
  entries,
  sectionKey,
  openId,
  onOpenChange,
}: {
  entries: readonly ExperienceEntry[];
  sectionKey: string;
  openId: string | null;
  onOpenChange: (id: string | null) => void;
}) {
  return (
    <div className="space-y-2">
      {entries.map((item, i) => {
        const id = `${sectionKey}-${i}`;
        const isOpen = openId === id;

        return (
          <details
            key={id}
            open={isOpen}
            className={cn(
              "group overflow-hidden rounded-lg border border-border/50 bg-muted/10 shadow-sm",
              "transition-[border-color,box-shadow,background-color] duration-300 ease-out",
              "hover:border-primary/40 hover:bg-muted/30",
              "open:border-secondary/25 open:bg-secondary/4 open:shadow-md",
              "open:hover:border-secondary/25 open:hover:bg-secondary/4",
              "motion-reduce:transition-none"
            )}
          >
            <summary
              className={cn(
                "flex cursor-pointer list-none items-start gap-2 p-2.5 outline-none marker:hidden sm:p-3 [&::-webkit-details-marker]:hidden",
                "rounded-lg transition-[background-color,color] duration-200 ease-out",
                "group-open:bg-secondary/8",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
              onClick={(event) => {
                event.preventDefault();
                onOpenChange(isOpen ? null : id);
              }}
            >
              <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-2.5">
                <div
                  className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border/50 bg-muted/40 transition-[border-color,background-color] duration-300 ease-out group-open:border-secondary/20 group-open:bg-muted/60 sm:size-10"
                  aria-hidden
                >
                  {item.logo ? (
                    <img src={item.logo} alt="" className="size-full object-cover" />
                  ) : (
                    <span className="flex size-full items-center justify-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-open:scale-105">
                      <Building2
                        className="size-4 text-muted-foreground/35"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <span className="block wrap-break-word font-heading text-sm font-semibold leading-snug text-white sm:text-base">
                    {item.role}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-muted-foreground sm:text-xs">
                    {item.name}
                    <span aria-hidden> · </span>
                    {item.dates}
                  </span>
                </div>
              </div>
              <ChevronDown
                className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden
              />
            </summary>
            <div
              className={cn(
                "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out",
                "motion-reduce:transition-none group-open:grid-rows-[1fr]"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="border-t border-border/40 px-3 pb-3 pt-3">
                  <ul className="list-outside list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-muted-foreground/90">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={`${item.name}-${highlightIndex}`}
                        className={cn(
                          "pl-0.5 motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out",
                          "translate-y-1 opacity-0 group-open:translate-y-0 group-open:opacity-100",
                          "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
                        )}
                        style={{ transitionDelay: `${Math.min(highlightIndex, 5) * 45}ms` }}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
