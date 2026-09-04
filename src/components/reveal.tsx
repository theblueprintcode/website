"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-reveal wrapper: 24px rise + fade, per style-lock.md's Motion section.
 * Respects prefers-reduced-motion via gsap.matchMedia().
 */
export function Reveal({
  children,
  className,
  stagger = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        default: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        const targets = el.children.length ? Array.from(el.children) : [el];

        if (reduced) {
          gsap.set(targets, { opacity: 1, y: 0 });
          return;
        }

        gsap.set(targets, { opacity: 0, y: 24 });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      },
    );

    return () => mm.revert();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
