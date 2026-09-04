import { Reveal } from "@/components/reveal";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <Reveal stagger={0.08}>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          About
        </h1>
        <p className="mt-6 text-foreground/70">
          Setting up a multi-tenant SaaS backend and its admin frontend
          properly takes a team weeks or months — auth, RBAC, tenant
          isolation, an admin UI that doesn&apos;t look hand-rolled. Most of
          that work is the same every time.
        </p>
        <p className="mt-4 text-foreground/70">
          TheBlueprintCode is a free, MIT-licensed set of template components
          that does that groundwork once, well, so a team starts from a real
          foundation instead of a blank repo. Engine and UI Frame are the
          first two; more are planned as the need comes up.
        </p>
        <p className="mt-4 text-foreground/70">
          Everything is open source. Contributions — new SSO providers,
          billing adapters, storage adapters — are welcome; see each
          repo&apos;s README for exactly where help is wanted.
        </p>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-sm text-foreground/60">
            Questions, or want to contribute?
          </p>
          <a
            href="mailto:support@theblueprintcode.com"
            className="mt-1 inline-block font-medium text-accent hover:underline"
          >
            support@theblueprintcode.com
          </a>
        </div>
      </Reveal>
    </div>
  );
}
