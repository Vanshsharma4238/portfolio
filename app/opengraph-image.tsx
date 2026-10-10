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
 * The card every link to this site unfurls into — LinkedIn, Slack, WhatsApp,
 * iMessage, Discord, X.
 *
 * Generated at build time into a static PNG, so nothing is rendered per
 * request and the name and role can never fall out of step with `lib/data.ts`.
 */
export default async function OpengraphImage() {
  const fonts = await loadOgFonts();
  return new ImageResponse(<OgCard fonts={fonts} />, { ...size, fonts });
}
