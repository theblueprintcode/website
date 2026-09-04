"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll, driven by GSAP's ticker and feeding ScrollTrigger.
 * Without this wiring ScrollTrigger reads stale scroll positions and
 * scroll-driven animations (reveals, counters, draws) never fire.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.05 });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();
    // The webfont swap changes every element's height; re-measure once it
    // lands, otherwise every trigger start is off by that reflow.
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
