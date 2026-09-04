import Link from "next/link";
import { ChaiButton } from "@/components/chai-button";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-foreground/60 sm:flex-row">
        <p>© {year}, TheBlueprintCode. MIT Licensed.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <ChaiButton />
          <Link href="https://github.com/theblueprintcode/engine" className="hover:text-foreground">
            Engine on GitHub
          </Link>
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
