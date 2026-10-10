"use client";

import { Award, GraduationCap, Trophy } from "lucide-react";

import { GridLines } from "@/components/ui/backgrounds";
import { SectionHeading } from "@/components/ui/chrome";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { ACHIEVEMENTS, CERTIFICATIONS, EDUCATION } from "@/lib/data";

/**
 * Education, certifications and the handful of things worth putting a trophy
 * next to — three short lists in one section rather than three thin sections.
 */
export function Credentials() {
  return (
    <section
      id="credentials"
      className="relative overflow-hidden border-t border-line py-24 md:py-32"
    >
      <GridLines size={96} fade="58%" />

      <div className="container-x">
        <SectionHeading
          index="05"
          kicker="Background"
          title={<RevealWords text="Where it was learned." />}
        />

        <div className="mt-14 grid gap-12 md:mt-16 lg:grid-cols-3 lg:gap-10">
          {/* Education */}
          <Reveal>
            <h3 className="flex items-center gap-2.5 font-display text-lg tracking-tight">
              <GraduationCap className="size-4 text-amber" aria-hidden="true" />
              Education
            </h3>
            <ol className="mt-6 flex flex-col gap-6">
              {EDUCATION.map((e) => (
                <li
                  key={e.school}
                  className="border-l border-line pl-5 transition-colors duration-200 hover:border-amber/40"
                >
                  <p className="nums font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                    {e.period}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-fg">
                    {e.school}
                  </p>
                  <p className="mt-1 text-[0.875rem] leading-snug text-muted">
                    {e.degree}
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-faint">{e.place}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.08}>
            <h3 className="flex items-center gap-2.5 font-display text-lg tracking-tight">
              <Award className="size-4 text-cyan" aria-hidden="true" />
              Certifications
            </h3>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {CERTIFICATIONS.map((c) => (
                <li
                  key={c.name}
                  className="flex items-start justify-between gap-4 bg-surface p-4 transition-colors duration-200 hover:bg-elevated"
                >
                  <div>
                    <p className="text-[0.875rem] leading-snug text-fg/90">
                      {c.name}
                    </p>
                    {/* Rendered only when present. Some courses are recorded
                        by title alone, and an empty line under the name reads
                        as a missing value rather than one that was never
                        there. */}
                    {c.issuer ? (
                      <p className="mt-1 text-[0.75rem] text-faint">
                        {c.issuer}
                      </p>
                    ) : null}
                  </div>
                  {c.year ? (
                    <span className="nums shrink-0 font-mono text-[0.68rem] text-faint">
                      {c.year}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Achievements */}
          <Reveal delay={0.16}>
            <h3 className="flex items-center gap-2.5 font-display text-lg tracking-tight">
              <Trophy className="size-4 text-violet" aria-hidden="true" />
              Highlights
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {ACHIEVEMENTS.map((a) => (
                <li
                  key={a.title}
                  className="rounded-2xl border border-line bg-surface/70 p-4 transition-colors duration-200 hover:border-white/12"
                >
                  <p className="text-[0.9375rem] leading-snug text-fg/90">
                    {a.title}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-faint">
                    {a.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
