"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";

import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";
import { RevealLines } from "@/components/ui/reveal";
import { RotatingWord } from "@/components/ui/numbers";
import { Magnetic } from "@/components/ui/interactions";
import { HERO, SITE } from "@/lib/data";
import { useNarrow } from "@/lib/use-narrow";

/**
 * The hero is built around the picture rather than laid on top of it.
 *
 * The hole is pushed off centre with `focus` so the busy half and the reading
 * half never overlap, and `scrim` darkens only the edge the copy sits on — a
 * flat overlay could not do that without greying out the halo as well.
 *
 * A phone has no room to stand the two side by side, so there the whole
 * arrangement turns through 90°: copy at the top under a veil, the hole low
 * and whole in the bottom third, and the ray count comes down because a phone
 * pays for every step.
 */
export function Hero() {
  const narrow = useNarrow();
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);

  // The copy drifts up and fades as the next section arrives, so the two do
  // not simply butt against each other. Opacity and transform only.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] w-full">
      <BlackHoleHeroSection
        focus={narrow ? [0.5, 0.8] : [0.74, 0.44]}
        scrim={narrow ? "top" : "left"}
        scrimStrength={narrow ? 0.95 : 0.92}
        distance={24}
        elevation={narrow ? -7 : -5.5}
        roll={-20}
        // Narrow enough on a phone to crop to the shadow and its rings rather
        // than the full sprawl of the disc: at a wide field the outer gas
        // reaches every corner and there is nowhere dark left to set copy.
        fov={narrow ? 56 : 44}
        glow={narrow ? 0.85 : 1.05}
        doppler={0.4}
        spinSpeed={0.06}
        starBrightness={0.35}
        exposure={0.92}
        vignette={0.3}
        // `steps` is the one dial that costs real time — every pixel walks its
        // ray this many times, every frame. 300 is luxurious on a discrete
        // GPU and punishing on the integrated one in a laptop. 230 is still
        // well clear of 140, where the disc starts to band, and takes roughly
        // a quarter off the per-frame cost. Resolution and DPR come down with
        // it: the scene is traced at this fraction of the canvas and upscaled,
        // so 0.6 is another third fewer rays again.
        steps={narrow ? 150 : 230}
        resolution={narrow ? 0.5 : 0.6}
        maxDpr={1.5}
        className="min-h-[100svh]"
      >
        {/* A veil over the top of the frame, on phones only.
            The shader's own scrim falls away quickly from the edge it starts
            at, which is right for the wide layout — it keeps the halo's
            contrast. Stacked vertically the copy reaches much further into
            the picture, so this carries the dark the rest of the way down and
            stops short of the shadow, leaving the rings untouched. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.94)_34%,rgba(0,0,0,0.62)_54%,transparent_72%)] md:hidden"
        />

        <motion.div
          style={reduced ? undefined : { y, opacity }}
          // `safe center` rather than plain centring, and the top padding is
          // kept on every breakpoint. Centred content in a short window rides
          // up under the fixed nav — the badge row and the "Vansh Sharma"
          // wordmark collide at around 640px of height. `safe` centres while
          // the block fits and falls back to aligning at the top of the padded
          // box when it does not, so it can never tuck under the header.
          className="relative flex min-h-[100svh] items-start px-5 pt-28 pb-12 sm:px-10 md:[align-items:safe_center] lg:px-14"
        >
          <div className="w-full max-w-[42rem]">
            {/* Availability + location, the two things a recruiter looks for first. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              {SITE.available && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3 py-1.5">
                  <span className="relative flex size-1.5">
                    <span className="absolute inset-0 rounded-full bg-emerald-400" />
                    {!reduced && (
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
                    )}
                  </span>
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-emerald-300">
                    Open to opportunities
                  </span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
                <MapPin className="size-3" aria-hidden="true" />
                {SITE.location}
              </span>
            </motion.div>

            <h1 className="text-display">
              {/* Visually it is three stacked lines; to a screen reader it is
                  one sentence, which is why the label is set on the heading. */}
              <span className="sr-only">
                {SITE.name} — {HERO.headline.join(" ")}
              </span>
              <span aria-hidden="true">
                <RevealLines
                  lines={HERO.headline}
                  innerClassName="text-fade"
                  delay={0.12}
                />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-faint"
            >
              <span>Software Engineer</span>
              <span aria-hidden="true" className="text-line">
                /
              </span>
              <RotatingWord words={HERO.rotating} className="text-amber" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.66, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.75] text-muted"
            >
              {narrow ? HERO.blurbShort : HERO.blurb}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={8}>
                <a
                  href="#projects"
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-black transition-colors duration-200 hover:bg-white"
                >
                  See the work
                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>

              <Magnetic strength={8}>
                {/* Backed with blurred black rather than left transparent: on
                    a phone this button lands over the accretion disc, and
                    outline-on-bright-orange is unreadable. */}
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-black/50 px-6 py-3.5 text-sm text-muted backdrop-blur-md transition-colors duration-200 hover:border-white/35 hover:text-fg"
                >
                  {SITE.email}
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </BlackHoleHeroSection>

      {/* Scroll cue. Decorative, and the section below is reachable by every
          other means, so it is hidden from the accessibility tree. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        // Hidden on phones: down there the cue would land on the bright side
        // of the disc, where grey-on-orange is unreadable — and a phone needs
        // no invitation to scroll.
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="label-mono text-[0.6rem]">Scroll</span>
          <ArrowDown className="size-3.5 text-faint" />
        </motion.div>
      </motion.div>
    </section>
  );
}
