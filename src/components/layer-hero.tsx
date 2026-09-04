import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { DecodeText } from "@/components/decode-text";

/**
 * Shared masthead for a layer page. Inverted blueprint band so a layer page
 * opens the same way the homepage does, one composition deep.
 */
export function LayerHero({
  index,
  name,
  role,
  summary,
  docsHref,
  repoHref,
}: {
  index: string;
  name: string;
  role: string;
  summary: string;
  docsHref: string;
  repoHref: string;
}) {
  return (
    <section className="bp-invert relative -mt-[69px] overflow-hidden pt-[69px]">
      <div className="bp-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-24 sm:pt-28">
        <DecodeText
          as="p"
          text={`Layer ${index} — ${role}`}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
        />

        <WordReveal
          text={name}
          delay={0.1}
          className="mt-6 text-left text-5xl font-medium tracking-tight sm:text-7xl"
        />

        <Reveal className="mt-6 max-w-xl" stagger={0.06}>
          <p className="text-lg leading-relaxed text-foreground/75">{summary}</p>
        </Reveal>

        <Reveal className="mt-9 flex flex-wrap items-center gap-7" stagger={0.08}>
          <Button size="lg" render={<Link href={docsHref} />} nativeButton={false}>
            Read the docs
            <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
          </Button>
          <Link
            href={repoHref}
            className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-foreground/85 transition-colors hover:text-foreground"
          >
            View the repository
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
