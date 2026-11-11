/**
 * Single source of truth for all portfolio copy + data.
 *
 * Voice rules (see CLAUDE.md "2026 portfolio audit"):
 *  - one role, one niche (Solutions Designer / Product Engineer)
 *  - every headline carries a number or outcome
 *  - proof above the fold, decisions over process, 3 case studies max
 *
 * Numbers below are realistic PLACEHOLDERS - swap in your real metrics.
 * Search "TODO" to find every value that should become true.
 */

export const site = {
  name: "Lance Candelaria",
  firstName: "Lance",
  lastName: "Candelaria",
  // Rule 01 - one specific role, named in the hero.
  role: "Solutions Designer / Product Engineer",
  // The giant hero words (kept to two lines like the reference).
  heroWords: ["SOLUTIONS", "ENGINEER"] as const,
  heroKicker: "solutions designer · product engineer",
  // Rule 02 - hero line includes a business result, not a personality trait.
  heroLine:
    "I design and ship the whole product, from the fuzzy problem to the running software. That's solutions engineering: I own the business problem and the code in production that solves it.",
  location: "Manila, PH - working remote",
  since: 2024, // "designing & shipping since"
  email: "lancecandelaria2@gmail.com",
  url: "https://portfolio.lanceamiel.site",
  metaDescription:
    "Lance Candelaria - Solutions Designer & Product Engineer. I design and ship products end to end, interface and API, with seven shipped to production.",
  availability: "Available for 1 project - Q3 2026", // TODO
  resumeUrl: "/lance-candelaria-resume.pdf", // TODO: drop the real file in /public
  socials: [
    { label: "GitHub", handle: "Zzziir", href: "https://github.com/Zzziir" },
    { label: "LinkedIn", handle: "in/lance", href: "#" }, // TODO
    { label: "X", handle: "@lance", href: "#" }, // TODO
    { label: "Email", handle: "lancecandelaria2@gmail.com", href: "mailto:lancecandelaria2@gmail.com" },
  ],
};

/** Rule 04 - a proof strip near the top: numbers, no scrolling to find impact.
 * Structured so the numeric part can animate with <NumberTicker>. */
export type ProofStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export const proof: ProofStat[] = [
  { value: 7, label: "products shipped to production" },
  { value: 3, label: "platforms: iOS, Android, web" },
  { value: 2, label: "disciplines: design + engineering" },
  { value: 2, suffix: "+", label: "years shipping products" },
];

/** Rule 04 - logos in the proof band. Each brand links to its case study.
 * Add `logo` (a monochrome SVG/PNG in /public/assets/brands/) to swap the
 * wordmark for the real mark. */
export type Brand = {
  name: string;
  /** Case-study slug, linked from the wordmark. */
  slug?: string;
  logo?: string;
};

export const brands: Brand[] = [
  { name: "Zoomy", slug: "zoomy-pos" },
  { name: "Nichido", slug: "nichido-retail" },
];

export const about = {
  greeting: "Hey!",
  // short, decision-forward bio (Rule 05: judgment, not process)
  lead: `I'm ${site.firstName} - a solutions designer and product engineer based in the Philippines. I take the messy middle between "we have a problem" and "it's live," and own all of it.`,
  body: "Design, build, ship. I've put seven products into production, writing the interface and the API behind each one. I optimize for the decision that moves the number, not the deck that explains it.",
  cta: { label: "Read the work", href: "#work" },
};

/** Rule 05 - the scroll-fill statement. One line, fills as you read. */
export const statement =
  "From problem to launch. I design and ship digital products built to move fast, stay simple, and perform in the real world - driven by clarity, structured systems, and decisions that hold up.";

export const services = [
  {
    title: "Product Design",
    tags: ["Discovery", "UX Flows", "Prototyping"],
  },
  {
    title: "Full-Stack Build",
    tags: ["Next.js", "APIs", "Databases"],
  },
  {
    title: "Design Systems",
    tags: ["Tokens", "Components", "Docs"],
  },
  {
    title: "Technical Consulting",
    tags: ["Architecture", "Web Performance", "Roadmapping"],
  },
];

/** Projects live in Supabase and are managed at /admin (see `src/lib/projects.ts`).
 * Testimonials are visitor-submitted and moderated there too (`src/lib/testimonials.ts`). */

export type Certification = {
  name: string;
  issuer: string;
  /** When it was earned, e.g. "2026". */
  issued: string;
  /** Short credential code shown as a chip, e.g. "SAA-C03". */
  code?: string;
  /** Public verification link (Credly etc.). */
  credentialUrl?: string;
  /** Badge art. Drop the file in /public/assets/certifications/. */
  image: string;
  accent: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    issued: "2026",
    code: "SAA-C03",
    credentialUrl:
      "https://www.credly.com/badges/e1e6de94-b67d-48d3-b295-664c1d3cdd4d/public_url",
    image: "/assets/certifications/aws-saa-c03.png",
    accent: "#3b82f6",
  },
  {
    name: "Professional Scrum Developer I",
    issuer: "Scrum.org",
    issued: "2026",
    code: "PSD I",
    credentialUrl:
      "https://www.credly.com/badges/17c3c8ae-487b-44fd-85ca-28a41ea5ec26/public_url",
    image: "/assets/certifications/professional-scrum-developer.png",
    accent: "#d9552f",
  },
];

export type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  accent: string;
};

export const posts: Post[] = [
  {
    slug: "ship-the-ugly-version",
    date: "May 5, 2026",
    title: "Why I ship the ugly version first",
    excerpt:
      "Polish is a bet. Instrument the rough build, let the data pick where to spend the craft.",
    accent: "#ea3a28",
  },
  {
    slug: "design-systems-that-survive",
    date: "Jun 16, 2026",
    title: "Design systems that survive a rewrite",
    excerpt:
      "Tokens over components, decisions over documentation - what actually outlives the next framework.",
    accent: "#5b6cff",
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const footer = {
  // big footer line
  line: "Design that ships.\nSoftware that converts.",
  quickLinks: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
};
