import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { WordReveal } from "@/components/word-reveal";
import { Terminal } from "@/components/terminal";
import { HeroPlane } from "@/components/hero-plane";
import { FeatureGrid } from "@/components/feature-grid";
import { Rail, type RailItem } from "@/components/rail";
import { StatusLedger, type LedgerRow } from "@/components/status-ledger";
import { StackBento } from "@/components/stack-bento";
import { ExplodedStack } from "@/components/exploded-stack";
import { DecodeText } from "@/components/decode-text";

const STACK = [
  "NestJS",
  "Fastify",
  "PostgreSQL",
  "Drizzle ORM",
  "Next.js",
  "shadcn/ui",
];

const STATS = [
  { value: 65000, label: "req/sec — Fastify + Drizzle ORM benchmark" },
  { value: 5, label: "sign-in providers wired in, no identity vendor" },
  { value: 1, label: "command from clone to a running app" },
];

const SETUP: RailItem[] = [
  {
    label: "Step 01",
    title: "Clone the Engine",
    body: "The backend: NestJS on Fastify, PostgreSQL and Drizzle, with auth, roles and customer separation already wired.",
  },
  {
    label: "Step 02",
    title: "Run one setup command",
    body: "Generates .env with real JWT secrets, runs the migrations, and seeds a root admin plus your first tenant company.",
  },
  {
    label: "Step 03",
    title: "Point UI Frame at it",
    body: "The admin dashboard comes up against your own data — users, roles and settings already talking to the API. From here you build your product.",
  },
];


