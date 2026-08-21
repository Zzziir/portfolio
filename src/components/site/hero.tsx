"use client";

import { motion, useReducedMotion } from "motion/react";
import { proof, site } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { FloatingObjects } from "@/components/site/floating-objects";
import { ImagePlaceholder } from "@/components/site/placeholder";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 sm:px-8"
    >
      <FloatingObjects />

      {/* Corner labels */}
      <div className="pointer-events-none absolute inset-x-5 bottom-6 flex items-end justify-between font-mono text-xs text-muted-foreground sm:inset-x-8">
        <span className="text-foreground">©{new Date().getFullYear()}</span>
        <span className="hidden sm:block">
          / SHIPPING SINCE {site.since}
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs"
        >
          {site.heroKicker}
        </motion.p>

        <h1 className="font-black uppercase leading-[0.82] tracking-[-0.045em] text-[clamp(3.25rem,14vw,12.5rem)]">
          {site.heroWords.map((word, i) => (
            <span key={word} className="block overflow-hidden py-[0.02em]">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 + i * 0.12 }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Rule 06 — result visible fast */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.55 }}
          className="mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-base"
        >
          {site.heroLine}
        </motion.p>
      </div>

      {/* Portrait + proof strip */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-8">
        <motion.div
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.7 }}
          className="w-full max-w-[220px]"
        >
          <ImagePlaceholder
            className="aspect-[4/5] w-full shadow-[0_20px_60px_-20px_rgba(234,58,40,0.5)] ring-1 ring-white/10"
            monogram={`${site.firstName[0]}${site.lastName[0]}`}
            label="portrait"
          />
        </motion.div>

        {/* Rule 04 — proof strip above the fold */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.85 }}
          className="grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4"
        >
          {proof.map((p) => (
            <li key={p.label} className="bg-background/60 px-4 py-4 text-center">
              <div className="text-xl font-semibold tracking-tight sm:text-2xl">
                {p.value}
              </div>
              <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
                {p.label}
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
