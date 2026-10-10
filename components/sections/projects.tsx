"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { Aurora } from "@/components/ui/backgrounds";
import { SectionHeading } from "@/components/ui/chrome";
import { GlowBorder, TiltCard } from "@/components/ui/interactions";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Accent per card, so neighbouring tiles never glow the same colour. */
const ACCENT: Record<Project["accent"], { glow: string; border: string; text: string }> = {
  amber: {
    glow: "rgba(255,152,56,0.5)",
    border: "rgba(255,152,56,0.16)",
    text: "text-amber",
  },
  cyan: {
    glow: "rgba(103,232,249,0.42)",
    border: "rgba(103,232,249,0.14)",
    text: "text-cyan",
  },
  violet: {
    glow: "rgba(167,139,250,0.45)",
    border: "rgba(167,139,250,0.15)",
    text: "text-violet",
  },
};

/**
 * A bento grid. Seven tiles across three rows, with the two platforms that
 * matter most given double width.
 *
 * Every tile shows its blurb at rest and its detail on hover or focus. The
 * detail is always in the DOM and only its height is hidden, so it is reachable
 * by keyboard and by a screen reader whether or not a pointer ever arrives.
 */
export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      <Aurora className="opacity-40" />

      <div className="container-x">
        <SectionHeading
          index="03"
          kicker="Selected work"
          title={<RevealWords text="Platforms, pipelines and a few things built for the fun of it." />}
          lead="Two enterprise platforms, a product shipped to three app stores, and the tools that taught me the rest."
        />

        <div className="mt-14 grid auto-rows-fr gap-4 md:mt-16 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={(i % 3) * 0.08}
              className={cn(p.span === "lg" && "md:col-span-2")}
            >
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const a = ACCENT[p.accent];
  const wide = p.span === "lg";

  return (
    <TiltCard max={4} glow={a.border} className="group h-full">
      <GlowBorder
        color={a.glow}
        className="h-full rounded-3xl"
        innerClassName="rounded-[calc(1.5rem-1px)] bg-surface"
      >
        {/* The card is one big focusable region, so tab lands on it once. */}
        <article
          tabIndex={0}
          className={cn(
            "relative flex h-full flex-col overflow-hidden rounded-[inherit] p-6 md:p-7",
            "transition-colors duration-300 hover:bg-elevated/40 focus:bg-elevated/40"
          )}
        >
          <Spotlight className="-top-24 left-10" size={300} />

          <header className="relative flex items-start justify-between gap-4">
            <div>
              <p className={cn("label-mono", a.text)}>{p.kind}</p>
              <h3 className="mt-3 font-display text-[1.5rem] leading-tight tracking-tight text-fg md:text-[1.75rem]">
                {p.name}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="nums font-mono text-[0.68rem] text-faint">
                {p.year}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
              />
            </div>
          </header>

          <p className="relative mt-4 max-w-[34rem] text-[0.9375rem] leading-[1.7] text-muted">
            {p.blurb}
          </p>

          {/* Detail. The wide tiles have the room for it, so they just show it;
              the small ones collapse it and open on hover or focus. grid-rows
              is what lets that open to the natural height with no magic number. */}
          <div
            className={cn(
              "relative grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
              wide
                ? "grid-rows-[1fr]"
                : "grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"
            )}
          >
            <div className="overflow-hidden">
              <p className="mt-4 max-w-[36rem] border-l border-line pl-4 text-[0.875rem] leading-[1.7] text-faint">
                {p.detail}
              </p>
            </div>
          </div>

          <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-7">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-md border border-line bg-black/40 px-2 py-1 font-mono text-[0.64rem] text-faint transition-colors duration-200 group-hover:border-white/12 group-hover:text-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </article>
      </GlowBorder>
    </TiltCard>
  );
}
