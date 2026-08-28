"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/** Magic UI - NumberTicker. Springs a number from startValue to value in view. */
interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  /** thousands separators; turn off for years (2024, not 2,024) */
  useGrouping?: boolean;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  useGrouping = true,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : startValue);
  // Snappier than the Magic UI default (damping 60 / stiffness 100). Kept
  // just above critical damping so integer counters don't overshoot.
  const springValue = useSpring(motionValue, {
    damping: 32,
    stiffness: 220,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      motionValue.set(direction === "down" ? startValue : value);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [motionValue, isInView, delay, value, direction, startValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
          useGrouping,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
    });
  }, [springValue, decimalPlaces, useGrouping]);

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums", className)}
      {...props}
    >
      {startValue}
    </span>
  );
}
