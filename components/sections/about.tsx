"use client";

import { Quote } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { DotGrid, Aurora } from "@/components/ui/backgrounds";
import { SectionHeading, Tag } from "@/components/ui/chrome";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { ABOUT } from "@/lib/data";

/**
 * About, with the 3D scene doing the work a photograph would normally do.
 *
 * The scene is lazy-loaded inside the card and the card has a fixed height, so
 * nothing below it moves when the runtime finally arrives — a Spline embed is
 * a few hundred kilobytes and reserving the box is the difference between a
 * calm load and the whole page jumping.
 */
export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <Aurora className="opacity-60" />
      <DotGrid />

      <div className="container-x">
        <SectionHeading
          index="01"
          kicker="About"
          title={<RevealWords text={ABOUT.heading} />}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Copy */}
          <div className="flex flex-col gap-7">
            {ABOUT.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-[38rem] text-[1.0625rem] leading-[1.8] text-muted">
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <blockquote className="relative mt-1 max-w-[36rem] rounded-2xl border border-line bg-elevated/50 p-6 pl-14">
                <Quote
                  aria-hidden="true"
                  className="absolute left-5 top-6 size-5 text-amber/70"
                />
                <p className="font-display text-[1.0625rem] leading-relaxed tracking-tight text-fg/90">
                  {ABOUT.philosophy}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="mt-2 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {ABOUT.facts.map((f) => (
                  <div key={f.k} className="bg-surface p-5">
                    <dt className="label-mono mb-1.5">{f.k}</dt>
                    <dd className="text-[0.9375rem] leading-snug text-fg/90">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="flex flex-wrap gap-2">
                <span className="label-mono mr-1 self-center">Interested in</span>
                {ABOUT.interests.map((it) => (
                  <Tag key={it}>{it}</Tag>
                ))}
              </div>
            </Reveal>
          </div>

          {/* 3D scene */}
          <Reveal direction="left" delay={0.1} className="lg:sticky lg:top-28">
            <Card className="relative h-[26rem] overflow-hidden rounded-3xl border-line bg-black/[0.96] sm:h-[32rem]">
              <Spotlight
                className="-top-32 left-0 md:-top-14 md:left-40"
                size={360}
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6">
                <div>
                  <p className="label-mono">Interactive</p>
                  <p className="mt-1 font-display text-xl tracking-tight">
                    Drag the scene
                  </p>
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                  WebGL
                </span>
              </div>

              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />

              {/* Floor shadow, so the model is not floating on a flat panel. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent"
              />
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
