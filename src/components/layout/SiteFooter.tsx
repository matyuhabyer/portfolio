export function SiteFooter() {
  return (
    <footer className="mt-6 w-full border-t border-border/50 bg-background px-4 py-10 sm:mt-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Matthew Benison Javier. All rights reserved.
        </p>
      </div>
    </footer>
  );
}