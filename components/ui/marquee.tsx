"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * An endless horizontal ticker.
 *
 * The track holds the list twice and slides exactly -50%, which is why the
 * wrap is invisible: at -50% the second copy is sitting precisely where the
 * first one started. Duplicating in the DOM rather than cloning in JS means it
 * renders on the server and starts moving on the first paint.
 *
 * The duplicate is `aria-hidden`, so a screen reader hears the list once.
 */
export function Marquee({
  items,
  reverse = false,
  speed = 42,
  className,
}: {
  items: readonly string[];
  reverse?: boolean;
  /** Seconds for one full pass. Longer is calmer; under ~25s it reads as frantic. */
  speed?: number;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 px-5"
    >
      {items.map((it) => (
        <li
          key={it}
          className="flex shrink-0 items-center gap-10 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-faint transition-colors duration-200 hover:text-amber"
        >
          {it}
          <span className="size-1 rotate-45 bg-line" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        // Both ends fade into the background so the loop has no visible edge.
        "[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          // Pausing on hover lets someone actually read an item they spotted.
          "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
