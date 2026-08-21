"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { statement } from "@/lib/content";

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = statement.split(" ");

  return (
    <section className="px-5 py-28 sm:px-8 sm:py-40">
      <p
        ref={ref}
        className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-[0.28em] gap-y-1 text-center font-medium leading-[1.16] tracking-tight text-[clamp(1.6rem,4.4vw,3.15rem)]"
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
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
