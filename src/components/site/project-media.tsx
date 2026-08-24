import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";
import { ImagePlaceholder } from "@/components/site/placeholder";
import { Iphone } from "@/components/magicui/iphone";

/**
 * Renders a project's imagery. Falls back to the gradient placeholder until a
 * real screenshot exists. Mobile projects get an iPhone frame on a lit scene;
 * web projects fill the frame with the screenshot.
 */
export function ProjectMedia({
  project,
  src,
  aspect,
  rounded = "rounded-none",
  className,
  label,
  priority,
}: {
  project: Project;
  /** the image to show; falls back to the gradient placeholder when absent */
  src?: string;
  /** tailwind aspect class for the outer frame, e.g. "aspect-[4/3]" */
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
    // phone centered on an accent-lit scene so tall screens fit a wide frame
    const scene: CSSProperties = {
      backgroundColor: "#0b0a08",
      backgroundImage: `radial-gradient(120% 90% at 50% 12%, ${project.accent}, transparent 55%), radial-gradient(90% 70% at 70% 115%, ${project.accent}22, transparent 60%)`,
    };
    return (
      <div
        className={`relative grid ${aspect} place-items-center overflow-hidden ${rounded} px-6 py-7 ${className ?? ""}`}
        style={scene}
      >
        <Iphone
          src={image}
          alt={`${project.name} app screen`}
          priority={priority}
          className="h-full w-auto max-w-[46%]"
        />
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
