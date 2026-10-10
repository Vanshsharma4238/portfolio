import { Noise } from "@/components/ui/backgrounds";
import { CursorGlow, ScrollProgress } from "@/components/ui/chrome";
import { About } from "@/components/sections/about";
import { Contact, Footer } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Nav } from "@/components/sections/nav";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Ticker } from "@/components/sections/ticker";

export default function Page() {
  return (
    <>
      <Intro />
      <ScrollProgress />
      <CursorGlow />
      {/* Keyboard users land here first and can jump the nav and the hero.
          It has to precede <Nav> in the DOM to do that: focus order follows
          the document, so a skip link placed after the thing it skips is
          reached only once you have already tabbed through all of it. The
          elements above are inert — the intro curtain and the two pointer
          overlays are all aria-hidden and hold nothing focusable. */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-black"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
        <Contact />
      </main>

      <Footer />

      {/* Last in the stack: it sits over everything and hides the banding that
          long dark gradients fall into on 8-bit panels. */}
      <Noise />
    </>
  );
}
