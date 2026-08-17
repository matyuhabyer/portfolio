export function SiteFooter() {
  return (
    <footer className="relative mt-6 w-full overflow-hidden border-t border-primary/15 bg-[#07112b] px-4 py-10 sm:mt-10 sm:px-6 sm:py-12">
      <div className="absolute left-[12%] top-7 size-1 rounded-full bg-primary shadow-[0_0_10px_#f7d978]" aria-hidden />
      <div className="absolute right-[18%] top-12 size-1.5 rotate-45 bg-white/60" aria-hidden />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
            <img
              src="/assets/images/matyuart.png"
              alt=""
              width={28}
              height={28}
              className="size-7 shrink-0 rounded-full border border-primary/40 object-cover"
              aria-hidden
            />
            <span className="font-heading font-semibold text-[#fff8df]">matyuhabyer<span className="text-primary">.</span></span>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Building thoughtful digital worlds, one small detail at a time.
          </p>
        </div>
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Matthew Benison Javier. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
