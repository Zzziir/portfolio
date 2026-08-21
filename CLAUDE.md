# CLAUDE.md — Personal Portfolio

Guidance for every session in this repo. These instructions are binding.

---

## 0. Project positioning & stack

- **Target role (Rule 01 niche):** **Solutions Designer / Product Engineer.**
  The hero names this one role. Every case study points at this same problem
  space — solving business problems by designing *and* shipping the product.
- **Stack:** Next.js (App Router) + shadcn/ui + Tailwind, deployed on Vercel.
- **Design reference:** a sample will be provided by the user — match its
  direction before generating original layouts.

---

## 1. Commit strategy — atomic + conventional

**Atomic commits.** One logical change per commit. A commit should build, pass
checks, and be revertable on its own. Never mix a refactor with a feature, or
formatting with logic. If a change needs the word "and" to describe it, split it.

**Conventional Commits.** Every message follows `type(scope): subject`.

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
  `build`, `ci`, `chore`, `revert`.
- **Scope:** the area touched (`hero`, `case-study`, `nav`, `contact`, `seo`).
- **Subject:** imperative, lowercase, no trailing period, ≤ 72 chars
  (`add proof strip above the fold`, not `Added proof strip.`).
- **Body** (when useful): the *why*, not the *what* — the diff shows the what.
- **Breaking changes:** `feat!:` or a `BREAKING CHANGE:` footer.

Commit or push **only when the user asks**. Branch off `main` before committing
if on the default branch. End commit messages with the required co-author trailer.

## 2. Development practices

- **Types first.** Strict TypeScript. No `any` unless justified in a comment.
- **Small, named, single-purpose** functions and components. Colocate.
- **Accessibility is not optional** — semantic HTML, real focus states, keyboard
  paths, `alt` text, respects `prefers-reduced-motion`.
- **Performance is the product** (see the copy rules — the site *is* a cold-DM
  weapon). Ship fast: optimize images, lazy-load below the fold, minimal JS,
  measure Core Web Vitals. The site must feel instant on mobile.
- **No dead code, no commented-out blocks, no TODO graveyards.** Delete it; git
  remembers.
- **Match surrounding code** — its naming, idioms, comment density.
- **Verify before claiming done** — actually run the flow, don't just typecheck.

## 3. Design — three lenses, applied to every UI

When building or reviewing any interface in this repo, load and apply these
installed skills. They are the design bar; do not ship UI without them.

- **`emil-design-eng`** (Emil Kowalski) — UI polish, component design, animation
  decisions, and the invisible details that make software feel great. Use for
  motion, easing/duration, hover/press states, and micro-interactions.
- **`impeccable`** — visual hierarchy, information architecture, cognitive load,
  spacing, typography, color, responsive behavior, anti-patterns. Use for
  layout, structure, and turning bland into intentional.
- **`design-taste-frontend`** (Taste) — anti-slop direction so the portfolio
  never looks templated. Use at the start of any page/section to pick a real
  design direction, and as the pre-flight check before shipping.

Default posture: **restraint**. Motion serves clarity, never decoration.
Honesty check — the site must still convert with default fonts and zero
animations (see rule 04 below). Polish is the bonus, not the job.

## 4. Copywriting — the 2026 portfolio audit (binding on all wording)

Every headline, hero line, case-study title, and CTA in this portfolio must pass
these eight rules. This is the voice: lowercase, direct, number-driven, no fluff.

**01 — niche down or die.** Pick one problem, one industry, one role. The hero
names **one specific role** (not "designer & developer & dreamer"). A stranger
can say what to hire me for after **5 seconds** on the homepage. Case studies
all point at the **same** problem space.

**02 — headlines = results.** If a headline has no number, it's decoration.
Every case-study title contains a **number or outcome** — never just a project
name. The hero line includes a **business result**, not a personality trait.
Kill titles like "redesigning the onboarding experience" with no payoff.

**03 — kill the easy apply.** The portfolio is a direct-outreach asset that
makes cold messages warm. The link must **load fast, hit on mobile, put proof
up top** — it's a cold-DM weapon.

**04 — proof > polish.** Real outcomes are visible **above the fold**, no
scrolling to find impact. Include a **proof strip** near the top: numbers, logos,
or testimonials. Honesty check: it would still convert with default fonts and
zero animations.

**05 — delete the process.** No 12-step double-diamond. Each case study **leads
with a decision** ("we chose X because Y"). Process diagram is gone (or one line
max). Every case study reads in **under 3 minutes** — depth, not documentation.

**06 — pass the 6-second test.** In 6 seconds on the homepage a stranger can name
(a) my role, (b) one result I've delivered, (c) what to do next (see work /
contact).

**07 — three case studies, max.** Show **3 or fewer**. Each earns its place:
right role, right industry, real outcome. **Strongest case study first** — not
chronological, not sentimental.

**08 — make the next step stupid-easy.** Email / contact CTA **visible on every
page, one click away**. Resume is **downloadable** and matches the positioning.
**Everything works on mobile** — that's where the first look happens.

**Tone reference:** lowercase, confident, concrete. Prefer "12 interviews and 3
offers" over "great results". Numbers over adjectives. Decisions over process.
