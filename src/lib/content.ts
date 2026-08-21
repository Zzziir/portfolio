/**
 * Single source of truth for all portfolio copy + data.
 *
 * Voice rules (see CLAUDE.md "2026 portfolio audit"):
 *  - one role, one niche (Solutions Designer / Product Engineer)
 *  - every headline carries a number or outcome
 *  - proof above the fold, decisions over process, 3 case studies max
 *
 * Numbers below are realistic PLACEHOLDERS — swap in your real metrics.
 * Search "TODO" to find every value that should become true.
 */

export const site = {
  name: "Lance Candelaria",
  firstName: "Lance",
  lastName: "Candelaria",
  // Rule 01 — one specific role, named in the hero.
  role: "Solutions Designer / Product Engineer",
  // The giant hero words (kept to two lines like the reference).
  heroWords: ["SOLUTIONS", "ENGINEER"] as const,
  heroKicker: "solutions designer · product engineer",
  // Rule 02 — hero line includes a business result, not a personality trait.
  heroLine:
    "I design and ship the whole product — from the fuzzy problem to the running software. Last build went 0 → 12,000 users in 5 months.", // TODO: real result
  location: "Manila, PH — working remote",
  since: 2019, // "designing & shipping since"
  email: "lancecandelaria2@gmail.com",
  url: "https://portfolio-zzziir.vercel.app", // TODO: real domain
  metaDescription:
    "Lance Candelaria — Solutions Designer & Product Engineer. I design and ship products end to end. 3 SaaS products shipped, one from 0 → 12k users in 5 months.", // TODO
  availability: "Available for 1 project — Q3 2026", // TODO
  resumeUrl: "/lance-candelaria-resume.pdf", // TODO: drop the real file in /public
  socials: [
    { label: "GitHub", handle: "Zzziir", href: "https://github.com/Zzziir" },
    { label: "LinkedIn", handle: "in/lance", href: "#" }, // TODO
    { label: "X", handle: "@lance", href: "#" }, // TODO
    { label: "Email", handle: "lancecandelaria2@gmail.com", href: "mailto:lancecandelaria2@gmail.com" },
  ],
};

/** Rule 04 — a proof strip near the top: numbers, no scrolling to find impact. */
export const proof = [
  { value: "0→12k", label: "users on the last launch" }, // TODO
  { value: "3", label: "SaaS products shipped" }, // TODO
  { value: "<1.0s", label: "median load, every build" }, // TODO
  { value: "6 yrs", label: "designing + shipping" }, // TODO
];

export const about = {
  greeting: "Hey!",
  // short, decision-forward bio (Rule 05: judgment, not process)
  lead: `I'm ${site.firstName} — a solutions designer and product engineer based in the Philippines. I take the messy middle between "we have a problem" and "it's live," and own all of it.`,
  body: "Design, build, ship. I've shipped three SaaS products used by teams across four time zones — writing the interface and the API behind it. I optimize for the decision that moves the number, not the deck that explains it.", // TODO
  cta: { label: "Read the work", href: "#work" },
};

/** Rule 05 — the scroll-fill statement. One line, fills as you read. */
export const statement =
  "From problem to launch. I design and ship digital products built to move fast, stay simple, and perform in the real world — driven by clarity, structured systems, and decisions that hold up.";

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

export type Project = {
  slug: string;
  name: string;
  /** Rule 02 — the title IS a result. */
  result: string;
  context: string;
  /** Rule 05 — lead with the decision. */
  decision: string;
  tags: string[];
  year: string;
  /** accent used for the placeholder thumbnail gradient */
  accent: string;
  href: string;
};

/**
 * PLACEHOLDER projects — real names/metrics/decisions/links to come.
 * These reflect the actual builds; the `result` headlines and `decision` lines
 * are stand-ins until the real numbers/details are added. Search "TODO".
 */
export const projects: Project[] = [
  {
    slug: "image-forgery-detection",
    name: "Forgery Detector",
    result: "Detects & localizes edited regions in images", // TODO: add accuracy metric
    context: "Mobile app · Flutter + computer vision",
    decision:
      "Flags whether an image is edited and points to the tampered regions — and confirms genuinely unedited images.", // TODO: real design decision
    tags: ["Flutter", "Computer Vision", "ML"],
    year: "2025", // TODO
    accent: "#ea3a28",
    href: "#", // TODO: case study link
  },
  {
    slug: "stratty-chatbot",
    name: "Stratty",
    result: "Chatbot that turns MQLs into SQLs", // TODO: add conversion metric
    context: "Conversational AI · Stratpoint website",
    decision:
      "A website chatbot that qualifies visitors and accelerates marketing-qualified leads into sales-qualified ones.", // TODO
    tags: ["Chatbot", "LLM", "Lead Gen"],
    year: "2025", // TODO
    accent: "#14b8a6",
    href: "#", // TODO
  },
  {
    slug: "seat-reservation-app",
    name: "Seat Reservation",
    result: "Real-time seat booking on mobile", // TODO: add outcome metric
    context: "Mobile app · Flutter",
    decision:
      "A cross-platform mobile app for reserving seats, built with Flutter for one codebase across iOS and Android.", // TODO
    tags: ["Flutter", "Dart", "Realtime"],
    year: "2024", // TODO
    accent: "#5b6cff",
    href: "#", // TODO
  },
  {
    slug: "aws-saa-reviewer",
    name: "SAA-C03 Reviewer",
    result: "Exam reviewer for AWS SAA-C03", // TODO: add usage/pass metric
    context: "Study tool · AWS Solutions Architect Associate",
    decision:
      "A practice + review tool for the AWS Solutions Architect Associate (SAA-C03) certification exam.", // TODO
    tags: ["AWS", "Quiz Engine", "Web"],
    year: "2024", // TODO
    accent: "#f59e0b",
    href: "#", // TODO
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Lance owned the problem end to end. He designed the flow, built it, and the numbers moved the week we shipped.", // TODO
    name: "Yakoub K.",
    title: "Head of Product, Ledgerly",
  },
  {
    quote:
      "Rare to find someone who can sit in a discovery call and then ship the API that afternoon. Everything felt intentional.", // TODO
    name: "Daniel R.",
    title: "Founder, Runway",
  },
  {
    quote:
      "He deleted half our roadmap and we shipped faster. The judgment is the value — clean structure, real decisions.", // TODO
    name: "Mark M.",
    title: "CTO, Meridian",
  },
  {
    quote:
      "The work looks premium and holds up under load. Design that ships, not design that presents.", // TODO
    name: "Omar H.",
    title: "Eng Lead, Northwind",
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
      "Tokens over components, decisions over documentation — what actually outlives the next framework.",
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
