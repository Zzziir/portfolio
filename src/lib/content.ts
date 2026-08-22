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

/** Rule 04 — a proof strip near the top: numbers, no scrolling to find impact.
 * Structured so the numeric part can animate with <NumberTicker>. */
export type ProofStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export const proof: ProofStat[] = [
  { prefix: "0→", value: 12, suffix: "k", label: "users on the last launch" }, // TODO
  { value: 3, label: "SaaS products shipped" }, // TODO
  { prefix: "<", value: 1.0, decimals: 1, suffix: "s", label: "median load, every build" }, // TODO
  { value: 6, suffix: " yrs", label: "designing + shipping" }, // TODO
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

export type ProjectSection = { heading: string; body: string[] };

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
  // ── detail page (/work/[slug]) ──
  category: string;
  liveLink?: string;
  summary: string;
  sections: ProjectSection[];
};

/** Route to a project's detail page. */
export const projectHref = (slug: string) => `/work/${slug}`;

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
    category: "Mobile app",
    liveLink: "#", // TODO
    summary:
      "A Flutter mobile app that analyzes a photo, decides whether it has been edited, and highlights the tampered regions — and confirms when an image is genuinely unaltered.", // TODO
    sections: [
      {
        heading: "The problem",
        body: [
          "Edited images spread fast and are hard to verify by eye. The goal was a tool anyone could use from their phone to check whether an image had been manipulated — and see exactly where.", // TODO
        ],
      },
      {
        heading: "What it does",
        body: [
          "Point the app at an image and it returns a verdict — edited or authentic — plus an overlay marking the regions most likely to have been altered.", // TODO
        ],
      },
    ],
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
    category: "Conversational AI",
    liveLink: "#", // TODO: stratpoint.com
    summary:
      "Stratty is a chatbot on the Stratpoint website that engages visitors, answers questions, and accelerates marketing-qualified leads into sales-qualified ones.", // TODO
    sections: [
      {
        heading: "The goal",
        body: [
          "Turn passive website traffic into qualified pipeline by meeting visitors where they are and guiding them toward a conversation with sales.", // TODO
        ],
      },
      {
        heading: "How it works",
        body: [
          "Stratty qualifies intent through conversation, surfaces the right information, and hands warm, sales-ready leads to the team.", // TODO
        ],
      },
    ],
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
    category: "Mobile app",
    liveLink: "#", // TODO
    summary:
      "A cross-platform mobile app for reserving seats in real time, built with Flutter so a single codebase ships to both iOS and Android.", // TODO
    sections: [
      {
        heading: "The idea",
        body: [
          "Make picking and holding a seat feel instant and reliable, without double-bookings, across any device.", // TODO
        ],
      },
      {
        heading: "The build",
        body: [
          "Flutter for one codebase across platforms, with real-time updates so availability always reflects the latest state.", // TODO
        ],
      },
    ],
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
    category: "Study tool",
    liveLink: "#", // TODO
    summary:
      "A practice and review tool for the AWS Solutions Architect Associate (SAA-C03) exam — question sets, explanations, and progress tracking.", // TODO
    sections: [
      {
        heading: "Why",
        body: [
          "The SAA-C03 covers a wide surface area. The tool focuses study on weak spots instead of re-reading everything.", // TODO
        ],
      },
      {
        heading: "What's inside",
        body: [
          "Curated question sets with explanations and progress tracking so preparation stays targeted and measurable.", // TODO
        ],
      },
    ],
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
