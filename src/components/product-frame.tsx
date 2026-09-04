"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, Building2, CreditCard, Settings, ShieldCheck, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Two seeded tenants. Swapping between them is the whole multi-tenant
 *  pitch shown rather than claimed: same shell, isolated schema and data. */
const TENANTS = [
  {
    name: "Acme Inc",
    schema: "tenant_acme",
    seats: 128,
    mrr: "$12,400",
    roles: 6,
    rows: [
      { user: "dana@acme.io", role: "Admin", scope: "billing · users" },
      { user: "raj@acme.io", role: "Manager", scope: "users" },
      { user: "lee@acme.io", role: "Mobile", scope: "read-only" },
    ],
  },
  {
    name: "Globex",
    schema: "tenant_globex",
    seats: 41,
    mrr: "$3,180",
    roles: 3,
    rows: [
      { user: "omar@globex.co", role: "Owner", scope: "all modules" },
      { user: "kim@globex.co", role: "Support", scope: "users" },
      { user: "sam@globex.co", role: "Mobile", scope: "read-only" },
    ],
  },
];

const SIDEBAR = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: Users, label: "Users" },
  { icon: ShieldCheck, label: "Roles" },
  { icon: CreditCard, label: "Billing" },
  { icon: Settings, label: "Settings" },
];

export function ProductFrame() {
  const wrap = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const tenant = TENANTS[index];

  // Scroll-linked un-tilt: the frame starts pitched back like a drawing on a
  // drafting table and lays flat as it reaches reading position.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        default: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        if (reduced) {
          gsap.set(el, { rotateX: 0, scale: 1, opacity: 1 });
          return;
        }
        gsap.fromTo(
          el,
          { rotateX: 22, scale: 0.93, opacity: 0.55, transformPerspective: 1400 },
          {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 38%",
              scrub: 0.6,
            },
          },
        );
      },
    );
    return () => mm.revert();
  }, []);

  // Tenant cycling stops when the tab is hidden, and never starts under
  // reduced motion — an auto-swapping panel is motion the user didn't ask for.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % TENANTS.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={wrap} className="[transform-style:preserve-3d]">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-code px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="ml-3 font-mono text-[11px] text-foreground/40">
            uiframe — admin
          </span>
        </div>

        <div className="grid grid-cols-[132px_1fr] sm:grid-cols-[168px_1fr]">
          {/* sidebar */}
          <aside className="border-r border-border bg-code/60 p-3">
            <div className="mb-4 flex items-center gap-2 rounded-md border border-border px-2 py-1.5">
              <Building2 className="size-3.5 shrink-0 text-primary" strokeWidth={1.5} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={tenant.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="truncate text-[11px] font-medium"
                >
                  {tenant.name}
                </motion.span>
              </AnimatePresence>
            </div>
            <ul className="space-y-0.5">
              {SIDEBAR.map(({ icon: Icon, label, active }) => (
                <li
                  key={label}
                  className={`flex items-center gap-2 rounded px-2 py-1.5 text-[11px] ${
                    active ? "bg-primary/15 text-primary" : "text-foreground/55"
                  }`}
                >
                  <Icon className="size-3.5 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">{label}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* content */}
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] text-foreground/40">
              <span className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">SCHEMA</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={tenant.schema}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {tenant.schema}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ["Seats", tenant.seats],
                ["MRR", tenant.mrr],
                ["Roles", tenant.roles],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-md border border-border p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-foreground/40">
                    {label}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={String(value)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="mt-1 font-mono text-sm"
                    >
                      {value}
                    </motion.p>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-3 overflow-hidden rounded-md border border-border">
              <div className="grid grid-cols-[1.4fr_0.8fr_1fr] gap-2 border-b border-border px-3 py-1.5 text-[10px] uppercase tracking-wider text-foreground/40">
                <span>User</span>
                <span>Role</span>
                <span className="hidden sm:block">Scope</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tenant.name} initial="hide" animate="show" exit="hide">
                  {tenant.rows.map((row, i) => (
                    <motion.div
                      key={row.user}
                      variants={{
                        hide: { opacity: 0, x: -10 },
                        show: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.24, delay: i * 0.06 }}
                      className="grid grid-cols-[1.4fr_0.8fr_1fr] items-center gap-2 px-3 py-2 text-[11px]"
                    >
                      <span className="truncate text-foreground/80">{row.user}</span>
                      <span className="w-fit rounded border border-primary/40 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                        {row.role}
                      </span>
                      <span className="hidden truncate font-mono text-[10px] text-foreground/45 sm:block">
                        {row.scope}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[11px] text-foreground/35">
        Same shell, isolated schema per tenant — switching automatically
      </p>
    </div>
  );
}
