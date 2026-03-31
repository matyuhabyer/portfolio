import { useEffect } from "react";
import { portfolioData, type AboutParagraph } from "@/data/portfolio";

function AboutParagraphBlock({ paragraph }: { paragraph: AboutParagraph }) {
  if (typeof paragraph === "string") {
    return <p>{paragraph}</p>;
  }
  return (
    <p>
      {paragraph.segments.map((s, i) =>
        s.type === "text" ? (
          <span key={i}>{s.content}</span>
        ) : (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
          >
            {s.content}
          </a>
        )
      )}
    </p>
  );
}

const { about, profile } = portfolioData;

export function AboutPage() {
  useEffect(() => {
    document.title = "About — Matthew Benison Javier";
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <h1 className="flex items-center gap-2 font-heading text-2xl font-bold sm:gap-3 sm:text-3xl">
        <span className="h-6 w-1.5 rounded-sm bg-secondary sm:h-7" aria-hidden />
        About
      </h1>

      <section className="rounded-xl border border-border/50 bg-card/40 p-6 shadow-inner sm:p-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
          <div className="relative mx-auto shrink-0 md:mx-0">
            <div className="relative size-44 sm:size-52">
              <div
                className="pointer-events-none absolute inset-0 z-1 animate-spin rounded-full border-2 border-dashed border-primary animation-duration-[30s] motion-reduce:animate-none"
                aria-hidden
              />
              <div className="absolute inset-[8px] z-2 overflow-hidden rounded-full border border-border/50 bg-muted shadow-inner">
                <img
                  src={about.profileImage}
                  alt={profile.name}
                  className="size-full object-cover object-center"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            <p className="font-heading text-lg font-semibold text-primary sm:text-xl">
              {about.tagline}
            </p>
            {about.paragraphs.map((p, i) => (
              <AboutParagraphBlock
                key={typeof p === "string" ? p.slice(0, 48) : `about-p-${i}`}
                paragraph={p}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
