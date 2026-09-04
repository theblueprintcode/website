"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Headline entrance: each word rises out from behind a clipping mask.
 * The mask is what separates this from a plain fade — words appear to be
 * uncovered rather than turned on.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll("[data-word]");

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        default: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        if (reduced) {
          gsap.set(words, { yPercent: 0, opacity: 1 });
          return;
        }
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.045,
            delay,
          },
        );
      },
    );
    return () => mm.revert();
  }, [delay, text]);

  return (
    // @ts-expect-error - polymorphic tag, ref type is the union of the three
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden py-[0.06em] align-bottom">
          <span data-word className="inline-block">
            {word}
            {" "}
          </span>
        </span>
      ))}
    </Tag>
  );
}
