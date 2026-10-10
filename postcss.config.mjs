/**
 * Tailwind v4 runs as a PostCSS plugin rather than as a Turbopack CSS loader.
 *
 * The loader form that `create-next-app` scaffolds registers a Turbopack rule
 * for `*.css`, and that glob matches every stylesheet in the graph — including
 * the ones `next/font/google` generates internally. Tailwind then rewrites the
 * `url(@vercel/turbopack-next/internal/font/google/font?…)` inside them, the
 * import map can no longer resolve it, and the build dies with "Module not
 * found" on a file nobody wrote. It only shows up on Vercel, because Vercel
 * applies its own config changes on top before building.
 *
 * PostCSS is scoped to the stylesheets that are actually imported from source,
 * so the font modules pass through untouched.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
