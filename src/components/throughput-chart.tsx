"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The Engine's own benchmark, from engine/README.md. These measure the whole
 * combination — web framework plus ORM — which is the thing you actually
 * choose, rather than a framework in isolation.
 */
const STACKS = [
  { name: "Express + TypeORM", reqs: 12000 },
  { name: "Express + Prisma", reqs: 18000 },
  { name: "Fastify + Drizzle ORM", reqs: 65000, ours: true },
];

const MAX = Math.max(...STACKS.map((s) => s.reqs));

/**
 * Single-series ranked bar chart: one measure (req/s), one hue, our own
 * combination emphasized. One series means no legend — the title names it —
 * and each bar is direct-labeled rather than read off an axis.
 */
export function ThroughputChart() {
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
        const bars = el.querySelectorAll<HTMLElement>("[data-bar]");

        if (reduced) {
          bars.forEach((bar) => {
            bar.style.transform = "scaleX(1)";
          });
          return;
        }

        gsap.fromTo(
          bars,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          },
        );
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref}>
      <ul className="space-y-4">
        {STACKS.map((stack) => (
          <li key={stack.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span
                className={`text-sm ${
                  stack.ours ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {stack.name}
              </span>
              <span
                className={`font-mono text-xs tabular-nums ${
                  stack.ours ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {stack.reqs.toLocaleString()}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-foreground/8">
              <div
                data-bar
                className={`h-full origin-left rounded-full ${
                  stack.ours ? "bg-primary" : "bg-foreground/25"
                }`}
                style={{ width: `${(stack.reqs / MAX) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
        Requests per second, higher is better. Our own benchmark, from
        engine/README.md — our hardware, our handlers. Read it as a comparison
        between these three combinations, not as a prediction of your
        production numbers. Fastify publishes independent framework-level
        figures at{" "}
        <a
          href="https://fastify.dev/benchmarks/"
          className="underline underline-offset-2 hover:text-foreground"
        >
          fastify.dev/benchmarks
        </a>
        .
      </p>
    </div>
  );
}
