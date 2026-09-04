"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Independent ORM benchmark — JS-AK/db-orm-benchmarks, PostgreSQL 16.x,
 * 50,000 queries per run, averaged over 10 runs. Not our benchmark and not
 * our hardware.
 *
 * Shown as small multiples rather than a single ranked chart because the
 * result genuinely inverts by workload: no ORM here wins everything, and a
 * single chart could only be built by choosing the workload that flatters
 * one of them.
 */
const WORKLOADS = [
  {
    name: "Select — concurrent",
    detail: "50k selects via Promise.all()",
    rows: [
      { orm: "Prisma", qps: 16216 },
      { orm: "Drizzle", qps: 8474, ours: true },
      { orm: "Sequelize", qps: 8365 },
      { orm: "TypeORM", qps: 7687 },
    ],
  },
  {
    name: "Select — sequential",
    detail: "50k selects awaited one by one",
    rows: [
      { orm: "Drizzle", qps: 10079, ours: true },
      { orm: "TypeORM", qps: 7878 },
      { orm: "Sequelize", qps: 7607 },
      { orm: "Prisma", qps: 3493 },
    ],
  },
  {
    name: "Insert — one transaction",
    detail: "50k users in a single transaction",
    rows: [
      { orm: "Drizzle", qps: 6058, ours: true },
      { orm: "TypeORM", qps: 5962 },
      { orm: "Sequelize", qps: 4113 },
      { orm: "Prisma", qps: 2555 },
    ],
  },
  {
    name: "Insert — concurrent",
    detail: "50k users via Promise.all()",
    rows: [
      { orm: "Prisma", qps: 9563 },
      { orm: "Sequelize", qps: 4984 },
      { orm: "TypeORM", qps: 4950 },
      { orm: "Drizzle", qps: 4066, ours: true },
    ],
  },
];

export function OrmBenchmark() {
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
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          },
        );
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref}>
      <div className="grid gap-8 sm:grid-cols-2">
        {WORKLOADS.map((workload) => {
          const max = Math.max(...workload.rows.map((r) => r.qps));
          return (
            <div key={workload.name}>
              <h3 className="text-sm font-medium tracking-tight">{workload.name}</h3>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                {workload.detail}
              </p>
              <ul className="mt-4 space-y-2.5">
                {workload.rows.map((row) => (
                  <li key={row.orm}>
                    <div className="mb-1 flex items-baseline justify-between gap-3">
                      <span
                        className={`text-xs ${
                          row.ours ? "font-medium text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {row.orm}
                      </span>
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          row.ours ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {row.qps.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/8">
                      <div
                        data-bar
                        className={`h-full origin-left rounded-full ${
                          row.ours ? "bg-primary" : "bg-foreground/25"
                        }`}
                        style={{ width: `${(row.qps / max) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-8 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
        Average queries per second, higher is better. Source:{" "}
        <a
          href="https://github.com/JS-AK/db-orm-benchmarks"
          className="underline underline-offset-2 hover:text-foreground"
        >
          JS-AK/db-orm-benchmarks
        </a>{" "}
        — PostgreSQL 16.x, 50,000 queries per run, averaged over 10 runs. Not
        our benchmark and not our hardware. Measured on drizzle-orm 0.28.6,
        @prisma/client 5.4.1, sequelize 6.33.0 and typeorm 0.3.17, so it is a
        snapshot of those versions rather than the current releases.
      </p>
    </div>
  );
}
