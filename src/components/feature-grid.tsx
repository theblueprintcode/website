"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const THEMES = [
  { name: "default", swatches: ["#0041ba", "#d38a00", "#cfd8e8"] },
  { name: "brutalist", swatches: ["#000000", "#ffdb00", "#ff4d00"] },
  { name: "soft-pop", swatches: ["#7c5cff", "#ff8fab", "#9ee493"] },
  { name: "tangerine", swatches: ["#e8590c", "#ffd8a8", "#495057"] },
];

/** Palette strip that steps through the shipped presets. This is the
 *  "swappable themes" claim demonstrated instead of asserted. */
function ThemeArtifact() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % THEMES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const theme = THEMES[i];

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {theme.swatches.map((color, n) => (
          <motion.span
            key={`${theme.name}-${n}`}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, delay: n * 0.05 }}
            className="size-5 rounded border border-white/20"
            style={{ background: color }}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] text-foreground/50">{theme.name}</span>
    </div>
  );
}

function Chips({ items, tone = "muted" }: { items: string[]; tone?: "muted" | "gold" }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded border px-2 py-0.5 font-mono text-[10px] ${
            tone === "gold"
              ? "border-primary/40 text-primary"
              : "border-border text-foreground/55"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function EnvArtifact() {
  return (
    <div className="space-y-0.5 font-mono text-[10px]">
      <p className="text-foreground/55">
        <span className="text-primary">✓</span> DATABASE_URL
      </p>
      <p className="text-foreground/55">
        <span className="text-primary">✓</span> JWT_SECRET
      </p>
      <p className="text-destructive">✗ STRIPE_KEY — boot refused</p>
    </div>
  );
}

const FEATURES = [
  {
    n: "01",
    title: "Schema-per-tenant isolation",
    body: "Every company gets its own Postgres schema. Cross-tenant leakage is a structural impossibility, not a WHERE clause you must remember.",
    artifact: <Chips items={["tenant_acme", "tenant_globex", "tenant_initech"]} />,
  },
  {
    n: "02",
    title: "Module-based RBAC",
    body: "Permissions group by module rather than a flat string list, so a new feature ships with its access rules instead of a migration to backfill them.",
    artifact: <Chips items={["billing:manage", "users:view", "reports:*"]} tone="gold" />,
  },
  {
    n: "03",
    title: "Five SSO providers, free",
    body: "Google, GitHub, Microsoft, Discord and Apple, JWT-based, wired to the tenant model — no per-seat identity vendor in the loop.",
    artifact: <Chips items={["Google", "GitHub", "Microsoft", "Discord", "Apple"]} />,
  },
  {
    n: "04",
    title: "Config strict by default",
    body: "A missing required env variable fails the boot. You find out on deploy, not from a 500 in production three hours later.",
    artifact: <EnvArtifact />,
  },
  {
    n: "05",
    title: "Themes and fonts, swappable",
    body: "A real multi-theme and multi-font system, not one locked palette. Change the preset, every component follows.",
    artifact: <ThemeArtifact />,
  },
  {
    n: "06",
    title: "shadcn/ui on Base UI",
    body: "The component layer you would have picked anyway, already wired to the theme tokens and the admin shell.",
    artifact: <Chips items={["Button", "Dialog", "DataTable", "Form", "+40"]} />,
  },
];

export function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        const cells = el.querySelectorAll("[data-cell]");
        if (reduced) {
          gsap.set(cells, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          cells,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: { each: 0.07, grid: "auto", from: "start" },
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature) => (
        <div
          key={feature.n}
          data-cell
          className="bp-cell bp-tick relative flex flex-col gap-3 rounded-none p-6"
        >
          <span className="font-mono text-[11px] tracking-widest text-primary/70">
            {feature.n}
          </span>
          <h3 className="text-base font-medium tracking-tight">{feature.title}</h3>
          <p className="text-sm leading-relaxed text-foreground/65">{feature.body}</p>
          <div className="mt-auto pt-3">{feature.artifact}</div>
        </div>
      ))}
    </div>
  );
}
