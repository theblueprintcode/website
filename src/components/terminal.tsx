"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/use-iso-layout-effect";

gsap.registerPlugin(ScrollTrigger);

export type TerminalLine = { text: string; tone?: "cmd" | "out" | "note" };

/**
 * Terminal that types its command on first scroll into view, then reveals
 * output lines one at a time. `command` is what the copy button copies.
 */
export function Terminal({
  file,
  command,
  lines,
  className,
}: {
  file: string;
  command: string;
  lines: TerminalLine[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cmdRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    const cmdEl = cmdRef.current;
    if (!el || !cmdEl) return;

    const outputs = el.querySelectorAll("[data-out]");
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        default: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        if (reduced) {
          cmdEl.textContent = command;
          gsap.set(outputs, { opacity: 1, x: 0 });
          return;
        }

        gsap.set(outputs, { opacity: 0, x: -8 });

        const typed = { i: 0 };
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });

        tl.to(typed, {
          i: command.length,
          duration: Math.min(command.length * 0.045, 1.4),
          ease: "none",
          onUpdate: () => {
            cmdEl.textContent = command.slice(0, Math.round(typed.i));
          },
        }).to(outputs, {
          opacity: 1,
          x: 0,
          duration: 0.28,
          ease: "power2.out",
          stagger: 0.14,
        });
      },
    );

    return () => mm.revert();
  }, [command]);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div ref={ref} className={`bp-code group relative rounded-lg ${className ?? ""}`}>
      {/* Copy confirmation as a drafting approval stamp rather than a toast. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute right-3 top-9 z-10 -rotate-[8deg] rounded border border-dashed border-primary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-all duration-200 ${
          copied ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        Copied
      </span>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-wider text-foreground/45">{file}</span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          className="rounded p-1 text-foreground/40 transition-colors hover:bg-white/5 hover:text-primary"
        >
          {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
        </button>
      </div>

      <div className="px-4 py-4 font-mono text-[13px] leading-relaxed">
        <p>
          <span className="text-primary">$&nbsp;</span>
          <span ref={cmdRef} className="text-foreground" />
          <span className="bp-caret ml-0.5" aria-hidden />
        </p>
        {lines.map((line, i) => (
          <p
            key={i}
            data-out
            className={`mt-1 ${
              line.tone === "note" ? "text-foreground/40" : "text-foreground/70"
            }`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
