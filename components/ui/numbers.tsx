"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Counts up to `to` the first time it scrolls into view, then stops.
 *
 * Reduced motion gets the final number immediately — the value is the content
 * here, so it is never withheld waiting for an animation.
 */
export function CountUp({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  const raw = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 55, damping: 18 });
  const text = useTransform(smooth, (v) => Math.round(v).toString());

  React.useEffect(() => {
    if (inView) raw.set(to);
  }, [inView, raw, to]);

  if (reduced) {
    return (
      <span ref={ref} className={className}>
        {to}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}

/**
 * Swaps one word for the next on a timer, each sliding up as the last slides
 * out. Used once, in the hero, under the headline.
 *
 * The word is the only thing that changes, so the measured width of the row is
 * set by the longest entry and the line beside it never reflows.
 */
export function RotatingWord({
  words,
  interval = 2200,
  className,
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = React.useState(0);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % words.length),
      interval
    );
    return () => window.clearInterval(id);
  }, [interval, reduced, words.length]);

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span
      className={className}
      // Announce each swap once, politely — it is decorative, not an alert.
      aria-live="polite"
      style={{ display: "inline-grid", overflow: "hidden" }}
    >
      {/* Every word is stacked in the same grid cell, so the box is as wide as
          the longest one and nothing beside it shifts as they cycle. */}
      {words.map((w, n) => (
        <motion.span
          key={w}
          aria-hidden={n !== i || undefined}
          className="col-start-1 row-start-1 whitespace-nowrap"
          animate={
            n === i
              ? { y: "0%", opacity: 1 }
              : { y: n < i ? "-110%" : "110%", opacity: 0 }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}
