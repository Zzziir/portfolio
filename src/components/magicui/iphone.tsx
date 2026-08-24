import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A lightweight iPhone frame for showcasing mobile screenshots.
 * Inspired by the Magic UI iPhone mockup, rebuilt with CSS so a real
 * screenshot (via next/image) sits inside a titanium-style bezel with a
 * dynamic island and side buttons. Sizes to its container width.
 */
export function Iphone({
  src,
  alt,
  className,
  priority,
}: {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-full rounded-[13%/6%] bg-neutral-900 p-[3.5%] shadow-[0_2px_1px_rgba(255,255,255,0.08)_inset,0_-1px_2px_rgba(0,0,0,0.6)_inset] ring-1 ring-black/60",
        className,
      )}
    >
      {/* side buttons */}
      <span
        aria-hidden
        className="absolute -left-[1.5%] top-[18%] h-[6%] w-[1.5%] rounded-l bg-neutral-800"
      />
      <span
        aria-hidden
        className="absolute -left-[1.5%] top-[27%] h-[9%] w-[1.5%] rounded-l bg-neutral-800"
      />
      <span
        aria-hidden
        className="absolute -left-[1.5%] top-[38%] h-[9%] w-[1.5%] rounded-l bg-neutral-800"
      />
      <span
        aria-hidden
        className="absolute -right-[1.5%] top-[30%] h-[13%] w-[1.5%] rounded-r bg-neutral-800"
      />

      {/* screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[10%/5%] bg-black">
        {src ? (
          <Image
            src={src}
            alt={alt ?? "App screen"}
            fill
            sizes="(max-width: 640px) 60vw, 320px"
            className="object-cover object-top"
            priority={priority}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-neutral-800 to-black" />
        )}

        {/* dynamic island */}
        <div className="absolute left-1/2 top-[2.5%] z-10 h-[3.5%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
