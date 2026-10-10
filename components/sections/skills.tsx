"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { DotGrid } from "@/components/ui/backgrounds";
import { SectionHeading } from "@/components/ui/chrome";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { SKILLS, type SkillGroup } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Ten groups, each a card, laid out in a masonry-ish three-column grid.
 *
 * Grouping is the whole point: a flat cloud of ninety technologies tells a
 * reader nothing, while ten headed lists say what kind of engineer this is at
 * a glance and let anyone looking for one specific thing find it by heading.
 */
export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <DotGrid size={26} />

      <div className="container-x">
        <SectionHeading
          index="04"
          kicker="Capabilities"
          title={<RevealWords text="What I reach for, and why." />}
          lead="Grouped by the job it does rather than by how fashionable it is."
        />

        {/* columns, not grid: the cards are different heights and a CSS column
            layout packs them without leaving ragged gaps under the short ones. */}
        <div className="mt-14 gap-4 md:mt-16 md:columns-2 lg:columns-3 [&>*]:mb-4">
          {SKILLS.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const reduced = useReducedMotion();

  return (
    <Reveal
      delay={(index % 3) * 0.06}
      className="break-inside-avoid"
    >
      <div
        className={cn(
          "group/skill relative overflow-hidden rounded-2xl border border-line bg-surface/70 p-6",
          "transition-colors duration-300 hover:border-white/12 hover:bg-elevated/50"
        )}
      >
        {/* A light that sweeps the top edge on hover. Purely a hover cue. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/60 to-transparent opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100"
        />

        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[1.0625rem] tracking-tight text-fg">
            {group.title}
          </h3>
          {/* How many are in the group. Redundant with the list right below
              it, so it is decoration for the eye and hidden from the reader. */}
          <span
            aria-hidden="true"
            className="nums shrink-0 font-mono text-[0.64rem] text-faint/70"
          >
            {String(group.items.length).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-1.5 text-[0.8125rem] leading-snug text-faint">
          {group.note}
        </p>

        <motion.ul
          className="mt-5 flex flex-wrap gap-1.5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          variants={
            reduced
              ? undefined
              : { hidden: {}, show: { transition: { staggerChildren: 0.022 } } }
          }
        >
          {group.items.map((item) => (
            <motion.li
              key={item}
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 6 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
              className="rounded-md border border-line bg-black/40 px-2 py-1 font-mono text-[0.68rem] text-muted transition-colors duration-200 hover:border-amber/35 hover:text-amber-soft"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Reveal>
  );
}
