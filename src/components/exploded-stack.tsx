"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal } from "@/components/terminal";
import { DecodeText } from "@/components/decode-text";
import { PlateFace } from "@/components/plate-sketches";
import { useIsoLayoutEffect } from "@/lib/use-iso-layout-effect";

gsap.registerPlugin(ScrollTrigger);

/**
 * The system drawn as an exploded assembly.
 *
 * A parts drawing, not a card grid: the plates start stacked flush and pull
 * apart along the assembly axis as the section scrolls, with a dash-dot
 * centreline marking the axis they came off, the way an engineering exploded
 * view does.
 *
 * The stack is deliberately deeper than the panels beside it. It is a drawing
 * of a layered system, not an inventory — the plates that carry a sketch are
 * the ones the prose names, and the rest are just the system continuing. It
 * does not need editing when a layer is added.
 *
 * Hovering a panel lifts its plate out of the assembly and dims the others,
 * so the drawing and the prose point at the same thing.
 */

/** Bottom of the assembly first — the foundation is drawn at the base. */
const PLATES = [
  { id: "engine", index: "01" },
  { id: "uiframe", index: "02" },
  { id: "p03", index: "03" },
  { id: "p04", index: "04" },
  { id: "p05", index: "05" },
];

/** Vertical separation between plates once the assembly is fully exploded. */
const SPREAD = 84;

const PANELS = [
  {
    id: "engine",
    label: "Plate 01 — API + data",
    name: "Engine",
    body: "NestJS on Fastify with a REST API, JWT auth and roles you define in JSON instead of a migration. Each customer's data sits in its own PostgreSQL schema.",
    terminal: {
      file: "engine",
      command: "git clone https://github.com/theblueprintcode/engine",
      lines: [
        { text: "→ REST API, JWT auth, refresh sessions" },
        { text: "→ roles and permissions as JSON policy" },
        { text: "→ a PostgreSQL schema per customer" },
        { text: "next: npm run setup", tone: "note" as const },
      ],
    },
  },
  {
    id: "uiframe",
    label: "Plate 02 — admin interface",
    name: "UI Frame",
    body: "Next.js and shadcn/ui with a real multi-theme, multi-font system built in — swap the preset and every component follows, so it looks like your product rather than a template.",
    terminal: {
      file: "uiframe",
      command: "git clone https://github.com/theblueprintcode/uiframe",
      lines: [
        { text: "→ users, roles, auth and settings pages" },
        { text: "→ 40+ shadcn/ui components, themed" },
        { text: "→ API client with JWT already wired" },
        { text: "next: point NEXT_PUBLIC_API_URL at Engine", tone: "note" as const },
      ],
    },
  },
];

export function ExplodedStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // Scroll-scrubbed explosion: laid out flush, separating along z as the
  // section travels through the viewport.
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
        const plates = el.querySelectorAll<HTMLElement>("[data-plate]");
        const axis = el.querySelector<HTMLElement>("[data-axis]");
        const rest = (i: number) => i * SPREAD;

        if (reduced) {
          plates.forEach((plate, i) => gsap.set(plate, { z: rest(i), opacity: 1 }));
          gsap.set(axis, { scaleY: 1, opacity: 1 });
          return;
        }

        gsap.set(plates, { z: 0, opacity: 0 });
        gsap.set(axis, { scaleY: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 62%",
            scrub: 0.6,
          },
        });

        tl.to(axis, { scaleY: 1, opacity: 1, ease: "none", duration: 0.4 }, 0);
        plates.forEach((plate, i) => {
          tl.to(plate, { z: rest(i), opacity: 1, ease: "none", duration: 1 }, i * 0.1);
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-14">
      {/* ── The drawing. Decorative: every label on it is repeated as real
             text in the panels beside it. */}
      <div
        ref={ref}
        aria-hidden
        className="relative h-[420px] select-none sm:h-[520px]"
        style={{ perspective: "1500px" }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[290px] w-[290px] sm:h-[330px] sm:w-[330px]"
          style={{
            transformStyle: "preserve-3d",
            transform: `translate(-50%, -50%) rotateX(62deg) rotateZ(-38deg) translateZ(-${(SPREAD * (PLATES.length - 1)) / 2}px)`,
          }}
        >
          {/* assembly axis — the dash-dot centreline of an exploded view.
              Exactly the assembly's travel: any overshoot projects out of the
              drawing and crosses the text beside it. */}
          <span
            data-axis
            className="absolute left-1/2 top-1/2 w-px origin-bottom"
            style={{
              height: `${SPREAD * (PLATES.length - 1)}px`,
              transform: "translate(-50%, 0) rotateX(-90deg)",
              transformOrigin: "50% 100%",
              backgroundImage:
                "repeating-linear-gradient(to bottom, color-mix(in srgb, var(--primary) 55%, transparent) 0 5px, transparent 5px 11px)",
            }}
          />

          {PLATES.map((plate) => {
            const dimmed = active !== null && active !== plate.id;
            const lifted = active === plate.id;

            return (
              // GSAP owns the outer plate's transform (the scrubbed
              // explosion), so the hover lift rides on an inner wrapper
              // instead of fighting React over the same style property.
              <div
                key={plate.id}
                data-plate
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <PlateFace
                  id={plate.id}
                  index={plate.index}
                  className={[
                    "transition-all duration-300 ease-out",
                    dimmed ? "opacity-35" : "opacity-100",
                    lifted ? "!border-primary bg-primary/[0.16]" : "",
                  ].join(" ")}
                  style={{ transform: lifted ? "translateZ(34px)" : "translateZ(0px)" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── The parts, in prose, with their real config. Hovering one is what
             lifts its plate out of the drawing. */}
      <div className="grid gap-5" onMouseLeave={() => setActive(null)}>
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            onMouseEnter={() => setActive(panel.id)}
            onFocus={() => setActive(panel.id)}
            tabIndex={0}
            className="flex flex-col gap-4 rounded-lg border border-border bg-card/60 p-6 outline-none transition-colors hover:border-primary/50 focus-visible:border-primary/50"
          >
            <div>
              <DecodeText
                as="p"
                text={panel.label}
                className="font-mono text-[11px] uppercase tracking-widest text-primary/70"
              />
              <h3 className="mt-2 text-xl font-medium tracking-tight">{panel.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{panel.body}</p>
            </div>
            <Terminal {...panel.terminal} />
          </div>
        ))}
      </div>
    </div>
  );
}
