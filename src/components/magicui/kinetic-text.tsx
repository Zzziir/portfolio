import { Fragment } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type KineticTextProps = HTMLAttributes<HTMLElement> & {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
};

/**
 * A title whose letters carry a variable-font weight, adapted from Magic UI's
 * KineticText and inverted: the type sits bold at rest (the heading's own
 * font-black) and thins under the pointer, letters near the cursor dipping in a
 * wave. Pure CSS (adjacent-sibling :has selectors), so no JS and no layout
 * shift beyond the glyphs' own width. Motion-safe only: reduced motion leaves
 * it static and bold. A "\n" in `text` becomes a line break.
 */
const letterClass = cn(
  "[transition:font-weight_0.35s_cubic-bezier(0.23,1,0.32,1)] [will-change:font-weight]",
  // hovered letter thins; its neighbours dip part-way in a wave
  "motion-safe:hover:font-[300]",
  "motion-safe:has-[+span:hover]:font-[600] motion-safe:has-[+span+span:hover]:font-[760]",
  "motion-safe:[:hover+&]:font-[600] motion-safe:[:hover+span+&]:font-[760]",
);

export function KineticText({
  text,
  as: Tag = "span",
  className,
  ...rest
}: KineticTextProps) {
  return (
    <Tag className={className} {...rest}>
      <span aria-hidden="true">
        {[...text].map((ch, i) => {
          if (ch === "\n") return <br key={i} />;
          if (ch === " ") return <Fragment key={i}> </Fragment>;
          return (
            <span key={i} className={letterClass}>
              {ch}
            </span>
          );
        })}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
