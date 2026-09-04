"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

// lucide-react dropped brand icons; a minimal line-style GitHub mark instead.
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
      />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/layers", label: "Layers" },
  { href: "/about", label: "About" },
];

/** Routes whose first section is an inverted blueprint band. */
const DARK_HERO = /^\/(layers)?$|^\/layers\//;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overDarkHero = DARK_HERO.test(pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over a blueprint hero the bar borrows that band's tokens and disappears
  // into it; everywhere else it sits on paper and frosts once scrolled.
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        overDarkHero
          ? "bp-invert border-transparent !bg-transparent"
          : scrolled
            ? "border-border bg-background/80 backdrop-blur-md"
            : "border-transparent bg-background"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="TheBlueprintCode" width={28} height={28} priority />
          <span className="font-medium tracking-tight">TheBlueprintCode</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/theblueprintcode"
            aria-label="GitHub"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-5" />
          </Link>
          <Button size="sm" render={<Link href="/docs" />} nativeButton={false}>
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
