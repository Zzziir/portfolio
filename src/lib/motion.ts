import type { Variants } from "motion/react";

/** Expo-out — long, soft settle. The default for entrances. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Symmetric ease for looping / reversible motion. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Fade + rise, used by <Reveal>. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

/** Container that staggers its direct children on scroll-in. */
export const staggerContainer = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Clip-reveal for big display type — wipes up from the baseline. */
export const clipUp: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};
