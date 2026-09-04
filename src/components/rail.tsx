"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type RailItem = {
  label: string;
  title: string;
  body: string;
  /** Shipped nodes read solid gold; planned nodes stay hollow. */
  status?: "shipped" | "planned";
  aside?: React.ReactNode;
};

/**
 * Vertical timeline whose connecting line draws as the section scrolls, with
 * each node lighting up as the line reaches it. One rail serves both the
 * setup steps and the roadmap — the only difference is node status.
 */
export function Rail({ items }: { items: RailItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const line = el.querySelector("[data-line]");
    const nodes = el.querySelectorAll("[data-node]");
    const rows = el.querySelectorAll("[data-row]");

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        default: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        if (reduced) {
          gsap.set(line, { scaleY: 1 });
          gsap.set([nodes, rows], { opacity: 1, y: 0, scale: 1 });
          return;
        }

        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.5,
            },
          },
        );

        rows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: { trigger: row, start: "top 82%" },
            },
          );
          gsap.fromTo(
            nodes[i],
            { scale: 0.4, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: { trigger: row, start: "top 82%" },
            },
          );
        });
      },
    );

    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={ref} className="relative pl-8">
      {/* track + drawn progress line */}
      <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border [mask-image:linear-gradient(#000_82%,transparent)]" aria-hidden />
      <span
        data-line
        className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-primary [mask-image:linear-gradient(#000_82%,transparent)]"
        aria-hidden
      />

      <ol className="space-y-10">
        {items.map((item) => (
          <li key={item.title} data-row className="relative">
            <span
              data-node
              className={`absolute -left-8 top-1.5 size-[15px] rounded-full border-2 ${
                item.status === "planned"
                  ? "border-border bg-background"
                  : "border-primary bg-primary"
              }`}
              aria-hidden
            />
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary/70">
                  {item.label}
                </p>
                <h3 className="mt-1.5 text-base font-medium tracking-tight">{item.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-foreground/65">
                  {item.body}
                </p>
              </div>
              {item.aside}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
