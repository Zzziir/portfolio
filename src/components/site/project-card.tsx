import Link from "next/link";
import { projectHref, type Project } from "@/lib/content";
import { ImagePlaceholder } from "@/components/site/placeholder";

/** A project card that links to its detail page. Shared by Work + MoreProjects. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={projectHref(project.slug)}
      className="group block transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <ImagePlaceholder
            accent={project.accent}
            rounded="rounded-none"
            label={project.name}
            className="aspect-[4/3]"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight">
            {project.result}
          </h3>
          <span className="mt-1 shrink-0 font-mono text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>

        <p className="mt-1.5 text-sm text-muted-foreground">{project.context}</p>

        {/* Rule 05 - lead with the decision */}
        <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground/80">
          {project.decision}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
