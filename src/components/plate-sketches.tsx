/**
 * The faces drawn on an assembly plate, shared by the hero drawing and the
 * exploded-assembly section so both read as the same technical drawing rather
 * than two unrelated graphics.
 *
 * A plate that the prose names carries a sketch of what it actually is; every
 * other plate carries linework only. Nothing here encodes how many layers
 * exist — adding one is adding an entry to a list.
 */

/** Sketch for the API layer: the schemas it provisions. */
export function EngineSketch() {
  return (
    <div className="absolute inset-[6%] flex flex-col justify-between">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/80">
        postgres
      </p>
      <div className="grid grid-cols-3 gap-[3%]">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`h-3.5 rounded-[2px] border ${
              i === 0 ? "border-primary/80 bg-primary/25" : "border-primary/35 bg-primary/10"
            }`}
          />
        ))}
      </div>
      <p className="font-mono text-[9px] text-foreground/50">root · tenant_&lt;id&gt; × n</p>
    </div>
  );
}

/** Sketch for the admin layer: the shell, as a wireframe. */
export function UiFrameSketch() {
  return (
    <div className="absolute inset-[6%] flex gap-[3%]">
      <div className="flex w-1/4 flex-col gap-1.5 border-r border-primary/30 pr-[6%]">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full ${i === 0 ? "bg-primary/70" : "bg-foreground/25"}`}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-[3%]">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="h-6 rounded-[2px] border border-primary/40 bg-primary/10" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-1 rounded-[2px] border border-foreground/20 p-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-1 rounded-full bg-foreground/20" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Linework for an unnamed plate: the system continuing, claiming nothing. */
export function BlankSketch() {
  return (
    <div className="absolute inset-[6%] grid grid-cols-4 grid-rows-3 gap-[2.5%] opacity-45">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="rounded-[2px] border border-dashed border-primary/25" />
      ))}
    </div>
  );
}

const SKETCH: Record<string, React.ReactNode> = {
  engine: <EngineSketch />,
  uiframe: <UiFrameSketch />,
};

/**
 * A drafted plate: hairline edge, corner registration ticks, the part number
 * ghosted across the middle, and whichever face belongs to it.
 */
export function PlateFace({
  id,
  index,
  className,
  style,
}: {
  id: string;
  index: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute inset-0 rounded-sm border border-primary/80 bg-primary/[0.09] ${className ?? ""}`}
      style={style}
    >
      {["left-1 top-1", "right-1 top-1", "left-1 bottom-1", "right-1 bottom-1"].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} font-mono text-[9px] leading-none text-primary/70`}
        >
          +
        </span>
      ))}

      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[64px] font-medium leading-none text-primary/10">
        {index}
      </span>

      {SKETCH[id] ?? <BlankSketch />}
    </div>
  );
}
