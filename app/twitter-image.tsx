import { ImageResponse } from "next/og";

import { loadOgFonts, OG_ALT, OG_SIZE, OgCard } from "@/lib/og";

/**
 * Required by `output: export` (the Netlify/static build): a metadata image
 * route is a route handler, and the exporter refuses to guess whether one is
 * safe to prerender. This card depends on nothing per-request, so it is
 * always static — which is what the Vercel build already does on its own.
 */
export const dynamic = "force-static";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

/**
 * The same card again for `twitter:image`.
 *
 * X does not fall back to `og:image` for a `summary_large_image` card, so
 * leaving this file out is what makes a post show a bare link. It is a
 * separate route rather than a copy: both read one component from `lib/og`.
 */
export default async function TwitterImage() {
  const fonts = await loadOgFonts();
  return new ImageResponse(<OgCard fonts={fonts} />, { ...size, fonts });
}
