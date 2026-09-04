import Image from "next/image";
import Link from "next/link";

/**
 * Support link.
 *
 * Everything here is MIT and there is nothing to sell, so this is the only
 * ask on the site — which is why it stays small and sits at the end rather
 * than following anyone around the page.
 *
 * Same destination and QR as the Rift app's support control. The link itself
 * is the trigger, so it works on a click or a keypress without ever opening
 * the popover; the QR is an extra for people who would rather pay from a
 * phone than a desktop browser.
 *
 * Drawn rather than imported: the glass is hairline linework at the same
 * stroke weight as the GitHub mark beside it, so it reads as another symbol
 * on the drawing instead of a pasted-in brand badge.
 */

const SUPPORT_URL = "https://buymeachai.in/mustafapatharia";

function ChaiGlass(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* cutting-chai glass: narrow base, flared rim */}
      <path d="M7 9h10l-1.3 10.2a1.5 1.5 0 0 1-1.5 1.3h-4.4a1.5 1.5 0 0 1-1.5-1.3L7 9Z" />
      <path d="M7.6 13.2h8.8" />
      {/* steam — the only animated element */}
      <g className="bp-steam">
        <path d="M10 6.2c0-1 1-1.4 1-2.4" />
        <path d="M13.4 6.2c0-1 1-1.4 1-2.4" />
      </g>
    </svg>
  );
}

export function ChaiButton({ className }: { className?: string }) {
  return (
    <span className={`bp-chai-wrap relative inline-block ${className ?? ""}`}>
      <Link
        href={SUPPORT_URL}
        target="_blank"
        rel="noreferrer"
        className="bp-chai group inline-flex items-center gap-2 rounded border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary/60 hover:text-foreground"
      >
        <ChaiGlass className="size-4 shrink-0 text-primary" />
        Buy me a chai
      </Link>

      {/* Opens upward — this lives in the footer, so there is no room below. */}
      <span className="bp-chai-pop" aria-hidden>
        <Image
          src="/img/qr-chai.png"
          alt=""
          width={140}
          height={140}
          className="rounded"
        />
        <span className="mt-2 block text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Scan to send one
        </span>
      </span>
    </span>
  );
}
