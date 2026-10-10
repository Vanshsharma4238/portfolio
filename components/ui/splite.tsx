"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * A Spline scene that costs nothing until it is nearly on screen.
 *
 * `lazy()` alone does not defer anything useful here. The import fires the
 * moment `<Spline>` first renders, and this sits in the About section, which
 * is in the initial tree from the first paint even though it is several
 * screens down. So a visitor who never scrolls still pays for the whole
 * thing: roughly a megabyte of WebGL runtime plus a 1.35 MB scene file,
 * downloaded in parallel with — and in contention with — the hero they are
 * actually looking at.
 *
 * Gating the render on an IntersectionObserver moves all of it off the
 * critical path. The 400px margin means it starts loading just before it is
 * needed, so scrolling down still finds it ready rather than blank.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    // No observer (very old browser) means load it rather than never show it.
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="h-full w-full">
      {near ? (
        <Suspense fallback={<Placeholder />}>
          <Spline scene={scene} className={className} />
        </Suspense>
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

/**
 * Holds the box while the runtime is in flight.
 *
 * The card around this has a fixed height, so nothing below it moves when the
 * scene finally arrives — the spinner is about reassurance, not layout.
 */
function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span
        role="status"
        aria-label="Loading 3D scene"
        className="size-10 animate-spin rounded-full border-2 border-white/10 border-t-amber"
      />
    </div>
  );
}
