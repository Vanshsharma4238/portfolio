"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { cn } from "@/lib/utils";

/** A hairline progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.0005,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-amber via-amber-soft to-cyan"
      style={{ scaleX: width }}
    />
  );
}

/**
 * A soft light trailing the cursor, over the whole document.
 *
 * Fixed-position and `mix-blend-screen`, so it only ever lifts what is already
 * there and cannot wash out text. It is `mousemove`-driven, so touch devices
 * never render it, and the native cursor is left completely alone — replacing
 * it with a drawn dot costs more in usability than the effect is worth.
 */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const [on, setOn] = React.useState(false);
  const x = useSpring(0, { stiffness: 220, damping: 30, mass: 0.35 });
  const y = useSpring(0, { stiffness: 220, damping: 30, mass: 0.35 });

  React.useEffect(() => {
    if (reduced) return;
    // A device that reports no hover is a touch device: there is no cursor to
    // follow, and the layer would just sit in one corner.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setOn(true);
    };
    const out = () => setOn(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", out);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      // No blur filter and no blend mode: this followed the pointer, so both
      // were being recomputed on every mouse move over a live WebGL canvas.
      // The gradient's own stops carry the softness, and what is left is a
      // single layer moved by transform, which the compositor does for free.
      className="pointer-events-none fixed -z-0 size-[24rem] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        opacity: on ? 0.6 : 0,
        background:
          "radial-gradient(circle, rgba(255,152,56,0.15) 0%, rgba(255,152,56,0.08) 26%, rgba(167,139,250,0.05) 48%, transparent 72%)",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Section furniture                                                         */
/* -------------------------------------------------------------------------- */

/**
 * The kicker + heading pair that opens every section.
 *
 * Keeping it in one component is what makes the numbering, the rule and the
 * type scale identical down the page — the thing that most often gives a
 * portfolio away as assembled from parts.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  lead,
  align = "left",
  className,
}: {
  index: string;
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="label-mono nums text-amber">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span className="label-mono">{kicker}</span>
      </div>

      <h2 className="text-section text-fade max-w-3xl">{title}</h2>

      {lead && (
        <p
          className={cn(
            "max-w-xl text-[1.0625rem] leading-[1.7] text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** A labelled pill. Used for tech stacks, where there are a lot of them. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-elevated/60 px-2.5 py-1",
        "font-mono text-[0.68rem] tracking-wide text-muted",
        "transition-colors duration-200 hover:border-amber/40 hover:text-amber-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
