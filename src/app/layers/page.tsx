import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { DecodeText } from "@/components/decode-text";

export const metadata: Metadata = {
  title: "Layers — TheBlueprintCode",
  description:
    "TheBlueprintCode is one system, released as layers you fork. Engine is the backend, UI Frame is the admin dashboard, and every layer is open source.",
};

const LAYERS = [
  {
    index: "01",
    name: "Engine",
    role: "API + data",
    href: "/layers/engine",
    body: "NestJS on Fastify with Drizzle ORM, JSON-configured roles, five sign-in providers, and each customer's data in its own PostgreSQL schema.",
    open: true,
  },
  {
    index: "02",
    name: "UI Frame",
    role: "admin",
    href: "/layers/ui-frame",
    body: "Next.js and shadcn/ui on Base UI, a swappable theme and font system, and an API client already wired to the Engine.",
    open: true,
  },
];

export default function LayersPage() {
  return (
    <div>
      <section className="bp-invert relative -mt-[69px] overflow-hidden pt-[69px]">
        <div className="bp-grid pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-28">
          <DecodeText
            as="p"
            text="TheBlueprintCode — a system in layers"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
          />
          <WordReveal
            text="The layers."
            delay={0.1}
            className="mt-6 text-left text-5xl font-medium tracking-tight sm:text-7xl"
          />
          <Reveal className="mt-6 max-w-xl" stagger={0.06}>
            <p className="text-lg leading-relaxed text-foreground/75">
              One foundation, released a layer at a time. Each is a repository
              you fork, not a package you install — what you build on top is
              yours, in whatever industry you build it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <ol className="divide-y divide-border border-y border-border">
          {LAYERS.map((layer) => {
            const body = (
              <div className="grid gap-4 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-baseline sm:gap-8">
                <span
                  className={`font-mono text-sm ${
                    layer.open ? "text-primary" : "text-muted-foreground/60"
                  }`}
                >
                  {layer.index}
                </span>
                <span>
                  <span className="flex flex-wrap items-baseline gap-3">
                    <span
                      className={`text-2xl font-medium tracking-tight ${
                        layer.open ? "" : "text-muted-foreground"
                      }`}
                    >
                      {layer.name}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {layer.role}
                    </span>
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {layer.body}
                  </span>
                </span>
                {layer.open ? (
                  <ArrowRight className="hidden size-5 text-primary transition-transform duration-200 group-hover:translate-x-1 sm:block" />
                ) : (
                  <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 sm:block">
                    Not built
                  </span>
                )}
              </div>
            );

            return (
              <li key={layer.index}>
                <Reveal>
                  {layer.href ? (
                    <Link href={layer.href} className="group block">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
