"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

// Fade in below the nav and out low enough to reach into the portrait card,
// so the edges gradient away instead of hard-cutting.
const MASK =
  "linear-gradient(to bottom, transparent 3%, black 15%, black 64%, transparent 90%)";

/** Subtle isometric interactive grid behind the hero. Fades out on scroll. */
export function HeroGrid() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity, WebkitMaskImage: MASK, maskImage: MASK }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <InteractiveGridPattern
        width={54}
        height={54}
        squares={[48, 34]}
        // isometric: oversize + skew so the skewed grid still fills the frame
        className="inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-12"
      />
    </motion.div>
  );
}
