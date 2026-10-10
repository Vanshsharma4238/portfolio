import { SITE } from "@/lib/data";

/* -------------------------------------------------------------------------- */
/*  The link preview card                                                     */
/*                                                                            */
/*  Shared by app/opengraph-image.tsx and app/twitter-image.tsx so the two     */
/*  can never drift apart.                                                    */
/*                                                                            */
/*  This is drawn by Satori, not a browser. Satori implements a useful slice   */
/*  of CSS and silently ignores the rest, and two of its rules shape           */
/*  everything below:                                                         */
/*                                                                            */
/*    - any element with more than one child needs an explicit display, so     */
/*      every container here says `display: "flex"` even where a browser       */
/*      would not care;                                                       */
/*    - there is no `filter: blur()`, which is how the hero gets its soft      */
/*      light. So the glow is built the other way round: out of radial         */
/*      gradients whose stops do the falloff that a blur would.               */
/* -------------------------------------------------------------------------- */

export const OG_SIZE = { width: 1200, height: 630 };

/** `SITE.role` already contains an em-dash, so the short form is used here. */
export const OG_ALT = `${SITE.name} — ${SITE.shortRole}`;

/** Where the hole sits, matching the framing of the hero on a wide screen. */
const HOLE = { x: 848, y: 302 };
const SHADOW = 228;
/** Degrees the disc runs across the frame — the hero's `roll`. */
const ROLL = "rotate(-20deg)";

/**
 * Pulls one font off Google as TrueType.
 *
 * The deliberately ancient user agent is the whole trick: ask as a modern
 * browser and the CSS comes back pointing at woff2, which Satori cannot parse.
 * Ask as something from 2010 and it serves plain ttf.
 *
 * Returns null rather than throwing. A build with no network should produce a
 * card in the fallback face, not fail.
 */
async function googleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64)" },
      }
    ).then((r) => (r.ok ? r.text() : ""));

    const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;

    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

type Font = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 700;
  style: "normal";
};

/** The two faces the card asks for, minus any that did not arrive. */
export async function loadOgFonts(): Promise<Font[]> {
  const [display, body, mono] = await Promise.all([
    googleFont("Space+Grotesk", 700),
    googleFont("Inter", 400),
    googleFont("JetBrains+Mono", 500),
  ]);

  const fonts: Font[] = [];
  if (display) fonts.push({ name: "Display", data: display, weight: 700, style: "normal" });
  if (body) fonts.push({ name: "Body", data: body, weight: 400, style: "normal" });
  if (mono) fonts.push({ name: "Mono", data: mono, weight: 500, style: "normal" });
  return fonts;
}

/**
 * Names the loaded faces, falling back to whatever Satori has built in when a
 * fetch came back empty — naming a font that was never registered makes Satori
 * throw, so the card has to ask only for what actually loaded.
 */
function families(fonts: Font[]) {
  const has = (n: string) => fonts.some((f) => f.name === n);
  return {
    display: has("Display") ? "Display" : "sans-serif",
    body: has("Body") ? "Body" : "sans-serif",
    mono: has("Mono") ? "Mono" : "monospace",
  };
}

