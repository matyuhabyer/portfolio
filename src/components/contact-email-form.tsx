import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldClass =
  "flex min-h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const labelClass = "mb-1.5 block text-xs font-medium text-foreground";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactEmailForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!accessKey?.trim()) {
      setStatus("error");
      setErrorMessage(
        import.meta.env.PROD
          ? "The contact form is missing its access key in this deployment. In Netlify, Vercel, Cloudflare Pages, etc., add environment variable VITE_WEB3FORMS_ACCESS_KEY (same value as in local .env), then trigger a new build—not just a redeploy of old assets."
          : "Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file (get a free key at web3forms.com)."
      );
      return;
    }

    setStatus("loading");

    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ") || "Portfolio visitor";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Portfolio] Message from ${fullName}`,
          name: fullName,
          email,
          phone: phone.trim() || "—",
          message: message.trim(),
        }),
      });

      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again or use the email button below.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or use the email button below.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-first-name" className={labelClass}>
            First name
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
            placeholder="Juan"
          />
        </div>
        <div>
          <label htmlFor="contact-last-name" className={labelClass}>
            Last name
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass}
            placeholder="Dela Cruz"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone no.
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
            placeholder="+63 …"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(fieldClass, "min-h-[120px] resize-y py-2.5")}
          placeholder="Write your message…"
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {status === "success" ? (
        <p className="rounded-md border border-secondary/40 bg-secondary/10 px-3 py-2 text-sm text-foreground" role="status">
          Thank you! Your message was sent to my email. I&apos;ll get back to you shortly.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" className="gap-2 shadow-lg shadow-primary/15" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden />
              Send
            </>
          )}
        </Button>
        {!accessKey?.trim() ? (
          <p className="max-w-xl text-xs text-muted-foreground sm:text-right">
            {import.meta.env.PROD ? (
              <>
                Add <code className="rounded bg-muted px-1 font-mono">VITE_WEB3FORMS_ACCESS_KEY</code> to your
                hosting provider&apos;s env vars and run a <strong>new build</strong> (Vite needs it at build time).
              </>
            ) : (
              <>
                Local: set <code className="rounded bg-muted px-1 font-mono">VITE_WEB3FORMS_ACCESS_KEY</code> in{" "}
                <code className="rounded bg-muted px-1 font-mono">.env</code> — free at web3forms.com
              </>
            )}
          </p>
        ) : null}
      </div>
    </form>
  );
}
