"use client";

import { useIsoLayoutEffect } from "@/lib/use-iso-layout-effect";

/**
 * A drafting crosshair for the blueprint bands.
 *
 * Not a cursor-follower blob. On the navy sheets the pointer gains the
 * full-width/full-height hairlines of a CAD crosshair plus a mono coordinate
 * readout, and when it comes over something interactive the crosshair stops
 * tracking and *dimensions* it — a bounding box with corner ticks and the
 * element's measured size, the way a drawing dimensions a part. The whole
 * conceit of the site is that it is an engineering drawing; this is the one
 * interaction where the metaphor does real work rather than decoration.
 *
 * Deliberately narrow in scope:
 *  - only on the inverted (navy sheet) sections; on white paper it is noise
 *  - only for a fine pointer, so it never appears on touch
 *  - off entirely under prefers-reduced-motion
 *  - the native cursor stays visible, so nothing about pointing gets worse
 *
 * Everything is written straight to the DOM inside one rAF loop. No React
 * state, so moving the mouse never re-renders the tree.
 */
export function BlueprintCursor() {
  useIsoLayoutEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.createElement("div");
    root.setAttribute("aria-hidden", "true");
    root.className = "bp-cursor";
    root.innerHTML = `
      <span data-h></span>
      <span data-v></span>
      <span data-dot></span>
      <span data-read></span>
      <span data-box><i></i><i></i><i></i><i></i><em></em></span>
    `;
    document.body.appendChild(root);

    const h = root.querySelector<HTMLElement>("[data-h]")!;
    const v = root.querySelector<HTMLElement>("[data-v]")!;
    const dot = root.querySelector<HTMLElement>("[data-dot]")!;
    const read = root.querySelector<HTMLElement>("[data-read]")!;
    const box = root.querySelector<HTMLElement>("[data-box]")!;
    const size = box.querySelector<HTMLElement>("em")!;

    const pointer = { x: -1, y: -1 };
    const eased = { x: -1, y: -1 };
    let inBand = false;
    let target: Element | null = null;
    let raf = 0;
    let needsHitTest = true;

    const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0");

    /** Which band is the pointer over, and is it over something interactive? */
    const hitTest = () => {
      needsHitTest = false;
      const el = document.elementFromPoint(pointer.x, pointer.y);
      const band = el?.closest(".bp-invert") ?? null;
      inBand = band !== null;
      root.classList.toggle("is-on", inBand);

      const next = inBand ? (el?.closest("a[href], button") ?? null) : null;
      if (next === target) return;
      target = next;

      // While measuring, the coordinate readout is both redundant and sitting
      // on top of the thing being measured — drop it.
      root.classList.toggle("is-measuring", target !== null);

      if (!target) {
        box.classList.remove("is-on");
        return;
      }
      const r = target.getBoundingClientRect();
      box.style.transform = `translate3d(${r.left}px, ${r.top}px, 0)`;
      box.style.width = `${r.width}px`;
      box.style.height = `${r.height}px`;
      size.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
      box.classList.add("is-on");
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (needsHitTest) hitTest();
      if (!inBand) return;

      // Light lerp: enough to feel drawn rather than teleported, not so much
      // that the crosshair lags behind what you are pointing at.
      eased.x += (pointer.x - eased.x) * 0.35;
      eased.y += (pointer.y - eased.y) * 0.35;

      h.style.transform = `translate3d(0, ${eased.y}px, 0)`;
      v.style.transform = `translate3d(${eased.x}px, 0, 0)`;
      dot.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0)`;
      read.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0)`;
      read.textContent = `X ${pad(pointer.x)}  Y ${pad(pointer.y + window.scrollY)}`;
    };

    const onMove = (e: PointerEvent) => {
      if (eased.x < 0) {
        eased.x = e.clientX;
        eased.y = e.clientY;
      }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      needsHitTest = true;
    };
    const onLeave = () => {
      inBand = false;
      target = null;
      root.classList.remove("is-on");
      box.classList.remove("is-on");
    };
    const onScroll = () => {
      needsHitTest = true;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      root.remove();
    };
  }, []);

  return null;
}
