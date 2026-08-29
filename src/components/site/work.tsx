import { featuredProjects, secondaryProjects } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { KineticText } from "@/components/magicui/kinetic-text";
import { ProjectCard } from "@/components/site/project-card";
import { ArrowUpRight } from "@/components/icons";

export function Work() {
  const featured = featuredProjects();
  const secondary = secondaryProjects();

  return (
    <section id="work" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <KineticText
              as="h2"
              text={"Featured\nWork"}
              className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl"
            />
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
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {secondary.length > 0 && (
          <div className="mt-24">
            <Reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                More builds
              </h3>
            </Reveal>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
              {secondary.map((project, i) => (
                <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                  <ProjectCard project={project} compact />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
