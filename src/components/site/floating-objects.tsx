"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_IN_OUT } from "@/lib/motion";

const STAR =
  "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";
const BOLT =
  "polygon(46% 0%, 82% 0%, 58% 36%, 88% 36%, 26% 100%, 44% 54%, 16% 54%)";

type ObjProps = {
  clip: string;
  className: string;
  /** parallax distance in px across the full scroll of the hero */
  parallax: number;
  /** idle float params */
  float: number;
  rotate: number;
  duration: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
};

function ChromeObject({
  clip,
  className,
  parallax,
  float,
  rotate,
  duration,
  progress,
  reduce,
}: ObjProps) {
  const y = useTransform(progress, [0, 1], [0, parallax]);

  return (
    <motion.div className={className} style={{ y: reduce ? 0 : y }} aria-hidden>
      <motion.div
        className="relative h-full w-full"
        animate={
          reduce
            ? undefined
            : { y: [0, -float, 0], rotate: [rotate, rotate + 6, rotate] }
        }
        transition={{ duration, ease: EASE_IN_OUT, repeat: Infinity }}
      >
        {/* iridescent body */}
        <div
          className="chrome absolute inset-0"
          style={{
            clipPath: clip,
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.45))",
          }}
        />
        {/* soft top highlight for the glassy chrome read */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            clipPath: clip,
            background:
              "linear-gradient(150deg, rgba(255,255,255,0.85), transparent 45%)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/** Two chrome shapes flanking the hero headline. */
export function FloatingObjects() {
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ChromeObject
        clip={STAR}
        className="pointer-events-none absolute left-[6%] top-[26%] h-16 w-16 sm:h-20 sm:w-20 md:left-[12%] md:top-[30%] md:h-24 md:w-24"
        parallax={-90}
        float={14}
        rotate={-8}
        duration={7}
        progress={scrollYProgress}
        reduce={reduce}
      />
      <ChromeObject
        clip={BOLT}
        className="pointer-events-none absolute right-[7%] top-[52%] h-16 w-14 sm:h-24 sm:w-20 md:right-[13%] md:top-[54%] md:h-28 md:w-24"
        parallax={120}
        float={20}
        rotate={10}
        duration={8.5}
        progress={scrollYProgress}
        reduce={reduce}
      />
    </>
  );
}
