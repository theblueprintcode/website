import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Database, KeyRound, Layers, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LayerHero } from "@/components/layer-hero";
import { SpecTable } from "@/components/spec-table";
import { Terminal } from "@/components/terminal";
import { ThroughputChart } from "@/components/throughput-chart";
import { OrmBenchmark } from "@/components/orm-benchmark";

export const metadata: Metadata = {
  title: "Engine — TheBlueprintCode",
  description:
    "The API and tenant layer: NestJS on Fastify, PostgreSQL schema-per-tenant isolation, Drizzle ORM and module-based RBAC.",
};

const SPEC = [
  { label: "Runtime", value: "NestJS on Fastify, Node.js 20+" },
  { label: "Database", value: "PostgreSQL, one schema per tenant" },
  { label: "ORM", value: "Drizzle — thin layer over SQL, no separate query engine" },
  { label: "Queues", value: "Redis" },
  { label: "Auth", value: "JWT access + sliding-window refresh tokens" },
  { label: "SSO", value: "Google, GitHub, Microsoft, Discord, Apple" },
  { label: "Config", value: "Joi-validated at boot; missing required vars fail the start" },
  { label: "Licence", value: "MIT" },
];

const MODULES = [
  {
    icon: Database,
    title: "Tenant provisioning",
    body: "Creating an account creates its schema. The root schema holds the tenant registry, system settings and global subscriptions; everything operational lives in tenant_<accountId>.",
  },
  {
    icon: ShieldCheck,
    title: "Module-based RBAC",
    body: "Permissions group by module — view_billing, manage_users — configured in rbac-root.json and rbac-tenant.json. Roles are a config edit, not a migration.",
  },
  {
    icon: KeyRound,
    title: "Session policy",
    body: "auth-policy.json sets concurrent device limits per surface. Exceeding the limit evicts the oldest session rather than refusing the new login.",
  },
  {
    icon: Layers,
    title: "Per-schema pooling",
    body: "Each tenant schema gets its own connection pool, with an idle TTL that evicts unused pools before Postgres runs out of connections.",
  },
];

