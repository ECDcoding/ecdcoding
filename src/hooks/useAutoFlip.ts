import { useCallback, useEffect, useRef } from "react";

interface UseAutoFlipOptions {
  /** Called each time the card should flip to its next side */
  onFlip: () => void;
  /** Set to false to pause auto flipping (e.g. while recording) */
  enabled?: boolean;
  /** Milliseconds between flips while the card is visible */
  intervalMs?: number;
}

/**
 * Automatically flips a card while it is visible in the viewport.
 * Returns a ref to attach to the card's outer element.
 */
export function useAutoFlip<T extends HTMLElement = HTMLDivElement>({
  onFlip,
  enabled = true,
  intervalMs = 4000,
}: UseAutoFlipOptions) {
  const elementRef = useRef<T | null>(null);
  const flipRef = useRef(onFlip);
  flipRef.current = onFlip;

  const stableFlip = useCallback(() => flipRef.current(), []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !enabled) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(stableFlip, intervalMs);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return stop;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [enabled, intervalMs, stableFlip]);

  return elementRef;
}
