import { projects } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/site/project-card";
import { ArrowUpRight } from "@/components/icons";

export function Work() {
  return (
    <section id="work" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              Featured
              <br />
              Work
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 pb-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View all work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
