import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { SITE } from "@/lib/data";

import "./globals.css";

/* Space Grotesk for display, Inter for reading, JetBrains Mono for the labels
   and anything numeric. `display: swap` so text is never invisible while a
   face is in flight.

   No `weight` on any of them. All three are variable fonts, and naming
   weights makes next/font fetch a separate static file per weight — six
   files here, where three variable ones cover every weight the site uses and
   weigh less in total. */
const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Vansh Sharma — software engineer building generative and agentic AI systems: LLM pipelines, RAG, multi-agent orchestration, Physical AI, and the full-stack platforms around them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.shortRole}`,
    template: `%s — ${SITE.name}`,
  },
  description,
  applicationName: `${SITE.name} Portfolio`,
  authors: [{ name: SITE.name, url: SITE.linkedin }],
  creator: SITE.name,
  keywords: [
    "Vansh Sharma",
    "AI engineer",
    "Agentic AI",
    "Generative AI",
    "RAG",
    "LLM pipelines",
    "LangChain",
    "LangGraph",
    "Langflow",
    "Apache NiFi",
    "Physical AI",
    "Rust",
    "Polars",
    "Next.js",
    "Flutter",
    "full-stack developer",
    "Delhi India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: `${SITE.name} — Portfolio`,
    title: `${SITE.name} — ${SITE.shortRole}`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.shortRole}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Zoom is left alone on purpose; capping it breaks magnification.
  themeColor: "#000000",
  colorScheme: "dark",
};

/**
 * Structured data, so the name, role and links are machine-readable for search
 * and for anything that previews the domain.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Software Engineer — AI Automation & Agentic AI",
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  sameAs: [SITE.linkedin],
  knowsAbout: [
    "Generative AI",
    "Agentic AI",
    "Retrieval-Augmented Generation",
    "Multi-Agent Systems",
    "Physical AI",
    "Rust",
    "Python",
    "Full-Stack Development",
    "Data Engineering",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg">
        <script
          type="application/ld+json"
          // The object is a literal defined above, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
