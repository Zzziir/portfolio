import type { CSSProperties } from "react";
import { iconFor } from "@/lib/tech-stack";

/** "Claude / Gemini" reads as two tools, so it becomes two chips. */
const expand = (tags: string[]) => tags.flatMap((t) => t.split(/\s*\/\s*/));

/**
 * A project's stack as chips: a brand mark in its real colour plus its label.
 * The colour lives on the mark only (the label stays muted), so the cards get
 * life without the layout turning loud. Tags with no known mark (Zustand, ELA)
 * fall back to a label-only chip.
 */
export function StackTags({
  tags,
  className,
  size = "sm",
}: {
  tags: string[];
  className?: string;
  size?: "sm" | "md";
}) {
  const icon = size === "md" ? "size-4" : "size-3.5";
  const text = size === "md" ? "text-xs" : "text-[11px]";
  const pad = size === "md" ? "px-3 py-1.5" : "px-2.5 py-1";

  return (
    <ul className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {expand(tags).map((label) => {
        const tech = iconFor(label);
        return (
          <li
            key={label}
            style={{ "--c": tech?.color ?? "#ffffff" } as CSSProperties}
            className={`group inline-flex items-center gap-1.5 rounded-full border border-white/10 ${pad} font-mono ${text} text-muted-foreground transition-[transform,border-color,color,background-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:text-foreground hover:[background-color:color-mix(in_oklab,var(--c)_12%,transparent)] hover:[border-color:color-mix(in_oklab,var(--c)_55%,transparent)] hover:[box-shadow:0_6px_18px_-6px_color-mix(in_oklab,var(--c)_60%,transparent)] motion-reduce:transition-[border-color,color,background-color,box-shadow] motion-reduce:hover:translate-y-0`}
          >
            {tech?.path && (
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className={`${icon} shrink-0 transition-transform delay-[30ms] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-125 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100`}
                style={{ fill: tech.color }}
              >
                <path d={tech.path} />
              </svg>
            )}
            {label}
          </li>
        );
      })}
    </ul>
  );
}
