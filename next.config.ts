import type { NextConfig } from "next";

/**
 * Tailwind is wired up through `postcss.config.mjs` rather than a Turbopack
 * CSS loader rule — see the comment there for why the rule form breaks
 * `next/font` on Vercel.
 *
 * `STATIC_EXPORT=1` emits a plain `out/` folder instead of a Vercel build.
 * Every route here prerenders and there is no server code at all — no API
 * routes, no middleware, no server actions, no `next/image` — so the whole
 * site is portable to any static host without an adapter. It is behind a flag
 * rather than always on so the Vercel deployment keeps building exactly the
 * way it already does.
 */
const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "1"
    ? { output: "export" as const }
    : {}),
};

export default nextConfig;
