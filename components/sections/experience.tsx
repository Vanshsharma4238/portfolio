"use client";

import * as React from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Minus, Plus } from "lucide-react";

import { GridLines } from "@/components/ui/backgrounds";
import { SectionHeading, Tag } from "@/components/ui/chrome";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { EXPERIENCE, type Role } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * The timeline.
 *
 * A rail runs down the left with a lit section that tracks how far through the
 * list the reader has scrolled — the one piece of scroll-linked motion on the
 * page, because here it means something: it is a progress indicator for a
 * sequence that is explicitly chronological.
 */
export function Experience() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 62%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative overflow-hidden py-24 md:py-32">
      <GridLines size={80} fade="62%" />

      <div className="container-x">
        <SectionHeading
          index="02"
          kicker="Experience"
          title={<RevealWords text="Three companies, one throughline." />}
          lead="From Flutter apps in stores to Rust data cores and agent orchestration — each role added a layer rather than replacing the last."
        />

        <div ref={ref} className="relative mt-16 md:mt-20">
          {/* Rail. Decorative — the order is already in the DOM. */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[calc(11rem+7px)]"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-amber via-amber/60 to-transparent"
              style={reduced ? { scaleY: 1 } : { scaleY: fill }}
            />
          </div>

          <ol className="flex flex-col gap-14 md:gap-16">
            {EXPERIENCE.map((role, i) => (
              <RoleEntry key={role.company} role={role} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function RoleEntry({ role, index }: { role: Role; index: number }) {
  const [open, setOpen] = React.useState(index === 0);
  const reduced = useReducedMotion();
  const panelId = `role-${index}-detail`;

  return (
    <Reveal as="li" delay={0.05} className="relative pl-9 md:pl-[calc(11rem+2.25rem)]">
      {/* Period, parked in the gutter on desktop and inline on mobile. */}
      <div className="absolute left-9 top-0 md:left-0 md:w-44 md:pr-8 md:text-right">
        <p className="nums font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
          {role.period}
        </p>
        <p className="nums mt-1 font-mono text-[0.66rem] text-line md:text-faint/60">
          {role.duration}
        </p>
      </div>

      {/* Node on the rail. Filled for the current role, hollow for the rest. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-1.5 grid size-[15px] place-items-center rounded-full border md:left-[11rem]",
          role.current
            ? "border-amber bg-amber shadow-[0_0_0_4px_rgba(255,152,56,0.15)]"
            : "border-line bg-bg"
        )}
      >
        {role.current && !reduced && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-amber" />
        )}
      </span>

      <div className="pt-9 md:pt-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-display text-[1.6rem] leading-tight tracking-tight text-fg md:text-[1.9rem]">
            {role.company}
          </h3>
          {role.current && (
            <span className="rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-amber">
              Current
            </span>
          )}
        </div>

        <p className="mt-1.5 text-[0.9375rem] text-amber-soft/80">{role.title}</p>
        <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
          {role.location}
        </p>

        <p className="mt-5 max-w-[42rem] text-[1rem] leading-[1.75] text-muted">
          {role.summary}
        </p>

        {/* Progressive disclosure: the summary carries the point, the bullets
            are there for whoever wants the detail. */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint transition-colors duration-200 hover:border-white/25 hover:text-fg"
        >
          {open ? (
            <Minus className="size-3" aria-hidden="true" />
          ) : (
            <Plus className="size-3" aria-hidden="true" />
          )}
          {open ? "Hide detail" : `What I did (${role.points.length})`}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="detail"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-5 flex max-w-[42rem] flex-col gap-3 border-l border-line pl-5">
                {role.points.map((p) => (
                  <li
                    key={p}
                    className="relative text-[0.9375rem] leading-[1.7] text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.4rem] top-[0.62em] size-1 rounded-full bg-amber/60"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {role.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
