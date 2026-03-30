import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterTextProps = {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
};

export function TypewriterText({
  texts,
  className,
  typingSpeed = 75,
  deletingSpeed = 45,
  pauseMs = 1800,
}: TypewriterTextProps) {
  const textKey = useMemo(() => texts.join("\0"), [texts]);
  const safeTexts = texts.length > 0 ? texts : [""];

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setLineIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [textKey]);

  const current = safeTexts[lineIndex % safeTexts.length] ?? "";

  useEffect(() => {
    if (!safeTexts.length) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
    } else if (!isDeleting && charIndex === current.length && current.length > 0) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), deletingSpeed);
    } else if (isDeleting && charIndex === 0 && safeTexts.length > 0) {
      setIsDeleting(false);
      setLineIndex((i) => (i + 1) % safeTexts.length);
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    current,
    isDeleting,
    lineIndex,
    pauseMs,
    deletingSpeed,
    typingSpeed,
    safeTexts.length,
  ]);

  const visible = current.slice(0, charIndex);

  return (
    <span className={cn("inline-block min-h-[1.35em] align-baseline", className)} aria-live="polite">
      <span>{visible}</span>
      <span
        className="text-secondary motion-reduce:animate-none animate-pulse"
        aria-hidden
      >
        |
      </span>
    </span>
  );
}