export function OgCard({ fonts }: { fonts: Font[] }) {
  const f = families(fonts);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#000000",
        fontFamily: f.body,
      }}
    >
      {/* The wash of light the hole throws into the frame. In the hero this is
          bloom off the disc; here it is one wide, very soft gradient. */}
      <div
        style={{
          position: "absolute",
          left: HOLE.x - 620,
          top: HOLE.y - 420,
          width: 1240,
          height: 840,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,152,56,0.30) 0%, rgba(255,120,30,0.14) 28%, rgba(120,45,10,0.05) 48%, rgba(0,0,0,0) 68%)",
        }}
      />

      {/* The disc, far side: a wide soft band behind the shadow.
          Softness has to come from a blurred box-shadow, because Satori has no
          blur filter. A tall box will not work — the gradient inside it is
          circular and barely changes across a short vertical span, so its top
          and bottom land as hard straight edges. So the band is a thin core
          and the blurred shadow around it does all of the spreading. */}
      <div
        style={{
          position: "absolute",
          left: HOLE.x - 500,
          top: HOLE.y - 11,
          width: 1000,
          height: 22,
          borderRadius: "50%",
          transform: ROLL,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,206,150,0.50) 0%, rgba(232,124,44,0.34) 34%, rgba(0,0,0,0) 72%)",
          boxShadow:
            "0 0 130px 62px rgba(214,102,30,0.13), 0 0 54px 22px rgba(255,160,70,0.10)",
        }}
      />

      {/* The halo: the far side of the disc, lensed up and over the top of the
          shadow into a ring. In the hero this falls out of the ray-tracing;
          here it is simply drawn, as a faint ring just clear of the rim. */}
      <div
        style={{
          position: "absolute",
          left: HOLE.x - (SHADOW + 96) / 2,
          top: HOLE.y - (SHADOW + 96) / 2,
          width: SHADOW + 96,
          height: SHADOW + 96,
          borderRadius: "50%",
          border: "2px solid rgba(255,186,112,0.20)",
        }}
      />

      {/* The shadow. Pure black, with the photon ring hugging it. */}
      <div
        style={{
          position: "absolute",
          left: HOLE.x - SHADOW / 2,
          top: HOLE.y - SHADOW / 2,
          width: SHADOW,
          height: SHADOW,
          borderRadius: "50%",
          backgroundColor: "#000000",
          border: "2px solid rgba(255,220,172,0.62)",
          boxShadow: "0 0 70px 12px rgba(255,152,56,0.26)",
        }}
      />

      {/* The disc, near side — the band that passes in front of the shadow and
          is what makes it read as a hole rather than a dot.
          Drawn whole and sitting low enough to cross only the lower half, so
          there is no clip edge anywhere for a seam to show along. */}
      <div
        style={{
          position: "absolute",
          left: HOLE.x - 520,
          top: HOLE.y + 34,
          width: 1040,
          height: 28,
          borderRadius: "50%",
          transform: ROLL,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,251,243,0.95) 0%, rgba(255,198,122,0.78) 24%, rgba(236,124,44,0.40) 46%, rgba(0,0,0,0) 74%)",
          boxShadow:
            "0 0 76px 30px rgba(255,146,54,0.22), 0 0 26px 9px rgba(255,214,160,0.26)",
        }}
      />

      {/* A veil over the reading half, so the copy sits on near-black however
          far the glow spreads. Left-to-right, matching the hero's scrim. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 820,
          height: "100%",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.93) 45%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* A lit hairline along the top edge. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: 3,
          background:
            "linear-gradient(90deg, rgba(255,152,56,0) 0%, rgba(255,152,56,0.9) 38%, rgba(103,232,249,0.55) 72%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Copy */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 72px",
          width: 760,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 26,
          }}
        >
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#ff9838",
            }}
          />
          <div
            style={{
              fontFamily: f.mono,
              fontSize: 19,
              letterSpacing: 4,
              color: "#9b9ba6",
            }}
          >
            {SITE.url.replace("https://", "").toUpperCase()}
          </div>
        </div>

        <div
          style={{
            fontFamily: f.display,
            fontSize: 86,
            lineHeight: 1,
            letterSpacing: -3.4,
            color: "#f4f4f5",
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            fontFamily: f.display,
            fontSize: 40,
            lineHeight: 1.18,
            letterSpacing: -1.4,
            color: "#ffd7a8",
            marginTop: 22,
          }}
        >
          Generative AI, Agentic systems, shipped.
        </div>

        <div
          style={{
            width: 96,
            height: 2,
            backgroundColor: "#ff9838",
            marginTop: 34,
            marginBottom: 26,
          }}
        />

        <div
          style={{
            fontFamily: f.mono,
            fontSize: 18,
            lineHeight: 1.5,
            letterSpacing: 1.1,
            color: "#9b9ba6",
          }}
        >
          RAG · Multi-Agent · Physical AI · Rust · Full-Stack
        </div>

        {/* The two facts a recruiter scans a preview for. They also weigh down
            the bottom of the column, which otherwise reads as empty. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 46,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              border: "1px solid rgba(52,211,153,0.28)",
              borderRadius: 999,
              padding: "7px 15px",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#34d399",
              }}
            />
            <div
              style={{
                fontFamily: f.mono,
                fontSize: 14,
                letterSpacing: 1.6,
                color: "#6ee7b7",
              }}
            >
              OPEN TO OPPORTUNITIES
            </div>
          </div>

          <div
            style={{
              fontFamily: f.mono,
              fontSize: 14,
              letterSpacing: 1.6,
              color: "#6b6b76",
            }}
          >
            {SITE.location.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
