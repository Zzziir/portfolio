"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { statement } from "@/lib/content";

/**
 * The manifesto line, pinned and scroll-scrubbed (the Majd word-fill). The
 * section is tall; an inner sticky panel locks to the viewport while you scroll
 * its extra height, and each word fills faint -> solid over that scroll. The
 * fill completes a little before the section releases (FILL_END), so the whole
 * line holds solid and locked for a beat, then the next section scrolls in.
 *
 * Progress is derived from absolute scrollY against the section's measured
 * bounds (strictly monotonic) rather than useScroll's target/offset, which read
 * non-monotonic under this pinned layout.
 *
 * prefers-reduced-motion opts out of the pin entirely: a plain, solid paragraph.
 */

const FILL_END = 0.82;

const paragraphClass =
  "mx-auto flex max-w-5xl flex-wrap justify-center gap-x-[0.28em] gap-y-1 text-center font-medium leading-[1.16] tracking-tight text-[clamp(1.6rem,4.4vw,3.15rem)]";

export function Statement() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [bounds, setBounds] = useState({ start: 0, end: 1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const vh = window.innerHeight;
      setBounds({ start: top, end: Math.max(top + 1, top + el.offsetHeight - vh) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const progress = useTransform(scrollY, [bounds.start, bounds.end], [0, 1], {
    clamp: true,
  });

  const words = statement.split(" ");

  if (reduce) {
    return (
      <section className="px-5 py-28 sm:px-8 sm:py-40">
        <p className={paragraphClass}>{statement}</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-svh items-center justify-center px-5 sm:px-8">
        <p className={paragraphClass}>
          {words.map((word, i) => {
            const start = (i / words.length) * FILL_END;
            const end = ((i + 1) / words.length) * FILL_END;
            return (
              <Word key={`${word}-${i}`} progress={progress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
