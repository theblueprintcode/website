"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/use-iso-layout-effect";

gsap.registerPlugin(ScrollTrigger);

export type LedgerRow = {
  name: string;
  note: string;
  built: boolean;
};

/**
 * The build ledger: what has an implementation and what is only an interface.
 *
 * Deliberately not another vertical rail — the setup section directly above
 * already uses one, and two timelines back to back read as a template. This
 * is a drawing-sheet revision block instead: full-bleed rows, a rule that
 * wipes in under each one, and the state stated in the margin.
 */
export function StatusLedger({ rows }: { rows: LedgerRow[] }) {
  const ref = useRef<HTMLDivElement>(null);

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
        const items = el.querySelectorAll("[data-row]");
        const rules = el.querySelectorAll("[data-rule]");

        if (reduced) {
          gsap.set(items, { opacity: 1, y: 0 });
          gsap.set(rules, { scaleX: 1 });
          return;
        }

        gsap.set(items, { opacity: 0, y: 14 });
        gsap.set(rules, { scaleX: 0 });

        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 80%" } })
          .to(items, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.09,
          })
          .to(
            rules,
            { scaleX: 1, duration: 0.5, ease: "power2.inOut", stagger: 0.09 },
            0.06,
          );
      },
    );

    return () => mm.revert();
  }, [rows.length]);

  return (
    <div ref={ref} className="border-t border-border">
      {rows.map((row) => (
        <div key={row.name} className="relative">
          <div
            data-row
            className="grid items-baseline gap-x-8 gap-y-2 py-6 sm:grid-cols-[minmax(180px,0.9fr)_2fr_auto]"
          >
            <h3 className="text-base font-medium tracking-tight">{row.name}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{row.note}</p>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest sm:justify-end">
              <span
                className={`size-2 shrink-0 rounded-full ${
                  row.built ? "bg-primary" : "border border-muted-foreground/60"
                }`}
                aria-hidden
              />
              <span className={row.built ? "text-primary" : "text-muted-foreground"}>
                {row.built ? "Built" : "Interface only"}
              </span>
            </p>
          </div>
          <span
            data-rule
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-border"
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}
