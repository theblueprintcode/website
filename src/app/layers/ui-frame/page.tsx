import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Blocks, PanelsTopLeft, Palette, Wand2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LayerHero } from "@/components/layer-hero";
import { SpecTable } from "@/components/spec-table";
import { Terminal } from "@/components/terminal";
import { ProductFrame } from "@/components/product-frame";

export const metadata: Metadata = {
  title: "UI Frame — TheBlueprintCode",
  description:
    "The admin layer: Next.js and shadcn/ui on Base UI, with a swappable theme and font system, wired to the Engine API.",
};

const SPEC = [
  { label: "Framework", value: "Next.js 16, App Router, React 19" },
  { label: "Components", value: "shadcn/ui on Base UI primitives" },
  { label: "Styling", value: "Tailwind CSS, swappable theme presets" },
  { label: "Forms", value: "react-hook-form with generated Zod schemas" },
  { label: "API client", value: "Fetch wrapper with JWT, interceptors, error handling" },
  { label: "Runtime", value: "Bun recommended, Node.js 20+ supported" },
  { label: "Dev port", value: "5200, chosen to avoid the backend on 5201" },
  { label: "Licence", value: "MIT" },
];

const FEATURES = [
  {
    icon: PanelsTopLeft,
    title: "A working admin shell",
    body: "Users, roles, auth, settings and CRM pages already built and wired — not a blank dashboard with placeholder cards.",
  },
  {
    icon: Palette,
    title: "Themes and fonts, swappable",
    body: "A real multi-theme, multi-font system rather than one locked palette. Change the preset and every component follows.",
  },
  {
    icon: Blocks,
    title: "shadcn/ui, already wired",
    body: "The component layer you would have picked anyway, connected to the theme tokens and the admin shell.",
  },
  {
    icon: Wand2,
    title: "Form generator",
    body: "Describe an entity in JSON and get a Zod schema plus a wired react-hook-form component written into your repo.",
  },
];

export default function UiFramePage() {
  return (
    <div>
      <LayerHero
        index="02"
        name="UI Frame"
        role="admin"
        summary="The admin layer. Next.js and shadcn/ui on Base UI primitives, with a swappable theme and font system, talking to the Engine API."
        docsHref="/docs/ui-frame"
        repoHref="https://github.com/theblueprintcode/uiframe"
      />

      {/* ── The shell itself */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mb-10 max-w-2xl" stagger={0.06}>
          <p className="bp-sheet-number">01 — THE SHELL</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Multi-tenancy you can see.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Same shell, different tenant. The JWT carries the scope, so every
            call after login inherits it — there is no per-request tenant id for
            a developer to forget.
          </p>
        </Reveal>
        <div className="mx-auto max-w-4xl">
          <ProductFrame />
        </div>
        <Reveal className="mx-auto mt-6 max-w-2xl">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            A schematic of the admin shell, drawn to show the tenant switch —
            not a screenshot of the running app.
          </p>
        </Reveal>
      </section>

      {/* ── Spec */}
      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SpecTable title="Specification" rows={SPEC} />
        </div>
      </section>

      {/* ── Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mb-10 max-w-2xl" stagger={0.06}>
          <p className="bp-sheet-number">02 — WHAT YOU GET</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Built, not scaffolded.
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <Reveal key={title}>
              <div className="bp-cell flex h-full flex-col gap-3 rounded-none p-6">
                <Icon className="size-5 text-primary" strokeWidth={1.5} />
                <h3 className="text-base font-medium tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Generators */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal stagger={0.06}>
            <p className="bp-sheet-number">03 — GENERATORS</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              JSON in, a real component out.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Describe an entity and the generator writes a Zod schema and a
              wired react-hook-form component into{" "}
              <code className="font-mono text-[13px] text-foreground">
                src/components/forms/
              </code>
              .
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The output is yours to edit. It is code written into your
              repository once, not a runtime abstraction that regenerates over
              your changes.
            </p>
            <Link
              href="/docs/ui-frame/generators"
              className="group mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-primary"
            >
              Generator docs
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <Reveal>
            <Terminal
              file="uiframe"
              command="bun run generate:form --schema=schema.json"
              lines={[
                { text: "→ reading schema.json — entity: Product" },
                { text: "→ wrote src/components/forms/product-form.tsx" },
                { text: "→ wrote src/components/forms/product.schema.ts" },
                { text: "edit them freely — they will not be regenerated", tone: "note" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ── The dependency, stated plainly */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="max-w-2xl" stagger={0.06}>
          <p className="bp-sheet-number">04 — READ THIS FIRST</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            UI Frame expects Engine.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            This is not a standalone dashboard template. The auth flow, the
            tenant scoping and the API client all assume the Engine&apos;s
            contract, and the dashboard needs the backend running on{" "}
            <code className="font-mono text-[13px] text-foreground">
              localhost:5201
            </code>{" "}
            for its data views to resolve.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Fork UI Frame on its own and you will be rebuilding that contract
            yourself. That is a fair choice — just not a free one.
          </p>
        </Reveal>
      </section>

      {/* ── Previous layer */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <Link
            href="/layers/engine"
            className="group flex items-center justify-between gap-6 rounded-lg border border-border p-6 transition-colors hover:border-primary/50"
          >
            <ArrowLeft className="size-5 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="text-right">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Previous layer
              </span>
              <span className="mt-1.5 block text-xl font-medium tracking-tight">
                Engine — the API and tenant layer
              </span>
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
