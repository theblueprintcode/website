import { Reveal } from "@/components/reveal";

/** Two-column spec list — the "what is actually in the box" table. */
export function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <Reveal>
      <h2 className="text-sm font-medium tracking-tight text-muted-foreground">{title}</h2>
      <dl className="mt-5 divide-y divide-border border-y border-border">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 py-3.5 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-sm leading-relaxed">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
