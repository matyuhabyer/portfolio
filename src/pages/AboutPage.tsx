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
const pubmats = about.pubmatGallery;
const pubmatMarqueeItems = [...pubmats, ...pubmats];

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

      <section className="space-y-5">
        <h2 className="flex items-center gap-2 font-heading text-xl font-bold sm:gap-3 sm:text-2xl">
          <span className="h-6 w-1.5 rounded-sm bg-secondary sm:h-7" aria-hidden />
          My Creative Gallery!
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Posters, slides, and graphics. Add an <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">imageSrc</code>{" "}
          field per item in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">about.pubmatGallery</code>{" "}
          (files in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">public/</code>).
        </p>
        <div
          className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/5 py-4"
          role="region"
          aria-label="Publication materials gallery"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-1 w-12 bg-linear-to-r from-background to-transparent sm:w-16" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-1 w-12 bg-linear-to-l from-background to-transparent sm:w-16" aria-hidden />
          <div className="flex w-max animate-pubmat-marquee will-change-transform">
            {pubmatMarqueeItems.map((item, index) => {
              const src = item.imageSrc;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="shrink-0 px-2 sm:px-3"
                >
                  <figure className="w-36 overflow-hidden rounded-lg border border-border/50 bg-muted/20 shadow-inner sm:w-44">
                    <div className="relative aspect-square w-full">
                      {src ? (
                        <img
                          src={src}
                          alt={item.title}
                          className="size-full object-cover object-center"
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        <div className="flex size-full flex-col items-center justify-center gap-3 bg-linear-to-b from-muted/50 to-muted/15 p-3">
                          <span className="rounded border border-dashed border-primary/35 bg-background/40 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-[10px]">
                            Placeholder
                          </span>
                        </div>
                      )}
                    </div>
                    <figcaption className="border-t border-border/40 bg-card/30 px-1.5 py-1.5 text-center text-[10px] font-medium text-muted-foreground sm:px-2 sm:py-2 sm:text-xs">
                      {item.title}
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
