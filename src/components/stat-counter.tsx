"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/use-iso-layout-effect";

gsap.registerPlugin(ScrollTrigger);

/** Counts up from 0 to `value` once scrolled into view. `value` is numeric; `suffix` carries any trailing text/formatting. */
export function StatCounter({
  value,
  suffix = "",
  decimals = 0,
  className,
  as: Tag = "p",
}: {
  value: number;
  suffix?: string;
  /** Fractional digits to hold while counting, for figures like 1.5x. */
  decimals?: number;
  className?: string;
  as?: "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
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

        const format = (n: number) =>
          n.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          });

        if (reduced) {
          el.textContent = format(value) + suffix;
          return;
        }

        const counter = { n: 0 };
        gsap.to(counter, {
          n: value,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = format(counter.n) + suffix;
          },
        });
      },
    );

    return () => mm.revert();
  }, [value, suffix, decimals]);

  return (
    // @ts-expect-error - polymorphic tag, ref covers both element types
    <Tag ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {(0).toFixed(decimals)}
      {suffix}
    </Tag>
  );
}
