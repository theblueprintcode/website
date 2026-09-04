# Style lock — theblueprintcode marketing site

Established: 2026-09-01. Source: **real existing brand**, confirmed independently in two places — `engine/README.md`'s Brand Palette table AND `uiframe/src/app/globals.css`'s live `:root`/`.dark` CSS variables (both light and dark mode use the same Primary/Accent). This is the actual product's actual brand, in production use today across email templates, favicon, logo, and the admin dashboard's default theme. Not a generated or invented palette.

Org being marketed: **TheBlueprintCode** — an organization building free, MIT-licensed template components that let a team scaffold a production multi-tenant SaaS in one setup step instead of months of groundwork. Current components: **Engine** (NestJS + Fastify, multi-tenant RBAC/auth backend, Drizzle ORM) and **UI Frame** (Next.js + shadcn admin dashboard). More components planned but not committed (reporting/dashboard, mobile app) — site should gesture at the roadmap honestly, not invent unbuilt features as if shipped. **No pricing — everything is MIT/free, no Pricing page.**

## Pages & nav (corrected)
- **5 pages**: Home (`/`) · Docs (`/docs`, full sidebar-nav'd documentation subsystem — guides + API reference per component) · Components (`/components`, introduces Engine + UI Frame + the roadmap as an ecosystem) · About (`/about`, contact folded in) · plus GitHub as an external link, not a page.
- **Main nav**: Wordmark · Docs · Components · About · GitHub icon-link · primary CTA (gold fill, "Get Started" → Docs quickstart). Engine and UI Frame are NOT top-level nav items — they live inside Components and Docs.
- **No Pricing page or nav item.**
- **Docs scope**: full subsystem, not a single scrollable page — needs a docs framework (Fumadocs, on top of Next.js/Tailwind, integrates cleanly with shadcn) with per-component sidebar sections (Engine API reference, UI Frame component reference) and guides (quickstart, one-command setup walkthrough).

## Palette (real, verified in both repos)
- Primary: #0041BA (navy blue) — identical value in light mode, dark mode, and engine email templates
- Secondary: #CFD8E8 light-mode / #002982 dark-mode (uiframe's actual light/dark swap)
- Accent: #D38A00 (gold) — identical in both modes
- Background (marketing site, dark): #001E5F ("Darkest" from engine's ramp) — chosen over uiframe's neutral-gray dark bg specifically because the marketing site is doing the literal blueprint/cyanotype visual (navy paper), while the admin product (uiframe) keeps its own neutral dark bg unchanged. This is a deliberate divergence for the marketing site only — flagging it as a decision, not silently assumed.
- Surface: #002982 (cards/panels, matches uiframe's dark-mode Secondary)
- Text: #CFD8E8 (also the blueprint grid-line / diagram-stroke color — see Shape language)
- Border: #CFD8E8 at reduced opacity (hairline blueprint gridlines)
- Radius: 0.5rem (8px) — **rounded, not sharp** (corrects an earlier wrong assumption on my part that this mood should be sharp-cornered; the real, live shadcn default preset in uiframe uses 0.5rem, so the marketing site matches it for brand consistency)
- Dark mode: single locked mode for the marketing site (matches the product's own dark-native usage)

## Color contract
Verified via `scripts/check_contrast.py --matrix` (text=#CFD8E8 bg=#001E5F surface=#002982 primary=#0041BA accent=#D38A00 border=#CFD8E8@reduced-opacity on-primary=#001E5F):
- Text-safe (>=4.5): text/bg, text/surface, text/primary, primary/border, bg/accent, accent/on-primary (dark-navy label on gold, 5.48:1), surface/accent
- UI-safe (>=3.0, <4.5): primary/accent
- Decorative (<3.0 — hairline/icon-tint only, never text or a fill's sole visibility signal): bg/primary, surface/primary, bg/surface

**Practical read — same finding as before, now against the real palette:** Primary (#0041BA) is a **text/link/icon color only** — it's a near-black navy that vanishes as a button fill against the dark bg (1.82:1, fails). Do not build a "solid Primary button." **Accent (#D38A00) is the only CTA fill color**, always with dark-navy (#001E5F) label text, never white (white-on-gold fails at 2.84:1). Secondary buttons/outlines use a hairline border + Primary or Text-colored label, no fill.

## Typography
- Body/UI font: **Geist** — the uiframe's actual default (`--font-geist`), not invented. The real system also supports switching to Inter, Noto Sans, Nunito Sans, Figtree, Roboto, Geist Mono, JetBrains Mono, Public Sans, Outfit, Raleway, DM Sans, Noto Serif, Roboto Slab — but Geist is what ships by default, so the marketing site matches it rather than picking a different "technical mood" font.
- Display/heading: Geist (same family, heavier weight) — no second display face introduced; this keeps the marketing site visually identical in typographic character to the actual product, which is the point of a marketing site for a dev tool.
- Data/code/annotation font: Geist Mono (already in the real font list) — used for blueprint-style annotation labels, spec numbers, code snippets.
- Scale: 1.25 modular ratio, base 16px.

## Shape language — "blueprint/cyanotype" theme
This is the new visual direction layered on top of the real brand tokens above (nothing here existed in either repo before — building it fresh):
- Corner radius: 0.5rem (8px), matching the real system — not sharp.
- Background treatment: faint technical grid (graph-paper lines, ~24px cells, Text color at ~4-6% opacity) across page background — subtle, not a loud pattern.
- Corner crop marks: small `+`-shaped registration marks at section corners (classic blueprint/drafting-page convention), Text color at low opacity — decorative, `aria-hidden`.
- Annotation callouts: dashed leader-lines + small Geist Mono labels pointing at UI mockup details (reuses the "annotated capture" component archetype F5) — this is where the blueprint metaphor does real work, not just decoration: annotate real product screenshots the way an engineering drawing annotates a part.
- Shadow depth: flat, no drop shadows — blueprint pages are flat ink on paper, shadows would break the metaphor entirely.
- Border usage: hairline lines everywhere, styled as thin blueprint linework (Text color, reduced opacity) instead of card shadows.

## Density & spacing
- Base unit: 4px scale
- Section padding: connective sections space-16 (64px) · standard space-24 (96px) · pivotal (hero, engine/UI-frame showcase) space-40 (160px)
- Content card internal padding: space-6 (24px) floor
- Compact card padding: space-3 (12px) for stat tiles
- Showcase/hero card padding: space-8 (32px)
- Section separation: hairline blueprint divider (not surface-tint alternation) — consistent with the flat-ink-on-paper metaphor

## Structure
- Macrostructure(s): Home = **Feature Stack** (org pitch, then Engine band + UI Frame band as the current components, then roadmap teaser) · Components = **Bento Showcase** (Engine tile, UI Frame tile, roadmap tiles marked "planned") · Docs = its own framework's native layout (Fumadocs sidebar+content), not a tastemaker marketing macrostructure · About = **Long-Scroll Narrative** (org story → contact close)
- Narrative arc, Home: hook (one org, growing set of free components) → problem (multi-tenant SaaS setup takes months) → solution (H2 split-demo: real UI Frame dashboard mockup + "one-command setup") → how-it-works (F1 alternating bands: Engine's multi-tenant RBAC, 5 free SSO providers, Fastify+Drizzle throughput; UI Frame's shadcn/theme system) → proof (P4 stat strip, real numbers only) → close (C2, CTA to Docs)
- Shared chrome: Nav **N2** balanced product bar (Docs / Components / About + GitHub icon-link + CTA) · Footer **Ft2** inline single line
- Build stamp/log: not yet created — write `.tastemaker/log.json` on first real build

## Proof — real, sourced numbers only (no fabrication)
Sourced from `engine/README.md` and `engine/package.json` this session, not invented:
- **65,000 req/sec** — Fastify + Drizzle ORM benchmark vs. 12,000 (Express+TypeORM) / 18,000 (Express+Prisma), from the engine's own README benchmark chart
- **5 free SSO providers** — Google, GitHub, Microsoft, Discord, Apple (passport strategies actually in `package.json`); Okta/Auth0/SAML/Facebook/LinkedIn are explicitly listed as "help wanted," not yet built — do not claim them
- **Schema-level multi-tenant isolation** — real architectural claim (root schema + per-tenant `tenant_<accountId>` schemas), not a vague "secure" adjective
- **Config-driven, fails fast** — Joi-validated env, strict mode, no hardcoded fallbacks (real, from README)
- **One-command setup** — `npm run setup`, idempotent (real, from README)
- **Configurable frontend** — UI Frame's real multi-font, multi-theme-preset system (brutalist/soft-pop/tangerine presets already exist) is itself a genuine "configurable frontend" proof point, not marketing fluff

## Assets
- Logo: `engine/public/assets/logo.png` + `public/favicon.png` — **real, existing, must be reused as-is**, not reconstructed. Not present in `uiframe`; source from `engine`.
- Icon style: **line icons** (per explicit request) — Iconify, thin stroke (1.5-2px), matches blueprint-linework theme. Set not yet fetched — pending scaffold.
- Illustration vs. photography: minimal — this is a UI-screenshot-led product (real Engine architecture diagrams already exist as Mermaid charts in the README; real UI Frame dashboard screenshots should be captured, not invented mockups).

## Motion
- **Real system has no animation library today** — `uiframe` ships only `tw-animate-css` (CSS-only keyframe utilities) + shadcn/Radix default transitions. GSAP, Motion.dev, and Lenis would all be **new** additions for this marketing site specifically, not already-established patterns to match.
- Feel: quick and restrained, "hidden, subtle" per explicit request.
- Durations: hover/press ~150ms · popover ~200ms · scroll-reveal ~300ms · route transition ~150ms (native View Transitions API).
- Screen track: marketing pages use GSAP + ScrollTrigger scroll-storytelling; the actual UI Frame product would need its own separate app-shell motion pass later (out of scope for this site).
- Reduced motion: `prefers-reduced-motion` disables non-essential motion site-wide.

## Do not
- Do not build a solid-navy (#0041BA) filled button — it's invisible against the dark bg (1.82:1). Gold Accent is the only CTA fill.
- Do not use white text on gold Accent — fails contrast (2.84:1). Use dark-navy (#001E5F) label text on gold fills.
- Do not invent SSO providers beyond the real 5 (Google/GitHub/Microsoft/Discord/Apple) — Okta/Auth0/SAML/Facebook/LinkedIn are unbuilt, per the README's own "help wanted" section.
- Do not invent customer logos/testimonials — none exist yet; the Proof section runs entirely on real technical capability numbers instead (see Proof above), which is why this product can have an honest, non-empty proof section despite having no customers yet.
- Do not reconstruct a new logo — one already exists in `engine/public/assets/`.
- Do not default to sharp/0-radius corners — the real system is 0.5rem rounded.
