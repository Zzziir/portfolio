import { projects } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/site/project-card";

/** Grid of the other projects, shown at the bottom of a detail page. */
export function MoreProjects({ currentSlug }: { currentSlug: string }) {
  const others = projects.filter((p) => p.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="border-t border-white/10 px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
            More Projects
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {others.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
