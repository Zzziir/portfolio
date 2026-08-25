import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";
import { ImagePlaceholder } from "@/components/site/placeholder";
import { Iphone } from "@/components/magicui/iphone";

/**
 * Renders a project's imagery. Falls back to the gradient placeholder until a
 * real screenshot exists. Mobile projects sit in an iPhone frame on a lit
 * scene (one phone, or two side by side when `src2` is given); web projects
 * fill the frame top-aligned so desktop screenshots keep their headers.
 */
export function ProjectMedia({
  project,
  src,
  src2,
  aspect,
  rounded = "rounded-none",
  className,
  label,
  priority,
}: {
  project: Project;
  /** the image to show; falls back to the gradient placeholder when absent */
  src?: string;
  /** a second mobile screenshot - shown as a second phone beside the first */
  src2?: string;
  /** tailwind aspect class for the outer frame, e.g. "aspect-[16/10]" */
  aspect: string;
  rounded?: string;
  className?: string;
  label?: string;
  priority?: boolean;
}) {
  const image = src;

  if (!image) {
    return (
      <ImagePlaceholder
        accent={project.accent}
        rounded={rounded}
        label={label ?? project.name}
        className={`${aspect} ${className ?? ""}`}
      />
    );
  }

  if (project.platform === "mobile") {
    // phone(s) on an accent-lit scene so tall screens fit a wide frame
    const scene: CSSProperties = {
      backgroundColor: "#0b0a08",
      backgroundImage: `radial-gradient(120% 90% at 50% 12%, ${project.accent}, transparent 55%), radial-gradient(90% 70% at 70% 115%, ${project.accent}22, transparent 60%)`,
    };
    const phones = src2 ? [image, src2] : [image];
    return (
      <div
        className={`relative grid ${aspect} place-items-center overflow-hidden ${rounded} px-6 py-8 ${className ?? ""}`}
        style={scene}
      >
        <div className="flex h-full items-center justify-center gap-4 sm:gap-6">
          {phones.map((phone, i) => (
            <Iphone
              key={phone}
              src={phone}
              alt={`${project.name} app screen ${i + 1}`}
              priority={priority && i === 0}
              className="h-[92%] w-auto"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${aspect} overflow-hidden ${rounded} ${className ?? ""}`}>
      <Image
        src={image}
        alt={`${project.name} screenshot`}
        fill
        sizes="(max-width: 640px) 100vw, 640px"
        className="object-cover object-top"
        priority={priority}
      />
    </div>
  );
}
