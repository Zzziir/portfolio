# portfolio

Personal portfolio for **Lance Candelaria** - Solutions Designer / Product Engineer.

A dark, editorial single-page site with a scroll-driven shared portrait that
flips from the hero into the About section, a scroll-fill statement line, and
number-first copy throughout.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** + **shadcn/ui**
- **motion** (Framer Motion) for scroll-linked animation
- Self-hosted **Geist** font
- Deployed on **Vercel**

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

- `src/app` - App Router entry, layout, global styles/design tokens
- `src/components/site` - page sections (hero/about, services, work, …)
- `src/lib/content.ts` - all copy and data in one place (swap in real numbers)

See `CLAUDE.md` for the design system, commit conventions, and copy rules this
project follows.