const LEDGER: LedgerRow[] = [
  {
    name: "Engine",
    note: "REST API, JWT auth and refresh sessions, roles and permissions as JSON policy, five sign-in providers, strict config, a PostgreSQL schema per customer.",
    built: true,
  },
  {
    name: "UI Frame",
    note: "Admin shell with users, roles, auth and settings pages, a swappable theme and font system, and an API client already wired to the Engine.",
    built: true,
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero. One composition: mark, headline, one line, one pill + one
             ghost link, and the stack drawn behind it. No stat chips, no badge
             row, no product screenshot — those all live further down. */}
      <section className="bp-invert relative -mt-[69px] flex min-h-[88vh] flex-col overflow-hidden pt-[69px]">
        <div className="bp-grid pointer-events-none absolute inset-0" aria-hidden />
        <HeroPlane />
        {/* bottom fade, so the plane sinks into the page instead of stopping */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-background"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-24 sm:pt-32">
          <Reveal className="max-w-2xl" stagger={0.07}>
            <DecodeText
              as="p"
              text="TheBlueprintCode — open-source SaaS foundations"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
            />
          </Reveal>

          <WordReveal
            text="The foundation for whatever you’re building."
            delay={0.12}
            className="mt-7 max-w-3xl text-left text-4xl font-medium leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl"
          />

          <Reveal className="mt-7 max-w-xl" stagger={0.06}>
            <p className="text-lg leading-relaxed text-foreground/75">
              Warehouse ops, logistics, hotel management, an internal
              analytics tool — different products, same first six months. Auth,
              roles, customer separation and an admin dashboard, already built
              and MIT-licensed. Start at feature one.
            </p>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap items-center gap-7" stagger={0.08}>
            <Button size="lg" render={<Link href="/docs" />} nativeButton={false}>
              Get started
              <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Button>
            <Link
              href="https://github.com/theblueprintcode/engine"
              className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-foreground/85 transition-colors hover:text-foreground"
            >
              Engine on GitHub
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          {/* proof sits inside the hero's fade, not in a section of its own */}
          <Reveal className="mt-auto pb-12 pt-20" stagger={0.05}>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">
              Built on
            </p>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-3">
              {STACK.map((item) => (
                <span
                  key={item}
                  className="whitespace-nowrap text-sm text-foreground/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Numbers, sourced */}
      <div className="border-b border-border">
        <Reveal
          className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3"
          stagger={0.08}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <StatCounter
                value={stat.value}
                className="font-mono text-4xl font-medium text-primary"
              />
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ── Capabilities, each with something to look at */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Reveal className="mb-10 max-w-2xl" stagger={0.06}>
          <DecodeText as="p" className="bp-sheet-number" text="SHEET 02 / 06 — CAPABILITIES" />
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            The groundwork, already poured.
          </h2>
          <p className="mt-4 text-foreground/70">
            Every one of these is code in the repo today, not a roadmap item.
          </p>
        </Reveal>

        <FeatureGrid />
      </section>


      {/* ── Why this stack, in bento. The one section that has to survive a
             sceptical senior engineer reading it. */}
      <section className="border-t border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-10 max-w-2xl" stagger={0.06}>
            <DecodeText as="p" className="bp-sheet-number" text="SHEET 03 / 06 — THE STACK" />
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Why these picks, and what you get for them.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every choice here is one you would have had to make yourself in
              week one. Here is the reasoning, with the numbers attributed to
              whoever published them.
            </p>
          </Reveal>

          <StackBento />
        </div>
      </section>

      {/* ── The layers, with their real config on show */}
      <section className="bp-invert relative overflow-hidden border-y border-border py-16 sm:py-20">
        <div className="bp-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="mb-10 max-w-2xl" stagger={0.06}>
            <DecodeText as="p" className="bp-sheet-number" text="SHEET 04 / 06 — THE ASSEMBLY" />
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              One system, drawn in layers.
            </h2>
            <p className="mt-4 text-foreground/70">
              Each layer is a repository you fork on its own. Scroll to open the
              assembly; hover a layer to lift it out of it.
            </p>
          </Reveal>

          <ExplodedStack />
        </div>
      </section>

      {/* ── Setup */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Reveal className="mb-12 max-w-2xl" stagger={0.06}>
          <DecodeText as="p" className="bp-sheet-number" text="SHEET 05 / 06 — SETUP" />
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Clone to a running app, in one sitting.
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <Rail items={SETUP} />
          <Terminal
            className="lg:sticky lg:top-24"
            file="engine/README.md"
            command="npm run setup"
            lines={[
              { text: "→ creates .env with generated JWT secrets" },
              { text: "→ runs migrations" },
              { text: "→ seeds a root admin + your first tenant company" },
              { text: "ready on http://localhost:3000", tone: "note" },
            ]}
          />
        </div>
      </section>

      {/* ── The ledger: what you can clone today */}
      <section className="border-t border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 max-w-2xl" stagger={0.06}>
            <DecodeText as="p" className="bp-sheet-number" text="SHEET 06 / 06 — THE LEDGER" />
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              What ships today.
            </h2>
            <p className="mt-4 text-foreground/70">
              Every row is code you can clone right now, not a plan. The ledger
              grows as layers land.
            </p>
          </Reveal>

          <StatusLedger rows={LEDGER} />
        </div>
      </section>

      {/* ── Close */}
      <section className="bp-invert relative overflow-hidden border-t border-border">
        <div className="bp-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_60%,#000,transparent)]" aria-hidden />
        <Reveal className="relative mx-auto max-w-6xl px-6 py-20 text-center" stagger={0.08}>
          <span className="bp-crop-mark bottom-6 left-4" aria-hidden />
          <span className="bp-crop-mark bottom-6 right-4" aria-hidden />
          <h2 className="text-3xl font-medium tracking-tight sm:text-5xl">
            Start from the blueprint, not from zero.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-foreground/70">
            A template, not a product. Fork it, customise it, ship it — no
            attribution, no seat count, no upgrade path to buy.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" render={<Link href="/docs" />} nativeButton={false}>
              Get started free
              <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="https://github.com/theblueprintcode/engine" />}
              nativeButton={false}
            >
              Engine on GitHub
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
