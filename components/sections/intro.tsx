"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { SITE } from "@/lib/data";

/**
 * A short black curtain over the first paint, which lifts in two panels.
 *
 * It exists because the hero's first few frames are the shader settling its
 * running average, and that settle is visible as a flicker of noise. Covering
 * about a second of it is the difference between "it faded up" and "something
 * went wrong and then fixed itself".
 *
 * It never blocks: pointer events are off from the start, the page underneath
 * is fully rendered and interactive behind it, and it removes itself on a
 * timer rather than waiting on a load event that may never come. Readers who
 * have asked for reduced motion never see it at all.
 */
export function Intro() {
  const reduced = useReducedMotion();
  const [done, setDone] = React.useState(false);

  // The server has no motion preference, so it always renders the curtain. A
  // client that prefers reduced motion therefore cannot skip it during render
  // — that would be a different first tree than the server sent, and React
  // throws the whole subtree away over it. Instead the preference collapses
  // every duration to zero and retires the curtain on the first effect, which
  // happens before the browser has painted a frame of it.
  const seconds = reduced ? 0 : 0.6;

  React.useEffect(() => {
    // Kept short. This is a second of held-back content on every visit, which
    // is a real cost paid for a flourish — long enough to cover the shader
    // settling its first frames, and no longer.
    const id = window.setTimeout(() => setDone(true), reduced ? 0 : 620);
    return () => window.clearTimeout(id);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] grid grid-rows-2"
          exit={{ transition: { duration: 0 } }}
        >
          {/* Two halves that part vertically. A single fade reads as a flash;
              a split reads as a deliberate reveal. */}
          <motion.div
            className="relative flex items-end justify-center overflow-hidden bg-black"
            exit={{ y: "-100%" }}
            transition={{ duration: seconds, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.span
              className="translate-y-1/2 font-display text-[clamp(2rem,7vw,4.5rem)] tracking-[-0.04em] text-fg"
              initial={{ opacity: 0, y: "60%" }}
              animate={{ opacity: 1, y: "50%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: seconds * 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {SITE.name}
            </motion.span>
          </motion.div>

          <motion.div
            className="bg-black"
            exit={{ y: "100%" }}
            transition={{ duration: seconds, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* A hairline on the seam, so the split has an edge to open from. */}
          <motion.span
            className="absolute inset-x-0 top-1/2 h-px origin-center bg-amber/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: seconds * 1.06, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
