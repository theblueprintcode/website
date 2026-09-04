"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The hero's background plane: the system drawn as an exploded stack of
 * layers, bleeding off the right edge. This replaces the product screenshot
 * a landing page would normally put here — the drawing is the argument, since
 * the product is a set of layers rather than one screen.
 *
 * Plates render back-to-front; the two that ship today are drawn solid, the
 * planned ones stay as hairline outlines.
 */
const PLATES = [
  { id: "L05", open: false },
  { id: "L04", open: false },
  { id: "L03", open: false },
  { id: "L02", open: true },
  { id: "L01", open: true },
];

const GAP = 74;

export function HeroPlane() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const plates = el.querySelectorAll<HTMLElement>("[data-plate]");

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        default: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        const restZ = (i: number) => (plates.length - 1 - i) * GAP;

        if (reduced) {
          plates.forEach((plate, i) => gsap.set(plate, { z: restZ(i), opacity: 1 }));
          return;
        }

        // Entrance: the stack assembles from flat, back plate first.
        const tl = gsap.timeline({ delay: 0.18 });
        plates.forEach((plate, i) => {
          gsap.set(plate, { z: 0, opacity: 0 });
          tl.to(
            plate,
            {
              z: restZ(i),
              opacity: 1,
              duration: 1.1,
              ease: "cubic-bezier(.22,1,.36,1)",
            },
            i * 0.1,
          );
        });

        // Scroll: the stack pulls further apart as the hero leaves.
        gsap.to(plates, {
          z: (i: number) => restZ(i) * 1.85,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-[-18%] hidden w-[78%] items-center justify-center lg:flex xl:right-[-8%] xl:w-[62%]"
      style={{ perspective: "1600px" }}
    >
      <div
        className="relative h-[560px] w-[560px]"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(64deg) rotateZ(-40deg)" }}
      >
        {PLATES.map((plate) => (
          <div
            key={plate.id}
            data-plate
            className={`absolute inset-0 rounded-sm border ${
              plate.open
                ? "border-primary/90 bg-primary/12"
                : "border-foreground/45 bg-foreground/[0.04]"
            }`}
          >
            {plate.open && (
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--primary) 0 1px, transparent 1px 9px)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
