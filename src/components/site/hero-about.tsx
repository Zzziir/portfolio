"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { about, site } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { FloatingObjects } from "@/components/site/floating-objects";
import { ImagePlaceholder } from "@/components/site/placeholder";
import { ArrowUpRight } from "@/components/icons";

/**
 * Hero + About as one region sharing a SINGLE portrait card.
 * The card is pinned to viewport-centre for the region and, as you scroll,
 * flips on its Y-axis (0 → 180°) while sliding from the hero's lower-centre
 * up to centre — landing, red-face-out, beside the "Hey!" copy.
 */
export function HeroAbout() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const monogram = `${site.firstName[0]}${site.lastName[0]}`;

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  // Track the whole hero→about scroll so the card stays low + edge-on while
  // the headline leaves, and only lands flat/red/centred once "Hey!" is in view.
  const rotateY = useTransform(p, [0.2, 0.85], [0, 180]);
  const cardY = useTransform(p, [0, 1], ["37vh", "0vh"]);
  const cardScale = useTransform(p, [0, 1], [0.32, 0.85]);

  return (
    <div ref={wrap} id="top" className="relative">
      {/* ── Shared pinned flip card ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
            className="w-[min(80vw,380px)] [perspective:1400px]"
          >
            <motion.div
              className="relative aspect-[4/5] w-full"
              style={{
                transformStyle: "preserve-3d",
                rotateY: reduce ? 0 : rotateY,
                y: reduce ? "37vh" : cardY,
                scale: reduce ? 0.32 : cardScale,
              }}
            >
              <div
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden" }}
              >
                <ImagePlaceholder
                  className="h-full w-full shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/15"
                  accent="#6a6157"
                  monogram={monogram}
                  label="portrait"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <ImagePlaceholder
                  className="h-full w-full shadow-[0_24px_70px_-24px_rgba(234,58,40,0.55)] ring-1 ring-white/10"
                  accent="#ea3a28"
                  monogram={monogram}
                  label="portrait"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Hero copy ───────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 sm:px-8">
        <FloatingObjects />

        <div className="pointer-events-none absolute inset-x-5 bottom-6 z-20 flex items-end justify-between font-mono text-xs text-muted-foreground sm:inset-x-8">
          <span className="text-foreground">©{new Date().getFullYear()}</span>
          <span className="hidden sm:block">/ SHIPPING SINCE {site.since}</span>
        </div>

        {/* Just the headline — like the reference. Card sits below it. */}
        <div className="relative z-20 flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="font-black uppercase leading-[0.82] tracking-[-0.045em] text-[clamp(3.25rem,14vw,12.5rem)]">
            {site.heroWords.map((word, i) => (
              <span key={word} className="block overflow-hidden py-[0.02em]">
                <motion.span
                  className="block"
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  animate={reduce ? { opacity: 1 } : { y: "0%" }}
                  transition={{
                    duration: 0.9,
                    ease: EASE_OUT,
                    delay: 0.2 + i * 0.12,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* ── About copy (card lands in the empty centre column) ──── */}
      <section
        id="about"
        className="relative flex min-h-[100svh] items-center px-5 py-24 sm:px-8"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-12 md:gap-8">
          <div className="relative z-20 flex flex-col justify-between md:col-span-4 md:h-[420px]">
            <h2 className="text-6xl font-black tracking-tight sm:text-7xl">
              {about.greeting}
            </h2>
            <p className="mt-8 max-w-xs text-pretty text-lg font-medium leading-snug md:mt-0">
              {about.lead}
            </p>
          </div>

          {/* reserved space for the shared card */}
          <div className="min-h-[52vh] md:col-span-4 md:min-h-0" aria-hidden />

          <div className="relative z-20 md:col-span-4">
            {/* the hero result line lives here now */}
            <p className="text-pretty text-base font-medium leading-relaxed">
              {site.heroLine}
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              {about.body}
            </p>
            <a
              href={about.cta.href}
              className="group mt-8 inline-flex items-center gap-2 text-base font-medium"
            >
              {about.cta.label}
              <span className="grid size-8 place-items-center rounded-lg border border-white/15 transition-colors group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
