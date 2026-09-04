"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/use-iso-layout-effect";
import { StatCounter } from "@/components/stat-counter";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stack highlights. This section states what the stack is good at; the
 * side-by-side ORM and framework comparisons live on the Engine layer page,
 * where there is room to qualify them properly.
 */

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded border border-primary/35 px-2 py-0.5 font-mono text-[10px] text-primary"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function StackBento() {
  const ref = useRef<HTMLDivElement>(null);

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
        const cells = el.querySelectorAll("[data-bento]");
        if (reduced) {
          gsap.set(cells, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          cells,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.07,
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* ── The headline number */}
      <div
        data-bento
        className="bp-cell relative flex flex-col justify-between gap-6 rounded-xl p-8 sm:col-span-2 lg:row-span-2"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            Throughput — Fastify + Drizzle
          </p>
          <p className="mt-6 font-mono text-6xl font-medium leading-none text-primary sm:text-7xl">
            <StatCounter value={65000} className="inline" as="span" />
          </p>
          <p className="mt-3 text-sm text-muted-foreground">requests per second</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Measured on our own benchmark. The foundation you pick is the one
          thing you cannot cheaply change later — so it may as well be the fast
          one.
        </p>
      </div>

      {/* ── The multiple */}
      <div data-bento className="bp-cell relative flex flex-col justify-center rounded-xl p-8 sm:col-span-2">
        <p className="font-mono text-5xl font-medium leading-none text-primary">
          <StatCounter value={5.4} decimals={1} suffix="×" className="inline" as="span" />
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          faster than Express + TypeORM in the same test — infrastructure cost
          you never pay, rather than a micro-optimisation to chase later.
        </p>
      </div>

      {/* ── Drizzle, stated as a strength */}
      <div data-bento className="bp-cell relative flex flex-col gap-3 rounded-xl p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          Drizzle
        </p>
        <p className="font-mono text-3xl font-medium leading-none text-primary">
          <StatCounter value={0} className="inline" as="span" />
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          query-engine binaries to ship. A thin, typed layer over SQL — your
          schema is just TypeScript.
        </p>
      </div>

      {/* ── Relational reads */}
      <div data-bento className="bp-cell relative flex flex-col gap-3 rounded-xl p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          Relational reads
        </p>
        <p className="text-2xl font-medium tracking-tight">No n+1</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          by design, not by remembering to configure eager loading on every
          query.
        </p>
      </div>

      {/* ── Isolation */}
      <div data-bento className="bp-cell relative flex flex-col gap-3 rounded-xl p-6 sm:col-span-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          PostgreSQL — schema per tenant
        </p>
        <p className="text-2xl font-medium tracking-tight">
          Isolation the database enforces.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          One schema per company. Cross-tenant leakage is structurally
          impossible, not a{" "}
          <code className="font-mono text-[12px] text-foreground">WHERE</code>{" "}
          clause someone has to remember.
        </p>
        <div className="mt-1">
          <Chips items={["tenant_acme", "tenant_globex", "tenant_initech"]} />
        </div>
      </div>

      {/* ── Boot safety */}
      <div data-bento className="bp-cell relative flex flex-col gap-3 rounded-xl p-6 sm:col-span-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          Strict by default
        </p>
        <p className="text-2xl font-medium tracking-tight">
          It fails on deploy, not at midnight.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Joi validates every required variable at boot. A missing secret stops
          the process starting instead of surfacing as a 500 hours later.
        </p>
        <motion.div
          className="mt-1 space-y-0.5 font-mono text-[10px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-muted-foreground">
            <span className="text-primary">✓</span> DATABASE_URL
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">✓</span> JWT_ACCESS_SECRET
          </p>
          <p className="text-destructive">✗ SMTP_HOST — boot refused</p>
        </motion.div>
      </div>

      {/* ── Pointer to the depth */}
      <div data-bento className="bp-cell relative flex flex-col justify-center gap-3 rounded-xl p-6 sm:col-span-2 lg:col-span-4">
        <Link href="/layers/engine" className="group flex items-center justify-between gap-6">
          <span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
              Want the trade-offs, not the highlights?
            </span>
            <span className="mt-2 block text-lg font-medium tracking-tight">
              See how Drizzle, Prisma and Sequelize actually differ
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
