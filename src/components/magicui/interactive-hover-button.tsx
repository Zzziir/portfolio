import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@/components/icons";

type InteractiveHoverButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/**
 * Magic UI's InteractiveHoverButton, adapted: no resting dot (text only), and
 * rendered as a link for the footer's nav. At rest it's an outlined pill; on
 * hover a fill blooms from its centre, the label slides out, and a fresh label
 * with an arrow slides in. Reduced motion drops the movement and just swaps to
 * the filled state.
 */
export function InteractiveHoverButton({
  children,
  className,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    >
      {/* fill: invisible at rest, blooms to cover the pill on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-foreground transition-transform duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[100.8] motion-reduce:transition-none"
      />
      {/* resting label: text only, slides out and fades on hover */}
      <span className="relative z-10 inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 motion-reduce:transition-none">
        {children}
      </span>
      {/* hover label + arrow: slides in from the right over the fill */}
      <span className="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-1.5 text-background opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none">
        {children}
        <ArrowUpRight className="size-3.5" />
      </span>
    </a>
  );
}
