"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Pointer-driven behaviour                                                  */
/*                                                                            */
/*  Everything here is an enhancement on top of something that already works.  */
/*  All of it is driven by `mousemove`, so it simply never happens on touch,   */
/*  and all of it is skipped under prefers-reduced-motion. None of these ever  */
/*  wraps a control whose job depends on the effect firing.                    */
/* -------------------------------------------------------------------------- */

/**
 * Leans toward the cursor, then springs back.
 *
 * `strength` is how many pixels of travel at the far edge of the element. Past
 * about 20 the element starts to detach from the thing it is labelling, so
 * buttons stay low and decorative blocks can go higher.
 */
export function Magnetic({
  children,
  className,
  strength = 12,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 16, mass: 0.4 });

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength);
        y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * A card that tips away from the cursor, with a highlight sliding across its
 * border where the pointer is.
 *
 * The tilt is kept to a few degrees on purpose. A card that swings 15° looks
 * like a demo; 6° reads as the surface having a little weight to it, and it
 * does not throw the text inside out of focus.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  glow = "rgba(255,152,56,0.18)",
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glow?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  // Parked off-card until the pointer arrives, so nothing glows on load.
  const px = useMotionValue(-300);
  const py = useMotionValue(-300);
  const spot = useMotionTemplate`radial-gradient(260px circle at ${px}px ${py}px, ${glow}, transparent 72%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    ry.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * max);
    rx.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -max);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    px.set(-300);
    py.set(-300);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        reduced
          ? undefined
          : { rotateX: rx, rotateY: ry, transformPerspective: 1100 }
      }
      className={cn("relative", className)}
    >
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spot }}
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * Lights the one-pixel border of a card where the pointer is near it.
 *
 * Done as a gradient on a padded wrapper with the real surface inset by 1px —
 * cheaper than an animated `border-image`, and it keeps the corner radius.
 */
export function GlowBorder({
  children,
  className,
  innerClassName,
  color = "rgba(255,152,56,0.55)",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  color?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const px = useMotionValue(-400);
  const py = useMotionValue(-400);
  const border = useMotionTemplate`radial-gradient(200px circle at ${px}px ${py}px, ${color}, transparent 70%)`;

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set(e.clientX - r.left);
        py.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        px.set(-400);
        py.set(-400);
      }}
      className={cn(
        "group/glow relative rounded-2xl bg-line/60 p-px transition-colors",
        className
      )}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
        style={{ background: border }}
      />
      <div
        className={cn(
          "relative h-full rounded-[calc(1rem-1px)] bg-surface",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
