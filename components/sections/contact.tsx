"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";

import { Aurora, StarField, TopBeams } from "@/components/ui/backgrounds";
import { Magnetic } from "@/components/ui/interactions";
import { RevealLines, Reveal } from "@/components/ui/reveal";
import { SITE, SOCIALS } from "@/lib/data";

/**
 * The close. One primary action — write to me — and the other two ways to do
 * it underneath, visually subordinate.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line py-28 md:py-36"
    >
      <TopBeams />
      <Aurora className="opacity-70" />
      <StarField count={48} seed={19} />

      <div className="container-x relative">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="label-mono">06 — Contact</span>
          </Reveal>

          <h2 className="mt-7 text-display">
            <span className="sr-only">Let&rsquo;s build something that lasts</span>
            <span aria-hidden="true">
              <RevealLines
                lines={["Let's build", "something", "that lasts."]}
                lineClassName="text-center"
                innerClassName="text-fade"
              />
            </span>
          </h2>

          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-[34rem] text-[1.0625rem] leading-[1.75] text-muted">
              I&rsquo;m open to roles and collaborations in AI engineering,
              agentic systems and full-stack product work. The fastest way to
              reach me is email.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={9}>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-fg px-7 py-4 text-[0.9375rem] font-medium text-black transition-colors duration-200 hover:bg-white"
                >
                  Write to me
                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
              <CopyEmail />
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <ul className="mt-14 flex flex-col items-center gap-px overflow-hidden rounded-2xl border border-line bg-line sm:flex-row">
              {SOCIALS.map((s) => {
                // Anything that leaves the page gets its own tab — the links
                // that stay in it (mailto:, tel:) hand off to an app instead
                // and would leave a blank tab behind.
                const away = s.href.startsWith("http") || s.href.endsWith(".pdf");
                return (
                <li key={s.label} className="w-full sm:w-auto">
                  <a
                    href={s.href}
                    target={away ? "_blank" : undefined}
                    rel={away ? "noreferrer" : undefined}
                    className="group flex h-full cursor-pointer flex-col gap-1 bg-surface px-7 py-5 text-left transition-colors duration-200 hover:bg-elevated"
                  >
                    <span className="label-mono">{s.label}</span>
                    <span className="flex items-center gap-1.5 text-[0.875rem] text-fg/90">
                      {s.handle}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3 text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber"
                      />
                    </span>
                  </a>
                </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Copies the address and says so for three seconds.
 *
 * The confirmation is an `aria-live` region and a tick, not just a colour
 * change, so it lands for a screen reader and for anyone who cannot tell the
 * two states apart by hue. If the clipboard is unavailable — an insecure
 * origin, a browser that refuses — the button says so instead of silently
 * doing nothing.
 */
function CopyEmail() {
  const [state, setState] = React.useState<"idle" | "done" | "failed">("idle");

  React.useEffect(() => {
    if (state === "idle") return;
    const id = window.setTimeout(() => setState("idle"), 3000);
    return () => window.clearTimeout(id);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setState("done");
    } catch {
      setState("failed");
    }
  }

  return (
    <Magnetic strength={9}>
      <button
        type="button"
        onClick={copy}
        className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-[0.9375rem] text-muted transition-colors duration-200 hover:border-white/35 hover:text-fg"
      >
        <span className="relative grid size-4 place-items-center">
          <AnimatePresence mode="wait" initial={false}>
            {state === "done" ? (
              <motion.span
                key="done"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute"
              >
                <Check className="size-4 text-emerald-400" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute"
              >
                <Copy className="size-4" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span className="nums">
          {state === "done"
            ? "Copied"
            : state === "failed"
              ? SITE.email
              : "Copy email"}
        </span>

        {/* Announced politely; it never steals focus. */}
        <span aria-live="polite" className="sr-only">
          {state === "done"
            ? "Email address copied to clipboard"
            : state === "failed"
              ? `Could not copy. The address is ${SITE.email}`
              : ""}
        </span>
      </button>
    </Magnetic>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
        <p className="text-[0.8125rem] text-faint">
          © {new Date().getFullYear()} {SITE.name}. Built with Next.js, WebGL
          and far too much care.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.url}
            className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint transition-colors hover:text-fg"
          >
            {/* Derived from the href rather than typed out. These were written
                separately and drifted: the label still read a domain that had
                been abandoned while the link already pointed elsewhere. */}
            {SITE.url.replace(/^https?:\/\//, "")}
          </a>
          <a
            href="#home"
            className="cursor-pointer font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint transition-colors hover:text-fg"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
