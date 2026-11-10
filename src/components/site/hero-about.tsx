"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { about, site } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { FloatingObjects } from "@/components/site/floating-objects";
import { HeroGrid } from "@/components/site/hero-grid";
import { ArrowUpRight } from "@/components/icons";
import { KineticText } from "@/components/magicui/kinetic-text";

/** One side of the flip card: a full-bleed 3D portrait with an editorial tag. */
function PortraitFace({
  src,
  alt,
  priority,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#0b0a08] ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 767px) 270px, 330px"
        className="object-cover"
      />
    </div>
  );
}

/** Hero-state card width: 32% of min(80vw, 380px), the size it has always had. */
const heroCardWidth = (viewportWidth: number) =>
  0.32 * Math.min(viewportWidth * 0.8, 380);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Hero + About as one region sharing a SINGLE portrait card.
 * The card is pinned to viewport-centre for the region and, as you scroll,
 * flips on its Y-axis (0 → 180°) while sliding from the hero's lower-centre
 * up to centre - landing, red-face-out, beside the "Hey!" copy.
 */
export function HeroAbout() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const aboutSection = useRef<HTMLElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The card renders at its landed size and scales down for the hero, so it
  // ends crisp at scale 1. `landY` is how far the slot's centre sits from the
  // viewport centre once the region is fully scrolled, so the card lands in
  // its slot whatever the about layout (centred columns on desktop, a stacked
  // one-screen layout on mobile).
  const startScale = useMotionValue(0.376);
  const landY = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!stage.current || !card.current || !aboutSection.current || !slot.current)
        return;
      const section = aboutSection.current.getBoundingClientRect();
      const target = slot.current.getBoundingClientRect();
      const slotCentre = target.top - section.top + target.height / 2;
      const sectionTopWhenLanded = window.innerHeight - section.height;
      landY.set(
        sectionTopWhenLanded + slotCentre - stage.current.clientHeight / 2,
      );
      startScale.set(heroCardWidth(window.innerWidth) / card.current.offsetWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(aboutSection.current!);
    observer.observe(stage.current!);
    return () => observer.disconnect();
  }, [landY, startScale]);

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
  const cardLandY = useTransform(() => clamp01(p.get()) * landY.get());
  const cardScale = useTransform(
    () => startScale.get() + (1 - startScale.get()) * clamp01(p.get()),
  );

  return (
    <div ref={wrap} id="top" className="relative">
      {/* ── Shared pinned flip card ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          ref={stage}
          className="sticky top-0 flex h-[100svh] items-center justify-center"
        >
          <motion.div
            ref={card}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
            style={{ y: reduce ? 0 : cardLandY }}
            // mobile width must match the about section's card slot below
            className="w-[min(68vw,30svh,max(120px,calc((100svh_-_575px)*0.8)))] [perspective:1400px] md:w-[min(68vw,323px)]"
          >
            <motion.div
              className="relative aspect-[4/5] w-full"
              style={{
                transformStyle: "preserve-3d",
                rotateY: reduce ? 0 : rotateY,
                y: reduce ? "37vh" : cardY,
                scale: reduce ? startScale : cardScale,
              }}
            >
              <div
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden" }}
              >
                <PortraitFace
                  src="/assets/profile/portrait-dark.png"
                  alt={`${site.firstName} ${site.lastName}, 3D avatar portrait`}
                  priority
                  className="h-full w-full shadow-[0_28px_60px_-26px_rgba(255,255,255,0.28),0_10px_28px_-18px_rgba(255,255,255,0.16)] ring-1 ring-white/15"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <PortraitFace
                  src="/assets/profile/portrait-red.png"
                  alt=""
                  className="h-full w-full shadow-[0_24px_70px_-24px_rgba(234,58,40,0.55)] ring-1 ring-white/10"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Hero copy ───────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 sm:px-8">
        <HeroGrid />
        <FloatingObjects />

        <div className="pointer-events-none absolute inset-x-5 bottom-6 z-20 flex items-end justify-between font-mono text-xs text-muted-foreground sm:inset-x-8">
          <span className="text-foreground">©{new Date().getFullYear()}</span>
          <span className="hidden sm:block">/ SHIPPING SINCE {site.since}</span>
        </div>

        {/* Just the headline - like the reference. Card sits below it.
            pointer-events-none lets the interactive grid behind receive hover. */}
        <div className="pointer-events-none relative z-20 flex flex-1 flex-col items-center justify-center text-center">
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
      {/* Mobile: one screen, copy / card / copy stacked, the card sized to the
          height left over. Desktop: three columns, card in the middle. */}
      <section
        ref={aboutSection}
        id="about"
        className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-5 pt-20 sm:px-8 md:flex-row md:items-center md:py-24"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:grid md:grid-cols-12 md:items-center md:gap-8">
          <div className="relative z-20 flex flex-col justify-end md:col-span-4 md:h-[420px] md:justify-between">
            <KineticText
              as="h2"
              text={about.greeting}
              className="text-5xl font-black tracking-tight sm:text-7xl"
            />
            <p className="mt-3 max-w-sm text-pretty text-base font-medium leading-snug md:mt-0 md:max-w-xs md:text-lg">
              {about.lead}
            </p>
          </div>

          {/* reserved slot for the shared card (mobile size matches the card) */}
          <div
            ref={slot}
            className="mx-auto aspect-[4/5] shrink-0 w-[min(68vw,30svh,max(120px,calc((100svh_-_575px)*0.8)))] md:col-span-4 md:aspect-auto md:w-auto"
            aria-hidden
          />

          <div className="relative z-20 md:col-span-4">
            {/* the hero result line lives here now */}
            <p className="text-pretty text-sm font-medium leading-relaxed md:text-base">
              {site.heroLine}
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base">
              {about.body}
            </p>
            <a
              href={about.cta.href}
              className="group mt-4 inline-flex items-center gap-2 text-base font-medium md:mt-8"
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
