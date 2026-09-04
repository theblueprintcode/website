import { Reveal } from "@/components/reveal";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <Reveal stagger={0.08}>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          About
        </h1>
        <p className="mt-6 text-foreground/70">
          A warehouse tool, a logistics platform, a hotel system, an
          internal analytics dashboard — completely different products, and
          the first few months of each one are nearly identical. Sign-in,
          roles and permissions, keeping one customer&apos;s data away from
          another&apos;s, an admin interface that doesn&apos;t look
          hand-rolled. None of it is the thing you set out to build.
        </p>
        <p className="mt-4 text-foreground/70">
          TheBlueprintCode does that groundwork once, properly, and gives it
          away under MIT. Engine is the backend, UI Frame is the admin
          dashboard, and what you build on top of them is entirely yours —
          the foundation makes no assumptions about your industry. More parts
          are planned as the need comes up.
        </p>
        <p className="mt-4 text-foreground/70">
          Everything is open source, and contributions are welcome — each
          repo&apos;s README says exactly where help is wanted.
        </p>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-sm text-foreground/60">
            Questions, or want to contribute?
          </p>
          <a
            href="https://github.com/theblueprintcode/engine/issues"
            className="mt-1 inline-block font-medium text-accent hover:underline"
          >
            Open an issue on GitHub
          </a>
        </div>
      </Reveal>
    </div>
  );
}
