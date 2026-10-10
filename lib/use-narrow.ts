"use client";

import { useEffect, useState } from "react";

/**
 * True while the viewport is narrower than `query`.
 *
 * It starts `false` and corrects after mount, which is deliberate: the server
 * has no viewport, so the desktop arrangement is the one that renders first
 * and a phone swaps to its own on hydration.
 */
export function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);

  return narrow;
}
