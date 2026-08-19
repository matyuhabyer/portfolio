import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldClass =
  "contact-field-input flex min-h-11 w-full border-0 border-b border-input bg-transparent px-0 py-2 text-sm text-foreground shadow-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const labelClass = "contact-field-label mb-1.5 block text-xs font-medium text-foreground";

const WEB3FORMS_HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactEmailForm() {
  const captchaRef = useRef<HCaptcha>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    if (
      !trimmed.name ||
      !trimmed.email ||
      !trimmed.message
    ) {
      setStatus("error");
      setErrorMessage("Please complete the required fields before sending your message.");
      return;
    }

    if (!accessKey?.trim()) {
      setStatus("error");
      setErrorMessage(
        import.meta.env.PROD
          ? "The message form is temporarily unavailable. Please use the email link below instead."
          : "Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file (get a free key at web3forms.com)."
      );
      return;
    }

    if (!captchaToken) {
      setStatus("error");
      setErrorMessage("Please complete the CAPTCHA before sending your message.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Portfolio] Message from ${trimmed.name}`,
          name: trimmed.name,
          email: trimmed.email,
          message: trimmed.message,
          "h-captcha-response": captchaToken,
        }),
      });

      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again or use the email button below.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or use the email button below.");
    } finally {
      setCaptchaToken("");
      captchaRef.current?.resetCaptcha();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            placeholder="Your name"
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

      <div className="contact-captcha">
        <p className={labelClass}>Human verification</p>
        <HCaptcha
          ref={captchaRef}
          sitekey={WEB3FORMS_HCAPTCHA_SITE_KEY}
          size="compact"
          theme="dark"
          reCaptchaCompat={false}
          onVerify={(token) => {
            setCaptchaToken(token);
            if (status === "error" && errorMessage.includes("CAPTCHA")) {
              setStatus("idle");
              setErrorMessage("");
            }
          }}
          onExpire={() => setCaptchaToken("")}
          onError={() => {
            setCaptchaToken("");
            setStatus("error");
            setErrorMessage("The CAPTCHA could not load. Please refresh the page and try again.");
          }}
        />
        <p className="contact-captcha-note">This helps keep automated messages out of my inbox.</p>
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
        {!accessKey?.trim() && !import.meta.env.PROD ? (
          <p className="max-w-xl text-xs text-muted-foreground sm:text-right">
            Local: set <code className="rounded bg-muted px-1 font-mono">VITE_WEB3FORMS_ACCESS_KEY</code> in{" "}
            <code className="rounded bg-muted px-1 font-mono">.env</code> — free at web3forms.com
          </p>
        ) : null}
      </div>
    </form>
  );
}
