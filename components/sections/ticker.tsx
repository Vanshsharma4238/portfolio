"use client";

import { Marquee } from "@/components/ui/marquee";
import { CountUp } from "@/components/ui/numbers";
import { Reveal } from "@/components/ui/reveal";
import { MARQUEE, STATS } from "@/lib/data";

/**
 * The seam between the hero and the rest of the page: four numbers and a
 * moving list of the stack.
 *
 * It exists to give the eye somewhere to land after the black hole, and to
 * state the scale of the experience in a form that reads in two seconds.
 */
export function Ticker() {
  return (
    <section
      aria-label="At a glance"
      className="relative border-y border-line bg-surface/40"
    >
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-9 py-12 md:grid-cols-4 md:py-14">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07} className="flex flex-col gap-1.5">
            <span className="nums font-display text-[2.4rem] leading-none tracking-tight text-fg md:text-[3rem]">
              <CountUp to={s.value} suffix={s.suffix} />
            </span>
            <span className="text-[0.8125rem] leading-snug text-faint">
              {s.label}
            </span>
          </Reveal>
        ))}
      </div>

      <div className="border-t border-line py-5">
        <Marquee items={MARQUEE} speed={52} />
      </div>
    </section>
  );
}
