"use client";

import { useEffect, useState } from "react";

/**
 * Whether the reader has asked for reduced motion — safe to branch on during
 * render.
 *
 * Framer's own `useReducedMotion` reads the media query on the client's very
 * first render while the server, which has no media queries, assumed `false`.
 * Any component that picks a different tree for the two values then hands
 * React a first client render that does not match the HTML it was sent, and
 * React throws out the whole subtree and rebuilds it — a hydration error on
 * every page load for exactly the readers who asked for less work, not more.
 *
 * This reports `false` on the server and on the first client render, then
 * corrects in an effect. The cost is a single frame of motion-enabled markup
 * that the reader never sees painted; the gain is that every component in the
 * site can branch on it in render and stay hydratable.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}
