"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ImagePlaceholder } from "@/components/site/placeholder";

/**
 * Portrait that flips on its Y-axis as the hero scrolls past — thinning to an
 * edge, then revealing a second, red-lit face (mirrors the reference).
 * Falls back to a static front face under reduced-motion.
 */
export function FlipPortrait({
  monogram,
  className,
}: {
  monogram: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });
  // ease the raw scroll a touch so the flip settles instead of tracking 1:1
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const rotateY = useTransform(smooth, [0, 1], [0, 180]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        className="relative aspect-[4/5] w-full"
        style={{
          transformStyle: "preserve-3d",
          rotateY: reduce ? 0 : rotateY,
        }}
      >
        {/* front face */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <ImagePlaceholder
            className="h-full w-full shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
            accent="#3a3630"
            monogram={monogram}
            label="portrait"
          />
        </div>
        {/* back face — red-lit */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <ImagePlaceholder
            className="h-full w-full shadow-[0_20px_60px_-20px_rgba(234,58,40,0.5)] ring-1 ring-white/10"
            accent="#ea3a28"
            monogram={monogram}
            label="portrait"
          />
        </div>
      </motion.div>
    </div>
  );
}
