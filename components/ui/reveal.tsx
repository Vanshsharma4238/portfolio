"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Entrances                                                                 */
/*                                                                            */
/*  One rhythm for the whole site: 0.7s, the same expo curve, a small rise and */
/*  a little blur coming off. Every section uses these three components rather */
/*  than hand-rolling variants, which is why the page feels like one object    */
/*  instead of ten.                                                           */
/*                                                                            */
/*  With prefers-reduced-motion set, each of them renders its children         */
/*  already in place — no opacity 0 left behind, nothing that needs an         */
/*  observer to fire before the text can be read.                             */
/* -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

type Dir = "up" | "down" | "left" | "right" | "none";

const offset: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = true,
  once = true,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Dir;
  blur?: boolean;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const reduced = useReducedMotion();
  const M = motion[Tag] as typeof motion.div;

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <M
      className={className}
      initial={{
        opacity: 0,
        ...offset[direction],
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/**
 * Splits a string on spaces and brings the words in one after another.
 *
 * Stagger is 32ms — inside the 30–50ms band that reads as a sequence rather
 * than as a queue. Screen readers get the whole string from `aria-label`, so
 * the split never reaches the accessibility tree as loose letters.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.032,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "0.4em", filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <motion.span
      aria-label={text}
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Whole lines sliding up out of a clipping box, the way display type is set in
 * motion. Each entry in `lines` gets its own mask, so the lines arrive in
 * order and the overflow is cut cleanly rather than fading.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  innerClassName,
  delay = 0,
  stagger = 0.11,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  /**
   * Goes on the element that actually holds the text.
   *
   * Anything using `background-clip: text` has to land here rather than on a
   * wrapper: the clip only catches glyphs painted in the same box, and these
   * lines are separate blocks inside a mask, so a gradient set on an ancestor
   * paints nothing and leaves transparent text behind.
   */
  innerClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block overflow-hidden pb-[0.08em]", lineClassName)}
        >
          {reduced ? (
            <span className={cn("block", innerClassName)}>{line}</span>
          ) : (
            <motion.span
              className={cn("block", innerClassName)}
              initial={{ y: "108%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.95,
                delay: delay + i * stagger,
                ease: EASE,
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
