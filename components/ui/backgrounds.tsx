import * as React from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Black backgrounds                                                         */
/*                                                                            */
/*  All of these are decoration, so all of them are aria-hidden, sit behind    */
/*  their content, and take no pointer events. None of them is a client        */
/*  component: every position below is computed from a fixed seed, so the      */
/*  server and the browser draw the same thing and nothing hydrates twice.     */
/* -------------------------------------------------------------------------- */

type BgProps = { className?: string };

/** Small deterministic PRNG, so "scattered" is the same scatter every render. */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/**
 * Ruled grid, faded off at the edges with a radial mask.
 *
 * The mask is what makes it read as depth rather than as graph paper: lines at
 * full strength all the way to the edge of a section fight with the text.
 */
export function GridLines({
  className,
  size = 64,
  fade = "70%",
}: BgProps & { size?: number; fade?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px)," +
          "linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        maskImage: `radial-gradient(ellipse at center, black 10%, transparent ${fade})`,
        WebkitMaskImage: `radial-gradient(ellipse at center, black 10%, transparent ${fade})`,
      }}
    />
  );
}

/** Dot matrix, same treatment. Reads quieter than the grid — use it behind copy. */
export function DotGrid({
  className,
  size = 22,
}: BgProps & { size?: number }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.13) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 75%)",
      }}
    />
  );
}

/**
 * Three coloured blobs drifting behind the content, each on its own clock so
 * they never line up into a single pulse. Heavily blurred and barely there —
 * on OLED black a gradient this soft reads as a glow in the room, not a shape.
 */
export function Aurora({ className }: BgProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* No `blur()` on any of these. A radial gradient already fades to
          nothing on its own, so a 140px blur filter on top is a second,
          far more expensive way of doing what the colour stops are doing —
          it forces each blob into its own large offscreen texture, and
          there are three of them on several sections. The extra stops below
          give the same softness for free. */}
      <div
        className="absolute -left-[12%] top-[-18%] size-[46rem] rounded-full opacity-55 animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(255,152,56,0.30) 0%, rgba(255,152,56,0.15) 30%, rgba(255,152,56,0.05) 52%, transparent 72%)",
        }}
      />
      <div
        className="absolute -right-[14%] top-[22%] size-[40rem] rounded-full opacity-45 animate-aurora"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(circle, rgba(103,232,249,0.22) 0%, rgba(103,232,249,0.10) 32%, rgba(103,232,249,0.03) 54%, transparent 74%)",
        }}
      />
      <div
        className="absolute bottom-[-24%] left-[32%] size-[38rem] rounded-full opacity-40 animate-aurora"
        style={{
          animationDelay: "-12s",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.24) 0%, rgba(167,139,250,0.11) 32%, rgba(167,139,250,0.03) 54%, transparent 74%)",
        }}
      />
    </div>
  );
}

/** Twinkling points. Density is per 100 units of area, not per pixel. */
export function StarField({
  className,
  count = 64,
  seed = 7,
}: BgProps & { count?: number; seed?: number }) {
  const next = rand(seed);
  const stars = Array.from({ length: count }, () => ({
    x: next() * 100,
    y: next() * 100,
    s: 0.6 + next() * 1.3,
    d: next() * 4,
    o: 0.25 + next() * 0.55,
  }));

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.s,
            height: st.s,
            opacity: st.o,
            animationDelay: `${st.d}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * A wide wash of light bleeding down from the top edge, plus two slim beams.
 * Good directly under a sticky header, where a hard black band looks cut off.
 */
export function TopBeams({ className }: BgProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] overflow-hidden",
        className
      )}
    >
      <div
        className="absolute left-1/2 top-[-18rem] h-[28rem] w-[64rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,152,56,0.18) 0%, rgba(255,152,56,0.08) 34%, rgba(255,152,56,0.02) 56%, transparent 74%)",
        }}
      />
      <div className="absolute left-[22%] top-0 h-56 w-px bg-gradient-to-b from-amber/40 to-transparent" />
      <div className="absolute left-[71%] top-0 h-40 w-px bg-gradient-to-b from-cyan/30 to-transparent" />
    </div>
  );
}

/**
 * Film grain. An SVG turbulence tile, screened over everything at low opacity.
 *
 * On a page that is mostly pure black this earns its keep: it hides the
 * banding that long dark gradients fall into on 8-bit displays.
 */
export function Noise({ className }: BgProps) {
  return (
    <div
      aria-hidden="true"
      // Plain opacity rather than `mix-blend-screen`. A blend mode on a
      // full-viewport fixed layer makes the compositor re-read everything
      // underneath it on every frame — and underneath it, here, is an
      // animating WebGL canvas. Over black the visual difference is
      // negligible; the cost is not.
      className={cn(
        "pointer-events-none fixed inset-0 z-50 opacity-[0.03]",
        className
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/** A hairline that brightens toward the middle. Separates stacked sections. */
export function Rule({ className }: BgProps) {
  return <div aria-hidden="true" className={cn("rule-glow w-full", className)} />;
}
