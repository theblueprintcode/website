import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect during SSR (where it would warn).
 *
 * Every GSAP setup in this codebase begins by hiding its targets
 * (`opacity: 0`). Done in a passive effect that runs *after* the browser has
 * painted, so the content flashes at full opacity for one frame and then
 * disappears before animating back in. A layout effect runs before paint, so
 * the hidden state is the first thing on screen.
 *
 * This is the same trick `@gsap/react`'s `useGSAP` uses internally; we do not
 * pull that package in because this three-line hook is the only part of it
 * these components need.
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
