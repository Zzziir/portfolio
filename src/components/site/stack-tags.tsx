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
            className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 ${pad} font-mono ${text} text-muted-foreground`}
          >
            {tech?.path && (
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className={`${icon} shrink-0`}
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
