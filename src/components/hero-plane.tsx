"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/use-iso-layout-effect";
import { PlateFace } from "@/components/plate-sketches";

gsap.registerPlugin(ScrollTrigger);

/**
 * The hero's background plane: the system drawn as an exploded stack,
 * bleeding off the right edge. This replaces the product screenshot a landing
 * page would normally put here — the drawing is the argument, since the
 * product is a foundation rather than one screen.
 *
 * The stack is a drawing of a layered system, not a count of what ships. It
 * needs no editing when a layer is added.
 */
/** Top of the stack first: the plates render back-to-front, so the layers the
 *  copy names sit nearest the reader. Same faces as the assembly section — the
 *  hero is the same drawing, seen from further away. */
const PLATES = [
  { id: "p05", index: "05" },
  { id: "p04", index: "04" },
  { id: "p03", index: "03" },
  { id: "uiframe", index: "02" },
  { id: "engine", index: "01" },
];

const GAP = 78;

export function HeroPlane() {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
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
            { z: restZ(i), opacity: 1, duration: 1.1, ease: "expo.out" },
            i * 0.1,
          );
        });

        // Scroll: the stack pulls further apart as the hero leaves.
        //
        // fromTo + immediateRender:false is load-bearing. A plain gsap.to()
        // records its start value when the tween is built — which is z:0,
        // set one line above by the entrance — so the first scrub tick
        // yanked every plate back to zero and the stack collapsed into a
        // single sheet before spreading. Stating the `from` explicitly, and
        // refusing to render it until the scrub actually runs, keeps the
        // scroll tween continuous with where the entrance left off.
        gsap.fromTo(
          plates,
          { z: (i: number) => restZ(i) },
          {
            z: (i: number) => restZ(i) * 1.85,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
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
        className="relative h-[520px] w-[520px]"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(64deg) rotateZ(-40deg)" }}
      >
        {PLATES.map((plate) => (
          <div key={plate.id} data-plate className="absolute inset-0">
            <PlateFace id={plate.id} index={plate.index} />
          </div>
        ))}
      </div>
    </div>
  );
}
