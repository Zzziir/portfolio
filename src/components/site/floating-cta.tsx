"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { ArrowUpRight } from "@/components/icons";

/** "Let’s talk" button that fades in after the hero and out over the footer. */
export function FloatingCta() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const nearBottom = scrollYProgress.get() > 0.92;
    setVisible(y > 600 && !nearBottom);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="group fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-foreground py-3 pl-5 pr-4 text-sm font-medium text-background shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:flex"
        >
          Let’s talk
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