export default function EnginePage() {
  return (
    <div>
      <LayerHero
        index="01"
        name="Engine"
        role="API + tenant"
        summary="The backend layer. NestJS on Fastify, PostgreSQL schema-per-tenant isolation, Drizzle ORM, and a module-based RBAC system configured in JSON."
        docsHref="/docs/engine"
        repoHref="https://github.com/theblueprintcode/engine"
      />

      {/* ── What is in the box */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SpecTable title="Specification" rows={SPEC} />
      </section>

      {/* ── Isolation, the central design decision */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-2xl" stagger={0.06}>
            <p className="bp-sheet-number">01 — ISOLATION</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Isolation the database enforces.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Tenant data is separated at the PostgreSQL schema level, not by a
              tenant column on every table. Cross-tenant leakage stops being a{" "}
              <code className="font-mono text-[13px] text-foreground">WHERE</code>{" "}
              clause somebody has to remember and becomes structurally
              impossible — the other tenant&apos;s rows are not in scope.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The cost is real and worth stating plainly: migrations run per
              schema, and pooling has to be per schema too. Engine handles both,
              but neither is free.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="bp-code rounded-lg p-6 font-mono text-[13px] leading-relaxed">
                <p className="text-foreground/45"># request lifecycle</p>
                <p className="mt-3">Client request</p>
                <p className="text-foreground/70"> └→ Fastify / NestJS API</p>
                <p className="text-foreground/70">
                  {"   "}└→ TenantContextService (AsyncLocalStorage)
                </p>
                <p className="mt-2 text-primary">
                  {"      "}root request → root schema
                </p>
                <p className="text-primary">
                  {"      "}tenant request → tenant_&lt;accountId&gt;
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex h-full flex-col justify-center rounded-lg border border-border p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Context is resolved once per request and travels in Node&apos;s{" "}
                  <code className="font-mono text-[13px] text-foreground">
                    AsyncLocalStorage
                  </code>
                  . Services deep in the stack ask for the current tenant instead
                  of having one threaded through every function signature — so a
                  new service cannot forget to scope itself.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Modules */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mb-10 max-w-2xl" stagger={0.06}>
          <p className="bp-sheet-number">02 — WHAT IT DOES</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            The parts you would have built anyway.
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {MODULES.map(({ icon: Icon, title, body }) => (
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

      {/* ── Performance */}
      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal stagger={0.06}>
            <p className="bp-sheet-number">03 — THROUGHPUT</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Why Fastify and Drizzle.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Performance is not the reason to pick a template, but it is a
              reason not to pick the wrong foundation. Swapping the web
              framework and ORM after you have built on them is the expensive
              kind of change.
            </p>
          </Reveal>
          <Reveal>
            <div className="rounded-lg border border-border bg-background p-6">
              <ThroughputChart />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The ORM choice, including where it loses */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mb-10 max-w-2xl" stagger={0.06}>
          <p className="bp-sheet-number">04 — THE ORM</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Drizzle wins two of these four. That is the honest picture.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            An independent benchmark comparing the four ORMs you would actually
            weigh up. Read it and you will see no ORM wins everywhere — Prisma
            is the fastest here on concurrent work and the slowest on
            sequential, and Sequelize beats Drizzle on concurrent inserts.
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <OrmBenchmark />
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
              Why we still chose it
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Not peak throughput — consistency. Across these four workloads
              Drizzle ranges from 4,066 to 10,079 queries per second. Prisma
              ranges from 2,555 to 16,216. On a template that will run
              workloads we cannot predict, an ORM with no collapse mode is
              worth more than one with a higher ceiling and a worse floor.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
              And the architecture
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Drizzle is a thin, typed layer over SQL with no separate query
              engine to ship, the schema is ordinary TypeScript with no codegen
              step, and relational reads avoid n+1 by design. Those properties
              hold regardless of which benchmark you run.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-8 max-w-3xl">
          <p className="text-sm leading-relaxed text-muted-foreground">
            If your workload is dominated by high-concurrency reads, Prisma is
            the faster choice on this evidence and the template is built so you
            can swap it. We would rather tell you that than publish the one
            chart that makes our pick look unbeatable.
          </p>
        </Reveal>
      </section>

      {/* ── Getting started */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal stagger={0.06}>
            <p className="bp-sheet-number">05 — START</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              One command to a seeded tenant.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Setup is idempotent — re-running it skips an existing{" "}
              <code className="font-mono text-[13px] text-foreground">.env</code>{" "}
              and skips seeding anything already there, so you can run it again
              after pulling without losing data.
            </p>
            <Link
              href="/docs/engine/setup"
              className="group mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-primary"
            >
              Full setup guide
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <Reveal>
            <Terminal
              file="engine/README.md"
              command="npm run setup"
              lines={[
                { text: "→ creates .env with generated JWT secrets" },
                { text: "→ runs migrations" },
                { text: "→ seeds a root admin + your first tenant company" },
                { text: "idempotent — safe to re-run", tone: "note" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Honest gaps */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-2xl" stagger={0.06}>
            <p className="bp-sheet-number">06 — NOT BUILT YET</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Interfaces without adapters.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Engine ships a strict{" "}
              <code className="font-mono text-[13px] text-foreground">BillingService</code>{" "}
              interface and the subscription tables, but no Stripe, Zoho or
              Razorpay adapter behind it. Storage falls back to a working{" "}
              <code className="font-mono text-[13px] text-foreground">
                LocalStorageAdapter
              </code>{" "}
              with no S3 or GCS implementation. Enterprise SSO — Okta, Auth0,
              SAML 2.0 — is not implemented either.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              If your project needs any of those on day one, you are writing
              that adapter. Better to know now than to find out in week three.
            </p>
            <Link
              href="/docs/engine/contributing"
              className="group mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-primary"
            >
              Where help is wanted
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Next layer */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <Link
            href="/layers/ui-frame"
            className="group flex items-center justify-between gap-6 rounded-lg border border-border p-6 transition-colors hover:border-primary/50"
          >
            <span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Next layer
              </span>
              <span className="mt-1.5 block text-xl font-medium tracking-tight">
                UI Frame — the admin layer
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
