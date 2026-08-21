"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

// Fade the grid in/out vertically so its edges never hard-cut against the
// section boundary — it dissolves before the bottom instead of showing a
// blocky cut row.
const MASK =
  "linear-gradient(to bottom, transparent 0%, black 14%, black 50%, transparent 86%)";

/** Subtle interactive grid behind the hero. Fades out as you scroll away. */
export function HeroGrid() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity, WebkitMaskImage: MASK, maskImage: MASK }}
      className="absolute inset-0 z-0"
    >
      <InteractiveGridPattern
        width={80}
        height={80}
        squares={[30, 20]}
        className="inset-0 h-full w-full"
      />
    </motion.div>
  );
}
