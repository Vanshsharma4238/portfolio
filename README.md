# vanshsharma.work.gd

Personal portfolio for **Vansh Sharma** — Software Engineer, AI Automation &
Agentic AI.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · WebGL ·
Spline.

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

Node 20+ is enough; this was developed on 24.

## Where things live

```
app/
  layout.tsx          fonts, metadata, JSON-LD Person schema
  page.tsx            section order, skip link, overlays
  globals.css         design tokens, keyframes, utilities
  icon.svg            favicon — the shadow and the disc edge-on

lib/
  data.ts             ← every word of copy on the site
  use-narrow.ts       viewport-width hook, drives the hero layout swap
  use-reduced-motion.ts  hydration-safe prefers-reduced-motion
  utils.ts            cn()

components/ui/        primitives
  blackhole-hero-section.tsx   the ray-traced hero (see below)
  splite.tsx / spotlight.tsx / card.tsx
  backgrounds.tsx     grid, dots, aurora, stars, beams, grain
  reveal.tsx          Reveal / RevealWords / RevealLines
  interactions.tsx    Magnetic / TiltCard / GlowBorder
  marquee.tsx numbers.tsx chrome.tsx

components/sections/  one file per band of the page
```

**To change the content, edit `lib/data.ts` and nothing else.** Experience,
projects, skills, education, certifications, stats and contact details all read
from there; the sections only lay them out.

## The hero

`components/ui/blackhole-hero-section.tsx` is a real Schwarzschild ray-tracer,
not a picture of a ring over a disc. Every pixel fires a ray and integrates it
backwards through curved space, so the halo above the shadow, the halo below it
and the thin ring hugging it are all the same disc, imaged again through bent
light. Units are set by the horizon (`r = 1`), which puts the photon sphere at
1.5 and the innermost stable orbit at 3.

It degrades on its own: it detects software renderers (no GPU, VMs, previews)
and drops to a cheap setting, it pauses when scrolled out of view or the tab is
hidden, it survives WebGL context loss, and if WebGL is missing entirely it
hides the canvas and leaves the black background and the copy — which stay
readable, because none of the text depends on the canvas.

The knobs that matter are `focus` (where the hole sits in frame), `scrim`
(which edge gets darkened for copy) and `steps` (the one setting that costs
real time). `app`'s hero passes narrower values on phones.

## Accessibility notes

- Every animation is gated on `prefers-reduced-motion`; with it set, the page
  renders complete and still — no text is left behind an observer that has to
  fire first.
- `useReducedMotion` is the local, hydration-safe one in `lib/`, **not**
  framer-motion's. Framer's reads the media query during the first client
  render while the server assumed `false`, which throws away the subtree on
  every load for exactly the readers who asked for less motion.
- Pointer effects (magnetic buttons, tilt, cursor glow) are `mousemove`-driven
  and never render on touch.
- Body copy is `--color-muted` (#9b9ba6) on black — 7.2:1.
- There is a skip link, a visible focus ring on everything, and the project
  cards open their detail on focus as well as hover.

## Deploying to vanshsharma.work.gd

The site is fully static — every route prerenders, there is no server code and
no environment variables.

**Vercel** (simplest): push to GitHub, import the repo, accept the defaults,
then add `vanshsharma.work.gd` under Settings → Domains and point the DNS
record it shows you at Vercel.

**Anywhere else**: `npm run build && npm start` behind a reverse proxy, or add
`output: "export"` to `next.config.ts` and upload the `out/` directory to any
static host.

`SITE.url` in `lib/data.ts` is the canonical origin — it feeds `metadataBase`,
the Open Graph tags and the JSON-LD. Change it there if the domain changes.

## The link preview

`app/opengraph-image.tsx` and `app/twitter-image.tsx` both render `OgCard` from
`lib/og.tsx` into a 1200×630 PNG at build time. Change the name or the role in
`lib/data.ts` and the card follows — there is no image file to keep in sync.

It is drawn by Satori, not a browser, so only part of CSS is available. Two
consequences are worth knowing before editing it:

- **No `filter: blur()`.** Every soft edge comes from a blurred `box-shadow`
  instead, which is why the accretion disc is a thin core with a large shadow
  around it rather than a tall gradient. A tall box does not work: the
  gradient inside it is circular and barely changes over a short vertical
  span, so its top and bottom land as hard straight lines.
- **Any element with more than one child needs an explicit `display`.**

Fonts are fetched from Google at build time, deliberately with an ancient user
agent — ask as a modern browser and the CSS points at woff2, which Satori
cannot parse. If the fetch fails the card still renders in the built-in face,
so an offline build never breaks.

Preview it directly at `/opengraph-image`. After deploying, re-scrape the URL
with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
and X's card validator — both cache aggressively.

## Worth adding later

- `public/Vansh-Sharma-Resume.pdf` is the LinkedIn export; swap it for a
  designed CV when there is one.
