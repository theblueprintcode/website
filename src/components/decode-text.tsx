"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/use-iso-layout-effect";

gsap.registerPlugin(ScrollTrigger);

/**
 * Annotation label that decodes into place: each character churns through hex
 * and binary glyphs, then resolves left to right into the real text.
 *
 * The label is in the DOM as real text for screen readers and for the moment
 * before JS runs; only the aria-hidden layer scrambles. Character count never
 * changes, so with a mono face the line never reflows while it decodes.
 */

const GLYPHS = "0123456789ABCDEF01";

export function DecodeText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "p" | "h2";
}) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    const out = el?.querySelector<HTMLElement>("[data-decoded]");
    if (!el || !out) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        default: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        if (reduced) {
          out.textContent = text;
          return;
        }

        const chars = [...text];
        out.textContent = "";

        const state = { resolved: 0 };
        gsap.to(state, {
          resolved: chars.length,
          duration: Math.min(0.045 * chars.length, 1.5),
          ease: "power1.inOut",
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            out.textContent = chars
              .map((char, i) => {
                if (i < state.resolved) return char;
                // whitespace and separators stay put so the label keeps its
                // shape while the words underneath are still noise
                if (char === " ") return " ";
                return GLYPHS[(Math.random() * GLYPHS.length) | 0];
              })
              .join("");
          },
          onComplete: () => {
            out.textContent = text;
          },
        });
      },
    );

    return () => mm.revert();
  }, [text, delay]);

  return (
    // @ts-expect-error - polymorphic tag, ref covers the three element types
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span data-decoded aria-hidden>
        {text}
      </span>
    </Tag>
  );
}
