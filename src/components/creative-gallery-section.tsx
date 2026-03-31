import { useState } from "react";
import type { PubmatGalleryItem } from "@/data/portfolio";
import { portfolioData } from "@/data/portfolio";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function thumbFrameClass(aspect: PubmatGalleryItem["thumbAspect"]) {
  return aspect === "1/1"
    ? "aspect-square w-[9rem] sm:w-40"
    : "aspect-[4/3] w-48 sm:w-[13.333rem]";
}

export function CreativeGallerySection() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const pubmats = portfolioData.about.pubmatGallery;
  const pubmatMarqueeItems = [...pubmats, ...pubmats];
  const isLightboxOpen = lightboxSrc !== null;

  return (
    <section className="space-y-5">
      <h2 className="flex items-center gap-2 font-heading text-xl font-bold sm:gap-3 sm:text-2xl">
        <span className="h-6 w-1.5 rounded-sm bg-secondary sm:h-7" aria-hidden />
        My Creative Gallery
      </h2>
      <div
        className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/5 py-4"
        role="region"
        aria-label="Publication materials gallery"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-1 w-12 bg-linear-to-r from-background to-transparent sm:w-16" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-1 w-12 bg-linear-to-l from-background to-transparent sm:w-16" aria-hidden />
        <div
          className={cn(
            "flex w-max animate-pubmat-marquee will-change-transform",
            isLightboxOpen && "pubmat-marquee-paused"
          )}
        >
          {pubmatMarqueeItems.map((item, index) => (
            <div key={`${item.src}-${index}`} className="flex shrink-0 items-center px-2 sm:px-3">
              <button
                type="button"
                onClick={() => setLightboxSrc(item.src)}
                className={cn(
                  "group cursor-zoom-in rounded-lg border border-border/50 bg-muted/20 shadow-inner outline-none transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "max-w-[min(100%,13.5rem)]"
                )}
                aria-label="Open image full size"
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[inherit]",
                    thumbFrameClass(item.thumbAspect)
                  )}
                >
                  <img
                    src={item.src}
                    alt=""
                    className="size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isLightboxOpen} onOpenChange={(open) => !open && setLightboxSrc(null)}>
        <DialogContent
          overlayClassName="bg-black/65 backdrop-blur-[2px]"
          closeButtonClassName="top-2.5 right-2.5 z-10 size-9 rounded-full border border-white/40 bg-white/95 text-zinc-900 shadow-md hover:bg-white hover:text-zinc-900"
          className={cn(
            "w-[min(92vw,28rem)] max-w-[min(92vw,28rem)] sm:w-[min(92vw,36rem)] sm:max-w-[min(92vw,36rem)]",
            "max-h-[88vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl",
            "border border-border/80 bg-card p-2 shadow-2xl ring-1 ring-black/5",
            "flex flex-col items-stretch gap-0",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          )}
          showCloseButton
        >
          <DialogTitle className="sr-only">Publication image</DialogTitle>
          {lightboxSrc ? (
            <div className="rounded-xl bg-muted/40 p-1">
              <img
                src={lightboxSrc}
                alt=""
                className="mx-auto max-h-[min(68vh,560px)] w-full max-w-full rounded-lg object-contain object-center"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
