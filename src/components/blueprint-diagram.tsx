"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Schematic of the two shipped components, drawn on scroll like a
 * drafting-table trace: the connector path animates via stroke-dashoffset
 * scrubbed to scroll position instead of a plain fade-in.
 */
export function BlueprintDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const path = svg.querySelector<SVGPathElement>("[data-connector]");
    const nodes = svg.querySelectorAll<SVGRectElement>("[data-node]");
    if (!path) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        default: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        const length = path.getTotalLength();

        if (reduced) {
          gsap.set(path, { strokeDashoffset: 0 });
          gsap.set(nodes, { opacity: 1, scale: 1 });
          return;
        }

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.set(nodes, { opacity: 0, scale: 0.9, transformOrigin: "center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: svg,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.6,
          },
        });

        tl.to(path, { strokeDashoffset: 0, ease: "none" }).to(
          nodes,
          { opacity: 1, scale: 1, stagger: 0.15, ease: "power2.out" },
          "<0.2",
        );
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 200"
      className="h-auto w-full max-w-lg"
      aria-hidden
    >
      <rect
        data-node
        x="16"
        y="76"
        width="140"
        height="48"
        rx="4"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      <text x="86" y="105" textAnchor="middle" fontSize="13" fill="var(--accent)" fontFamily="var(--font-geist-mono)">
        ENGINE
      </text>

      <rect
        data-node
        x="324"
        y="76"
        width="140"
        height="48"
        rx="4"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
      />
      <text x="394" y="105" textAnchor="middle" fontSize="13" fill="var(--primary)" fontFamily="var(--font-geist-mono)">
        UI FRAME
      </text>

      <path
        data-connector
        d="M156 100 C 220 100, 260 100, 324 100"
        fill="none"
        stroke="color-mix(in srgb, var(--foreground) 45%, transparent)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="240" cy="100" r="3" fill="var(--foreground)" opacity="0.5" />
      <text x="240" y="86" textAnchor="middle" fontSize="10" fill="var(--foreground)" opacity="0.5" fontFamily="var(--font-geist-mono)">
        REST / JWT
      </text>
    </svg>
  );
}
