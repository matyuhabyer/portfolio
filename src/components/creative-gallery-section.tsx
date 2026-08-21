import { useState } from "react";
import { Expand } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function CreativeGallerySection() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const pubmats = portfolioData.about.pubmatGallery;
  const carouselItems = [...pubmats, ...pubmats];

  return (
    <section id="gallery" className="celestial-section gallery-section" aria-labelledby="gallery-title">
      <div className="section-heading">
        <p className="section-eyebrow">Visual explorations</p>
        <h2 id="gallery-title">Creative gallery</h2>
        <p>Publication materials and visual systems shaped with the same care I bring to product work.</p>
      </div>

      <div className="gallery-carousel" role="region" aria-roledescription="carousel" aria-label="Continuous creative gallery">
        <div
          className="gallery-carousel-viewport"
          aria-label="The gallery moves automatically and pauses while an artwork is focused or hovered."
        >
          <div className="gallery-carousel-track">
            {carouselItems.map((item, index) => {
              const isDuplicate = index >= pubmats.length;
              const artworkNumber = (index % pubmats.length) + 1;

              return (
                <div
                  key={`${item.src}-${isDuplicate ? "duplicate" : "original"}`}
                  className="gallery-slide"
                  data-aspect={item.thumbAspect}
                  aria-hidden={isDuplicate || undefined}
                >
                  <button
                    type="button"
                    tabIndex={isDuplicate ? -1 : 0}
                    onClick={() => setLightboxSrc(item.src)}
                    className="gallery-tile group"
                    aria-label={isDuplicate ? undefined : `Open publication design ${artworkNumber}`}
                  >
                    <img
                      src={item.src}
                      alt=""
                      loading={index < 4 ? "eager" : "lazy"}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="gallery-overlay"><Expand className="size-5" aria-hidden /> View artwork</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={Boolean(lightboxSrc)} onOpenChange={(open) => !open && setLightboxSrc(null)}>
        <DialogContent
          overlayClassName="editorial-overlay"
          closeButtonClassName="editorial-dialog-close"
          className="editorial-dialog gallery-lightbox-dialog"
        >
          <DialogTitle className="sr-only">Creative gallery image</DialogTitle>
          <header className="gallery-lightbox-header"><span>Visual archive</span></header>
          <div className="gallery-lightbox-stage">
            {lightboxSrc ? <img src={lightboxSrc} alt="" /> : null}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
