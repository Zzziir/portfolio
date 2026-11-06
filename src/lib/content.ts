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
    "Lance Candelaria - Solutions Designer & Product Engineer. I design and ship products end to end, interface and API, with three shipped to production.",
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
  { value: 3, label: "products shipped to production" },
  { value: 3, label: "platforms: iOS, Android, web" },
  { value: 2, label: "disciplines: design + engineering" },
  { value: 2, suffix: "+", label: "years shipping products" },
];

export const about = {
  greeting: "Hey!",
  // short, decision-forward bio (Rule 05: judgment, not process)
  lead: `I'm ${site.firstName} - a solutions designer and product engineer based in the Philippines. I take the messy middle between "we have a problem" and "it's live," and own all of it.`,
  body: "Design, build, ship. I've put three products into production, writing the interface and the API behind each one. I optimize for the decision that moves the number, not the deck that explains it.",
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

export type ProjectSection = { heading: string; body: string[] };

export type Project = {
  slug: string;
  name: string;
  /** Rule 02 - the title IS a result. */
  result: string;
  context: string;
  /** Rule 05 - lead with the decision. */
  decision: string;
  tags: string[];
  year: string;
  /** accent used for the placeholder thumbnail gradient */
  accent: string;
  /** Rule 07 - the three strongest are featured; the rest are secondary. */
  featured: boolean;
  /** how imagery is framed: "mobile" gets an iPhone mock, "web" fills the frame */
  platform: "mobile" | "web";
  /** primary screenshot (card + detail hero). Drop the file in /public/assets/projects/<slug>/ */
  image?: string;
  /** optional second screenshot for the detail page */
  image2?: string;
  /** frame the second detail image in an iPhone (for phone-shaped screenshots on a web project) */
  image2Frame?: "phone";
  /**
   * Card thumbnail override, shown contained on the tile instead of the cover
   * screenshot: "logo" gets generous padding, "contain" (a centered UI) gets a
   * tight one. `bg` fills the tile with a flat colour matching a logo's own
   * background so it reads edge-to-edge; omit it to keep the accent glow (for
   * transparent marks). The detail hero still uses `image`.
   */
  card?: { src: string; fit: "logo" | "contain"; bg?: string };
  // ── detail page (/work/[slug]) ──
  category: string;
  liveLink?: string;
  summary: string;
  sections: ProjectSection[];
};

/** Route to a project's detail page. */
export const projectHref = (slug: string) => `/work/${slug}`;

/** The three headline case studies (Rule 07 - strongest first). */
export const featuredProjects = () => projects.filter((p) => p.featured);
/** Smaller secondary builds shown under the featured work. */
export const secondaryProjects = () => projects.filter((p) => !p.featured);

/**
 * Real projects. Copy reflects the actual builds; images are wired to
 * /public/assets/projects/<slug>/ and fall back to a gradient until dropped in.
 */
export const projects: Project[] = [
  {
    slug: "stratty-chatbot",
    name: "Stratty",
    result: "Scores site visitors into sales-ready leads, live in production",
    context: "Pre-sales AI chatbot · Stratpoint Technologies",
    decision:
      "Handed booking to a Google Calendar link and deleted the whole scheduling engine, so the bot does one job well: qualify leads through conversation and score them on a weighted 100-point rubric.",
    tags: ["Node.js", "Supabase", "Claude / Gemini", "Next.js"],
    year: "2026",
    accent: "#14b8a6",
    featured: true,
    platform: "web",
    image: "/assets/projects/stratty-chatbot/dashboard.png",
    image2: "/assets/projects/stratty-chatbot/chat.png",
    image2Frame: "phone",
    card: { src: "/assets/projects/stratty-chatbot/logo.png", fit: "logo" },
    category: "Conversational AI",
    // liveLink: "https://www.stratpoint.com", // TODO: confirm exact live URL
    summary:
      "A pre-sales chatbot on the Stratpoint site that qualifies visitors through conversation, scores each one into a sales-ready lead, and hands Sales a scored record with a downloadable transcript. Live in production since August 2026.",
    sections: [
      {
        heading: "The decision",
        body: [
          "Stratpoint needed pre-sales qualification to run without a human on every chat. The build separates two concerns hard: one engine decides what is still missing about a lead (budget, authority, need, timeline, company), a second decides when to ask for it, so the conversation stays natural instead of interrogating.",
          "Booking was handed entirely to a Google Calendar appointment link, which removed a whole scheduling engine, its OAuth, and its failure modes in one sprint.",
        ],
      },
      {
        heading: "How it qualifies",
        body: [
          "Every visitor is scored on a weighted 100-point rubric across eight dimensions, with budgets normalized to one currency (a daily edge function looks up any exchange rate it does not already have). When a visitor states a need, the bot surfaces matching Stratpoint case studies as tappable cards, then hands Sales a scored, ready-to-read lead.",
        ],
      },
      {
        heading: "Shipped",
        body: [
          "Live in production since August 2026 on Vercel serverless and Supabase, with a pluggable LLM layer (Claude by default, Gemini selectable). A companion Next.js dashboard gives Sales the lead table, assignment, capacity alerts, and downloadable chat transcripts.",
        ],
      },
    ],
  },
  {
    slug: "wookie-workspace",
    name: "Wookie",
    result: "Runs seat booking and return-to-office for an entire company",
    context: "Workspace + RTO platform · Stratpoint Technologies",
    decision:
      "Split the product in two: a Flutter app employees book from and a Refine admin panel HR runs on, both over one Supabase Postgres, so mobile booking and compliance dashboards never drift.",
    tags: ["Flutter", "Refine", "Supabase", "Next.js"],
    year: "2023 - now",
    accent: "#5b6cff",
    featured: true,
    platform: "mobile",
    image: "/assets/projects/wookie-workspace/home.png",
    image2: "/assets/projects/wookie-workspace/book-a-visit.png",
    card: { src: "/assets/projects/wookie-workspace/logo.webp", fit: "logo" },
    category: "Product platform",
    summary:
      "The workspace platform Stratpoint runs its return-to-office on: a Flutter app for booking a desk and seeing who is in, plus a Refine admin panel for HR's compliance dashboards, on one shared Supabase backend. Shipped to iOS, Android, and web.",
    sections: [
      {
        heading: "The decision",
        body: [
          "The return-to-office policy needed both a way for employees to book a desk and a way for HR to prove compliance. Rather than one compromised app, it is two: a Flutter app for employees and a Refine + Ant Design admin panel for HR, sharing one Supabase Postgres so the numbers on both sides always agree.",
        ],
      },
      {
        heading: "What employees get",
        body: [
          "Book a visit, pick a seat, see who is already in the office, RSVP to events, check in by QR, and get business-continuity alerts when a site is affected. It ships from one codebase to iOS, Android, and web, across development, staging, UAT, and production flavors.",
        ],
      },
      {
        heading: "What HR gets",
        body: [
          "Office distribution charts by day, week, and month, an RTO compliance module, user administration, and CSV import/export, all behind Google sign-in locked to the company domain.",
        ],
      },
    ],
  },
  {
    slug: "craffe-order-ahead",
    name: "Craffé",
    result: "Order-ahead coffee app live across 2 branches",
    context: "Order-ahead app · Craffé Coffee",
    decision:
      "Kept one shared menu with per-branch rules in a single config, so scanning the QR at either branch drops the order straight onto that branch's live queue and never the other's.",
    tags: ["Next.js 16", "Supabase Realtime", "Gemini", "Tailwind v4"],
    year: "2026",
    accent: "#d97706",
    featured: false,
    platform: "web",
    image: "/assets/projects/craffe-order-ahead/hero.png",
    image2: "/assets/projects/craffe-order-ahead/menu.png",
    card: {
      src: "/assets/projects/craffe-order-ahead/logo.png",
      fit: "logo",
      bg: "#2b2a28",
    },
    category: "Order-ahead app",
    summary:
      "A mobile-first order-ahead app for Craffé Coffee across two branches: scan the table QR, build a drink, pay ahead, and track a live pickup status that chimes when it is ready. Baristas work a real-time queue scoped to their own branch. Built for a live owner pitch.",
    sections: [
      {
        heading: "The decision",
        body: [
          "Two branches, one menu, one set of prices, but different hours, payment methods, and pickup codes. Every per-branch rule lives in a single config file, and a QR scan carries the branch in its URL, so an order placed at the Marilao branch lands on that queue and never East Rembo's.",
        ],
      },
      {
        heading: "The customer flow",
        body: [
          "Scan the table QR, build a drink and watch the price update as you add oat milk or an extra shot, pay ahead (simulated for the pitch), and land on a live pickup screen that chimes the moment your order is marked ready.",
        ],
      },
      {
        heading: "Behind the counter",
        body: [
          "Baristas work a real-time order board scoped to their branch by row-level security. There is a Gemini barista chatbot that knows the whole menu in warm Taglish, a buy-9-get-1 loyalty card, and printable QR table tents per branch. Built on Next.js 16 on foundations that can go live after sign-off with no rewrite.",
        ],
      },
    ],
  },
  {
    slug: "image-forgery-detection",
    name: "Forgery Detector",
    result: "Flags and localizes tampered regions in a photo",
    context: "Undergraduate thesis · Flutter + computer vision",
    decision:
      "Ran Error Level Analysis through a trained classifier so the app returns a heat overlay of the edited regions, not just a yes/no verdict.",
    tags: ["Flutter", "Computer Vision", "ELA", "Firebase"],
    year: "2024",
    accent: "#ea3a28",
    featured: false,
    platform: "web",
    image: "/assets/projects/image-forgery-detection/detect.png",
    image2: "/assets/projects/image-forgery-detection/home.png",
    card: {
      src: "/assets/projects/image-forgery-detection/predicted.png",
      fit: "contain",
    },
    category: "Mobile app",
    summary:
      "A Flutter thesis app that checks a photo from your phone, decides whether it has been edited, and highlights the tampered regions with an Error Level Analysis overlay, or confirms the image is authentic.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Edited images spread faster than anyone can fact-check them, and the tampering is often invisible to the eye. This undergraduate thesis app lets anyone check a photo from their phone and see where it was altered.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "The photo is sent to a classifier that runs Error Level Analysis, and the app returns a verdict plus an ELA overlay marking the regions most likely edited, or confirms the image is authentic. Built in Flutter with Firebase auth and storage.",
        ],
      },
    ],
  },
  {
    slug: "aws-saa-reviewer",
    name: "SAA-C03 Reviewer",
    result: "AWS SAA-C03 Exam Reviewer",
    context: "Personal study tool · Next.js + Supabase",
    decision:
      "Scored weak topics from answer history and auto-built a weighted practice set (~65% weak, 20% developing, 15% maintain) instead of serving random questions.",
    tags: ["Next.js 16", "Supabase", "Zustand", "Recharts"],
    year: "2026",
    accent: "#f59e0b",
    featured: false,
    platform: "web",
    image: "/assets/projects/aws-saa-reviewer/home.png",
    image2: "/assets/projects/aws-saa-reviewer/insights.png",
    card: {
      src: "/assets/projects/aws-saa-reviewer/logo.png",
      fit: "logo",
      bg: "#131922",
    },
    category: "Study tool",
    liveLink: "https://aws-saa-c03-reviewer.vercel.app",
    summary:
      "A practice and review tool for the AWS Solutions Architect Associate (SAA-C03) exam: 571 questions across the four domains, topic-level strengths and weaknesses, and a weighted set that targets your weak spots. Deployed on Vercel.",
    sections: [
      {
        heading: "The decision",
        body: [
          "Random practice questions waste time on topics you already know. The reviewer scores your history per topic and builds a weighted set that spends about 65% on weak areas, 20% on developing ones, and 15% keeping strengths warm.",
        ],
      },
      {
        heading: "What's inside",
        body: [
          "571 questions across the four SAA-C03 domains, a reviewer mode with instant feedback and an exam mode that scores only at the end, topic-level strengths and weaknesses, a bionic reading aid, and a cross-user streak leaderboard. Progress persists per user through Supabase auth.",
        ],
      },
    ],
  },
  {
    slug: "palo-scorer",
    name: "Palo!",
    result: "Live badminton scorer across 3 platforms, one backend",
    context: "Badminton scoring + analytics platform · Palo!",
    decision:
      "Made the web app the single source of truth, then ported it to Flutter test-first (712 passing tests) and replayed the Elo ratings byte-for-byte against 156 real matches, so mobile never drifts from web.",
    tags: ["Next.js", "Flutter", "Supabase", "Realtime"],
    year: "2026",
    accent: "#a8e04a",
    featured: true,
    platform: "mobile",
    image: "/assets/projects/palo-scorer/home.png",
    image2: "/assets/projects/palo-scorer/scorer.png",
    card: {
      src: "/assets/projects/palo-scorer/logo.png",
      fit: "logo",
      bg: "#0b0f0e",
    },
    category: "Sports platform",
    liveLink: "https://palo.lanceamiel.site",
    summary:
      "A badminton match scorer for groups and open-play nights: live rally-by-rally scoring that works offline, Elo ratings, achievements, queues, and full tournaments. One Next.js web app, a Flutter iOS and Android port, and an admin CRM, all on a single Supabase backend. Live at palo.lanceamiel.site.",
    sections: [
      {
        heading: "The decision",
        body: [
          "The web app on main is the single source of truth for behavior. The Flutter app replicates it feature for feature against the same Supabase project, ported test-first so the two never diverge: 712 tests passing through the replay phase, with Elo ratings replayed byte-for-byte against 156 real matches and roughly 8,100 rallies.",
        ],
      },
      {
        heading: "What it does",
        body: [
          "Players score a match rally by rally with undo, voice score calls, and haptics, and it all works with zero network, syncing when back online. Groups get Elo-based standings across singles, doubles, and mixed, 46 achievement badges, momentum graphs, real-time open-play queues, and tournaments with live brackets.",
        ],
      },
      {
        heading: "Shipped",
        body: [
          "Live in production on Vercel at palo.lanceamiel.site, with a separate admin CRM for running groups and an animated match replay that exports to MP4 (a 3-second clip renders in 2.3s on an iPhone 16). Mobile is through its replay phase, heading for store release.",
        ],
      },
    ],
  },
  {
    slug: "zoomy-pos",
    name: "ZoomyPOS",
    result: "Offline-first POS that never drops a sale on dead signal",
    context: "Point-of-sale + retail observability · ZoomyPOS / Coop",
    decision:
      "Wrote every sale to on-device SQLite with a client UUID so a bazaar cashier keeps selling through a dead signal and a retry never double-counts, then synced to a Supabase archive a Next.js dashboard reads for live inventory and forecasts.",
    tags: ["Expo / React Native", "Next.js", "Supabase", "Claude"],
    year: "2026",
    accent: "#e11d63",
    featured: false,
    platform: "web",
    image: "/assets/projects/zoomy-pos/cover.jpg",
    category: "POS + analytics",
    liveLink: "https://zoomy-pos-staging.vercel.app",
    summary:
      "An offline-first point-of-sale app for pop-up bazaars, paired with Coop, a Next.js ops dashboard. Cashiers sell with no signal; every sale syncs to a Supabase archive that Coop turns into live revenue, inventory, and event-aware stock forecasts for the next bazaar weekend.",
    sections: [
      {
        heading: "The decision",
        body: [
          "The POS is built offline-first: every sale is written to on-device SQLite with a client UUID, so a cashier keeps selling through a dead signal and a retry never double-counts. Writes reconcile to a Supabase archive through a single RPC, and the Coop dashboard reads only from that archive, so the till and the analytics can never disagree.",
        ],
      },
      {
        heading: "The Coop dashboard",
        body: [
          "Coop reads only the synced archive and turns it into the numbers the brand runs on: revenue, orders, and units in real time, low-stock email alerts on an hourly and daily cadence, and event-aware forecasts that project stockouts for Friday-to-Sunday bazaar weekends.",
        ],
      },
      {
        heading: "Shipped",
        body: [
          "Live POS on Vercel, with durable sync verified end to end and around 395 passing tests across the forecast, inventory, and email paths. The same Coop backend also powers a separate enterprise retail deployment (see Nichido).",
        ],
      },
    ],
  },
  {
    slug: "nichido-retail",
    name: "Nichido",
    result: "AI reads handwritten store forms across 326 retail stores",
    context: "Retail inventory + demand forecasting · Goldline / Coop",
    decision:
      "Instead of digitizing 326 stores by hand, the beauty assistants photograph the paper inventory forms they already fill in, Claude vision reads each page into counts, reconciles them against Watsons POS data, and flags only the pages that do not add up.",
    tags: ["Next.js", "Supabase", "Claude Vision", "Recharts"],
    year: "2026",
    accent: "#3f7d5e",
    featured: false,
    platform: "web",
    image: "/assets/projects/nichido/dashboard.svg",
    category: "Retail ops + AI",
    summary:
      "The retail operations layer on the Coop backend for a cosmetics brand sold through Watsons: handwritten store inventory forms read by AI, reconciled against POS sales, and turned into demand forecasts, restock purchase orders, and per-assistant scorecards. Shipped to production with a year of real sales loaded.",
    sections: [
      {
        heading: "The decision",
        body: [
          "Stores still track stock on paper. Rather than force 326 of them onto a new app, the beauty assistants photograph the forms they already fill in, and Claude vision reads each page into structured counts. Every count is reconciled against Watsons POS sales, and only the pages that disagree surface in a flag queue, so review time goes to the handful that are wrong instead of all of them.",
        ],
      },
      {
        heading: "The scale",
        body: [
          "The production go-live carries 326 stores, 315 Watsons SKUs, and 263 Nichido items (144 linked to a Watsons SKU), over 472,604 sales rows across twelve months and ₱382M in encrypted revenue. It went from kickoff to a production go-live in about a week, with all twelve months of sales loaded.",
        ],
      },
      {
        heading: "What it produces",
        body: [
          "From last-year demand plus a safety-stock buffer, Coop computes a restock plan: 861,286 units to deliver for the November to January peak, down to the top line item at 68,751 units of a single SKU. It also generates purchase orders with per-line approval, Clear / At Risk / Delinquent scorecards per assistant, and a SKU-linking workflow mapping Watsons codes to Nichido items.",
        ],
      },
    ],
  },
  {
    slug: "taska",
    name: "Taska",
    result: "AI meeting-to-tasks inbox that cut manual re-typing to zero",
    context: "AI task backlog · Taska",
    decision:
      "Made nothing an AI proposes reach the board until a lead approves it: Claude reads each meeting's notes or transcript and suggests tasks, owners, and status changes with quoted evidence into a review inbox, instead of auto-writing the backlog.",
    tags: ["Next.js 16", "Supabase", "Claude", "AssemblyAI"],
    year: "2026",
    accent: "#2f6bff",
    featured: true,
    platform: "web",
    image: "/assets/projects/taska/cover.jpg",
    card: {
      src: "/assets/projects/taska/logo.png",
      fit: "logo",
      bg: "#0e1a33",
    },
    category: "AI productivity",
    liveLink: "https://taska.lanceamiel.site",
    summary:
      "A team backlog that turns Gemini meeting notes and recorded audio into suggested tasks for a lead to review before anything reaches the board. Built to replace a hand-kept Google Sheet: real members with aliases, fixed statuses, auto-filled dates, and a self-building weekly summary for the CEO update.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Every meeting, someone re-typed tasks, owners, and priorities into a shared sheet by hand, missing items and maintaining the overview and activity log manually. Taska reads the notes Gemini already takes and proposes the work instead.",
        ],
      },
      {
        heading: "The decision",
        body: [
          "Suggestions never auto-write the board. Claude extracts tasks, status changes, and assignees with confidence scores and quoted evidence into a review inbox, and a lead approves, edits, or rejects in bulk. Audio recorded in the app or uploaded is transcribed with AssemblyAI (speaker labels, Taglish) before the same review step.",
        ],
      },
      {
        heading: "What it replaced",
        body: [
          "Free-text owners became real members with aliases that auto-match 'Dave / Vince'; blank statuses became fixed ones with auto-filled start and completion dates; and the manual overview and activity log became a self-building audit trail with a one-click weekly summary. Built on Next.js 16 and Supabase with row-level security on every table.",
        ],
      },
    ],
  },
];

/** Testimonials are visitor-submitted now and moderated in the dashboard; see
 * `src/lib/testimonials.ts` and the `testimonials` Postgres table. */

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
