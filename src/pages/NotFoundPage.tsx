import { useEffect } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Not found — Matthew Benison Javier";
  }, []);

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="font-heading text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        to="/"
        className={cn(buttonVariants({ className: "mt-8 gap-1" }))}
      >
        Return to Home
      </Link>
    </div>
  );
}
