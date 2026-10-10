"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { NAV, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * A floating glass bar, and a sheet on small screens.
 *
 * Which link is active comes from an IntersectionObserver over the sections
 * rather than from the hash, because a hash only changes when someone clicks:
 * scroll past three sections and a hash-driven nav still points at the first.
 */
export function Nav() {
  const [active, setActive] = React.useState("home");
  const [lifted, setLifted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n);

    // The band sits across the upper-middle of the viewport: a section counts
    // as current once its top third has arrived, which matches where the eye
    // actually is rather than where the section technically begins.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // A sheet that covers the page must not leave the page scrolling underneath.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the sheet, like every other dismissible layer on the web.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-2 rounded-full px-3 py-2 transition-all duration-300",
            lifted
              ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)]"
              : "border border-transparent bg-transparent"
          )}
        >
          <a
            href="#home"
            className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-full px-2.5 py-1.5"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-amber" />
              {!reduced && (
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-amber" />
              )}
            </span>
            <span className="font-display text-sm font-medium tracking-tight">
              Vansh Sharma
            </span>
          </a>

          {/* Desktop links. Below md they are replaced by the sheet trigger. */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => {
              const id = item.href.slice(1);
              const on = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "relative block cursor-pointer rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-200",
                      on ? "text-fg" : "text-faint hover:text-fg"
                    )}
                  >
                    {/* One shared pill that slides between items, rather than a
                        background per item fading in and out. */}
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${SITE.email}`}
              className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[0.8125rem] font-medium text-black transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex"
            >
              Get in touch
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg md:hidden"
            >
              <Menu className="size-4.5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* A scrim heavy enough that the page behind stops competing.
                Tapping it closes the sheet, which is a pointer convention —
                it is not a second button, because the X and Escape already
                cover keyboard and screen-reader users and a duplicate
                "Close menu" control only clutters the tab order. */}
            <div
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-pointer bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-x-3 top-3 overflow-hidden rounded-3xl border border-line bg-surface p-5"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between pb-4">
                <span className="label-mono">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-muted"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <ul className="flex flex-col">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.04, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex cursor-pointer items-center justify-between border-b border-line py-4 font-display text-2xl tracking-tight"
                    >
                      {item.label}
                      <span className="label-mono nums">
                        0{NAV.indexOf(item) + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href={`mailto:${SITE.email}`}
                onClick={() => setOpen(false)}
                className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-fg py-3.5 text-sm font-medium text-black"
              >
                Get in touch
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
