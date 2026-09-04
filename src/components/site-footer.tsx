import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-foreground/60 sm:flex-row">
        <p>© {year}, TheBlueprintCode. MIT Licensed.</p>
        <div className="flex items-center gap-5">
          <Link href="https://github.com/theblueprintcode/engine" className="hover:text-foreground">
            Engine on GitHub
          </Link>
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <a href="mailto:support@theblueprintcode.com" className="hover:text-foreground">
            support@theblueprintcode.com
          </a>
        </div>
      </div>
    </footer>
  );
}
