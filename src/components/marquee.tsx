/** Edge-masked infinite strip. Content is duplicated once; the keyframe
 *  translates exactly -50%, so the seam is never visible. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];

  return (
    <div className="bp-marquee-mask overflow-hidden">
      <div className="bp-marquee flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-foreground/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
